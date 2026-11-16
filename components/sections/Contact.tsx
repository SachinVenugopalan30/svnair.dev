import { siteConfig as config } from "@/lib/config";
import CopyEmail from "@/components/CopyEmail";

const socials = [
  { name: "GitHub", href: config.socialMedia.github },
  { name: "LinkedIn", href: config.socialMedia.linkedin },
  { name: "Instagram", href: config.socialMedia.instagram },
  { name: "Steam", href: config.socialMedia.steam },
  { name: "Discord server", href: config.socialMedia.discord },
];

export default function Contact() {
  return (
    <>
      <section
        id="contact"
        aria-labelledby="contact-h"
        className="section pb-20 text-center"
      >
        <h2 id="contact-h" className="section-title mb-4">
          Say hello
        </h2>
        <p className="mx-auto mb-6 max-w-[40ch] text-xl">
          Roles, collaborations, a good hike recommendation, or a game to play.
        </p>
        {/* Spelled out so scrapers don't pick up the address from the HTML. */}
        <CopyEmail
          spelled={config.email.replace("@", " [at] ").replace(/\./g, " (dot) ")}
        />
        <ul className="mt-11 flex flex-wrap justify-center gap-x-7 gap-y-2">
          {socials.map(({ name, href }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-0.5 py-2.5 font-medium underline decoration-1 hover:text-accent-ink"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </section>
      <footer className="flex flex-wrap justify-between gap-4 px-(--gutter) py-8 text-sm text-text-muted">
        <span>&copy; {new Date().getFullYear()} Sachin Venugopalan Nair</span>
        <a href="#hero" className="hover:text-text">
          Back to top
        </a>
      </footer>
    </>
  );
}
