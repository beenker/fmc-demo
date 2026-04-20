import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BUNDLES, IMAGES } from '../data/siteData';
import RouteCard from '../components/RouteCard';
import GiftCard from '../components/GiftCard';

export default function Home() {
  const navigate = useNavigate();
  const currentBundle = useMemo(
    () => BUNDLES.find((bundle) => bundle.highlight) ?? BUNDLES[1],
    []
  );

  return (
    <main>
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-medium mb-6">
              Premium bundles zonder gedoe
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Kies hoe jij wilt starten.
            </h1>
            <p className="mt-5 text-lg text-orange-100 max-w-xl">
              Wil je snel door naar onze meest gekozen pakketten? Of wil je liever dat we even met je meedenken via de keuzehulp? Beide routes brengen je snel bij een premium match.
            </p>

            <div className="mt-8 grid sm:grid-cols-3 gap-3 text-sm">
              <div className="rounded-2xl bg-white/10 px-4 py-3">50% korting eerste 12 maanden</div>
              <div className="rounded-2xl bg-white/10 px-4 py-3">Of kies PS5 / Switch</div>
              <div className="rounded-2xl bg-white/10 px-4 py-3">Later uitbreiden in de One app</div>
            </div>
          </div>

          <div className="bg-white text-slate-900 rounded-[2rem] p-6 shadow-2xl overflow-hidden">
            <div className="rounded-2xl bg-slate-100 mb-5 overflow-hidden">
              <img src={IMAGES.homeLiving} alt="Premium thuis en mobiel pakket" className="h-56 w-full object-cover" />
            </div>
            <div className="text-sm text-slate-500">Populairste keuze</div>
            <div className="mt-2 text-2xl font-bold">{currentBundle.name}</div>
            <div className="mt-2">{currentBundle.internet} + {currentBundle.tv} + {currentBundle.mobile}</div>
            <div className="mt-2 text-sm text-slate-600">Incl. iPhone 17 of Galaxy S</div>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="rounded-full bg-orange-100 text-orange-700 px-3 py-1">2 jaar contract</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">50% korting of cadeau</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">Meest gekozen</span>
            </div>
            <div className="mt-5 text-3xl font-bold">{currentBundle.priceNow} p/m</div>
            <div className="text-sm line-through text-slate-400">{currentBundle.priceWas} p/m</div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Twee makkelijke routes naar jouw pakket</h2>
          <p className="mt-4 text-slate-600 leading-7">
            We houden het graag simpel. Kies of je direct wilt shoppen tussen de meest gekozen bundles, of laat ons eerst even adviseren met een korte keuzehulp.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <RouteCard
            badge="Snelste route"
            badgeClassName="bg-orange-100 text-orange-700"
            title="Bekijk de meest gekozen pakketten"
            description="Ideaal als je snel wilt vergelijken en meteen de populairste One bundles wilt zien. Gewoon kiezen en door."
            tags={['Meest gekozen', 'Direct overzicht', 'Snelle keuze']}
            cta="Ga naar pakketten"
            onClick={() => navigate('/pakketten')}
            className="border-slate-200 bg-white"
          />

          <RouteCard
            badge="Persoonlijker"
            badgeClassName="bg-blue-900 text-white"
            title="Start de keuzehulp"
            description="Beantwoord een paar korte vragen en wij laten je drie pakketten zien die passen bij jouw huis, kijkgedrag en telefoonwensen."
            tags={['3 slimme matches', 'Speelse flow', 'Minder keuzestress']}
            cta="Start keuzehulp"
            onClick={() => navigate('/keuzehulp')}
            className="border-blue-200 bg-blue-50"
          />

          <RouteCard
            badge="Nieuw"
            badgeClassName="bg-orange-500 text-white"
            title="Gebruik de AI configurator"
            description="Vertel in je eigen woorden wat je zoekt. De assistant stelt een paar korte vragen en toont direct de beste pakketten in de chat."
            tags={['AI', 'Direct advies', 'In chat']}
            cta="Start AI assistant"
            onClick={() => navigate('/assistant')}
            className="border-orange-200 bg-orange-50"
          />
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Korting of cadeau? Jij kiest.</h2>
            <p className="mt-4 text-slate-600 leading-7">
              Standaard krijg je 50% korting op je bundle in de eerste 12 maanden. Wil je liever iets tastbaars? Dan ruil je die mega korting gewoon in voor een waanzinnig welkomstcadeau.
            </p>
            <button onClick={() => navigate('/pakketten')} className="mt-8 rounded-2xl bg-black text-white px-6 py-3 font-semibold">
              Bekijk alle bundles
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <GiftCard image={IMAGES.ps5} title="PlayStation 5" value="Welkomstcadeau · t.w.v. €549" />
            <GiftCard image={IMAGES.switch} title="Nintendo Switch" value="Welkomstcadeau · t.w.v. €329" />
          </div>
        </div>
      </section>
    </main>
  );
}