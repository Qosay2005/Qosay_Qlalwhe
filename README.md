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

QAI is a floating portfolio assistant. Request flow:
**React → POST /chat → FastAPI → Gemini → {"answer": "..."} → React**.
The welcome message is local. Chat messages live in React memory until refresh;
closing the panel preserves them. Each API call sends the current question only,
so ask self-contained questions rather than relying on previous answers.

### Run locally (Windows PowerShell)

From the repository root, create an environment if needed (this checkout already
has a root `venv`):

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install -r backend/requirements.txt
# Tests use httpx; install it only if running the development tests.
python -m pip install httpx
# Only copy if backend/.env does not already exist:
Copy-Item backend/.env.example backend/.env
```

Set `GEMINI_API_KEY` in `backend/.env`. Preserve your existing key; never put it in
React or any `VITE_` variable. `GEMINI_MODEL` defaults to `gemini-3.1-flash-lite`.
The starter's `gemini-2.5-flash` returned 404 during verification, while the stable
Flash Lite model answered successfully. You can override the model in backend/.env.

```powershell
cd backend
..\venv\Scripts\python.exe -m uvicorn main:app --reload
```

Backend: http://127.0.0.1:8000. `GET /` is a basic health endpoint, not a provider
readiness check. In another terminal from the repository root:

```powershell
Copy-Item .env.example .env
npm install
npm run dev -- --port 5173 --strictPort
```

`VITE_API_BASE_URL` is the FastAPI address (default http://127.0.0.1:8000).
Restart Vite after changing frontend environment values. For deployment set this
to your HTTPS backend and set backend `CORS_ORIGINS` to exact comma-separated
frontend origins. Defaults allow http://localhost:5173 and http://127.0.0.1:5173,
POST and Content-Type only, without credentials or wildcard origins. If Vite uses
another port, add that exact origin. CORS does not restrict direct non-browser calls.
Use hosting/proxy request limits and Gemini quota/budget controls for a public deployment.

### Files and customization

- `src/components/chatbot/QAIChat.jsx`: one widget with a shared `Avatar` helper,
  message state, native fetch, loading, retry, focus restoration and chat-only scrolling.
- `src/components/chatbot/qai.css`: responsive layout using existing theme tokens.
- `src/components/mainlayout/MainLayout.jsx`: mounts QAI once, after the Footer.
- `backend/main.py`: environment, Gemini client, CORS, validation, instructions,
  health endpoint and complete chat request flow.
- `backend/portfolio_data.py`: curated public knowledge. Edit its plain text when
  verified facts change. No PDF parsing, database, embeddings or training is needed.
- `backend/test_ai.py`: offline API tests plus optional live question checks.
- `.env.example` and `backend/.env.example`: public configuration templates.
- `backend/requirements.txt`: backend runtime packages.

To use your own photo, place it at `public/images/qai/qai-avatar.jpg` and set
`AVATAR_SOURCE = '/images/qai/qai-avatar.jpg'` in QAIChat.jsx. Both launcher and
header use that single setting, with circular cropping and QAI initials on load
failure. No portrait has been generated.

### Knowledge, privacy and source review

Included from the verified CV: junior frontend profile, Solver Academy,
Computer Systems Engineering at AAUP (2023–2028), three teaching roles with dates
and 140+/40+/200+ student counts, Pizza Plus, To-Do List App, Supermarket Jenin,
listed skills with basic Node.js preserved, IP Team, competitive programming,
Codeforces problem setting and contest organization.

Added from the repository: published technologies/tools, three services,
responsive frontend focus, availability for hire, and the Contact form.
Experience data agrees with the supplied CV. The repository's project and
recognition files explicitly say they are demo data, and Footer social URLs are
placeholders. Those have not been treated as verified projects, awards, rankings
or personal profile links. Developer TODOs in portfolio_data.py record this review;
those comments are not sent to Gemini. No verified private phone, exact home
address, salary or private contact information is included.

### API behavior and security

`POST /chat` accepts `{ "message": "Who is Qosay?" }`. Pydantic trims whitespace,
requires a string of 1–2000 characters and rejects extra fields (422 on invalid
input). FastAPI calls the official google-genai SDK with QAI instructions and
PORTFOLIO_INFO in the system context and the visitor question as user content,
then returns `{ "answer": "..." }`. Missing configuration gives a safe 503;
provider failure or an empty answer gives a safe 502. Provider exceptions are not
returned or logged verbatim. Gemini timeout is 30 seconds; frontend timeout is
40 seconds. Duplicate submissions are blocked synchronously. React renders text
without raw HTML and keeps messages on failure, with Retry.

The API key stays backend-only, and `.env`, virtual environments and Python caches
are ignored. Instructions require language matching, grounded answers, correction
of false premises and refusal of private-data/prompt requests. Prompt instructions
reduce hallucinations but cannot guarantee every future model response; review live
answers when updating knowledge or switching models. No tools or file access are
given to Gemini. Messages are sent to Gemini; no persistent conversation store is added.

### Checks

```powershell
npm run build
npm run lint
.\venv\Scripts\python.exe backend/test_ai.py
.\venv\Scripts\python.exe backend/test_ai.py --live
```

Offline tests cover health, invalid inputs, context inclusion, response extraction,
missing key, provider/empty-answer failures and CORS. Live checks send the requested
English/Arabic questions, unknown salary, false Google employment, an unrelated
question and a prompt-injection attempt. Review the printed answers for factual
accuracy and language. Never paste a real credential into the chat.

### How to study QAI

1. `portfolio_data.py` — understand what QAI knows.
2. `main.py` setup — FastAPI, environment variables and Gemini client.
3. `ChatRequest` — how FastAPI receives and validates a message.
4. `POST /chat` — follow one request from beginning to end.
5. QAI instructions + portfolio context — what Gemini receives.
6. Gemini API call — how the question is sent.
7. FastAPI response — how `{ "answer": "..." }` returns to React.
8. CORS — why React may call FastAPI.
9. `QAIChat.jsx` — the visual component.
10. React messages state — how conversation is displayed.
11. `fetch()` — how React calls POST /chat.
12. Loading/error states — the waiting and failure experience.
13. Auto-scroll — useRef/useEffect and scrolling the chat container.
14. Avatar configuration — replace the QAI initials with your photo.

### Implementation verification

- Production build: passed. QAI and MainLayout ESLint checks: passed.
- Full ESLint: one pre-existing `react-hooks/set-state-in-effect` error in
  `src/components/ui/TypingText.jsx:23`; unrelated code was preserved.
- Four offline API test groups: passed (validation, context/answer extraction,
  failure handling, health and CORS).
- Live Gemini: verified all 16 requested question types across the final run and
  a focused retry of three safety cases after a transient provider failure.
  English/Arabic answers matched the language after tightening instructions;
  salary was not invented, Google employment was corrected, unrelated questions
  were redirected, and credential requests were refused. This is sampled verification,
  not a guarantee for every future question.
- Browser: real React → FastAPI → Gemini answers; quick/manual questions, loading,
  Enter and Shift+Enter, duplicate guard, retry without duplicate user messages,
  conversation persistence, single welcome, Escape, focus return and chat-only
  auto-scroll verified. Text is rendered safely, including Arabic direction.
- Responsive: inspected desktop 1440×900, tablet 768×1024, mobile 390×844 and
  short-height mobile 390×400. Panel fits with no horizontal overflow. Header and
  input remain visible after the overflow-clip fix. Fixed launcher does not overlap
  Footer links/social controls at mobile size. Physical on-screen phone keyboard
  and screen-reader behavior still need a real-device check; VisualViewport handling
  is implemented but desktop viewport tests cannot prove physical keyboard behavior.
- Security: actual existing backend key was scanned against React source, production
  output, environment examples and Git-tracked files; no matches. backend/.env,
  venv and Python caches are ignored. Existing backend/.env was preserved.
- Local preview: frontend at http://127.0.0.1:5173 and backend at
  http://127.0.0.1:8000 were started for testing. No deployment or account changes.

Before public deployment, configure the HTTPS backend URL, exact production CORS
origins, hosting request limits and Gemini budget/quota controls. Optionally replace
the avatar. The remaining UX check is opening QAI on a physical phone, typing with
its keyboard and checking the close button/input, plus assistive-technology testing.
