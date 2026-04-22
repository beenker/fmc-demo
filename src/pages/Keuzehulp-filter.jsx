import { useMemo, useState } from "react";
import { ADVISOR_PACKAGES, IMAGES, INITIAL_ANSWERS } from "../data/siteData";
import { scoreAdvisorPackage } from "../utils/advisor";
import OptionButton from "../components/OptionButton";
import AdvisorResultCard from "../components/AdvisorResultCard";
import { useNavigate } from "react-router-dom";

function FilterSection({
  title,
  description,
  children,
  summary,
  open,
  onToggle,
  compact = false,
}) {
  return (
    <div className="rounded-[1.25rem] border border-slate-200 bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 p-4 text-left"
      >
        <div>
          <h3 className={`${compact ? "text-base" : "text-lg"} font-bold`}>
            {title}
          </h3>
          {description && (
            <p className="text-sm text-slate-500 mt-1">{description}</p>
          )}
          {summary && (
            <div className="mt-2 text-sm text-blue-900 font-medium">
              Gekozen: {summary}
            </div>
          )}
        </div>
        <div className="text-slate-400 text-lg leading-none mt-1">
          {open ? "−" : "+"}
        </div>
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

export default function Keuzehulp() {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState(INITIAL_ANSWERS);
  const [openSection, setOpenSection] = useState("home");

  const setSingle = (field, value) => {
    setAnswers((prev) => ({
      ...prev,
      [field]: prev[field] === value ? "" : value,
    }));
  };

  const toggleMulti = (field, value) => {
    setAnswers((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const resetAnswers = () => {
    setAnswers(INITIAL_ANSWERS);
    setOpenSection("home");
  };

  const visiblePackages = useMemo(() => {
    const scored = ADVISOR_PACKAGES.map((pkg) => ({
      ...pkg,
      score: scoreAdvisorPackage(pkg, answers),
    })).sort((a, b) => b.score - a.score);

    const hasActiveFilters =
      Boolean(answers.homeSize) ||
      Boolean(answers.internetUse) ||
      Boolean(answers.replay) ||
      Boolean(answers.phoneType) ||
      answers.tvInterests.length > 0 ||
      answers.phoneNeed.length > 0;

    if (!hasActiveFilters) {
      return scored;
    }

    const narrowed = scored.filter((pkg) => pkg.score > 0);

    if (narrowed.length >= 3) {
      return narrowed;
    }

    return scored.slice(0, 3);
  }, [answers]);

  const activeSummary = [
    answers.homeSize && `Woning: ${answers.homeSize}`,
    answers.internetUse && `Internet: ${answers.internetUse}`,
    answers.replay && `Terugkijken: ${answers.replay}`,
    answers.phoneType && `Telefoon: ${answers.phoneType}`,
    ...answers.tvInterests,
    ...answers.phoneNeed,
  ].filter(Boolean);

  return (
    <main className="bg-slate-100 min-h-screen">
      <section className="max-w-[1280px] mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-5 md:px-8 py-6 border-b border-slate-200">
            <div className="relative rounded-2xl overflow-hidden h-40 md:h-52 mb-4">
              <img
                src={IMAGES.setup}
                alt="Keuzehulp header"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/10" />
              <div className="absolute bottom-4 left-4 text-white max-w-2xl">
                <h1 className="text-2xl md:text-4xl font-bold">
                  Onze keuzehulp
                </h1>
                <div className="text-base md:text-xl font-semibold mt-1">
                  Filter slim en zie direct welke 3 pakketten het beste passen
                </div>
              </div>
            </div>
            <p className="text-slate-600 text-sm md:text-base leading-6 max-w-3xl">
              Geen lange wizard meer. Kies links wat belangrijk is voor jouw
              situatie en zie rechts realtime hoe jouw top 3 pakketten zich
              aanpassen. Op mobiel staan de filters bovenaan en blijven de
              resultaten direct zichtbaar eronder.
            </p>
          </div>

          <div className="p-4 md:p-6 lg:p-8 grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-24">
              <div className="rounded-[1.5rem] border border-blue-200 bg-blue-50 p-5">
                <div className="text-sm uppercase tracking-wide text-blue-900 font-medium mb-2">
                  Slim filteren
                </div>
                <h2 className="text-2xl font-bold">Jouw voorkeuren</h2>
                <p className="text-slate-600 mt-2 text-sm leading-6">
                  Pas je voorkeuren aan en zie rechts meteen welke pakketten
                  overblijven.
                </p>
                <button
                  onClick={resetAnswers}
                  className="mt-4 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Reset filters
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {activeSummary.length > 0 ? (
                  activeSummary.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-sm"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">
                    Nog geen filters gekozen.
                  </span>
                )}
              </div>

              <FilterSection
                title="Woning"
                description="Hoe groot is je woning?"
                summary={answers.homeSize || "Nog niet gekozen"}
                open={openSection === "home"}
                onToggle={() =>
                  setOpenSection(openSection === "home" ? "" : "home")
                }
              >
                <div className="grid gap-3">
                  <OptionButton
                    label="Kleiner dan 70 m²"
                    selected={answers.homeSize === "klein"}
                    onClick={() => setSingle("homeSize", "klein")}
                  />
                  <OptionButton
                    label="70 - 120 m²"
                    selected={answers.homeSize === "middel"}
                    onClick={() => setSingle("homeSize", "middel")}
                  />
                  <OptionButton
                    label="Groter dan 120 m²"
                    selected={answers.homeSize === "groot"}
                    onClick={() => setSingle("homeSize", "groot")}
                  />
                </div>
              </FilterSection>

              <FilterSection
                title="Internetgebruik"
                description="Wat past het best bij jouw huishouden?"
                summary={answers.internetUse || "Nog niet gekozen"}
                open={openSection === "usage"}
                onToggle={() =>
                  setOpenSection(openSection === "usage" ? "" : "usage")
                }
              >
                <div className="grid gap-3">
                  <OptionButton
                    label="Licht gebruik"
                    selected={answers.internetUse === "licht"}
                    onClick={() => setSingle("internetUse", "licht")}
                  />
                  <OptionButton
                    label="Gemiddeld gebruik"
                    selected={answers.internetUse === "gemiddeld"}
                    onClick={() => setSingle("internetUse", "gemiddeld")}
                  />
                  <OptionButton
                    label="Intensief gebruik"
                    selected={answers.internetUse === "intensief"}
                    onClick={() => setSingle("internetUse", "intensief")}
                  />
                </div>
              </FilterSection>

              <FilterSection
                title="TV voorkeuren"
                description="Kies alles wat voor jou belangrijk is"
                summary={
                  answers.tvInterests.length > 0
                    ? answers.tvInterests.join(", ")
                    : answers.replay === "ja"
                    ? "Terugkijken / opnemen"
                    : "Nog niet gekozen"
                }
                open={openSection === "tv"}
                onToggle={() =>
                  setOpenSection(openSection === "tv" ? "" : "tv")
                }
              >
                <div className="grid gap-3">
                  <OptionButton
                    type="multi"
                    label="Standaard TV"
                    selected={answers.tvInterests.includes("standaard")}
                    onClick={() => toggleMulti("tvInterests", "standaard")}
                  />
                  <OptionButton
                    type="multi"
                    label="Films & series"
                    selected={answers.tvInterests.includes("films")}
                    onClick={() => toggleMulti("tvInterests", "films")}
                  />
                  <OptionButton
                    type="multi"
                    label="Sport"
                    selected={answers.tvInterests.includes("sport")}
                    onClick={() => toggleMulti("tvInterests", "sport")}
                  />
                  <OptionButton
                    type="multi"
                    label="Kinderprogramma’s"
                    selected={answers.tvInterests.includes("kids")}
                    onClick={() => toggleMulti("tvInterests", "kids")}
                  />
                  <OptionButton
                    label="Terugkijken / opnemen belangrijk"
                    selected={answers.replay === "ja"}
                    onClick={() =>
                      setSingle("replay", answers.replay === "ja" ? "" : "ja")
                    }
                  />
                </div>
              </FilterSection>

              <FilterSection
                title="Telefoon"
                description="Kies een merk of type waar je voorkeur naar uitgaat"
                summary={answers.phoneType || "Nog niet gekozen"}
                open={openSection === "phone"}
                onToggle={() =>
                  setOpenSection(openSection === "phone" ? "" : "phone")
                }
              >
                <div className="grid gap-3">
                  <OptionButton
                    label="iPhone"
                    selected={answers.phoneType === "Apple"}
                    onClick={() => setSingle("phoneType", "Apple")}
                  />
                  <OptionButton
                    label="Samsung"
                    selected={answers.phoneType === "Android"}
                    onClick={() => setSingle("phoneType", "Android")}
                  />
                  <OptionButton
                    label="Google"
                    selected={answers.phoneType === "Google"}
                    onClick={() => setSingle("phoneType", "Google")}
                  />
                  <OptionButton
                    label="Fairphone"
                    selected={answers.phoneType === "Fairphone"}
                    onClick={() => setSingle("phoneType", "Fairphone")}
                  />
                  <OptionButton
                    label="Sim only"
                    selected={answers.phoneType === "SimOnly"}
                    onClick={() => setSingle("phoneType", "SimOnly")}
                  />
                </div>
              </FilterSection>

              <FilterSection
                title="Wat moet je telefoon goed kunnen?"
                description="Je kunt meerdere voorkeuren selecteren"
                summary={
                  answers.phoneNeed.length > 0
                    ? answers.phoneNeed.join(", ")
                    : "Nog niet gekozen"
                }
                open={openSection === "need"}
                onToggle={() =>
                  setOpenSection(openSection === "need" ? "" : "need")
                }
              >
                <div className="grid gap-3">
                  <OptionButton
                    type="multi"
                    label="Praktisch en goedkoop"
                    selected={answers.phoneNeed.includes("goedkoop")}
                    onClick={() => toggleMulti("phoneNeed", "goedkoop")}
                  />
                  <OptionButton
                    type="multi"
                    label="Beste camera"
                    selected={answers.phoneNeed.includes("camera")}
                    onClick={() => toggleMulti("phoneNeed", "camera")}
                  />
                  <OptionButton
                    type="multi"
                    label="Beste model"
                    selected={answers.phoneNeed.includes("beste")}
                    onClick={() => toggleMulti("phoneNeed", "beste")}
                  />
                  <OptionButton
                    type="multi"
                    label="Veel opslag voor mijn foto’s"
                    selected={answers.phoneNeed.includes("opslag")}
                    onClick={() => toggleMulti("phoneNeed", "opslag")}
                  />
                </div>
              </FilterSection>
            </div>

            <div className="lg:col-span-2 space-y-5">
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <div className="text-sm text-slate-500">
                      Realtime pakketadvies
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mt-1">
                      Jouw top 3 pakketten
                    </h2>
                    <p className="text-slate-600 mt-2 text-sm md:text-base leading-6 max-w-2xl">
                      Bij binnenkomst zie je alle pakketten. Zodra je filters
                      kiest, maken we de selectie steeds kleiner en relevanter.
                      Als je heel specifiek filtert, zorgen we dat er altijd
                      minimaal 3 sterke keuzes overblijven om te vergelijken.
                    </p>
                  </div>
                  <div className="rounded-full bg-white border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
                    {visiblePackages.length} pakketten zichtbaar
                  </div>
                </div>
              </div>

              <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-4 items-stretch animate-fade-in-up">
                {visiblePackages.map((pkg, index) => (
                  <div
                    key={pkg.id}
                    className={
                      index === 0
                        ? "xl:scale-[1.02] origin-center ring-2 ring-blue-900 rounded-[2rem]"
                        : ""
                    }
                  >
                    <AdvisorResultCard
                      pkg={pkg}
                      index={index}
                      onSelect={() =>
                        navigate("/configurator", {
                          state: { bundleId: pkg.id },
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
