import Link from "next/link";

export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Lazo, inicio"
      className={`font-display text-sage tracking-tighter2 ${className}`}
    >
      lazo<span className="text-terracotta">.</span>
    </Link>
  );
}
