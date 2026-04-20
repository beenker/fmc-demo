import { IMAGES } from "../data/siteData";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3 text-left">
          <img
            src={IMAGES.oneLogo}
            alt="One logo"
            className="h-10 w-auto object-contain"
          />
          <div>
            <div className="font-semibold">One</div>
            <div className="text-sm text-slate-500">
              Het beste van Vodafone & Ziggo
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <Link to="/" className="hover:text-slate-900">
            Home
          </Link>
          <Link to="/keuzehulp" className="hover:text-slate-900">
            Keuzehulp
          </Link>
          <Link to="/assistant" className="hover:text-slate-900">
            AI Assistant
          </Link>
          <span className="rounded-full bg-orange-100 text-orange-700 px-3 py-1 font-medium">
            Altijd 2 jaar contract
          </span>
        </nav>
      </div>
    </header>
  );
}
