# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## QAI – Qosay's AI Assistant

Existing flow: React → POST /chat → FastAPI → Gemini → {"answer": "..."}.
The UI, Arabic welcome, launcher, avatar, animations and manual Retry are preserved.
Questions are sent individually; chat history stays only in React memory.

### Local development

The existing root `venv` can run the backend. Install runtime dependencies with
`python -m pip install -r backend/requirements.txt`. Offline tests additionally
need `httpx`. Copy environment examples only when the destination does not exist:

```powershell
Copy-Item .env.example .env.local
Copy-Item backend/.env.example backend/.env
# Set GEMINI_API_KEY in backend/.env, never in a VITE_ variable.
cd backend
..\venv\Scripts\python.exe -m uvicorn main:app --reload
```

From the repository root, run `npm run dev -- --port 5173 --strictPort`.
Local frontend API value: `VITE_API_BASE_URL=http://127.0.0.1:8000`.
Restart Vite after changing it. There is no implicit localhost fallback.

### Production configuration and redeploy

In Vercel, set this non-secret build variable for **Production**:

```text
VITE_API_BASE_URL=https://qosay-qai-backend.onrender.com
```

Redeploy the frontend after setting it: Vite embeds the value at build time.
If using Preview deployments, set the same API value for Preview and explicitly
add each trusted preview origin to backend CORS. The current allowlist does not
allow arbitrary Vercel preview domains.

Render keeps Root Directory `backend`, Build Command
`pip install -r requirements.txt`, and Start Command
`uvicorn main:app --host 0.0.0.0 --port $PORT`.
Keep the existing backend-only `GEMINI_API_KEY`. `GEMINI_MODEL` defaults to
`gemini-3.1-flash-lite`. After pushing these changes, redeploy the backend too.
If Render already defines `CORS_ORIGINS`, it overrides the default, so set it to:

```text
https://qosayqlalwhe.vercel.app,http://localhost:5173,http://127.0.0.1:5173
```

CORS uses exact origins, POST and Content-Type, without wildcard origins or
credentials. CORS does not authenticate non-browser callers.
Production frontend requests reject missing/invalid API configuration, HTTP,
and loopback URLs instead of contacting a local server.

### Portfolio knowledge

`backend/portfolio_data.py` contains structured `PORTFOLIO_DATA`: profile,
services, skills/tools, experience, recognition, client projects, training
projects, education availability and intentionally public links. It is serialized
as JSON for Gemini's trusted system context; no React source or environment data
is passed to the model. The visitor question remains separate user content.

Sources are the current `src/data/*.js`, Hero, TypingText, Footer and Contact.
All 3 services, 20 tech-stack tools, 5 experiences, 9 recognition entries,
3 client projects and 3 training projects are included with their actual text
and published links. Source files, rather than old demo/TODO comments, establish
what is currently displayed. No education degree or dates are currently displayed,
so those old CV-only claims are excluded. Proficiency levels are not invented.

**When portfolio professional data changes, update QAI knowledge here as well.**
Keep this curated Python structure aligned with the source files above. This small
manual copy avoids a runtime cross-language pipeline and works with Render's
backend-only root directory. Image paths and UI-only fields are excluded.

### API contract, errors and security

`POST /chat` accepts `{ "message": "Who is Qosay?" }` and returns
`{ "answer": "..." }`. Pydantic strips outer whitespace, validates a strict
1–2000 character string and rejects extra fields. Invalid input returns 422;
missing provider configuration returns a safe 503; provider failure or empty
output returns a safe 502. A response model validates the answer contract.
The health route `GET /` confirms the server is running, not Gemini readiness.

Gemini has a 30-second timeout and one attempt per submitted question (SDK retries
are disabled); the frontend allows 120 seconds including Render
cold-start time, validates the response, and shows friendly errors without raw
provider details. Retry is manual and does not duplicate the visitor message.
Concurrent submissions are blocked. React renders model output as text.

Gemini reads `GEMINI_API_KEY` only on the backend. Local `.env` files, virtual
environments and caches are Git-ignored; examples contain placeholders only.
Instructions require grounded, concise answers in the visitor's language,
refuse secrets and unsupported private details, and redirect unrelated questions.
No database, tools, RAG framework or conversation persistence is added.

