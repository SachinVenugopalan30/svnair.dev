import {
  ArrowUpRight,
  DiscordLogo,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  SteamLogo,
} from "@phosphor-icons/react/dist/ssr";
import { siteConfig as config } from "@/lib/config";
import CopyEmail from "@/components/CopyEmail";

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

        {/* Spelled out so scrapers don't pick up the address from the HTML. */}
        <CopyEmail
          spelled={config.email.replace("@", " at ").replace(/\./g, " dot ")}
        />

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
