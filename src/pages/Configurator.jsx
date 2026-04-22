import { useMemo, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADVISOR_PACKAGES, CONFIGURATOR_OPTIONS, DEVICE_VARIANTS } from '../data/siteData';
import {
  buildPhoneOptions,
  clamp,
  findAddressScenario,
  formatEuro,
  getLoanBounds,
  parsePrice,
  resolveBundleId,
} from '../utils/configuratorUtils';

const {
  chargerPrice: CHARGER_PRICE,
  gifts: GIFTS,
  addressScenarios: ADDRESS_SCENARIOS,
  internetOptions: INTERNET_OPTIONS,
  tvOptions: TV_OPTIONS,
  mobileOptions: MOBILE_OPTIONS,
  deviceOrder: DEVICE_ORDER,
} = CONFIGURATOR_OPTIONS;

const PHONE_OPTIONS = buildPhoneOptions(DEVICE_ORDER, DEVICE_VARIANTS);

const CONFIGURATOR_BUNDLE_MAP = {
  'essential-one': 'smart-start',
  'complete-one': 'everyday-plus',
  'ultimate-one': 'creator-max',
};

function GiftCard({ gift, selected, onSelect, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={`text-left rounded-[1.5rem] border p-4 bg-white shadow-sm transition-all ${
        selected ? 'border-orange-400 ring-2 ring-orange-200' : 'border-slate-200 hover:border-slate-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className="rounded-[1rem] overflow-hidden bg-slate-100 h-32 mb-4">
        <img src={gift.image} alt={gift.title} className="h-full w-full object-cover" />
      </div>
      <div className="font-bold text-lg">{gift.title}</div>
      <div className="text-sm text-slate-500 mt-1">{gift.subtitle}</div>
    </button>
  );
}

function SelectionField({ label, value, price, options, onChange }) {
  return (
    <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="text-sm text-slate-500">{label}</div>
          <div className="text-lg font-bold mt-1">{value}</div>
        </div>
        <div className="text-sm font-semibold text-slate-700 whitespace-nowrap">
          {price > 0 ? `+ ${formatEuro(price)} p/m` : 'Inclusief'}
        </div>
      </div>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-orange-400"
        >
          {options.map((option) => (
            <option key={option.value || option.label} value={option.value || option.label}>
              {(option.label || option.value) + (option.price ? ` · + ${formatEuro(option.price)} p/m` : ' · Inclusief')}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function AddressStatusCard({ addressScenario, onChangeAddress }) {
  if (!addressScenario) return null;

  if (addressScenario.status === 'unsupported') {
    return (
      <div className="rounded-[1.5rem] border border-red-200 bg-red-50 p-5">
        <div className="text-sm font-semibold text-red-700">Adrescheck</div>
        <h3 className="text-2xl font-bold mt-2 text-slate-900">Nog geen Ziggo-deal op dit adres</h3>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          Voor <strong>{addressScenario.street} {addressScenario.houseNumber}, {addressScenario.postcode} {addressScenario.city}</strong> is deze deal in deze demo nog niet direct beschikbaar. Neem contact op met support om te kijken of we toch nog iets voor je kunnen betekenen zodat je deze fantastische deal niet misloopt.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="rounded-full bg-slate-900 text-white px-5 py-3 text-sm font-semibold">Chat met support</button>
          <button className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800">Bel support</button>
          <button type="button" onClick={onChangeAddress} className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800">Ander adres invoeren</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-[1.5rem] border p-5 ${addressScenario.status === 'limited' ? 'border-amber-200 bg-amber-50' : 'border-emerald-200 bg-emerald-50'}`}>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-slate-700">Servicecheck voltooid</div>
          <h3 className="text-2xl font-bold mt-2 text-slate-900">
            {addressScenario.street} {addressScenario.houseNumber}, {addressScenario.postcode} {addressScenario.city}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            {addressScenario.status === 'limited'
              ? `Goed nieuws: dit adres doet mee. In deze demo ondersteunen we hier internetsnelheden tot ${addressScenario.maxInternet} Mbit/s.`
              : 'Top: dit adres ondersteunt alle onderdelen van deze Ziggo-deal.'}
          </p>
        </div>
        <div className="rounded-[1rem] bg-white/70 border border-white px-4 py-3 min-w-[220px]">
          <div className="text-xs uppercase tracking-wide text-slate-500">Ondersteund op dit adres</div>
          <div className="mt-2 text-sm font-medium text-slate-800">Internet tot {addressScenario.maxInternet} Mbit/s</div>
          <div className="text-sm text-slate-600 mt-1">{addressScenario.supportedTv.length} tv-opties · {addressScenario.supportedMobile.length} mobiele bundels</div>
          <button type="button" onClick={onChangeAddress} className="mt-4 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800">
            Ander adres invoeren
          </button>
        </div>
      </div>
    </div>
  );
}

