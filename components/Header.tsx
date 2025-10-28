import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/images/aumentarcapital_logo.svg"
            alt={siteConfig.name}
            width={160}
            height={40}
            priority
          />
        </Link>

        <nav className="flex gap-6 font-medium text-gray-900">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
