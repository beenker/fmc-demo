import { IMAGES } from "../data/siteData";
import { Link } from "react-router-dom";
import { PartnerLogosBar } from "./BrandServiceRows";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Link
          to="/"
          className="inline-flex min-w-0 max-w-full w-fit rounded-2xl outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-orange-400"
        >
          <PartnerLogosBar
            variant="header"
            oneLogoSrc={IMAGES.oneLogo}
            oneLogoAlt="One — campagne met Vodafone en Ziggo, naar startpagina"
          />
        </Link>

        <nav className="hidden md:flex flex-wrap items-center justify-end gap-6 text-sm text-slate-600 shrink-0">
          <Link to="/" className="hover:text-slate-900">
            Start
          </Link>
          <Link to="/keuzehulp" className="hover:text-slate-900">
            Keuzehulp
          </Link>
          <Link to="/keuzehulp-filter" className="hover:text-slate-900">
            Filter
          </Link>
          <Link to="/assistant" className="hover:text-slate-900">
            One-assistent
          </Link>
          <span className="rounded-full bg-orange-100 text-orange-700 px-3 py-1 font-medium">
            Altijd 2 jaar contract
          </span>
        </nav>
      </div>
    </header>
  );
}
