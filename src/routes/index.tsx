import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowRight, ArrowUp, Cpu, Braces, Terminal, Coffee, Layers, Binary,
  Brain, Sparkles, Eye, Bot, Waves, CircuitBoard, Radio, Zap, Server,
  Github, Linkedin, Mail, Phone, MapPin, Download, ExternalLink,
  GraduationCap, Award, Trophy, Briefcase, Send, Menu, X,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const ROLES = [
  "Electronics Engineer",
  "AI/ML Developer",
  "Embedded Systems Enthusiast",
];

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = words[i % words.length];
    const speed = del ? 45 : 90;
    const timer = setTimeout(() => {
      const next = del ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1);
      setText(next);
      if (!del && next === current) setTimeout(() => setDel(true), 1400);
      else if (del && next === "") { setDel(false); setI((v) => v + 1); }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, del, i, words]);
  return text;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Portfolio() {
  useReveal();
  const role = useTypewriter(ROLES);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen text-foreground">
      <Nav open={open} setOpen={setOpen} active={active} />
      <Hero role={role} />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav({ open, setOpen, active }: { open: boolean; setOpen: (v: boolean) => void; active: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="group flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-primary to-primary/40 text-primary-foreground shadow-[0_0_20px_theme(colors.primary/40%)]">
            <span className="font-mono text-sm">S</span>
          </span>
          <span>Shivsai<span className="text-gradient">.dev</span></span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`}
              className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${active === n.id ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              {n.label}
              {active === n.id && <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />}
            </a>
          ))}
          <Button asChild size="sm" className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="#contact">Let's talk <ArrowRight className="ml-1 h-4 w-4" /></a>
          </Button>
        </nav>
        <button className="md:hidden rounded-md border border-border p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero({ role }: { role: string }) {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="absolute inset-0 -z-10">
        <img src={heroBg} alt="" aria-hidden width={1920} height={1080} className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 grid-bg opacity-70" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-mono text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for internships & collaborations
          </div>
          <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Engineering the intersection of{" "}
            <span className="text-gradient">AI, Hardware,</span>{" "}
            <span className="text-gradient">and Software.</span>
          </h1>
          <p className="mt-6 flex items-center gap-2 font-mono text-base text-muted-foreground sm:text-lg">
            <span className="text-primary">&gt;</span>
            <span className="text-foreground">{role}</span>
            <span className="animate-caret text-primary">▍</span>
          </p>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            I'm <span className="text-foreground font-semibold">Shivsai V Sadare</span> — building intelligent systems at the boundary of silicon and software, from VLSI testbenches to autonomous agents powered by modern LLMs.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-ring">
              <a href="#projects">View Work <ArrowRight className="ml-1.5 h-4 w-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border bg-transparent hover:bg-secondary">
              <a href="#contact">Contact Me</a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-muted-foreground hover:text-foreground">
              <a href="/resume.pdf" download>
                <Download className="mr-1.5 h-4 w-4" /> Resume
              </a>
            </Button>
          </div>

          <div className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              { k: "12+", v: "Technical Projects" },
              { k: "6+", v: "Certifications" },
              { k: "3", v: "Domains: AI · VLSI · IoT" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-2xl font-bold text-primary sm:text-3xl">{s.k}</div>
                <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="reveal mx-auto max-w-3xl text-center">
      <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">// {eyebrow}</div>
      <h2 className="font-display text-3xl font-bold sm:text-5xl">{title}</h2>
      {desc && <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">{desc}</p>}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="About" title="Where circuits meet cognition." />
        <div className="mt-16 grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="reveal lg:col-span-2">
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-primary/40 to-transparent blur-2xl opacity-60" />
              <div className="relative overflow-hidden rounded-2xl border border-border card-surface">
                <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
                  <span className="ml-3 font-mono text-xs text-muted-foreground">~ whoami.ts</span>
                </div>
                <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-muted-foreground">
<span className="text-primary">const</span> <span className="text-foreground">engineer</span> = {'{'}
  name: <span className="text-primary">'Shivsai V Sadare'</span>,
  role: <span className="text-primary">'ECE Student'</span>,
  focus: [
    <span className="text-primary">'Agentic AI'</span>,
    <span className="text-primary">'VLSI'</span>,
    <span className="text-primary">'Embedded Systems'</span>,
  ],
  stack: [<span className="text-primary">'Python'</span>, <span className="text-primary">'SystemVerilog'</span>,
          <span className="text-primary">'React'</span>, <span className="text-primary">'FastAPI'</span>],
  status: <span className="text-primary">'building'</span>,
{'}'};
                </pre>
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-xl border border-border card-surface px-4 py-3 font-mono text-xs shadow-xl animate-float">
                <div className="text-muted-foreground">status</div>
                <div className="text-primary">● engineering</div>
              </div>
            </div>
          </div>
          <div className="reveal lg:col-span-3">
            <h3 className="font-display text-2xl font-semibold sm:text-3xl">
              An Electronics & Communication Engineering student at <span className="text-gradient">BNM Institute of Technology</span>.
            </h3>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              I'm deeply passionate about building intelligent systems. My expertise spans hardware-level digital design, embedded systems, and cutting-edge software development powered by Agentic AI and Deep Learning.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              I thrive on solving complex problems — from optimizing signal processing to deploying automated industrial monitoring agents that make decisions in real time.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: CircuitBoard, title: "Hardware", body: "VLSI, Analog & Digital IC design, embedded firmware." },
                { icon: Brain, title: "AI Systems", body: "Agentic AI, ML/DL, computer vision pipelines." },
                { icon: Server, title: "Full-stack", body: "Python, FastAPI, React dashboards for real-time telemetry." },
                { icon: Radio, title: "IoT", body: "ESP-32, Raspberry Pi, sensor networks & signal processing." },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border border-border p-4 card-surface card-surface-hover">
                  <f.icon className="h-5 w-5 text-primary" />
                  <div className="mt-3 font-semibold">{f.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{f.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SKILL_GROUPS = [
  {
    title: "Programming Languages",
    icon: Terminal,
    items: [
      { name: "C", icon: Braces },
      { name: "Python", icon: Braces },
      { name: "Java", icon: Coffee },
      { name: "SystemVerilog", icon: Binary },
      { name: "DSA", icon: Layers },
    ],
  },
  {
    title: "AI & Technologies",
    icon: Brain,
    items: [
      { name: "Machine Learning", icon: Sparkles },
      { name: "Deep Learning", icon: Brain },
      { name: "Agentic AI", icon: Bot },
      { name: "Computer Vision", icon: Eye },
    ],
  },
  {
    title: "Hardware & Embedded",
    icon: Cpu,
    items: [
      { name: "IoT", icon: Waves },
      { name: "VLSI", icon: CircuitBoard },
      { name: "Analog IC Design", icon: Zap },
      { name: "Digital IC Design", icon: Binary },
      { name: "Arduino", icon: Cpu },
      { name: "ESP-32", icon: Radio },
      { name: "Raspberry Pi", icon: Server },
    ],
  },
  {
    title: "Tools & Web",
    icon: Github,
    items: [
      { name: "Git", icon: Github },
      { name: "GitHub", icon: Github },
      { name: "Cadence Virtuoso", icon: CircuitBoard },
      { name: "HTML / CSS", icon: Braces },
    ],
  },
];

function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Skills" title="A stack that spans silicon to software." desc="From transistor-level design in Cadence to deploying agentic AI in production dashboards." />
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {SKILL_GROUPS.map((g) => (
            <div key={g.title} className="reveal rounded-2xl border border-border p-6 card-surface card-surface-hover">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                  <g.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold">{g.title}</h3>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s.name}
                    className="group inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary/60 hover:bg-primary/10 hover:text-primary">
                    <s.icon className="h-3.5 w-3.5 text-primary" />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  {
    name: "Project Aegis",
    subtitle: "AI-Powered Predictive Maintenance System",
    desc: "Engineered an autonomous industrial monitoring agent using Python and Gemini 1.5 Flash to monitor live sensor telemetry for four machines simultaneously. Implemented confidence-gated diagnostic logic (>80% certainty) and shipped a real-time React / FastAPI ‘Mission Control’ dashboard for risk scores and remaining useful life (RUL).",
    tags: ["Python", "Gemini 1.5", "FastAPI", "React", "Agentic AI"],
    icon: Bot,
    featured: true,
  },
  {
    name: "Agentic AI for STEM Education",
    subtitle: "Personalized adaptive learning platform",
    desc: "Developed an AI-powered learning platform using Python. Intelligent agent-based systems adapt content delivery in real time based on student learning patterns, mastery, and pace.",
    tags: ["Python", "LLMs", "Agents", "EdTech"],
    icon: GraduationCap,
  },
  {
    name: "Climate Change Control via Satellite Imagery",
    subtitle: "Computer vision for geospatial anomalies",
    desc: "Built a computer vision system to analyze satellite imagery for environmental change detection. Processes large-scale geospatial data to surface climate-related anomalies and land-use shifts.",
    tags: ["Computer Vision", "Deep Learning", "Geospatial"],
    icon: Eye,
  },
  {
    name: "Audio Signal Compression using FSM",
    subtitle: "Hardware-friendly compression algorithm",
    desc: "Designed and implemented a Finite State Machine based compression algorithm for efficient audio data processing — optimizing signal retention while minimizing bandwidth.",
    tags: ["SystemVerilog", "FSM", "DSP", "VLSI"],
    icon: Waves,
  },
];

function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Projects" title="Selected work." desc="A snapshot of systems I've architected — from agentic AI dashboards to hardware description language design." />
        <div className="mt-16 grid gap-6 lg:grid-cols-6">
          {PROJECTS.map((p, i) => (
            <article key={p.name}
              className={`reveal group relative flex flex-col overflow-hidden rounded-2xl border border-border p-8 card-surface card-surface-hover ${p.featured ? "lg:col-span-6" : "lg:col-span-3"}`}>
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:opacity-100 opacity-0" />
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-primary/5 text-primary ring-1 ring-primary/30">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                    </div>
                    <h3 className="font-display text-xl font-semibold sm:text-2xl">{p.name}</h3>
                  </div>
                </div>
                <a href="https://github.com/Shivsai14" target="_blank" rel="noreferrer"
                  aria-label={`${p.name} source on GitHub`}
                  className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary">
                  <Github className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-2 text-sm text-primary/90">{p.subtitle}</div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">{p.desc}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-md border border-border bg-secondary/40 px-2.5 py-1 font-mono text-xs text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <a href="https://github.com/Shivsai14" target="_blank" rel="noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                View source <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const CERTS = [
  { title: "IBM Hackathon Finalist", issuer: "IBM", icon: Trophy },
  { title: "Semiconductor Fabrication Technologies", issuer: "Indian Institute of Science (IISc)", icon: Award },
  { title: "VLSI SOC Design using Verilog HDL", issuer: "Maven Silicon", icon: CircuitBoard },
  { title: "Analog IC Design", issuer: "Cadence", icon: Zap },
];

function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Experience & Credentials" title="Where I've been building." />
        <div className="mt-16 grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="reveal lg:col-span-2">
            <h3 className="mb-8 font-display text-xl font-semibold">Experience</h3>
            <ol className="relative border-l border-border pl-6">
              <li className="relative">
                <span className="absolute -left-[33px] top-1 grid h-6 w-6 place-items-center rounded-full border border-primary/40 bg-background text-primary">
                  <Briefcase className="h-3 w-3" />
                </span>
                <div className="rounded-xl border border-border p-6 card-surface">
                  <div className="font-mono text-xs text-primary">Internship</div>
                  <h4 className="mt-1 font-display text-lg font-semibold">SystemVerilog Intern</h4>
                  <div className="text-sm text-muted-foreground">Cranes Varsity</div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Hands-on experience in Hardware Description Language (HDL), digital design verification, and developing testbenches for digital circuits.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["SystemVerilog", "HDL", "Verification", "Testbenches"].map((t) => (
                      <span key={t} className="rounded-md border border-border bg-secondary/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              </li>
            </ol>
          </div>
          <div className="reveal lg:col-span-3">
            <h3 className="mb-8 font-display text-xl font-semibold">Certifications & Achievements</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {CERTS.map((c) => (
                <div key={c.title} className="group flex items-start gap-4 rounded-xl border border-border p-5 card-surface card-surface-hover">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold leading-tight">{c.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{c.issuer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Resume() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="reveal relative overflow-hidden rounded-3xl border border-border p-8 sm:p-14 card-surface">
          <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">// Resume</div>
              <h2 className="font-display text-3xl font-bold sm:text-4xl">Prefer the full story on paper?</h2>
              <p className="mt-3 text-muted-foreground">
                Download a print-ready PDF summarizing my projects, skills, certifications, and experience.
              </p>
            </div>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-ring">
              <a href="/Shivsai_Resume.pdf" download="Shivsai_Resume.pdf">
                <Download className="mr-2 h-4 w-4" /> Download Resume (PDF)
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [loading, setLoading] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(`Portfolio contact from ${data.get("name") ?? "Visitor"}`);
    const body = encodeURIComponent(`${data.get("message") ?? ""}\n\n— ${data.get("name") ?? ""} (${data.get("email") ?? ""})`);
    window.location.href = `mailto:sadareshivsaiv@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => { setLoading(false); toast.success("Opening your email client…"); form.reset(); }, 400);
  };
  return (
    <section id="contact" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Contact" title="Let's build something serious." desc="Have a project, internship, or research collaboration in mind? Drop a note — I read every message." />
        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          <div className="reveal lg:col-span-2">
            <div className="space-y-3">
              <ContactRow icon={Mail} label="Email" value="sadareshivsaiv@gmail.com" href="mailto:sadareshivsaiv@gmail.com" />
              <ContactRow icon={Phone} label="Phone" value="+91 78923 00900" href="tel:+917892300900" />
              <ContactRow icon={MapPin} label="Location" value="Bengaluru, India" />
            </div>
            <div className="mt-8">
              <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">// Elsewhere</div>
              <div className="flex gap-3">
                <SocialIcon href="https://www.linkedin.com/in/shivsai-v-sadare-1a35202ba" label="LinkedIn"><Linkedin className="h-5 w-5" /></SocialIcon>
                <SocialIcon href="https://github.com/Shivsai14" label="GitHub"><Github className="h-5 w-5" /></SocialIcon>
                <SocialIcon href="mailto:sadareshivsaiv@gmail.com" label="Email"><Mail className="h-5 w-5" /></SocialIcon>
              </div>
            </div>
          </div>
          <form onSubmit={onSubmit}
            className="reveal rounded-2xl border border-border p-6 sm:p-8 card-surface lg:col-span-3">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name">
                <Input name="name" required placeholder="Ada Lovelace"
                  className="border-border bg-background/60 focus-visible:ring-primary" />
              </Field>
              <Field label="Email address">
                <Input name="email" type="email" required placeholder="you@domain.com"
                  className="border-border bg-background/60 focus-visible:ring-primary" />
              </Field>
            </div>
            <div className="mt-5">
              <Field label="Message">
                <Textarea name="message" required rows={5} placeholder="Tell me about your project or opportunity…"
                  className="border-border bg-background/60 focus-visible:ring-primary" />
              </Field>
            </div>
            <Button type="submit" disabled={loading} size="lg"
              className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto">
              <Send className="mr-2 h-4 w-4" /> {loading ? "Sending…" : "Send message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function ContactRow({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-center gap-4 rounded-xl border border-border p-4 card-surface card-surface-hover">
      <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</div>
        <div className="text-sm font-medium sm:text-base">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} className="block">{inner}</a> : inner;
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-lg border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary">
      {children}
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="text-sm text-muted-foreground">© 2026 Shivsai V Sadare. All rights reserved.</div>
        <div className="flex items-center gap-4 text-sm">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="text-muted-foreground hover:text-primary">{n.label}</a>
          ))}
          <a href="#top" className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-muted-foreground hover:border-primary/60 hover:text-primary">
            Top <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
