import { useMemo, useState } from "react";
import { ADVISOR_PACKAGES, IMAGES, INITIAL_ANSWERS } from "../data/siteData";
import { scoreAdvisorPackage } from "../utils/advisor";
import OptionButton from "../components/OptionButton";
import AdvisorResultCard from "../components/AdvisorResultCard";

const STEPS = [
  {
    key: "homeSize",
    title: "Hoe groot is je woning?",
    description:
      "Zo schatten we beter in hoeveel wifi-power je thuis nodig hebt.",
    isComplete: (answers) => Boolean(answers.homeSize),
  },
  {
    key: "internetUse",
    title: "Hoe gebruik je internet?",
    description:
      "Van rustig scrollen tot voluit streamen, gamen en thuiswerken.",
    isComplete: (answers) => Boolean(answers.internetUse),
  },
  {
    key: "tvInterests",
    title: "Waar wordt thuis graag naar gekeken?",
    description: "Kies alles wat van toepassing is. Wij doen niet moeilijk.",
    isComplete: (answers) => answers.tvInterests.length > 0,
  },
  {
    key: "replay",
    title: "Wil je kunnen opnemen en/of terugkijken?",
    description: "Voor sommigen heilig. Voor anderen totaal overbodig.",
    isComplete: (answers) => Boolean(answers.replay),
  },
  {
    key: "phoneType",
    title: "Wat voor telefoon wil je?",
    description: "Team iPhone of team Android? Hier mag je kleur bekennen.",
    isComplete: (answers) => Boolean(answers.phoneType),
  },
  {
    key: "phoneNeed",
    title: "Wat moet je telefoon vooral goed kunnen?",
    description:
      "Kies gerust meerdere dingen. Jij bent niet in een hokje te vangen.",
    isComplete: (answers) => answers.phoneNeed.length > 0,
  },
];

