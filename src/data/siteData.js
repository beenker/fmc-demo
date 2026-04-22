import keuzehulpImg from "../assets/fmc-setup.jpeg";
import keuzehulpImg2 from "../assets/fmc-setupcomplete.jpeg";
import packageEssential from "../assets/packageEssential.png";
import packageComplete from "../assets/packageComplete.png";
import packageUltimate from "../assets/packageUltimate.png";
import packageCreatorMax from "../assets/creator-max.png";
import packageEverydayPlus from "../assets/everyday-plus.png";
import packageSmartStart from "../assets/smart-start.png";
import packageAndroidEasy from "../assets/android-easy.png";
import packageAndroidComplete from "../assets/android-complete.png";
import packageAndroidUltra from "../assets/android-ultra.png";
import giftPS5 from "../assets/giftps5.png";
import giftSwitch from "../assets/giftswitch.png";
import giftDiscount from "../assets/giftdiscount.png";
import heroPhone from "../assets/heroPhone.png";
import logo from "../assets/One-Logo.png";

export const IMAGES = {
  oneLogo: logo,
  heroPhone,
  ps5: giftPS5,
  switch: giftSwitch,
  discount: giftDiscount,
  essential: packageEssential,
  complete: packageComplete,
  ultimate: packageUltimate,
  homeLiving: heroPhone,
  setup: keuzehulpImg,
  setupcomplete: keuzehulpImg2,
};

export const BUNDLES = [
  {
    id: "essential-one",
    name: "Essential One",
    subtitle: "Voor een frisse start",
    internet: "Wifi Start · 100 Mbit/s",
    tv: "TV Start",
    mobile: "3GB",
    device: "iPhone 17e / Galaxy A",
    priceNow: "€55",
    priceWas: "€110",
    highlight: false,
  },
  {
    id: "complete-one",
    name: "Complete One",
    subtitle: "Meest gekozen",
    internet: "Wifi Groot · 400 Mbit/s",
    tv: "TV Complete",
    mobile: "30GB",
    device: "iPhone 17 / Galaxy S",
    priceNow: "€75",
    priceWas: "€150",
    highlight: true,
  },
  {
    id: "ultimate-one",
    name: "Ultimate One",
    subtitle: "Alles erop en eraan",
    internet: "Wifi Extra Groot · 2 Gbit/s",
    tv: "TV Max",
    mobile: "Unlimited Plus",
    device: "iPhone 17 Pro / Galaxy Ultra",
    priceNow: "€95",
    priceWas: "€190",
    highlight: false,
  },
];

