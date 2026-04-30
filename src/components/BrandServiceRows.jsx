/** Merk- en producticonen via assets (geen inline SVG). */
import { BRAND_ASSETS } from "../data/siteData";

const lineIconClass = "h-5 w-5 shrink-0 object-contain";
const brandIconClass = "h-4 w-4 shrink-0 object-contain";

export function BrandMarkImg({ brand }) {
  if (brand === "ziggo") {
    return (
      <img
        src={BRAND_ASSETS.ziggoIcon}
        alt="Ziggo-product"
        className={brandIconClass}
        width={16}
        height={16}
      />
    );
  }
  return (
    <img
      src={BRAND_ASSETS.vodafoneIcon}
      alt="Vodafone-product"
      className={brandIconClass}
      width={16}
      height={16}
    />
  );
}

export function LineCategoryImg({ kind }) {
  const map = {
    internet: {
      src: BRAND_ASSETS.internetIcon,
      alt: "Ziggo-product: internetverbinding",
    },
    tv: {
      src: BRAND_ASSETS.tvIcon,
      alt: "Ziggo-product: tv",
    },
    mobile: {
      src: BRAND_ASSETS.mobileIcon,
      alt: "Vodafone-product: mobiel",
    },
    phone: {
      src: BRAND_ASSETS.phoneIcon,
      alt: "Vodafone-product: telefoon",
    },
    sim: {
      src: BRAND_ASSETS.simcardIcon,
      alt: "Vodafone-product: sim only",
    },
  };
  const m = map[kind];
  if (!m) return null;
  return <img src={m.src} alt={m.alt} className={lineIconClass} width={20} height={20} />;
}

export function SidebarOfferImg({ variant }) {
  const isDiscount = variant === "discount";
  return (
    <img
      src={isDiscount ? BRAND_ASSETS.discountIcon : BRAND_ASSETS.giftboxIcon}
      alt={isDiscount ? "Korting" : "Welkomstcadeau"}
      className="h-4 w-4 shrink-0 object-contain"
      width={16}
      height={16}
    />
  );
}

export function PackageFeatureList({
  internet,
  tv,
  mobile,
  device,
  showDevice = true,
  className = "",
}) {
  const phoneIsSim =
    typeof device === "string" && /sim\s*only|^sim$/i.test(device.trim());

  return (
    <ul className={`space-y-2.5 text-sm text-slate-700 ${className}`}>
      <li className="flex gap-2.5">
        <LineCategoryImg kind="internet" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5 gap-y-1">
            <BrandMarkImg brand="ziggo" />
            <span className="text-xs font-semibold text-slate-500">Internet</span>
          </div>
          <div className="mt-0.5">{internet}</div>
        </div>
      </li>
      <li className="flex gap-2.5">
        <LineCategoryImg kind="tv" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5 gap-y-1">
            <BrandMarkImg brand="ziggo" />
            <span className="text-xs font-semibold text-slate-500">TV</span>
          </div>
          <div className="mt-0.5">{tv}</div>
        </div>
      </li>
      <li className="flex gap-2.5">
        <LineCategoryImg kind="mobile" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5 gap-y-1">
            <BrandMarkImg brand="vodafone" />
            <span className="text-xs font-semibold text-slate-500">Mobiel</span>
          </div>
          <div className="mt-0.5">{mobile}</div>
        </div>
      </li>
      {showDevice && device != null && device !== "" && (
        <li className="flex gap-2.5">
          <LineCategoryImg kind={phoneIsSim ? "sim" : "phone"} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 gap-y-1">
              <BrandMarkImg brand="vodafone" />
              <span className="text-xs font-semibold text-slate-500">
                {phoneIsSim ? "Sim only" : "Telefoon"}
              </span>
            </div>
            <div className="mt-0.5">{device}</div>
          </div>
        </li>
      )}
    </ul>
  );
}

export function PartnerLogosBar({ variant = "hero", oneLogoSrc, oneLogoAlt = "One" }) {
  const isHero = variant === "hero";
  return (
    <div
      className={`flex flex-wrap items-center gap-4 md:gap-6 ${
        isHero ? "text-white" : "text-slate-800"
      }`}
    >
      <div
        className={`flex flex-wrap items-center gap-3 md:gap-4 rounded-2xl px-4 py-3 ${
          isHero ? "bg-white/10 ring-1 ring-white/25" : "bg-slate-100 ring-1 ring-slate-200"
        }`}
      >
        {oneLogoSrc ? (
          <img
            src={oneLogoSrc}
            alt={oneLogoAlt}
            className={`h-8 w-auto max-h-9 object-contain md:h-9 ${isHero ? "brightness-0 invert" : ""}`}
          />
        ) : null}
        {oneLogoSrc ? (
          <span className={isHero ? "text-white/40" : "text-slate-300"} aria-hidden>
            ·
          </span>
        ) : null}
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            isHero ? "text-white/80" : "text-slate-500"
          }`}
        >
          Campagne met
        </span>
        <span className={isHero ? "text-white/40" : "text-slate-300"} aria-hidden>
          ·
        </span>
        <img
          src={BRAND_ASSETS.vodafoneLogo}
          alt="Vodafone"
          className="h-7 w-auto max-w-[140px] object-contain object-left md:h-8 md:max-w-[160px]"
        />
        <span className={isHero ? "text-white/50" : "text-slate-400"} aria-hidden>
          +
        </span>
        <img
          src={BRAND_ASSETS.ziggoLogo}
          alt="Ziggo"
          className="h-6 w-auto max-w-[120px] object-contain object-left md:h-7 md:max-w-[140px]"
        />
      </div>
    </div>
  );
}
