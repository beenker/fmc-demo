export default function AdvisorResultCard({ pkg, index, onSelect }) {
  return (
    <div
      className={`rounded-[2rem] bg-white border p-6 shadow-sm ${
        index === 0 ? "border-orange-400 shadow-lg" : "border-slate-200"
      }`}
    >
      <div className="h-44 rounded-2xl overflow-hidden bg-slate-100 mb-5">
        <img
          src={pkg.image}
          alt={pkg.phone}
          className="h-full w-full object-cover"
        />
      </div>

      {index === 0 && (
        <div className="inline-flex rounded-full bg-orange-500 text-white px-3 py-1 text-xs font-medium mb-4">
          Beste match voor jou
        </div>
      )}

      <h3 className="text-2xl font-bold">{pkg.name}</h3>
      <p className="text-slate-500 mt-2">{pkg.vibe}</p>

      <ul className="mt-5 space-y-2 text-sm text-slate-700">
        <li>📶 {pkg.internet}</li>
        <li>📺 {pkg.tv}</li>
        <li>📱 {pkg.phone}</li>
        <li>📦 {pkg.mobile}</li>
      </ul>

      <div className="mt-6">
        <div className="text-3xl font-bold">{pkg.priceNow}</div>
        <div className="text-sm line-through text-slate-400">
          {pkg.priceWas}
        </div>
        <div className="text-xs text-orange-600 mt-1">
          50% korting eerste 12 maanden
        </div>
      </div>

      <button
        onClick={onSelect}
        className="mt-6 w-full rounded-2xl bg-blue-900 text-white py-3 font-semibold"
      >
        Kies {pkg.name}
      </button>
    </div>
  );
}
