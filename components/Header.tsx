import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/images/aumentarcapital_logo.svg"
            alt="Aumentar Capital"
            width={160}
            height={40}
            priority
          />
        </Link>

        <nav className="space-x-6 font-medium text-text">
          <Link href="/">Home</Link>
          <Link href="/artigos">Artigos</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/contacto">Contacto</Link>
        </nav>
      </div>
    </header>
  );
}
