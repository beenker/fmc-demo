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
import giftSwitch from "../assets/giftSwitch.png";
import heroPhone from "../assets/heroPhone.png";
import logo from '../assets/One-Logo.png';

export const IMAGES = {
  oneLogo: logo,
  heroPhone: heroPhone,
  ps5: giftPS5,
  switch: giftSwitch,
  essential: packageEssential,
  complete: packageComplete,
  ultimate: packageUltimate,
  homeLiving: heroPhone,
  setup: keuzehulpImg,
  setupcomplete: keuzehulpImg2
};

export const BUNDLES = [
  {
    name: 'Essential One',
    subtitle: 'Voor een frisse start',
    internet: 'Wifi Start · 100 Mbit/s',
    tv: 'TV Start',
    mobile: '3GB',
    device: 'iPhone 17e / Galaxy A',
    priceNow: '€55',
    priceWas: '€110',
    highlight: false
  },
  {
    name: 'Complete One',
    subtitle: 'Meest gekozen',
    internet: 'Wifi Groot · 400 Mbit/s',
    tv: 'TV Complete',
    mobile: '30GB',
    device: 'iPhone 17 / Galaxy S',
    priceNow: '€75',
    priceWas: '€150',
    highlight: true
  },
  {
    name: 'Ultimate One',
    subtitle: 'Alles erop en eraan',
    internet: 'Wifi Extra Groot · 2 Gbit/s',
    tv: 'TV Max',
    mobile: 'Unlimited Plus',
    device: 'iPhone 17 Pro / Galaxy Ultra',
    priceNow: '€95',
    priceWas: '€190',
    highlight: false
  }
];

export const ADVISOR_PACKAGES = [
  {
    id: 'smart-start',
    name: 'Smart Start',
    vibe: 'Lekker simpel en scherp gekozen',
    internet: 'Internet 100 Mbit/s',
    tv: 'TV Start',
    phoneBrand: 'Apple',
    phone: 'iPhone 17e',
    mobile: '3GB',
    priceNow: '€49,50',
    priceWas: '€99,00',
    tags: ['Licht gebruik', 'Compact wonen', 'Praktisch'],
    image: packageSmartStart
  },
  {
    id: 'everyday-plus',
    name: 'Everyday Plus',
    vibe: 'Voor dagelijks gemak zonder spijt achteraf',
    internet: 'Internet 400 Mbit/s',
    tv: 'TV Complete',
    phoneBrand: 'Apple',
    phone: 'iPhone 17',
    mobile: '30GB',
    priceNow: '€74,50',
    priceWas: '€149,00',
    tags: ['Gemiddeld gebruik', 'Films & series', 'Meest gekozen'],
    image: packageEverydayPlus
  },
  {
    id: 'creator-max',
    name: 'Creator Max',
    vibe: 'Voor wie gewoon het beste wil',
    internet: 'Internet 2 Gbit/s',
    tv: 'TV Max',
    phoneBrand: 'Apple',
    phone: 'iPhone 17 Pro',
    mobile: 'Unlimited Plus',
    priceNow: '€94,50',
    priceWas: '€189,00',
    tags: ['Beste camera', 'Veel opslag', 'Topmodel'],
    image: packageCreatorMax
  },
  {
    id: 'android-easy',
    name: 'Android Easy',
    vibe: 'Slim gekozen zonder overkill',
    internet: 'Internet 100 Mbit/s',
    tv: 'TV Start',
    phoneBrand: 'Android',
    phone: 'Galaxy A',
    mobile: '5GB',
    priceNow: '€47,50',
    priceWas: '€95,00',
    tags: ['Licht gebruik', 'Voordelig', 'Android'],
    image: packageAndroidEasy
  },
  {
    id: 'android-complete',
    name: 'Android Complete',
    vibe: 'De lekkere middenweg',
    internet: 'Internet 400 Mbit/s',
    tv: 'TV Complete',
    phoneBrand: 'Android',
    phone: 'Galaxy S',
    mobile: '30GB',
    priceNow: '€72,50',
    priceWas: '€145,00',
    tags: ['Gemiddeld gebruik', 'Sport & series', 'Android'],
    image: packageAndroidComplete
  },
  {
    id: 'android-ultra',
    name: 'Android Ultra',
    vibe: 'Voor power users en mooie foto’s',
    internet: 'Internet 1 Gbit/s',
    tv: 'TV Max',
    phoneBrand: 'Android',
    phone: 'Galaxy Ultra',
    mobile: 'Unlimited Plus',
    priceNow: '€89,50',
    priceWas: '€179,00',
    tags: ['Intensief gebruik', 'Beste camera', 'Android topmodel'],
    image: packageAndroidUltra
  }
];

export const INITIAL_ANSWERS = {
  homeSize: '',
  internetUse: '',
  tvInterests: [],
  replay: '',
  phoneType: '',
  phoneNeed: []
};

export const BUNDLE_IMAGE_MAP = {
  'Essential One': IMAGES.essential,
  'Complete One': IMAGES.complete,
  'Ultimate One': IMAGES.ultimate
};

const INITIAL_MESSAGES = [
  {
    role: "assistant",
    content:
      "Hoi, ik ben de One Assistant. Ik help je in een paar korte vragen naar het pakket dat het beste past bij jouw situatie. Ik adviseer alleen uit het actuele One aanbod. Vertel me eerst: woon je klein, gemiddeld of ruim?"
  }
];

const ASSISTANT_INSTRUCTIONS = `
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