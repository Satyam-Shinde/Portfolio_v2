import { useEffect, useState } from "react";
import { portfolioData as data } from "./data";

const navItems = [
  ["#top", "Home"],
  ["#spec", "About"],
  ["#projects", "Projects"],
  ["#experience", "Experience"],
  ["#contact", "Contact"],
];

function Label({ children }) {
  return <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-[var(--ink-dim)]">{children}</span>;
}

function Sheet({ id, tag, children, className = "" }) {
  return (
    <section id={id} className={`sheet relative my-7 border border-[var(--line-strong)] bg-[var(--bg-panel)]/90 px-5 py-10 sm:px-10 lg:px-14 ${className}`}>
      <span className="sheet-tag font-mono text-[0.7rem] uppercase tracking-[0.1em] text-[var(--accent)]">
        {tag}
      </span>
      {children}
    </section>
  );
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("print-style") || "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("print-style", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => current === "dark" ? "light" : "dark");

  return (
    <div className="min-h-screen text-[var(--ink)]">
      <header className="sticky top-0 z-20 border-b border-[var(--line-strong)] bg-[var(--bg)]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
          <span className="whitespace-nowrap font-mono text-xs text-[var(--ink-dim)]">Satyam Shinde

          </span>

          <nav aria-label="Sheet index" className="flex flex-wrap">
            {navItems.map(([href, label], index) => (
              <a
                key={href}
                href={href}
                className={`border-l border-[var(--line)] px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.06em] text-[var(--ink-dim)] transition hover:text-[var(--accent)] ${index === 0 ? "border-l-0" : ""}`}
              >
                {label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={toggleTheme}
            className="cursor-pointer rounded-[2px] border border-[var(--line-strong)] bg-transparent px-2.5 py-1.5 font-mono text-[0.7rem] text-[var(--ink-dim)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            aria-label="Toggle print style"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-[960px] px-5 sm:px-6">
        <Sheet tag="HOME" className="hero">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <Label>I am</Label>
              <h1 className="fade-up mt-[18px] mb-2.5 text-[clamp(2.6rem,7vw,4.6rem)] font-bold leading-[0.98] tracking-[-0.01em]">
                {data.profile.name.split(" ").map((part, index) => (
                  <span key={part} className="block">{part}</span>
                ))}
              </h1>
              <p className="fade-up max-w-[32ch] text-[clamp(1.05rem,2.4vw,1.3rem)] text-[var(--ink-dim)]">
                {data.profile.role}
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 border-t border-[var(--line)] pt-5 font-mono sm:grid-cols-2 lg:grid-cols-4">
            <Meta label="Location" value={data.profile.location} />
            <Meta label="Graduating" value={data.profile.graduating} />
            <Meta label="Focus" value={data.profile.focus} />
            <Meta label="Status" value={data.profile.status} />
          </div>
        </Sheet>

        <Sheet id="spec" tag="ABOUT">
          <h2 className="text-[clamp(1.4rem,3vw,1.8rem)] font-semibold">Profile</h2>
          {/* <p className="mb-7 mt-1.5 max-w-[60ch] text-[0.95rem] text-[var(--ink-dim)]">What this build is made of.</p> */}
          <p className="max-w-[64ch] text-base leading-[1.7]">{data.profile.summary}</p>

          <div className="h-9" />

          <h2 className="text-[clamp(1.4rem,3vw,1.8rem)] font-semibold">Skills</h2>
          <p className="mb-7 mt-1.5 max-w-[60ch] text-[0.95rem] text-[var(--ink-dim)]">Skills, grouped by where they're used.</p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="w-11 border-b border-[var(--line-strong)] pb-2.5 pr-3 text-left font-mono text-[0.68rem] font-medium uppercase tracking-[0.1em] text-[var(--ink-dim)]">Item</th>
                  <th className="w-[170px] border-b border-[var(--line-strong)] pb-2.5 pr-3 text-left font-mono text-[0.68rem] font-medium uppercase tracking-[0.1em] text-[var(--ink-dim)]">Category</th>
                  <th className="border-b border-[var(--line-strong)] pb-2.5 pr-3 text-left font-mono text-[0.68rem] font-medium uppercase tracking-[0.1em] text-[var(--ink-dim)]">Details</th>
                </tr>
              </thead>
              <tbody>
                {data.skills.map((skill) => (
                  <tr key={skill.item}>
                    <td className="border-b border-[var(--line)] py-3.5 pr-3 align-top font-mono text-[var(--accent)]">{skill.item}</td>
                    <td className="border-b border-[var(--line)] py-3.5 pr-3 align-top font-mono text-[0.82rem] text-[var(--ink-dim)]">{skill.category}</td>
                    <td className="border-b border-[var(--line)] py-3.5 pr-3 align-top text-[0.95rem]">{skill.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="h-9" />

          <h2 className="text-[clamp(1.4rem,3vw,1.8rem)] font-semibold">Education</h2>
          <p className="mb-0 mt-1.5 text-[0.95rem] text-[var(--ink-dim)]">
            {data.education.degree} — {data.education.period}
          </p>
          <p className="mt-0 max-w-[64ch] text-base leading-[1.7]">{data.education.university}. Coursework: {data.education.coursework}</p>
        </Sheet>

        <Sheet id="projects" tag="PROJECTS">
          <h2 className="text-[clamp(1.4rem,3vw,1.8rem)] font-semibold">Builds</h2>
          <p className="mb-7 mt-1.5 text-[0.95rem] text-[var(--ink-dim)]">Two systems taken from spec to working software.</p>

          <div className="mt-2 grid grid-cols-1 gap-[22px] md:grid-cols-2">
            {data.projects.map((project) => (
              <article key={project.title} className="border border-[var(--line)] p-[22px]">
                <div className="mb-1.5 flex items-baseline justify-between gap-2.5">
                  <h3 className="text-[1.08rem] font-semibold">{project.title}</h3>
                  <span className="whitespace-nowrap font-mono text-[0.72rem] text-[var(--ink-dim)]">{project.date}</span>
                </div>

                <div className="flex flex-wrap items-center font-mono text-[0.74rem]">
                  {project.stack.map((item, index) => (
                    <span key={item} className="flex items-center">
                      <span className="border border-[var(--line-strong)] px-2.5 py-1.5 text-[var(--ink)]">{item}</span>
                      {index < project.stack.length - 1 && <span className="px-1.5 text-[var(--accent)]">→</span>}
                    </span>
                  ))}
                </div>

                <ul className="mt-3 mb-[18px] list-disc pl-[18px] text-[0.92rem] leading-[1.6] text-[var(--ink-dim)]">
                  {project.points.map((point) => <li key={point} className="mb-1.5">{point}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </Sheet>

        <Sheet id="experience" tag="EXPERIENCE">
          <h2 className="text-[clamp(1.4rem,3vw,1.8rem)] font-semibold">Field notes</h2>
          <p className="mb-1.5 mt-1.5 text-[0.95rem] text-[var(--ink-dim)]">Training, contributions and practice outside coursework.</p>

          {data.experience.map((experience) => (
            <div key={`${experience.date}-${experience.title}`} className="grid grid-cols-1 gap-4 border-t border-[var(--line)] py-[18px] sm:grid-cols-[120px_1fr] sm:gap-[18px]">
              <div className="font-mono text-[0.78rem] text-[var(--accent)]">{experience.date}</div>
              <div>
                <h3 className="mb-1 text-[1.02rem] font-semibold">{experience.title}</h3>
                <div className="mb-2 text-[0.85rem] text-[var(--ink-dim)]">{experience.organization}</div>
                <p className="m-0 max-w-[60ch] text-[0.92rem] leading-[1.6] text-[var(--ink-dim)]">{experience.description}</p>
              </div>
            </div>
          ))}

          <ul className="mt-1.5 list-disc pl-[18px]">
            {data.notes.map((note) => <li key={note} className="mb-1 text-[0.92rem] leading-[1.7] text-[var(--ink-dim)]">{note}</li>)}
          </ul>
        </Sheet>

        <footer id="contact" className="my-7 mb-10">
          <Label>CONTACT</Label>
          <div className="mt-2 border border-[var(--line-strong)]">
            <div className="grid grid-cols-1 border-b border-[var(--line-strong)] sm:grid-cols-2 lg:grid-cols-4">
              <ContactCell label="Drawn by" value={data.profile.name} />
              <ContactCell label="Email" value={data.contact.email} href={`mailto:${data.contact.email}`} />
              <ContactCell label="Phone" value={data.contact.phone} />
              <ContactCell label="Location" value={data.contact.location} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <ContactCell label="GitHub" value="github.com/Satyam-Shinde" href={data.contact.github} />
              <ContactCell label="LinkedIn" value="linkedin.com/in/satyam-shinde" href={data.contact.linkedin} />
              <ContactCell label="Status" value={data.contact.status} />
              <ContactCell label="Rev" value={data.contact.revision} />
            </div>
          </div>
          <p className="mt-[22px] text-center font-mono text-[0.68rem] tracking-[0.04em] text-[var(--ink-dim)]">© 2026 Satyam Shinde </p>
        </footer>
      </main>
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <span className="block"><Label>{label}</Label></span>
      <span className="mt-1 block text-[0.92rem]">{value}</span>
    </div>
  );
}

function ContactCell({ label, value, href }) {
  return (
    <div className="border-b border-[var(--line-strong)] p-3.5 last:border-b-0 sm:border-l sm:first:border-l-0 lg:border-b-0 lg:border-l lg:first:border-l-0">
      <span className="mb-1 block font-mono text-[0.64rem] uppercase tracking-[0.1em] text-[var(--ink-dim)]">{label}</span>
      {href ? (
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="break-words border-b border-[var(--line-strong)] font-mono text-[0.85rem] text-[var(--ink)] no-underline hover:border-[var(--accent)] hover:text-[var(--accent)]">
          {value}
        </a>
      ) : (
        <span className="break-words font-mono text-[0.85rem]">{value}</span>
      )}
    </div>
  );
}

export default App;
