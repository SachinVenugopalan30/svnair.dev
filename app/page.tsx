export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="font-heading text-5xl text-text">Hello World</h1>
      <p className="font-body text-lg text-text-muted max-w-md text-center">
        Next.js scaffold is working. Design tokens and typography are active.
      </p>
      <div className="flex gap-4 items-center">
        <span className="bg-surface px-4 py-2 rounded-lg font-mono text-sm text-accent">
          font-mono
        </span>
        <span className="bg-accent text-bg px-4 py-2 rounded-lg font-body text-sm font-medium">
          Accent Button
        </span>
      </div>
    </main>
  );
}