export const ADVISOR_PACKAGES = [
  {
    id: "smart-start",
    name: "Smart Start",
    vibe: "Lekker simpel en scherp gekozen",
    internet: "Internet 100 Mbit/s",
    tv: "TV Start",
    phoneBrand: "Apple",
    phone: "iPhone 17e",
    mobile: "3GB",
    priceNow: "€49,50",
    priceWas: "€99,00",
    tags: ["Licht gebruik", "Compact wonen", "Praktisch"],
    image: packageSmartStart,
    deviceVariantKey: "iPhone 17e",
  },
  {
    id: "everyday-plus",
    name: "Everyday Plus",
    vibe: "Voor dagelijks gemak zonder spijt achteraf",
    internet: "Internet 400 Mbit/s",
    tv: "TV Complete",
    phoneBrand: "Apple",
    phone: "iPhone 17",
    mobile: "30GB",
    priceNow: "€74,50",
    priceWas: "€149,00",
    tags: ["Gemiddeld gebruik", "Films & series", "Meest gekozen"],
    image: packageEverydayPlus,
    deviceVariantKey: "iPhone 17",
  },
  {
    id: "creator-max",
    name: "Creator Max",
    vibe: "Voor wie gewoon het beste wil",
    internet: "Internet 2 Gbit/s",
    tv: "TV Max",
    phoneBrand: "Apple",
    phone: "iPhone 17 Pro",
    mobile: "Unlimited Plus",
    priceNow: "€94,50",
    priceWas: "€189,00",
    tags: ["Beste camera", "Veel opslag", "Topmodel"],
    image: packageCreatorMax,
    deviceVariantKey: "iPhone 17 Pro",
  },
  {
    id: "android-easy",
    name: "Android Easy",
    vibe: "Slim gekozen zonder overkill",
    internet: "Internet 100 Mbit/s",
    tv: "TV Start",
    phoneBrand: "Android",
    phone: "Galaxy A",
    mobile: "5GB",
    priceNow: "€47,50",
    priceWas: "€95,00",
    tags: ["Licht gebruik", "Voordelig", "Android"],
    image: packageAndroidEasy,
    deviceVariantKey: "Galaxy A",
  },
  {
    id: "android-complete",
    name: "Android Complete",
    vibe: "De lekkere middenweg",
    internet: "Internet 400 Mbit/s",
    tv: "TV Complete",
    phoneBrand: "Android",
    phone: "Galaxy S",
    mobile: "30GB",
    priceNow: "€72,50",
    priceWas: "€145,00",
    tags: ["Gemiddeld gebruik", "Sport & series", "Android"],
    image: packageAndroidComplete,
    deviceVariantKey: "Galaxy S",
  },
  {
    id: "android-ultra",
    name: "Android Ultra",
    vibe: "Voor power users en mooie foto’s",
    internet: "Internet 1 Gbit/s",
    tv: "TV Max",
    phoneBrand: "Android",
    phone: "Galaxy Ultra",
    mobile: "Unlimited Plus",
    priceNow: "€89,50",
    priceWas: "€179,00",
    tags: ["Intensief gebruik", "Beste camera", "Android topmodel"],
    image: packageAndroidUltra,
    deviceVariantKey: "Galaxy Ultra",
  },
  {
    id: "pixel-plus",
    name: "Pixel Plus",
    vibe: "Voor pure Google fans",
    internet: "Internet 400 Mbit/s",
    tv: "TV Complete",
    phoneBrand: "Google",
    phone: "Google Pixel",
    mobile: "30GB",
    priceNow: "€72,50",
    priceWas: "€145,00",
    tags: ["Google", "Slimme software", "Camera"],
    image: packageAndroidComplete,
    deviceVariantKey: "Google Pixel",
  },
  {
    id: "fair-start",
    name: "Fair Start",
    vibe: "Duurzaam en bewust gekozen",
    internet: "Internet 100 Mbit/s",
    tv: "TV Start",
    phoneBrand: "Fairphone",
    phone: "Fairphone",
    mobile: "10GB",
    priceNow: "€54,50",
    priceWas: "€109,00",
    tags: ["Duurzaam", "Bewuste keuze", "Fairphone"],
    image: packageEssential,
    deviceVariantKey: "Fairphone",
  },
  {
    id: "sim-only-plus",
    name: "Sim Only Plus",
    vibe: "Alleen mobiel, wel premium",
    internet: "Zelf te kiezen",
    tv: "Niet inbegrepen",
    phoneBrand: "SimOnly",
    phone: "Sim only",
    mobile: "Unlimited Plus",
    priceNow: "€29,50",
    priceWas: "€59,00",
    tags: ["Sim only", "Flexibel", "Unlimited"],
    image: heroPhone,
    deviceVariantKey: "Sim only",
  },
];

export const DEVICE_VARIANTS = {
  "iPhone 17e": {
    basePrice: 360,
    defaultStorage: "128GB",
    defaultColor: "Black",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80",
    colors: ["Black", "White", "Blue"],
    storageOptions: [
      { size: "128GB", monthlyDelta: 0 },
      { size: "256GB", monthlyDelta: 6 },
      { size: "512GB", monthlyDelta: 12 },
    ],
  },
  "iPhone 17": {
    basePrice: 600,
    defaultStorage: "128GB",
    defaultColor: "Blue",
    image: "https://images.unsplash.com/photo-1603898037225-5f8dbe0f5d06?auto=format&fit=crop&w=900&q=80",
    colors: ["Blue", "Black", "Silver", "Pink"],
    storageOptions: [
      { size: "128GB", monthlyDelta: 0 },
      { size: "256GB", monthlyDelta: 7 },
      { size: "512GB", monthlyDelta: 14 },
    ],
  },
  "iPhone 17 Pro": {
    basePrice: 960,
    defaultStorage: "256GB",
    defaultColor: "Titanium Black",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=80",
    colors: ["Titanium Black", "Titanium Natural", "Titanium Blue"],
    storageOptions: [
      { size: "256GB", monthlyDelta: 0 },
      { size: "512GB", monthlyDelta: 10 },
      { size: "1TB", monthlyDelta: 20 },
    ],
  },
  "Galaxy A": {
    basePrice: 240,
    defaultStorage: "128GB",
    defaultColor: "Black",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80",
    colors: ["Black", "Mint", "Silver"],
    storageOptions: [
      { size: "128GB", monthlyDelta: 0 },
      { size: "256GB", monthlyDelta: 4 },
    ],
  },
  "Galaxy S": {
    basePrice: 540,
    defaultStorage: "128GB",
    defaultColor: "Blue",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80",
    colors: ["Blue", "Black", "Cream"],
    storageOptions: [
      { size: "128GB", monthlyDelta: 0 },
      { size: "256GB", monthlyDelta: 6 },
      { size: "512GB", monthlyDelta: 12 },
    ],
  },
  "Galaxy Ultra": {
    basePrice: 840,
    defaultStorage: "256GB",
    defaultColor: "Titanium Gray",
    image: "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?auto=format&fit=crop&w=900&q=80",
    colors: ["Titanium Gray", "Titanium Black", "Titanium Violet"],
    storageOptions: [
      { size: "256GB", monthlyDelta: 0 },
      { size: "512GB", monthlyDelta: 9 },
      { size: "1TB", monthlyDelta: 18 },
    ],
  },
  "Google Pixel": {
    basePrice: 540,
    defaultStorage: "128GB",
    defaultColor: "Obsidian",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
    colors: ["Obsidian", "Porcelain", "Bay"],
    storageOptions: [
      { size: "128GB", monthlyDelta: 0 },
      { size: "256GB", monthlyDelta: 6 },
      { size: "512GB", monthlyDelta: 12 },
    ],
  },
  Fairphone: {
    basePrice: 300,
    defaultStorage: "128GB",
    defaultColor: "Black",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80",
    colors: ["Black", "Green"],
    storageOptions: [
      { size: "128GB", monthlyDelta: 0 },
      { size: "256GB", monthlyDelta: 5 },
    ],
  },
  "Sim only": {
    basePrice: 0,
    defaultStorage: null,
    defaultColor: null,
    image: "https://images.unsplash.com/photo-1510557880182-3a9354c2aaf9?auto=format&fit=crop&w=900&q=80",
    colors: [],
    storageOptions: [],
    type: "simonly",
  },
};

