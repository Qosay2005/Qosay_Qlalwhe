import heroImage from "../assets/images/hero/qosay.jpg";
import TypingText from '../components/ui/TypingText'
import Reveal from '../components/animations/Reveal'
export const link_cv = "https://drive.google.com/drive/folders/1ACphv4jKhCu4Wn_TILVwoVtKjVmi67xG";
const buttonClass =
  "inline-flex min-h-12 items-center justify-center gap-3 rounded-md px-5 text-sm font-semibold transition-colors motion-reduce:transition-none";

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-16 xl:px-8 xl:py-16"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-10 xl:gap-16">
        <div className="min-w-0">
          <Reveal entrance delay={0.05} className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-3 font-mono text-[10px] tracking-wider text-text-secondary sm:text-xs">
            <span>FROM JENIN, PALESTINE</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-light/30 px-3 py-1.5 text-primary-dark">
              <span aria-hidden="true" className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary-action opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-primary-action" />
              </span>
              Available for hire
            </span>
          </Reveal>

          <Reveal as="p" entrance delay={0.05} className="mb-3 text-lg text-text-secondary">Hello, I&apos;m</Reveal>
          <Reveal as="h1" entrance delay={0.12}
            id="hero-heading"
            className="text-4xl leading-[1.1] font-bold tracking-tight text-text-primary sm:text-6xl lg:text-5xl xl:text-6xl"
          >
            Qosay Qlalwhe
          </Reveal>
          <Reveal as="p" entrance delay={0.19} className="mt-4 font-heading text-2xl leading-snug font-medium text-primary-action sm:text-3xl">
            <TypingText />
          </Reveal>
          
          <Reveal as="p" entrance delay={0.26} className="mt-6 max-w-lg text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
          Frontend Developer, Programming & Problem Solving Trainer, and Founder & CEO of Solver Academy. Passionate about building modern web applications and helping students develop practical programming skills.
          </Reveal>

          <Reveal entrance delay={0.33} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className={`${buttonClass} group bg-primary-action text-white hover:bg-primary-dark`}
            >
              Explore My Work
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
              ></span>
            </a>
            <a
              href={link_cv}
              target="_blank"
              rel="noopener noreferrer"
             // aria-label="Resume (opens in a new tab)"
              className={`${buttonClass} border border-border bg-white text-primary-dark hover:border-primary hover:bg-surface`}
            >
              Resume <span aria-hidden="true"></span>
            </a>
          </Reveal>
        </div>

        <Reveal entrance direction="right" delay={0.19} className="group relative isolate mx-auto w-full max-w-md px-3 py-4 lg:max-w-sm xl:max-w-md">
  {/* Background Shape */}
  <div
    aria-hidden="true"
    className="
      absolute inset-x-0 inset-y-6 -z-10
      rotate-3 rounded-[3rem_1rem_4rem_1rem]
      bg-primary-light/35
      transition-all duration-700 ease-out
      group-hover:-rotate-2
      group-hover:scale-[1.04]
      group-hover:bg-primary-light/50
      motion-reduce:transition-none
    "
  />

  {/* Image Container */}
  <div
    className="
      aspect-[4/5] overflow-hidden
      rounded-[2rem_0.75rem_3rem_0.75rem]
      border border-border bg-surface
      transition-all duration-500 ease-out
      group-hover:-translate-y-2
      group-hover:border-primary-light
      group-hover:shadow-[0_20px_50px_rgba(47,77,104,0.14)]
      motion-reduce:transform-none
      motion-reduce:transition-none
    "
  >
    {heroImage ? (
      <img
        src={heroImage}
        alt="Qosay Qlalwhe"
        fetchPriority="high"
        className="
          size-full object-cover object-top
          transition-transform duration-700 ease-out
          group-hover:scale-[1.035]
          motion-reduce:transform-none
          motion-reduce:transition-none
        "
      />
    ) : (
      <div
        role="img"
        aria-label="Portrait placeholder for Qosay Qlalwhe"
        className="flex size-full items-center justify-center"
      >
        <span className="font-mono text-xs tracking-widest text-text-secondary">
          PORTRAIT COMING SOON
        </span>
      </div>
    )}
  </div>
</Reveal>
      </div>
    </section>
  );
}
