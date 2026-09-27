import {
  ArrowUpRight,
  DiscordLogo,
  EnvelopeSimple,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  SteamLogo,
} from "@phosphor-icons/react/dist/ssr";
import { siteConfig as config } from "@/lib/config";

const socials = [
  { name: "GitHub", href: config.socialMedia.github, Icon: GithubLogo },
  { name: "LinkedIn", href: config.socialMedia.linkedin, Icon: LinkedinLogo },
  {
    name: "Instagram",
    href: config.socialMedia.instagram,
    Icon: InstagramLogo,
  },
  { name: "Steam", href: config.socialMedia.steam, Icon: SteamLogo },
  { name: "Discord", href: config.socialMedia.discord, Icon: DiscordLogo },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl px-4 pt-24 pb-16 sm:px-6"
    >
      <div className="rounded-xl border border-line bg-surface/60 p-6 sm:p-10 md:p-14">
        <h2 className="text-3xl font-bold tracking-[-0.03em] text-text sm:text-5xl">
          Say hello.
        </h2>
        <p className="mt-4 max-w-[55ch] text-sm leading-relaxed text-text-muted sm:text-base">
          Have a project in mind, a role you think I&rsquo;d fit, or just want
          to talk shop? My inbox is open.
        </p>

        <a
          href={`mailto:${config.email}`}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-transform hover:-translate-y-px active:translate-y-0 active:scale-[0.98]"
        >
          <EnvelopeSimple size={16} weight="bold" aria-hidden />
          Email me
        </a>
        <p className="mt-3 text-xs break-all text-text-muted">{config.email}</p>

        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-8 sm:grid-cols-3 md:grid-cols-5">
          {socials.map(({ name, href, Icon }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text"
              >
                <Icon size={18} aria-hidden />
                {name}
                <ArrowUpRight
                  size={12}
                  weight="bold"
                  aria-hidden
                  className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="mt-16 flex flex-wrap justify-between gap-2 text-xs text-text-muted">
        <span>&copy; {new Date().getFullYear()} Sachin Nair</span>
        <a href="#hero" className="hover:text-text">
          Back to top
        </a>
      </footer>
    </section>
  );
}
