import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADVISOR_PACKAGES, DEVICE_VARIANTS, IMAGES } from '../data/siteData';

const CHARGER_PRICE = 29;
const GIFTS = [
  {
    id: 'discount',
    title: '50% korting',
    subtitle: '12 maanden 50% korting op je hele rekening',
    image: IMAGES.discount,
    type: 'discount',
  },
  {
    id: 'ps5',
    title: 'PlayStation 5',
    subtitle: 'Welkomstcadeau · t.w.v. €549',
    image: IMAGES.ps5,
    type: 'gift',
  },
  {
    id: 'switch',
    title: 'Nintendo Switch',
    subtitle: 'Welkomstcadeau · t.w.v. €329',
    image: IMAGES.switch,
    type: 'gift',
  },
];

function parsePrice(value) {
  if (typeof value === 'number') return value;
  return Number(String(value).replace('€', '').replace('.', '').replace(',', '.').trim());
}

function formatEuro(value) {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(value);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getLoanBounds(totalDeviceAmount) {
  const hardMin = 15;
  const hardMax = 40;
  const minMonthlyNeeded = totalDeviceAmount / 24;

  if (minMonthlyNeeded <= hardMin) {
    return {
      minMonthly: 0,
      maxMonthly: Math.min(hardMax, Math.ceil(totalDeviceAmount / 24)),
      defaultMonthly: 15,
    };
  }

  const roundedMin = Math.ceil(minMonthlyNeeded);
  return {
    minMonthly: roundedMin,
    maxMonthly: hardMax,
    defaultMonthly: roundedMin,
  };
}

function GiftCard({ gift, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`text-left rounded-[1.5rem] border p-4 bg-white shadow-sm transition-all ${
        selected ? 'border-orange-400 ring-2 ring-orange-200' : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="rounded-[1rem] overflow-hidden bg-slate-100 h-32 mb-4">
        <img src={gift.image} alt={gift.title} className="h-full w-full object-cover" />
      </div>
      <div className="font-bold text-lg">{gift.title}</div>
      <div className="text-sm text-slate-500 mt-1">{gift.subtitle}</div>
    </button>
  );
}

export default function Configurator() {
  const navigate = useNavigate();
  const location = useLocation();
  const bundleFromState = location.state?.bundle;
  const bundleId = location.state?.bundleId;

  const selectedBundle = useMemo(() => {
    if (bundleFromState) return bundleFromState;
    if (bundleId) {
      return ADVISOR_PACKAGES.find((pkg) => pkg.id === bundleId) || ADVISOR_PACKAGES[0];
    }
    return ADVISOR_PACKAGES[0];
  }, [bundleFromState, bundleId]);

  const variantKey = selectedBundle.deviceVariantKey || selectedBundle.phone;
  const deviceVariant = DEVICE_VARIANTS[variantKey];
  const isSimOnly = deviceVariant?.type === 'simonly' || selectedBundle.phoneBrand === 'SimOnly';

  const [selectedColor, setSelectedColor] = useState(deviceVariant?.defaultColor || '');
  const [selectedStorage, setSelectedStorage] = useState(deviceVariant?.defaultStorage || '');
  const [includeCharger, setIncludeCharger] = useState(false);
  const [selectedGift, setSelectedGift] = useState('discount');

  const selectedStorageOption = useMemo(() => {
    if (!deviceVariant?.storageOptions?.length) return null;
    return (
      deviceVariant.storageOptions.find((opt) => opt.size === selectedStorage) ||
      deviceVariant.storageOptions[0]
    );
  }, [deviceVariant, selectedStorage]);

  const baseMonthly = parsePrice(selectedBundle.priceNow);
  const deviceBasePrice = deviceVariant?.basePrice || 0;
  const deviceMonthlyDelta = selectedStorageOption?.monthlyDelta || 0;
  const deviceTotalAmount = deviceBasePrice + deviceMonthlyDelta * 24;
  const loanBounds = getLoanBounds(deviceTotalAmount);

  const [loanMonthly, setLoanMonthly] = useState(loanBounds.defaultMonthly);

  const effectiveLoanMonthly = isSimOnly
    ? 0
    : clamp(loanMonthly, loanBounds.minMonthly, loanBounds.maxMonthly);

  const devicePaidOverTerm = effectiveLoanMonthly * 24;
  const upfrontDevicePayment = isSimOnly ? 0 : Math.max(deviceTotalAmount - devicePaidOverTerm, 0);
  const oneTimePayment = upfrontDevicePayment + (includeCharger ? CHARGER_PRICE : 0);

  const discountAmount = selectedGift === 'discount' ? baseMonthly * 0.5 : 0;
  const monthlyTotal = Math.max(baseMonthly - discountAmount, 0) + effectiveLoanMonthly;

  const checkoutPayload = {
    bundleId: selectedBundle.id,
    color: selectedColor,
    storage: selectedStorage,
    includeCharger,
    selectedGift,
    loanMonthly: effectiveLoanMonthly,
    upfrontDevicePayment,
    monthlyTotal,
    oneTimePayment,
  };

  return (
    <main className="bg-slate-100 min-h-screen">
      <section className="max-w-[1280px] mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="rounded-[2rem] overflow-hidden border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 md:px-8 py-8 md:py-10">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-medium mb-4">
                /configurator
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                Maak jouw pakket helemaal af
              </h1>
              <p className="mt-4 text-orange-100 text-base md:text-lg leading-7">
                Je pakket is gekozen. Hier hoef je alleen nog je toestel, betaalvorm en voordeel te kiezen.
              </p>
            </div>
          </div>

          <div className="p-4 md:p-6 lg:p-8 grid xl:grid-cols-[1.1fr,0.9fr] gap-6 lg:gap-8 items-start">
            <div className="space-y-6">
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <div className="text-sm text-slate-500">Gekozen pakket</div>
                <div className="mt-2 flex flex-col md:flex-row gap-5 md:items-center">
                  <div className="rounded-[1rem] overflow-hidden bg-white w-full md:w-56 h-36 shrink-0">
                    <img src={selectedBundle.image} alt={selectedBundle.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedBundle.name}</h2>
                    <div className="text-slate-500 mt-1">{selectedBundle.vibe}</div>
                    <ul className="mt-4 space-y-1 text-sm text-slate-700">
                      <li>📶 {selectedBundle.internet}</li>
                      <li>📺 {selectedBundle.tv}</li>
                      <li>📱 {selectedBundle.mobile}</li>
                      <li>📦 {selectedBundle.phone}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {!isSimOnly && deviceVariant && (
                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-2xl font-bold">Configureer je telefoon</h3>
                  <p className="text-slate-500 mt-2 text-sm leading-6">
                    Kies je kleur, opslag en hoeveel je maandelijks wilt betalen voor je toestel.
                  </p>

                  {deviceVariant?.image && (
                    <div className="mt-6 rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
                      <div className="flex flex-col md:flex-row gap-4 md:items-center">
                        <div className="rounded-[1rem] overflow-hidden bg-white h-32 w-32 shrink-0 flex items-center justify-center border border-slate-200">
                          <img
                            src={deviceVariant.image}
                            alt={selectedBundle.phone}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-slate-500">Gekozen toestel</div>
                          <div className="text-xl font-bold mt-1">{selectedBundle.phone}</div>
                          <div className="text-sm text-slate-500 mt-1">
                            {selectedColor || deviceVariant.defaultColor} · {selectedStorage || deviceVariant.defaultStorage}
                          </div>
                          <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
                            <div className="rounded-xl bg-white border border-slate-200 p-3">
                              <div className="text-slate-500">Telefoonprijs</div>
                              <div className="text-lg font-bold mt-1">{formatEuro(deviceTotalAmount)}</div>
                              <div className="text-xs text-slate-400 mt-1">Basis toestelprijs incl. gekozen opslag</div>
                            </div>
                            <div className="rounded-xl bg-white border border-slate-200 p-3">
                              <div className="text-slate-500">Extra toestelkosten</div>
                              <div className="text-lg font-bold mt-1">
                                {selectedStorageOption?.monthlyDelta ? `+ ${formatEuro(selectedStorageOption.monthlyDelta)} p/m` : 'Inclusief'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {!!deviceVariant.colors.length && (
                    <div className="mt-6">
                      <div className="text-sm font-medium text-slate-700 mb-3">Kleur</div>
                      <div className="flex flex-wrap gap-3">
                        {deviceVariant.colors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            className={`rounded-full px-4 py-2 text-sm border ${
                              selectedColor === color
                                ? 'border-orange-400 bg-orange-50 text-orange-700'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {!!deviceVariant.storageOptions.length && (
                    <div className="mt-6">
                      <div className="text-sm font-medium text-slate-700 mb-3">Opslag</div>
                      <div className="grid md:grid-cols-3 gap-3">
                        {deviceVariant.storageOptions.map((option) => (
                          <button
                            key={option.size}
                            type="button"
                            onClick={() => setSelectedStorage(option.size)}
                            className={`rounded-[1rem] border p-4 text-left ${
                              selectedStorage === option.size
                                ? 'border-orange-400 bg-orange-50 ring-2 ring-orange-100'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <div className="font-semibold">{option.size}</div>
                            <div className="text-sm text-slate-500 mt-1">
                              {option.monthlyDelta === 0
                                ? 'Inclusief'
                                : `+ ${formatEuro(option.monthlyDelta)} p/m`}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 rounded-[1rem] bg-slate-50 border border-slate-200 p-5">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <div className="text-sm text-slate-500">Toestelbetaling per maand</div>
                        <div className="text-2xl font-bold mt-1">{formatEuro(effectiveLoanMonthly)}</div>
                        <div className="text-sm text-slate-500 mt-1">
                          Loopt 24 maanden · maximaal 40 euro per maand
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-500">Eenmalig bijbetalen</div>
                        <div className="text-2xl font-bold mt-1">{formatEuro(upfrontDevicePayment)}</div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <input
                        type="range"
                        min={loanBounds.minMonthly}
                        max={loanBounds.maxMonthly}
                        step={1}
                        value={effectiveLoanMonthly}
                        onChange={(e) => setLoanMonthly(Number(e.target.value))}
                        className="w-full"
                      />
                      <div className="mt-2 flex justify-between text-xs text-slate-500">
                        <span>{formatEuro(loanBounds.minMonthly)}</span>
                        <span>{formatEuro(loanBounds.maxMonthly)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[1rem] border border-slate-200 p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeCharger}
                        onChange={(e) => setIncludeCharger(e.target.checked)}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-semibold">Voeg een officiële merkoplader toe</div>
                        <div className="text-sm text-slate-500 mt-1">
                          Eenmalig {formatEuro(CHARGER_PRICE)}
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {isSimOnly && (
                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-2xl font-bold">Sim only gekozen</h3>
                  <p className="text-slate-500 mt-2 leading-6">
                    Je hebt geen toestel gekozen, dus je hoeft hier alleen nog je voordeel te kiezen. Daarna kun je direct door naar checkout.
                  </p>
                </div>
              )}

              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-2xl font-bold">Kies jouw voordeel</h3>
                <p className="text-slate-500 mt-2 text-sm leading-6">
                  Ga voor maximale korting of kies een welkomstcadeau.
                </p>

                <div className="mt-6 grid md:grid-cols-3 gap-4">
                  {GIFTS.map((gift) => (
                    <GiftCard
                      key={gift.id}
                      gift={gift}
                      selected={selectedGift === gift.id}
                      onSelect={() => setSelectedGift(gift.id)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="xl:sticky xl:top-24 space-y-4">
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <div className="text-sm text-slate-500">Prijs samenvatting</div>
                <h2 className="text-2xl font-bold mt-1">Jouw configuratie</h2>

                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-600">Pakket per maand</span>
                    <span className="font-medium">{formatEuro(baseMonthly)}</span>
                  </div>

                  {!isSimOnly && (
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-600">Toestelbetaling per maand</span>
                      <span className="font-medium">{formatEuro(effectiveLoanMonthly)}</span>
                    </div>
                  )}

                  {selectedGift === 'discount' && (
                    <div className="flex items-center justify-between gap-4 text-green-700">
                      <span>50% korting eerste 12 maanden</span>
                      <span className="font-medium">− {formatEuro(discountAmount)}</span>
                    </div>
                  )}

                  {includeCharger && (
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-600">Oplader eenmalig</span>
                      <span className="font-medium">{formatEuro(CHARGER_PRICE)}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200 space-y-4">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="text-sm text-slate-500">Per maand</div>
                      <div className="text-3xl font-bold">{formatEuro(monthlyTotal)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-500">Eenmalig</div>
                      <div className="text-3xl font-bold">{formatEuro(oneTimePayment)}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-[1rem] bg-white border border-slate-200 p-4 text-sm text-slate-600 leading-6">
                  <div><strong>Pakket:</strong> {selectedBundle.name}</div>
                  {!isSimOnly && <div><strong>Toestel:</strong> {selectedBundle.phone} · {selectedColor} · {selectedStorage}</div>}
                  <div><strong>Voordeel:</strong> {GIFTS.find((gift) => gift.id === selectedGift)?.title}</div>
                </div>

                <button
                  onClick={() => navigate('/checkout', { state: checkoutPayload })}
                  className="mt-6 w-full rounded-[1rem] bg-slate-900 text-white px-5 py-4 font-semibold hover:bg-slate-800"
                >
                  Door naar checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