### Validation

```powershell
npm run build
npm run lint
npx eslint src/components/chatbot/QAIChat.jsx
.\venv\Scripts\python.exe backend/test_ai.py
```

Offline tests cover the request/response contract, structured context, current
knowledge, validation, safe provider failures, health, production/local CORS and
rejection of untrusted origins. `backend/test_ai.py --live` is an optional suite
that calls Gemini and consumes requests; it is not required for offline checks.
The existing full-lint error in `src/components/ui/TypingText.jsx:23` is unrelated.

## Scroll-reveal animations

The animation system lives in `src/components/animations/Reveal.jsx` and imports
Motion for React from `motion/react`. `motion` is the only newly added direct dependency.

```jsx
<Reveal>Content revealed on scroll</Reveal>
<Reveal direction="left" delay={0.08}>Desktop timeline card</Reveal>
<Reveal entrance delay={0.12} as="h1">Page-load heading</Reveal>
```

Props: `direction` (`up`, `left`, `right`, `fade`), `delay`, `duration`, `distance`,
`entrance`, `as` (`div`, `header`, `p`, `h1`), `className`, and `children`.
Normal HTML props such as IDs and ARIA labels are forwarded. Defaults are 32px,
0.6 seconds, no delay, a smooth ease-out curve `[0.22, 1, 0.36, 1]`, and a 15%
viewport threshold with `once: true`. Left/right movement is capped at 24px to fit
existing desktop page gutters; below 1024px it becomes a 32px upward entrance.

`entrance` starts on mount for the Hero, with delays of 0.05–0.33 seconds. Other
sections use viewport reveals. Tech Stack animates its heading and outer marquee
container. Services, Recognition and Projects use 0.08-second card stagger steps;
card-row delays reset after three items. Experience alternates left/right card
entrances on desktop. Contact animates only its heading and form container.
Footer, Navbar and QAI have no scroll reveals.

Existing sections and IDs remain in place. Card wrappers animate separately from
CSS hover/flip transforms; the marquee tracks keep their original CSS animation.
`as` preserves existing heading/header semantics without extra wrappers. Card
wrappers use a single-cell grid to preserve the original stretching and sizes.
Only transforms and opacity animate; layout dimensions are stable.

`useReducedMotion` makes all reveal content immediately visible with zero duration
and delay. A small CSS fallback also shows content before Motion reads that
preference. Keyboard focus immediately reveals the containing block, so a user
cannot land on a hidden control. Visibility uses Motion's viewport observer,
with no new scroll listeners; breakpoint changes use a media-query subscription.

Verification: production build passes. Animation/section lint passes; full lint
still reports the pre-existing `TypingText.jsx:23` set-state-in-effect error.
Original versus updated section positions, card sizes, form dimensions and link
attributes match at 1280px, 768px and 390px widths. Also checked the 1024px breakpoint
for overflow, all 33 reveal blocks, once-only visibility, mobile navigation,
service flip controls, marquee pause/resume, QAI chat, and Contact validation and
success/error toasts. Contact responses were mocked locally, without sending test
messages. Reduced-motion visibility was checked using an emulated media preference.
Temporary verification fixtures were removed after testing.

Existing issues preserved: the Resume URL points to a PDF currently absent from
`public/resume/`; project/social/recognition placeholder URLs remain unchanged.

### How the animation system works

1. Motion for React is the animation library.
2. Reveal wraps a content block or preserves its tag with `as`.
3. `initial` applies the hidden starting opacity and offset.
4. `whileInView` animates to the visible state when scrolling into view.
5. `viewport` configures the 15% visibility threshold.
6. `once: true` keeps revealed content visible when scrolling away and back.
7. `variants` defines the shared hidden and visible states.
8. `direction` chooses upward, left, right or opacity-only movement.
9. `delay` waits briefly before beginning a reveal.
10. Stagger uses small increasing delays for neighboring cards.
11. Reduced motion bypasses the movement and delays.
12. Each section imports Reveal and applies it to headers or content blocks;
    section roots and existing interactions stay in place.
