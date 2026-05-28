import Link from "next/link";
import { CONTACTO } from "../../_content/site";
import Wordmark from "./Wordmark";

export default function Footer() {
  return (
    <footer className="px-6 md:px-10 py-10 border-t border-sage/10 bg-cream">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Wordmark className="text-xl" />
          <span className="text-sm text-charcoal/70 ml-3">{CONTACTO.tagline}</span>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-charcoal/70">
          <a href={`mailto:${CONTACTO.email}`} className="hover:text-sage">
            {CONTACTO.email}
          </a>
          <Link href="/legal" className="hover:text-sage">
            Aviso legal y privacidad
          </Link>
          <span>© {new Date().getFullYear()} Lazo</span>
        </div>
      </div>
    </footer>
  );
}
