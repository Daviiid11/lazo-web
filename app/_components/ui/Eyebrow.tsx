export default function Eyebrow({ children }: { children: string }) {
  return (
    <p className="font-sans text-sm uppercase tracking-widest text-sage/90 inline-flex items-center gap-3">
      <span aria-hidden className="h-px w-8 bg-terracotta" />
      {children}
    </p>
  );
}
