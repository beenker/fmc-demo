import { BUNDLE_IMAGE_MAP } from "../data/siteData";
import { PackageFeatureList } from "./BrandServiceRows";

export default function BundleCard({ bundle }) {
  return (
    <div
      className={`rounded-[2rem] p-6 border ${
        bundle.highlight ? 'border-orange-500 shadow-xl' : 'border-slate-200'
      } bg-white`}
    >
      <div className="h-40 rounded-2xl bg-slate-100 overflow-hidden mb-5">
        <img src={BUNDLE_IMAGE_MAP[bundle.name]} alt={bundle.device} className="h-full w-full object-cover" />
      </div>

      {bundle.highlight && (
        <div className="text-xs bg-orange-500 text-white px-3 py-1 rounded-full inline-block mb-4">
          Meest gekozen
        </div>
      )}

      <h3 className="text-xl font-bold">{bundle.name}</h3>
      <div className="text-slate-500 text-sm mb-4">{bundle.subtitle}</div>

      <PackageFeatureList
        internet={bundle.internet}
        tv={bundle.tv}
        mobile={bundle.mobile}
        device={bundle.device}
      />

      <div className="mt-6">
        <div className="text-3xl font-bold">{bundle.priceNow}</div>
        <div className="text-sm line-through text-slate-400">{bundle.priceWas}</div>
        <div className="text-xs text-orange-600 mt-1">50% korting eerste 12 maanden</div>
      </div>

      <button className="mt-6 w-full rounded-2xl bg-black text-white py-3 font-semibold">
        Kies dit pakket
      </button>
    </div>
  );
}