import { personal } from "@/data";
import {
  section,
  inner,
  sectionTag,
  sectionTitle,
  sectionDesc,
  links,
  link,
  linkLeft,
  linkIcon,
  linkLabel,
  linkValue,
  linkArrow,
  footer,
  footerLeft,
  footerRight,
} from "./Contact.css";

const contactLinks = [
  {
    icon: "✉",
    label: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    icon: "↗",
    label: "GitHub",
    value: personal.github.replace("https://", ""),
    href: personal.github,
  },
  {
    icon: "▤",
    label: "Portfolio PDF",
    value: "이력서 · 포트폴리오 (PDF)",
    href: personal.resume,
  },
];

export function Contact() {
  return (
    <section id="contact" className={section} aria-label="Contact">
      <div className={inner}>
        <span className={sectionTag}>05 — Contact</span>
        <h2 className={sectionTitle}>Get in Touch</h2>
        <p className={sectionDesc}>
          흥미로운 프로젝트나 협업 제안이 있다면 언제든지 연락주세요.
        </p>

        <nav className={links} aria-label="Contact links">
          {contactLinks.map((c) => {
            const newTab = !c.href.startsWith("mailto:");
            return (
            <a
              key={c.label}
              href={c.href}
              className={link}
              target={newTab ? "_blank" : undefined}
              rel={newTab ? "noopener noreferrer" : undefined}
            >
              <div className={linkLeft}>
                <span className={linkIcon} aria-hidden="true">
                  {c.icon}
                </span>
                <div>
                  <p className={linkLabel}>{c.label}</p>
                  <p className={linkValue}>{c.value}</p>
                </div>
              </div>
              <span className={linkArrow} aria-hidden="true">
                →
              </span>
            </a>
            );
          })}
        </nav>

        <footer className={footer}>
          <span className={footerLeft}>nayoung.dev</span>
          <span className={footerRight}>
            Built with React 19 · vanilla-extract · Turborepo
          </span>
        </footer>
      </div>
    </section>
  );
}
