import { BRAND_ASSETS } from "../data/siteData";

export default function GiftCard({ image, title, value, offerKind }) {
  const badge =
    offerKind === "discount"
      ? { src: BRAND_ASSETS.discountIcon, alt: "Korting" }
      : offerKind === "gift"
        ? { src: BRAND_ASSETS.giftboxIcon, alt: "Welkomstcadeau" }
        : null;

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200">
      <div className="h-40 rounded-2xl bg-slate-100 overflow-hidden mb-4">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>
      <div className="flex items-start gap-3">
        {badge ? (
          <img
            src={badge.src}
            alt=""
            className="mt-0.5 h-10 w-10 shrink-0 object-contain"
            width={40}
            height={40}
            aria-hidden
          />
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="font-bold text-lg leading-snug">{title}</div>
          <div className="text-sm text-slate-500 mt-1">{value}</div>
        </div>
      </div>
    </div>
  );
}