export const CONFIGURATOR_OPTIONS = {
  chargerPrice: 29,
  deviceOrder: [
    "iPhone 17e",
    "iPhone 17",
    "iPhone 17 Pro",
    "Galaxy A",
    "Galaxy S",
    "Galaxy Ultra",
    "Google Pixel",
    "Fairphone",
    "Sim only",
  ],
  gifts: [
    {
      id: "discount",
      title: "50% korting",
      subtitle: "12 maanden 50% korting op je hele rekening",
      image: giftDiscount,
      type: "discount",
    },
    {
      id: "ps5",
      title: "PlayStation 5",
      subtitle: "Welkomstcadeau · t.w.v. €549",
      image: giftPS5,
      type: "gift",
    },
    {
      id: "switch",
      title: "Nintendo Switch",
      subtitle: "Welkomstcadeau · t.w.v. €329",
      image: giftSwitch,
      type: "gift",
    },
  ],
  internetOptions: [
    { id: "100", label: "Internet 100 Mbit/s", value: "Internet 100 Mbit/s", price: 39.5 },
    { id: "400", label: "Internet 400 Mbit/s", value: "Internet 400 Mbit/s", price: 52.5 },
    { id: "1000", label: "Internet 1 Gbit/s", value: "Internet 1 Gbit/s", price: 67.5 },
    { id: "2000", label: "Internet 2 Gbit/s", value: "Internet 2 Gbit/s", price: 79.5 },
  ],
  tvOptions: [
    { id: "tv-start", label: "TV Start", value: "TV Start", price: 0 },
    { id: "tv-complete", label: "TV Complete", value: "TV Complete", price: 12.5 },
    { id: "tv-max", label: "TV Max", value: "TV Max", price: 22.5 },
    { id: "tv-none", label: "Niet inbegrepen", value: "Niet inbegrepen", price: 0 },
  ],
  mobileOptions: [
    { id: "mobile-3gb", label: "3GB", value: "3GB", price: 10 },
    { id: "mobile-5gb", label: "5GB", value: "5GB", price: 12.5 },
    { id: "mobile-10gb", label: "10GB", value: "10GB", price: 15 },
    { id: "mobile-30gb", label: "30GB", value: "30GB", price: 20 },
    { id: "mobile-unlimited-plus", label: "Unlimited Plus", value: "Unlimited Plus", price: 27.5 },
  ],
  addressScenarios: [
    {
      postcode: "1012AB",
      houseNumber: "10",
      city: "Amsterdam",
      street: "Damrak",
      label: "Volledig beschikbaar",
      status: "full",
      maxInternet: 2000,
      supportedInternet: ["100", "400", "1000", "2000"],
      supportedTv: ["TV Start", "TV Complete", "TV Max"],
      supportedMobile: ["3GB", "5GB", "10GB", "30GB", "Unlimited Plus"],
      supportedPhones: ["iPhone 17e", "iPhone 17", "iPhone 17 Pro", "Galaxy A", "Galaxy S", "Galaxy Ultra", "Google Pixel", "Fairphone", "Sim only"],
    },
    {
      postcode: "9461AA",
      houseNumber: "25",
      city: "Gieten",
      street: "Stationsstraat",
      label: "Buiten Ziggo-gebied",
      status: "unsupported",
      maxInternet: 0,
      supportedInternet: [],
      supportedTv: [],
      supportedMobile: ["Unlimited Plus"],
      supportedPhones: ["Sim only"],
    },
    {
      postcode: "3011CA",
      houseNumber: "18",
      city: "Rotterdam",
      street: "Blaak",
      label: "Beperkt beschikbaar",
      status: "limited",
      maxInternet: 400,
      supportedInternet: ["100", "400"],
      supportedTv: ["TV Start", "TV Complete"],
      supportedMobile: ["3GB", "5GB", "10GB", "30GB"],
      supportedPhones: ["iPhone 17e", "iPhone 17", "Galaxy A", "Galaxy S", "Google Pixel", "Fairphone", "Sim only"],
    },
  ],
};