function StepPill({ number, label, active, complete, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all ${
        active
          ? "border-blue-900 bg-blue-50 shadow-sm"
          : complete
          ? "border-emerald-200 bg-emerald-50"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
          active
            ? "bg-blue-900 text-white"
            : complete
            ? "bg-emerald-600 text-white"
            : "bg-slate-100 text-slate-600"
        }`}
      >
        {complete ? "✓" : number}
      </div>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </button>
  );
}

export default function Keuzehulp() {
  const [answers, setAnswers] = useState(INITIAL_ANSWERS);
  const [showResults, setShowResults] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const setSingleAndAdvance = (field, value) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    if (currentStep < STEPS.length - 1) {
      setTimeout(() => {
        setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
      }, 180);
    }
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
    setShowResults(false);
    setCurrentStep(0);
  };

  const recommendedPackages = useMemo(() => {
    return ADVISOR_PACKAGES.map((pkg) => ({
      ...pkg,
      score: scoreAdvisorPackage(pkg, answers),
    }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [answers]);

  const completion = useMemo(() => {
    const fields = [
      Boolean(answers.homeSize),
      Boolean(answers.internetUse),
      answers.tvInterests.length > 0,
      Boolean(answers.replay),
      Boolean(answers.phoneType),
      answers.phoneNeed.length > 0,
    ];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [answers]);

  const activeSummary = [
    answers.homeSize && `Woning: ${answers.homeSize}`,
    answers.internetUse && `Internet: ${answers.internetUse}`,
    answers.replay && `Terugkijken: ${answers.replay}`,
    answers.phoneType && `Telefoon: ${answers.phoneType}`,
    ...answers.tvInterests,
    ...answers.phoneNeed,
  ].filter(Boolean);

  const canGoNext = useMemo(() => {
    return STEPS[currentStep].isComplete(answers);
  }, [answers, currentStep]);

  const completedSteps = useMemo(() => {
    return STEPS.filter((step) => step.isComplete(answers)).length;
  }, [answers]);

  const nextStep = () => {
    if (currentStep < STEPS.length - 1 && canGoNext) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <main className="bg-slate-100 min-h-screen">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 450ms ease-out;
        }
      `}</style>

      <section className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-200 flex items-start justify-between gap-4">
            <div className="w-full">
              <div className="relative rounded-2xl overflow-hidden mb-4 h-48">
                <img
                  src={IMAGES.setup}
                  alt="Keuzehulp header"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/10" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h1 className="text-3xl font-bold mt-1">Onze Keuzehulp</h1>
                  <div className="text-xl font-semibold">
                    Vind jouw perfecte pakket
                  </div>
                </div>
              </div>
              <p className="text-slate-600 mt-3 text-sm leading-6">
                Beantwoord een paar korte vragen en wij toveren 3 pakketten voor
                je tevoorschijn. Geen keuzestress, wel een beetje magie ✨
              </p>
            </div>
          </div>

          <div className="px-8 pt-6">
            <div className="flex items-center justify-between gap-4 mb-3 text-sm">
              <span className="text-slate-500">Voortgang keuzehulp</span>
              <span className="font-medium text-slate-700">
                {completion}% ingevuld · {completedSteps}/{STEPS.length} stappen
              </span>
            </div>
            <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-blue-900 transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2 pb-2">
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
                  Nog niets gekozen — wij zijn er klaar voor.
                </span>
              )}
            </div>
          </div>

          <div className="p-8 grid gap-10">
            <div className="space-y-8">
              <div>
                <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 min-h-[360px] animate-fade-in-up">
                  {currentStep === 0 && (
                    <div>
                      <div className="text-sm uppercase tracking-wide text-slate-500 mb-2">
                        Stap 1
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        Hoe groot is je woning?
                      </h3>
                      <p className="text-slate-600 mb-6">
                        Zo schatten we beter in hoeveel wifi-power je thuis
                        nodig hebt.
                      </p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <OptionButton
                          label="Kleiner dan 70 m²"
                          selected={answers.homeSize === "klein"}
                          onClick={() =>
                            setSingleAndAdvance("homeSize", "klein")
                          }
                        />
                        <OptionButton
                          label="70 - 120 m²"
                          selected={answers.homeSize === "middel"}
                          onClick={() =>
                            setSingleAndAdvance("homeSize", "middel")
                          }
                        />
                        <OptionButton
                          label="Groter dan 120 m²"
                          selected={answers.homeSize === "groot"}
                          onClick={() =>
                            setSingleAndAdvance("homeSize", "groot")
                          }
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div>
                      <div className="text-sm uppercase tracking-wide text-slate-500 mb-2">
                        Stap 2
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        Hoe gebruik je internet?
                      </h3>
                      <p className="text-slate-600 mb-6">
                        Van rustig scrollen tot voluit streamen, gamen en
                        thuiswerken.
                      </p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <OptionButton
                          label="Licht gebruik"
                          selected={answers.internetUse === "licht"}
                          onClick={() =>
                            setSingleAndAdvance("internetUse", "licht")
                          }
                        />
                        <OptionButton
                          label="Gemiddeld gebruik"
                          selected={answers.internetUse === "gemiddeld"}
                          onClick={() =>
                            setSingleAndAdvance("internetUse", "gemiddeld")
                          }
                        />
                        <OptionButton
                          label="Intensief gebruik"
                          selected={answers.internetUse === "intensief"}
                          onClick={() =>
                            setSingleAndAdvance("internetUse", "intensief")
                          }
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div>
                      <div className="text-sm uppercase tracking-wide text-slate-500 mb-2">
                        Stap 3
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        Waar wordt thuis graag naar gekeken?
                      </h3>
                      <p className="text-slate-600 mb-6">
                        Kies alles wat van toepassing is. Wij doen niet
                        moeilijk.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <OptionButton
                          type="multi"
                          label="Standaard TV"
                          selected={answers.tvInterests.includes("standaard")}
                          onClick={() =>
                            toggleMulti("tvInterests", "standaard")
                          }
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
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div>
                      <div className="text-sm uppercase tracking-wide text-slate-500 mb-2">
                        Stap 4
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        Wil je kunnen opnemen en/of terugkijken?
                      </h3>
                      <p className="text-slate-600 mb-6">
                        Voor sommigen heilig. Voor anderen totaal overbodig.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <OptionButton
                          label="Ja, graag"
                          selected={answers.replay === "ja"}
                          onClick={() => setSingleAndAdvance("replay", "ja")}
                        />
                        <OptionButton
                          label="Nee, hoeft niet"
                          selected={answers.replay === "nee"}
                          onClick={() => setSingleAndAdvance("replay", "nee")}
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div>
                      <div className="text-sm uppercase tracking-wide text-slate-500 mb-2">
                        Stap 5
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        Wat voor telefoon wil je?
                      </h3>
                      <p className="text-slate-600 mb-6">
                        Team iPhone of team Android? Hier mag je kleur bekennen.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <OptionButton
                          type="multi"
                          label="iPhone"
                          selected={answers.phoneType === "Apple"}
                          onClick={() =>
                            setSingleAndAdvance(
                              "phoneType",
                              answers.phoneType === "Apple" ? "" : "Apple"
                            )
                          }
                        />
                        <OptionButton
                          type="multi"
                          label="Android"
                          selected={answers.phoneType === "Android"}
                          onClick={() =>
                            setSingleAndAdvance(
                              "phoneType",
                              answers.phoneType === "Android" ? "" : "Android"
                            )
                          }
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div>
                      <div className="text-sm uppercase tracking-wide text-slate-500 mb-2">
                        Stap 6
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        Wat moet je telefoon vooral goed kunnen?
                      </h3>
                      <p className="text-slate-600 mb-6">
                        Kies gerust meerdere dingen. Jij bent niet in een hokje
                        te vangen.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
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
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={`px-4 py-2 rounded-xl border border-slate-300text-slate-700 text-sm font-semibold ${
                      currentStep === 0
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                        : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Vorige stap
                  </button>
                  <button
                    onClick={resetAnswers}
                    className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50"
                  >
                    Reset
                  </button>
                  {currentStep < STEPS.length - 1 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!canGoNext}
                      className={`px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold ${
                        canGoNext
                          ? "bg-blue-900 text-white hover:bg-blue-800"
                          : "bg-slate-200 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      Volgende stap
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setShowResults(true);
                        setTimeout(() => {
                          window.scrollTo({ top: 1180, behavior: "smooth" });
                        }, 80);
                      }}
                      className="rounded-2xl bg-blue-900 text-white px-5 py-3 font-semibold hover:bg-blue-800"
                    >
                      Toon mijn matches
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-slate-50 rounded-[2rem] border border-slate-200 p-5 sticky top-24">
                {!showResults ? (
                  <div className="mt-6 text-sm text-slate-500 text-center">
                    Rond de wizard af en klik op{" "}
                    <span className="font-semibold">"Toon mijn matches"</span>
                  </div>
                ) : (
                  <div className="grid gap-4 mt-6 animate-fade-in-up">
                    <div className="relative rounded-2xl overflow-hidden mb-4 h-48">
                      <img
                        src={IMAGES.setupcomplete}
                        alt="Keuzehulp header"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/10" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="text-3xl font-bold mt-1">
                          Jouw top 3 matches
                        </h2>
                      </div>
                    </div>
                    <p className="text-slate-600 mt-3 text-sm leading-6">
                      We kijken naar wonen, internetgebruik, TV-wensen en jouw
                      favoriete telefoonstijl. Daardoor kunnen we ook net wat
                      diversere pakketten laten zien dan op de standaard
                      overzichtspagina.
                    </p>
                    <div className="grid xl:grid-cols-3 gap-4 items-stretch">
                      {recommendedPackages.map((pkg, index) => (
                        <div
                          key={pkg.id}
                          className={
                            index === 0
                              ? "ring-2 ring-blue-900 rounded-[2rem] scale-[1.02] origin-center"
                              : ""
                          }
                        >
                          <AdvisorResultCard pkg={pkg} index={index} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
