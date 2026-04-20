import { IMAGES, BUNDLES } from '../data/siteData';
import { useNavigate } from 'react-router-dom';
import BundleCard from '../components/BundleCard';
import GiftCard from '../components/GiftCard';

export default function Pakketten() {
  const navigate = useNavigate();

  return (
    <main>
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Kies jouw One pakket
            </h1>
            <p className="mt-5 text-lg text-orange-100 max-w-xl">
              Alles zit er al in. Jij hoeft alleen te kiezen welk niveau bij je past. Daarna kies je alleen nog iPhone of Samsung, kleur, opslag en je maandbedrag.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById('alle-pakketten')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-2xl bg-white text-slate-900 px-6 py-3 font-semibold shadow-sm"
              >
                Laat de meest gekozen pakketten zien
              </button>
              <button
                onClick={() => navigate('/keuzehulp')}
                className="rounded-2xl border border-white/30 text-white px-6 py-3 font-semibold"
              >
                Of doe de keuzehulp
              </button>
            </div>
          </div>

          <div className="bg-white text-slate-900 rounded-[2rem] p-6 shadow-2xl overflow-hidden">
            <div className="rounded-2xl bg-slate-100 mb-5 overflow-hidden">
              <img src={IMAGES.heroPhone} alt="Premium smartphone keuze" className="h-48 w-full object-cover" />
            </div>
            <div className="text-sm text-slate-500">Populairst</div>
            <div className="mt-2 text-2xl font-bold">Complete One</div>
            <div className="mt-2">400 Mbit + TV Complete + 30GB</div>
            <div className="mt-2 text-sm text-slate-600">Incl. iPhone 17 of Galaxy S</div>
            <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
              <span className="rounded-full bg-orange-100 text-orange-700 px-3 py-1">2 jaar contract</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">50% korting of cadeau</span>
            </div>
            <div className="mt-4 text-3xl font-bold">€75 p/m</div>
            <div className="text-sm line-through text-slate-400">€150 p/m</div>
          </div>
        </div>
      </section>

      <section id="alle-pakketten" className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Kies jouw pakket</h2>
            <p className="text-slate-600">Alle bundles hebben standaard 2 jaar contract, premium devices en de laagst mogelijke drempel.</p>
          </div>
          <button onClick={() => navigate('/keuzehulp')} className="rounded-2xl bg-blue-900 text-white px-6 py-3 font-semibold">
            Doe de keuzehulp
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {BUNDLES.map((bundle) => <BundleCard key={bundle.name} bundle={bundle} />)}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Of kies een welkomstcadeau</h2>
          <p className="mt-4 text-slate-600">Ruil je korting in voor iets tastbaars.</p>

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <GiftCard image={IMAGES.ps5} title="PlayStation 5" value="t.w.v. €549" />
            <GiftCard image={IMAGES.switch} title="Nintendo Switch" value="t.w.v. €329" />
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold">Alles uitbreidbaar in de One app</h2>
          <p className="mt-4 text-slate-600">
            Voeg later eenvoudig extra’s toe zoals Disney+, Videoland of sportpakketten. Altijd met exclusieve kortingen.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16 text-center">
        <h2 className="text-3xl font-bold">Overstappen zonder stress</h2>
        <p className="mt-4 text-slate-600">Wij regelen je overstap. Inclusief opzeggen van je oude provider.</p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm">Tot €20 korting</div>
          <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm">Dubbele data</div>
          <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm">Later uitbreiden in de app</div>
        </div>
      </section>
    </main>
  );
}