export default function ResumePage() {
  return (
    <main className="fixed inset-0">
      <embed
        src="/resume.pdf"
        type="application/pdf"
        className="h-full w-full"
      />
    </main>
  );
}
