import { PackageFeatureList } from "./BrandServiceRows";

export default function AdvisorMiniCard({ pkg, index }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500">Match nr. {index + 1}</div>
          <div className="font-bold text-lg mt-1">{pkg.name}</div>
          <div className="text-sm text-slate-500 mt-1">{pkg.vibe}</div>
        </div>
        <div className="text-right">
          <div className="font-bold text-xl">{pkg.priceNow}</div>
          <div className="text-xs line-through text-slate-400">{pkg.priceWas}</div>
        </div>
      </div>
      <PackageFeatureList
        className="mt-3 text-sm"
        internet={pkg.internet}
        tv={pkg.tv}
        mobile={pkg.mobile}
        device={pkg.phone}
      />
      <div className="mt-3 flex flex-wrap gap-2">
        {pkg.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-orange-100 text-orange-700 px-3 py-1 text-xs font-medium">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}