export const INITIAL_ANSWERS = {
  homeSize: "",
  internetUse: "",
  tvInterests: [],
  replay: "",
  phoneType: "",
  phoneNeed: [],
};

export const BUNDLE_IMAGE_MAP = {
  "Essential One": IMAGES.essential,
  "Complete One": IMAGES.complete,
  "Ultimate One": IMAGES.ultimate,
};

export function scoreAdvisorPackage(pkg, answers) {
  let score = 0;

  if (answers.phoneType && pkg.phoneBrand === answers.phoneType) score += 4;

  if (answers.internetUse === "licht" && pkg.internet.includes("100")) score += 3;
  if (
    answers.internetUse === "gemiddeld" &&
    (pkg.internet.includes("400") || pkg.internet.includes("1 Gbit"))
  )
    score += 3;
  if (
    answers.internetUse === "intensief" &&
    (pkg.internet.includes("1 Gbit") || pkg.internet.includes("2 Gbit"))
  )
    score += 4;

  if (answers.homeSize === "klein" && pkg.internet.includes("100")) score += 2;
  if (
    answers.homeSize === "middel" &&
    (pkg.internet.includes("400") || pkg.internet.includes("1 Gbit"))
  )
    score += 2;
  if (
    answers.homeSize === "groot" &&
    (pkg.internet.includes("1 Gbit") || pkg.internet.includes("2 Gbit"))
  )
    score += 3;

  if (answers.tvInterests.includes("films") && (pkg.tv.includes("Complete") || pkg.tv.includes("Max"))) score += 2;
  if (answers.tvInterests.includes("sport") && pkg.tv.includes("Max")) score += 2;
  if (answers.tvInterests.includes("kids") && (pkg.tv.includes("Complete") || pkg.tv.includes("Max"))) score += 1;
  if (answers.tvInterests.includes("standaard") && pkg.tv.includes("Start")) score += 1;

  if (answers.replay === "ja" && (pkg.tv.includes("Complete") || pkg.tv.includes("Max"))) score += 2;
  if (answers.replay === "nee" && pkg.tv.includes("Start")) score += 1;

  if (answers.phoneNeed.includes("goedkoop") && (pkg.phone.includes("17e") || pkg.phone.includes("Galaxy A"))) score += 3;
  if (answers.phoneNeed.includes("camera") && (pkg.phone.includes("Pro") || pkg.phone.includes("Ultra") || pkg.phone.includes("Pixel"))) score += 3;
  if (answers.phoneNeed.includes("beste") && (pkg.phone.includes("Pro") || pkg.phone.includes("Ultra"))) score += 3;
  if (answers.phoneNeed.includes("opslag") && (pkg.phone.includes("Pro") || pkg.phone.includes("Ultra") || pkg.phone.includes("17") || pkg.phone.includes("Pixel"))) score += 2;
  if (answers.phoneType === "Fairphone" && pkg.phoneBrand === "Fairphone") score += 4;
  if (answers.phoneType === "SimOnly" && pkg.phoneBrand === "SimOnly") score += 4;
  if (answers.phoneType === "Google" && pkg.phoneBrand === "Google") score += 4;

  return score;
}

export const ASSISTANT_INSTRUCTIONS = `
Je bent de One Assistant voor een premium Vodafone/Ziggo demo.
Je helpt bezoekers het juiste pakket te kiezen.

Regels:
- Adviseer alleen pakketten uit de aangeleverde package lijst.
- Verzin nooit nieuwe pakketten.
- Stel eerst maximaal 4 korte vragen.
- Houd de toon vriendelijk, slim en licht speels.
- Geef daarna:
  1. de beste match
  2. waarom die past
  3. twee alternatieven
- Noem altijd internet, tv, mobiel, toestel en prijs.
`;
