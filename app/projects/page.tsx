import Link from "next/link";

// Projects now live on the homepage. Static export can't send a 301,
// so this page forwards old links and bookmarks with a meta refresh.
export const metadata = {
  title: "Projects | Sachin Nair",
  robots: { index: false },
  alternates: { canonical: "/#projects" },
};

export default function ProjectsRedirect() {
  return (
    <main className="grid min-h-[100dvh] place-items-center px-4">
      <meta httpEquiv="refresh" content="0;url=/#projects" />
      <p className="text-sm text-text-muted">
        Projects moved to the{" "}
        <Link href="/#projects" className="text-accent-ink underline">
          homepage
        </Link>
        .
      </p>
    </main>
  );
}