function AddressModal({ open, postcode, houseNumber, setPostcode, setHouseNumber, onSubmit, selectedScenario, error }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-[2rem] overflow-hidden bg-white shadow-2xl border border-slate-200">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 md:px-8 py-8 text-white">
          <div className="text-sm font-medium opacity-90">Beschikbaarheid checken</div>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Check eerst jouw adres</h2>
          <p className="mt-3 text-orange-50 leading-7 max-w-2xl">
            Vul een postcode en huisnummer in om te zien welke pakketten op jouw adres beschikbaar zijn. Voor de demo kun je deze voorbeeldadressen gebruiken.
          </p>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {ADDRESS_SCENARIOS.map((scenario) => (
              <button
                key={`${scenario.postcode}-${scenario.houseNumber}`}
                type="button"
                onClick={() => {
                  setPostcode(scenario.postcode);
                  setHouseNumber(scenario.houseNumber);
                }}
                className={`rounded-[1.25rem] border p-4 text-left transition-all ${
                  selectedScenario?.postcode === scenario.postcode && selectedScenario?.houseNumber === scenario.houseNumber
                    ? 'border-orange-400 bg-orange-50'
                    : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="text-sm font-semibold text-slate-900">{scenario.label}</div>
                <div className="text-sm text-slate-600 mt-2">{scenario.postcode} · {scenario.houseNumber}</div>
                <div className="text-xs text-slate-500 mt-2">{scenario.street}, {scenario.city}</div>
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <label className="block">
                <div className="text-sm font-medium text-slate-700 mb-2">Postcode</div>
                <input
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                  placeholder="Bijv. 1012AB"
                  className="w-full rounded-[1rem] border border-slate-200 px-4 py-3 outline-none focus:border-orange-400"
                />
              </label>
              <label className="block">
                <div className="text-sm font-medium text-slate-700 mb-2">Huisnummer</div>
                <input
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                  placeholder="Bijv. 10"
                  className="w-full rounded-[1rem] border border-slate-200 px-4 py-3 outline-none focus:border-orange-400"
                />
              </label>
            </div>

            {error && <div className="rounded-[1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

            <button type="submit" className="w-full rounded-[1rem] bg-slate-900 text-white px-5 py-4 font-semibold hover:bg-slate-800">
              Check mijn adres
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ConfiguratorContent({ selectedBundle }) {
  const navigate = useNavigate();

  const defaultInternetOption = useMemo(
    () => INTERNET_OPTIONS.find((option) => selectedBundle.internet === option.label) || INTERNET_OPTIONS[1],
    [selectedBundle]
  );
  const defaultTvOption = useMemo(
    () => TV_OPTIONS.find((option) => option.value === selectedBundle.tv) || TV_OPTIONS[0],
    [selectedBundle]
  );
  const defaultMobileOption = useMemo(
    () => MOBILE_OPTIONS.find((option) => option.value === selectedBundle.mobile) || MOBILE_OPTIONS[0],
    [selectedBundle]
  );
  const defaultPhoneOption = useMemo(() => {
    const found = PHONE_OPTIONS.find(
      (option) => option.value === selectedBundle.phone || option.variantKey === selectedBundle.deviceVariantKey
    );
    return found || PHONE_OPTIONS[0];
  }, [selectedBundle]);

  const [postcode, setPostcode] = useState('1012AB');
  const [houseNumber, setHouseNumber] = useState('10');
  const [addressScenario, setAddressScenario] = useState(null);
  const [addressError, setAddressError] = useState('');
  const [showAddressModal, setShowAddressModal] = useState(true);
  const [hasCustomizedPackage, setHasCustomizedPackage] = useState(false);

  const [selectedInternet, setSelectedInternet] = useState(defaultInternetOption.value || defaultInternetOption.label);
  const [selectedTv, setSelectedTv] = useState(defaultTvOption.value);
  const [selectedMobile, setSelectedMobile] = useState(defaultMobileOption.value);
  const [selectedPhone, setSelectedPhone] = useState(defaultPhoneOption.value);
  const [selectedColor, setSelectedColor] = useState(DEVICE_VARIANTS[defaultPhoneOption.variantKey]?.defaultColor || '');
  const [selectedStorage, setSelectedStorage] = useState(DEVICE_VARIANTS[defaultPhoneOption.variantKey]?.defaultStorage || '');
  const [includeCharger, setIncludeCharger] = useState(false);
  const [selectedGift, setSelectedGift] = useState('discount');
  const [requestedLoanMonthly, setRequestedLoanMonthly] = useState(0);

  const availableInternetOptions = useMemo(() => {
    if (!addressScenario || addressScenario.status === 'unsupported') return [];
    return INTERNET_OPTIONS.filter((option) => addressScenario.supportedInternet.includes(option.id));
  }, [addressScenario]);

  const availableTvOptions = useMemo(() => {
    if (!addressScenario || addressScenario.status === 'unsupported') return [];
    return TV_OPTIONS.filter((option) => addressScenario.supportedTv.includes(option.value));
  }, [addressScenario]);

  const availableMobileOptions = useMemo(() => {
    if (!addressScenario || addressScenario.status === 'unsupported') return [];
    return MOBILE_OPTIONS.filter((option) => addressScenario.supportedMobile.includes(option.value));
  }, [addressScenario]);

  const availablePhoneOptions = useMemo(() => {
    if (!addressScenario || addressScenario.status === 'unsupported') {
      return PHONE_OPTIONS.filter((option) => option.variantKey === 'Sim only');
    }
    return PHONE_OPTIONS.filter((option) => addressScenario.supportedPhones.includes(option.variantKey));
  }, [addressScenario]);

  const resolvedPhoneValue = useMemo(() => {
    if (!addressScenario || addressScenario.status === 'unsupported') return selectedPhone;
    const isAvailable = availablePhoneOptions.some((option) => option.value === selectedPhone);
    return isAvailable ? selectedPhone : availablePhoneOptions[0]?.value || selectedPhone;
  }, [addressScenario, availablePhoneOptions, selectedPhone]);

  const resolvedInternetValue = useMemo(() => {
    if (!addressScenario || addressScenario.status === 'unsupported') return selectedInternet;
    const isAvailable = availableInternetOptions.some((option) => option.label === selectedInternet || option.value === selectedInternet);
    return isAvailable ? selectedInternet : availableInternetOptions[0]?.value || availableInternetOptions[0]?.label || selectedInternet;
  }, [addressScenario, availableInternetOptions, selectedInternet]);

  const resolvedTvValue = useMemo(() => {
    if (!addressScenario || addressScenario.status === 'unsupported') return selectedTv;
    const isAvailable = availableTvOptions.some((option) => option.value === selectedTv);
    return isAvailable ? selectedTv : availableTvOptions[0]?.value || selectedTv;
  }, [addressScenario, availableTvOptions, selectedTv]);

  const resolvedMobileValue = useMemo(() => {
    if (!addressScenario || addressScenario.status === 'unsupported') return selectedMobile;
    const isAvailable = availableMobileOptions.some((option) => option.value === selectedMobile);
    return isAvailable ? selectedMobile : availableMobileOptions[0]?.value || selectedMobile;
  }, [addressScenario, availableMobileOptions, selectedMobile]);

  const selectedPhoneOption = useMemo(
    () => PHONE_OPTIONS.find((option) => option.value === resolvedPhoneValue) || defaultPhoneOption,
    [resolvedPhoneValue, defaultPhoneOption]
  );

  const internetOption = useMemo(
    () => INTERNET_OPTIONS.find((option) => option.value === resolvedInternetValue || option.label === resolvedInternetValue) || INTERNET_OPTIONS[1],
    [resolvedInternetValue]
  );
  const tvOption = useMemo(() => TV_OPTIONS.find((option) => option.value === resolvedTvValue) || TV_OPTIONS[0], [resolvedTvValue]);
  const mobileOption = useMemo(() => MOBILE_OPTIONS.find((option) => option.value === resolvedMobileValue) || MOBILE_OPTIONS[0], [resolvedMobileValue]);

  const deviceVariant = DEVICE_VARIANTS[selectedPhoneOption.variantKey];
  const isSimOnly = deviceVariant?.type === 'simonly' || selectedPhoneOption.variantKey === 'Sim only';

  const selectedStorageOption = useMemo(() => {
    if (!deviceVariant?.storageOptions?.length) return null;
    return deviceVariant.storageOptions.find((opt) => opt.size === selectedStorage) || deviceVariant.storageOptions[0];
  }, [deviceVariant, selectedStorage]);

  const baseBundlePrice = parsePrice(selectedBundle.priceNow);
  const bundleDefaultPrice = defaultInternetOption.price + defaultTvOption.price + defaultMobileOption.price;
  const customizedBundlePrice = internetOption.price + tvOption.price + mobileOption.price;
  const packageMonthly = Math.max(baseBundlePrice + (customizedBundlePrice - bundleDefaultPrice), 0);

  const deviceBasePrice = deviceVariant?.basePrice || 0;
  const deviceMonthlyDelta = selectedStorageOption?.monthlyDelta || 0;
  const deviceTotalAmount = deviceBasePrice + deviceMonthlyDelta * 24;
  const loanBounds = getLoanBounds(deviceTotalAmount || 360);
  const effectiveLoanMonthly = isSimOnly ? 0 : clamp(requestedLoanMonthly, loanBounds.minMonthly, loanBounds.maxMonthly);
  const upfrontDevicePayment = isSimOnly ? 0 : Math.max(deviceTotalAmount - effectiveLoanMonthly * 24, 0);
  const oneTimePayment = upfrontDevicePayment + (includeCharger ? CHARGER_PRICE : 0);

  const addressSupportsGifts = addressScenario?.status !== 'unsupported';
  const isGiftAllowed = useCallback((gift) => {
    if (!addressSupportsGifts) return gift.id === 'discount';
    if (gift.type === 'gift' && internetOption.id !== '1000' && internetOption.id !== '2000' && addressScenario?.status === 'limited') {
      return false;
    }
    return true;
  }, [addressSupportsGifts, internetOption.id, addressScenario]);

  const effectiveSelectedGift = useMemo(() => {
    const activeGift = GIFTS.find((gift) => gift.id === selectedGift);
    return activeGift && !isGiftAllowed(activeGift) ? 'discount' : selectedGift;
  }, [selectedGift, isGiftAllowed]);

  const discountAmount = effectiveSelectedGift === 'discount' ? packageMonthly * 0.5 : 0;
  const monthlyTotal = Math.max(packageMonthly - discountAmount, 0) + effectiveLoanMonthly;
  const packageName = hasCustomizedPackage ? 'Mijn pakket' : selectedBundle.name;

  const checkoutPayload = {
    bundleId: selectedBundle.id,
    packageName,
    postcode,
    houseNumber,
    addressScenario,
    internet: internetOption.label,
    tv: tvOption.value,
    mobile: mobileOption.value,
    phone: selectedPhoneOption.value,
    color: selectedColor,
    storage: selectedStorage,
    includeCharger,
    selectedGift: effectiveSelectedGift,
    loanMonthly: effectiveLoanMonthly,
    upfrontDevicePayment,
    monthlyTotal,
    oneTimePayment,
  };

  const handleAddressSubmit = (event) => {
    event.preventDefault();
    const result = findAddressScenario(ADDRESS_SCENARIOS, postcode, houseNumber);

    if (!result) {
      setAddressError('Gebruik in deze demo een van de drie voorbeeldadressen hierboven.');
      return;
    }

    const preferredInternet = INTERNET_OPTIONS.find(
      (option) => option.value === selectedInternet || option.label === selectedInternet
    );
    const preferredTv = TV_OPTIONS.find((option) => option.value === selectedTv);
    const preferredMobile = MOBILE_OPTIONS.find((option) => option.value === selectedMobile);
    const preferredPhone = PHONE_OPTIONS.find((option) => option.value === selectedPhone);

    const nextInternet = preferredInternet && result.supportedInternet.includes(preferredInternet.id)
      ? preferredInternet.value || preferredInternet.label
      : INTERNET_OPTIONS.find((option) => result.supportedInternet.includes(option.id))?.value || selectedInternet;

    const nextTv = preferredTv && result.supportedTv.includes(preferredTv.value)
      ? preferredTv.value
      : TV_OPTIONS.find((option) => result.supportedTv.includes(option.value))?.value || selectedTv;

    const nextMobile = preferredMobile && result.supportedMobile.includes(preferredMobile.value)
      ? preferredMobile.value
      : MOBILE_OPTIONS.find((option) => result.supportedMobile.includes(option.value))?.value || selectedMobile;

    const nextPhone = preferredPhone && result.supportedPhones.includes(preferredPhone.variantKey)
      ? preferredPhone.value
      : PHONE_OPTIONS.find((option) => result.supportedPhones.includes(option.variantKey))?.value || 'Sim only';

    setAddressScenario(result);
    setAddressError('');
    setShowAddressModal(false);
    setSelectedInternet(nextInternet);
    setSelectedTv(nextTv);
    setSelectedMobile(nextMobile);
    setSelectedPhone(nextPhone);
    setRequestedLoanMonthly(0);
    setSelectedGift('discount');
  };

  const handlePackageChange = (setter) => (value) => {
    setHasCustomizedPackage(true);
    setter(value);
  };

  const handlePhoneChange = (value) => {
    const nextOption = PHONE_OPTIONS.find((option) => option.value === value);
    const nextVariant = nextOption ? DEVICE_VARIANTS[nextOption.variantKey] : null;

    setHasCustomizedPackage(true);
    setSelectedPhone(value);
    setSelectedColor(nextVariant?.defaultColor || '');
    setSelectedStorage(nextVariant?.defaultStorage || '');
    setIncludeCharger(false);
    setRequestedLoanMonthly(0);
  };

  const handleStorageChange = (value) => {
    setSelectedStorage(value);
    setRequestedLoanMonthly(0);
  };

  return (
    <>
      <AddressModal
        open={showAddressModal}
        postcode={postcode}
        houseNumber={houseNumber}
        setPostcode={setPostcode}
        setHouseNumber={setHouseNumber}
        onSubmit={handleAddressSubmit}
        selectedScenario={findAddressScenario(ADDRESS_SCENARIOS, postcode, houseNumber)}
        error={addressError}
      />

      <main className="bg-slate-100 min-h-screen pb-36 xl:pb-0">
        <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-8 md:py-10">
          <div className="rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="rounded-t-[2rem] bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 md:px-8 py-8 md:py-10">
              <div className="max-w-3xl">
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">Stel jouw deal samen</h1>
                <p className="mt-4 text-orange-100 text-base md:text-lg leading-7">
                  Pas je pakket aan waar jij wilt. Het overzicht rechts rekent direct mee terwijl jij je ideale deal samenstelt.
                </p>
              </div>
            </div>

            <div className="p-4 md:p-6 lg:p-8 xl:grid xl:grid-cols-[minmax(0,1fr)_320px] 2xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-8 items-start">
              <div className="space-y-6">
                <AddressStatusCard
                  addressScenario={addressScenario}
                  onChangeAddress={() => {
                    setAddressError('');
                    setShowAddressModal(true);
                  }}
                />

                {addressScenario?.status !== 'unsupported' && (
                  <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-2xl font-bold">Maak het jouw pakket</h3>
                    <p className="text-slate-500 mt-2 text-sm leading-6">
                      Je start vanuit een slim voorgeselecteerd pakket, maar kunt elk onderdeel nog aanpassen met een visuele dropdown.
                    </p>

                    <div className="mt-6 grid md:grid-cols-2 gap-4">
                      <SelectionField label="Internet" value={internetOption.label} price={internetOption.price} options={availableInternetOptions} onChange={handlePackageChange(setSelectedInternet)} />
                      <SelectionField label="TV-pakket" value={tvOption.value} price={tvOption.price} options={availableTvOptions} onChange={handlePackageChange(setSelectedTv)} />
                      <SelectionField label="Mobiel abonnement" value={mobileOption.value} price={mobileOption.price} options={availableMobileOptions} onChange={handlePackageChange(setSelectedMobile)} />
                      <SelectionField label="Telefoon" value={selectedPhoneOption.value} price={0} options={availablePhoneOptions} onChange={handlePhoneChange} />
                    </div>
                  </div>
                )}

                {addressScenario?.status !== 'unsupported' && !isSimOnly && deviceVariant && (
                  <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-2xl font-bold">Configureer je telefoon</h3>
                    <p className="text-slate-500 mt-2 text-sm leading-6">
                      Kies je kleur, opslag en hoeveel je maandelijks wilt betalen voor je toestel.
                    </p>

                    {deviceVariant.image && (
                      <div className="mt-6 rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
                        <div className="flex flex-col md:flex-row gap-4 md:items-center">
                          <div className="rounded-[1rem] overflow-hidden bg-white h-32 w-32 shrink-0 flex items-center justify-center border border-slate-200">
                            <img src={deviceVariant.image} alt={selectedPhoneOption.value} className="h-full w-full object-contain" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-slate-500">Gekozen toestel</div>
                            <div className="text-xl font-bold mt-1">{selectedPhoneOption.value}</div>
                            <div className="text-sm text-slate-500 mt-1">{selectedColor || deviceVariant.defaultColor} · {selectedStorage || deviceVariant.defaultStorage}</div>
                            <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
                              <div className="rounded-xl bg-white border border-slate-200 p-3">
                                <div className="text-slate-500">Telefoonprijs</div>
                                <div className="text-lg font-bold mt-1">{formatEuro(deviceTotalAmount)}</div>
                                <div className="text-xs text-slate-400 mt-1">Basis toestelprijs incl. gekozen opslag</div>
                              </div>
                              <div className="rounded-xl bg-white border border-slate-200 p-3">
                                <div className="text-slate-500">Extra toestelkosten</div>
                                <div className="text-lg font-bold mt-1">{selectedStorageOption?.monthlyDelta ? `+ ${formatEuro(selectedStorageOption.monthlyDelta)} p/m` : 'Inclusief'}</div>
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
                              className={`rounded-full px-4 py-2 text-sm border ${selectedColor === color ? 'border-orange-400 bg-orange-50 text-orange-700' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'}`}
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
                              onClick={() => handleStorageChange(option.size)}
                              className={`rounded-[1rem] border p-4 text-left ${selectedStorage === option.size ? 'border-orange-400 bg-orange-50 ring-2 ring-orange-100' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                            >
                              <div className="font-semibold">{option.size}</div>
                              <div className="text-sm text-slate-500 mt-1">{option.monthlyDelta === 0 ? 'Inclusief' : `+ ${formatEuro(option.monthlyDelta)} p/m`}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-8 rounded-[1rem] bg-slate-50 border border-slate-200 p-5">
                      <div className="text-sm text-slate-500 mb-3">Toestelbetaling</div>

                      <input
                        type="range"
                        min={loanBounds.minMonthly}
                        max={loanBounds.maxMonthly}
                        step={1}
                        value={effectiveLoanMonthly}
                        onChange={(e) => setRequestedLoanMonthly(Number(e.target.value))}
                        className="w-full"
                      />

                      <div className="mt-2 flex justify-between text-xs text-slate-500">
                        <span>Volledig ineens</span>
                        <span>Max. spreiden</span>
                      </div>

                      <div className="mt-4 flex items-end justify-between text-sm">
                        <div>
                          <div className="text-slate-500">Eenmalig</div>
                          <div className="text-lg font-semibold">{formatEuro(upfrontDevicePayment)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-slate-500">Per maand</div>
                          <div className="text-lg font-semibold">{formatEuro(effectiveLoanMonthly)}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-[1rem] border border-slate-200 p-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" checked={includeCharger} onChange={(e) => setIncludeCharger(e.target.checked)} className="mt-1" />
                        <div>
                          <div className="font-semibold">Voeg een officiële merkoplader toe</div>
                          <div className="text-sm text-slate-500 mt-1">Eenmalig {formatEuro(CHARGER_PRICE)}</div>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {addressScenario?.status !== 'unsupported' && isSimOnly && (
                  <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-2xl font-bold">Sim only gekozen</h3>
                    <p className="text-slate-500 mt-2 leading-6">
                      Je hebt geen toestel gekozen, dus je hoeft hier alleen nog je voordeel te kiezen. Daarna kun je direct door naar checkout.
                    </p>
                  </div>
                )}

                {addressScenario?.status !== 'unsupported' && (
                  <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-2xl font-bold">Kies jouw voordeel</h3>
                    <p className="text-slate-500 mt-2 text-sm leading-6">Ga voor maximale korting of kies een welkomstcadeau.</p>

                    <div className="mt-6 grid md:grid-cols-3 gap-4">
                      {GIFTS.map((gift) => {
                        const disabled = !isGiftAllowed(gift);
                        return <GiftCard key={gift.id} gift={gift} disabled={disabled} selected={effectiveSelectedGift === gift.id} onSelect={() => !disabled && setSelectedGift(gift.id)} />;
                      })}
                    </div>
                    {addressScenario?.status === 'limited' && <p className="mt-4 text-sm text-amber-700">Op adressen met beperkte beschikbaarheid tonen we in deze demo alleen korting of gifts die passen bij de ondersteunde deal.</p>}
                  </div>
                )}
              </div>

              <aside className="hidden xl:block self-start">
                {addressScenario?.status !== 'unsupported' && (
                  <div className="xl:sticky xl:top-6 2xl:hidden">
                    <div className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 shadow-sm">
                      <div className="text-sm text-slate-500">Gekozen pakket</div>
                      <h2 className="text-xl font-bold mt-1">{packageName}</h2>

                      <div className="mt-4 space-y-3 text-sm">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-slate-600">Internet</span>
                          <span className="font-medium text-right">{internetOption.label}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-slate-600">TV</span>
                          <span className="font-medium text-right">{tvOption.value}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-slate-600">Mobiel</span>
                          <span className="font-medium text-right">{mobileOption.value}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-slate-600">Telefoon</span>
                          <span className="font-medium text-right">{selectedPhoneOption.value}</span>
                        </div>
                      </div>

                      <div className="mt-5 pt-5 border-t border-slate-200 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-slate-500">Per maand</div>
                          <div className="text-xl font-bold mt-1">{formatEuro(monthlyTotal)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-slate-500">Eenmalig</div>
                          <div className="text-xl font-bold mt-1">{formatEuro(oneTimePayment)}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate('/checkout', { state: checkoutPayload })}
                        disabled={addressScenario?.status === 'unsupported' || !addressScenario}
                        className="mt-5 w-full rounded-[1rem] bg-slate-900 text-white px-5 py-4 font-semibold hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed"
                      >
                        Door naar checkout
                      </button>
                    </div>
                  </div>
                )}
                <div className="h-px 2xl:hidden" />
              </aside>

              {addressScenario?.status !== 'unsupported' && (
                <div className="hidden 2xl:block fixed top-[361px] right-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))] w-[360px] max-h-[calc(100vh-8rem)] overflow-y-auto z-30 pr-1">
                  <div className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                    <div className="text-sm text-slate-500">Gekozen pakket</div>
                    <h2 className="text-2xl font-bold mt-1">{packageName}</h2>
                    <div className="rounded-[1rem] overflow-hidden bg-white w-full h-36 mt-4 shrink-0">
                      <img src={selectedBundle.image} alt={packageName} className="h-full w-full object-cover" />
                    </div>

                    <div className="mt-6 space-y-4 text-sm">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-600">Internet</span>
                        <span className="font-medium">{formatEuro(internetOption.price)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-600">TV-pakket</span>
                        <span className="font-medium">{tvOption.price > 0 ? formatEuro(tvOption.price) : 'Inclusief'}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-600">Mobiel abonnement</span>
                        <span className="font-medium">{formatEuro(mobileOption.price)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-600">Pakket per maand</span>
                        <span className="font-medium">{formatEuro(packageMonthly)}</span>
                      </div>

                      {!isSimOnly && (
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-slate-600">Toestelbetaling per maand</span>
                          <span className="font-medium">{formatEuro(effectiveLoanMonthly)}</span>
                        </div>
                      )}

                      {effectiveSelectedGift === 'discount' && (
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
                      <div><strong>🏠 Adres:</strong> {addressScenario ? `${addressScenario.street} ${addressScenario.houseNumber}, ${addressScenario.postcode}` : 'Nog niet ingevuld'}</div>
                      <div><strong>🧑‍💻 Pakket:</strong> {packageName}</div>
                      <div><strong>🛜 Internet:</strong> {internetOption.label}</div>
                      <div><strong>📺 TV:</strong> {tvOption.value}</div>
                      <div><strong>📶 Mobiel:</strong> {mobileOption.value}</div>
                      <div><strong>📱 Telefoon:</strong> {selectedPhoneOption.value}</div>
                      {!isSimOnly && <div><strong>📱 Toestel:</strong> {selectedColor} · {selectedStorage}</div>}
                      <div><strong>🎁 Voordeel:</strong> {GIFTS.find((gift) => gift.id === effectiveSelectedGift)?.title}</div>
                    </div>

                    <button
                      onClick={() => navigate('/checkout', { state: checkoutPayload })}
                      disabled={addressScenario?.status === 'unsupported' || !addressScenario}
                      className="mt-6 w-full rounded-[1rem] bg-slate-900 text-white px-5 py-4 font-semibold hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                      Door naar checkout
                    </button>
                  </div>
                </div>
              )}

              {addressScenario?.status !== 'unsupported' && (
                <div className="xl:hidden fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur shadow-[0_-8px_30px_rgba(15,23,42,0.08)]">
                  <div className="px-4 py-3 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs text-slate-500">{packageName}</div>
                      <div className="text-xl font-bold">
                        {formatEuro(monthlyTotal)}{' '}
                        <span className="text-sm font-medium text-slate-500">p/m</span>
                      </div>
                      <div className="text-xs text-slate-500">
                        Eenmalig {formatEuro(oneTimePayment)}
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/checkout', { state: checkoutPayload })}
                      disabled={addressScenario?.status === 'unsupported' || !addressScenario}
                      className="rounded-[1rem] bg-slate-900 text-white px-5 py-3 font-semibold disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default function Configurator() {
  const location = useLocation();
  const bundleFromState = location.state?.bundle;
  const bundleId = location.state?.bundleId;

  const selectedBundle = useMemo(() => {
    if (bundleId) {
      const resolvedBundleId = resolveBundleId(bundleId, CONFIGURATOR_BUNDLE_MAP);
      return ADVISOR_PACKAGES.find((pkg) => pkg.id === resolvedBundleId) || ADVISOR_PACKAGES[0];
    }

    if (bundleFromState?.id) {
      const resolvedBundleId = resolveBundleId(
        bundleFromState.id,
        CONFIGURATOR_BUNDLE_MAP
      );
      return (
        ADVISOR_PACKAGES.find((pkg) => pkg.id === resolvedBundleId) ||
        bundleFromState ||
        ADVISOR_PACKAGES[0]
      );
    }

    return ADVISOR_PACKAGES[0];
  }, [bundleFromState, bundleId]);

  return (
    <ConfiguratorContent
      key={`${location.key}-${selectedBundle.id}`}
      selectedBundle={selectedBundle}
    />
  );
}