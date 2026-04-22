import { useNavigate } from "react-router-dom";
import { ADVISOR_PACKAGES, BUNDLES, IMAGES } from "../data/siteData";
import GiftCard from "../components/GiftCard";

const CONFIGURATOR_BUNDLE_MAP = {
  "essential-one": "smart-start",
  "complete-one": "everyday-plus",
  "ultimate-one": "creator-max",
};

function getConfiguratorBundle(bundleId) {
  const advisorId = CONFIGURATOR_BUNDLE_MAP[bundleId];
  return ADVISOR_PACKAGES.find((pkg) => pkg.id === advisorId) || ADVISOR_PACKAGES[0];
}

export default function Home() {
  const navigate = useNavigate();

  const handleBundleClick = (bundleId) => {
    const configuratorBundle = getConfiguratorBundle(bundleId);

    navigate("/configurator", {
      state: {
        bundleId: configuratorBundle.id,
        bundle: configuratorBundle,
      },
    });
  };

  return (
    <main>
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-16 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-medium mb-5">
              FMC bundles met maximaal voordeel
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Het beste van Vodafone en Ziggo, alleen als 2-jarig FMC pakket.
            </h1>
            <p className="mt-5 text-lg text-orange-100 max-w-xl">
              One biedt bewust alleen 2-jarig FMC aan. Daardoor kunnen we het
              grootste voordeel geven: topproducten, scherpe bundelprijzen en
              een keuze tussen 50% korting op je hele rekening in het eerste
              jaar of een sterk welkomstcadeau.
            </p>
          </div>

          <div className="bg-white text-slate-900 rounded-[2rem] p-6 shadow-xl border border-white/30">
            <div className="inline-flex rounded-full bg-blue-900 text-white px-3 py-1 text-xs font-medium mb-4">
              Hulp nodig?
            </div>
            <h3 className="text-2xl font-bold">Start de keuzehulp</h3>
            <p className="mt-3 text-slate-600 leading-7">
              Beantwoord een paar korte vragen en wij laten je direct 3
              pakketten zien die het beste bij je passen.
            </p>
            <button
              onClick={() => navigate("/keuzehulp")}
              className="mt-6 rounded-2xl bg-blue-900 text-white px-5 py-3 font-semibold w-full"
            >
              Start keuzehulp
            </button>
          </div>

          <div className="lg:col-span-2 mt-10 grid lg:grid-cols-3 gap-6">
            {BUNDLES.map((bundle) => (
              <div
                key={bundle.name}
                className={`rounded-[2rem] p-6 border bg-white text-slate-900 shadow-xl ${
                  bundle.highlight
                    ? "border-orange-200 ring-2 ring-white/40"
                    : "border-white/30"
                }`}
              >
                <div className="rounded-2xl bg-slate-100 mb-5 overflow-hidden">
                  <img
                    src={
                      bundle.highlight
                        ? IMAGES.complete
                        : bundle.name.toLowerCase().includes("essential")
                        ? IMAGES.essential
                        : IMAGES.ultimate
                    }
                    alt={bundle.name}
                    className="h-44 w-full object-cover"
                  />
                </div>
                {bundle.highlight && (
                  <div className="inline-flex rounded-full bg-orange-500 text-white px-3 py-1 text-xs font-medium mb-4">
                    Meest gekozen
                  </div>
                )}
                <h2 className="text-2xl font-bold">{bundle.name}</h2>
                <div className="text-slate-500 text-sm mt-1">
                  {bundle.subtitle}
                </div>
                <ul className="mt-5 space-y-2 text-sm text-slate-700">
                  <li>📶 {bundle.internet}</li>
                  <li>📺 {bundle.tv}</li>
                  <li>📱 {bundle.mobile}</li>
                  <li>📦 {bundle.device}</li>
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-orange-100 text-orange-700 px-3 py-1 text-xs font-medium">
                    2 jaar contract
                  </span>
                  <span className="rounded-full bg-slate-100 text-slate-600 px-3 py-1 text-xs font-medium">
                    50% korting of cadeau
                  </span>
                </div>
                <div className="mt-5 text-3xl font-bold">
                  {bundle.priceNow} p/m
                </div>
                <div className="text-sm line-through text-slate-400">
                  {bundle.priceWas} p/m
                </div>
                <button
                  onClick={() => handleBundleClick(bundle.id)}
                  className="mt-6 w-full rounded-2xl bg-slate-900 text-white px-5 py-3 font-semibold hover:bg-slate-800"
                >
                  Kies {bundle.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold">
              Kies jouw voordeel
            </h2>
            <p className="mt-4 text-slate-600 leading-7">
              Omdat FMC alleen als 2-jarig contract wordt aangeboden, kunnen we
              een stevig voordeel geven. Jij kiest wat het beste bij je past:
              50% korting op je hele rekening in het eerste jaar, een
              PlayStation 5 of een Nintendo Switch.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            <GiftCard
              image={IMAGES.discount}
              title="50% korting"
              value="12 maanden 50% korting op je hele rekening"
            />
            <GiftCard
              image={IMAGES.ps5}
              title="PlayStation 5"
              value="Welkomstcadeau · t.w.v. €549"
            />
            <GiftCard
              image={IMAGES.switch}
              title="Nintendo Switch"
              value="Welkomstcadeau · t.w.v. €329"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
