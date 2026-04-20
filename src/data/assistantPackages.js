// src/data/assistantPackages.js

// Use existing asset filenames from your project
import packageSmartStart from "../assets/smart-start.png";
import packageEverydayPlus from "../assets/everyday-plus.png";
import packageCreatorMax from "../assets/creator-max.png";
import packageAndroidEasy from "../assets/android-easy.png";
import packageAndroidComplete from "../assets/android-complete.png";
import packageAndroidUltra from "../assets/android-ultra.png";

export const ASSISTANT_PACKAGES = [
  {
    id: "smart-start",
    name: "Smart Start",
    vibe: "Lekker simpel en scherp gekozen",
    internet: "Internet 100 Mbit/s",
    tv: "TV Start",
    phoneBrand: "Apple",
    phone: "iPhone 17e",
    mobile: "3GB",
    device: "iPhone 17e",
    priceNow: "€49,50",
    priceWas: "€99,00",
    tags: ["Licht gebruik", "Compact wonen", "Praktisch"],
    audience: ["licht", "klein", "budget", "iphone"],
    summary:
      "Een slimme instapper voor kleiner wonen en licht gebruik, zonder onnodige overkill.",
    image: packageSmartStart,
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
    device: "iPhone 17",
    priceNow: "€74,50",
    priceWas: "€149,00",
    tags: ["Gemiddeld gebruik", "Films & series", "Meest gekozen"],
    audience: ["gemiddeld", "streaming", "iphone", "dagelijks"],
    summary:
      "De comfortabele middenweg voor mensen die gewoon willen dat alles lekker werkt.",
    image: packageEverydayPlus,
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
    device: "iPhone 17 Pro",
    priceNow: "€94,50",
    priceWas: "€189,00",
    tags: ["Beste camera", "Veel opslag", "Topmodel"],
    audience: ["premium", "iphone", "camera", "intensief", "power-user"],
    summary:
      "Alles op maximaal niveau: topsnel internet, premium tv en een iPhone voor veeleisende gebruikers.",
    image: packageCreatorMax,
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
    device: "Galaxy A",
    priceNow: "€47,50",
    priceWas: "€95,00",
    tags: ["Licht gebruik", "Voordelig", "Android"],
    audience: ["android", "licht", "budget", "klein"],
    summary:
      "Een nuchtere Android-keuze voor wie vooral slim en betaalbaar wil overstappen.",
    image: packageAndroidEasy,
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
    device: "Galaxy S",
    priceNow: "€72,50",
    priceWas: "€145,00",
    tags: ["Gemiddeld gebruik", "Sport & series", "Android"],
    audience: ["android", "gemiddeld", "sport", "streaming"],
    summary:
      "Een uitgebalanceerd Android-pakket met genoeg snelheid, kijkopties en mobiele ruimte.",
    image: packageAndroidComplete,
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
    device: "Galaxy Ultra",
    priceNow: "€89,50",
    priceWas: "€179,00",
    tags: ["Intensief gebruik", "Beste camera", "Android topmodel"],
    audience: ["android", "premium", "camera", "intensief", "power-user"],
    summary:
      "Voor Android-liefhebbers die topcamera’s, veel vrijheid en serieuze performance willen.",
    image: packageAndroidUltra,
  },
];
