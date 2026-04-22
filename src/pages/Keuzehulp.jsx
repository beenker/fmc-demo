import { useMemo, useState } from "react";
import { ADVISOR_PACKAGES, IMAGES, INITIAL_ANSWERS } from "../data/siteData";
import { scoreAdvisorPackage } from "../utils/advisor";
import OptionButton from "../components/OptionButton";
import AdvisorResultCard from "../components/AdvisorResultCard";
import { useNavigate } from "react-router-dom";

const STEPS = [
  {
    key: "homeSize",
    title: "Woning",
    short: "Woning",
    description: "Hoe groot is je woning?",
    type: "single",
    options: [
      { label: "Kleiner dan 70 m²", value: "klein" },
      { label: "70 - 120 m²", value: "middel" },
      { label: "Groter dan 120 m²", value: "groot" },
    ],
  },
  {
    key: "internetUse",
    title: "Internet",
    short: "Internet",
    description: "Wat past het best bij jouw huishouden?",
    type: "single",
    options: [
      { label: "Licht gebruik", value: "licht" },
      { label: "Gemiddeld gebruik", value: "gemiddeld" },
      { label: "Intensief gebruik", value: "intensief" },
    ],
  },
  {
    key: "tvInterests",
    title: "TV voorkeur",
    short: "TV",
    description: "Kies wat belangrijk is voor jou.",
    type: "multi",
    options: [
      { label: "Standaard TV", value: "standaard" },
      { label: "Films & series", value: "films" },
      { label: "Sport", value: "sport" },
      { label: "Kinderprogramma’s", value: "kids" },
    ],
  },
  {
    key: "replay",
    title: "TV extra",
    short: "TV extra",
    description: "Is terugkijken of opnemen belangrijk?",
    type: "single",
    options: [
      { label: "Ja, graag", value: "ja" },
      { label: "Nee, niet nodig", value: "nee" },
    ],
  },
  {
    key: "phoneType",
    title: "Mobiel",
    short: "Mobiel",
    description: "Welk merk of type past het best?",
    type: "single",
    options: [
      { label: "iPhone", value: "Apple" },
      { label: "Samsung", value: "Android" },
      { label: "Google", value: "Google" },
      { label: "Fairphone", value: "Fairphone" },
      { label: "Sim only", value: "SimOnly" },
    ],
  },
  {
    key: "phoneNeed",
    title: "Mobiele specs",
    short: "Mobiele specs",
    description: "Je kunt meerdere voorkeuren kiezen.",
    type: "multi",
    options: [
      { label: "Praktisch en goedkoop", value: "goedkoop" },
      { label: "Beste camera", value: "camera" },
      { label: "Beste model", value: "beste" },
      { label: "Veel opslag", value: "opslag" },
    ],
  },
];

function StepPill({ index, title, active, completed, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
        active
          ? "border-slate-900 bg-slate-900 text-white"
          : completed
          ? "border-blue-200 bg-blue-50 text-blue-900"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
      }`}
    >
      <span
        className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
          active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
        }`}
      >
        {index + 1}
      </span>
      {title}
    </button>
  );
}

function getStepSummary(step, answers) {
  if (step.key === "tvInterests") {
    return answers.tvInterests.length
      ? answers.tvInterests.join(", ")
      : "Nog niet gekozen";
  }
  if (step.key === "phoneNeed") {
    return answers.phoneNeed.length
      ? answers.phoneNeed.join(", ")
      : "Nog niet gekozen";
  }
  return answers[step.key] || "Nog niet gekozen";
}

export default function Keuzehulp() {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState(INITIAL_ANSWERS);
  const [currentStep, setCurrentStep] = useState(0);

  const setSingle = (field, value) => {
    setAnswers((prev) => ({
      ...prev,
      [field]: prev[field] === value ? "" : value,
    }));

    if (currentStep < STEPS.length - 1) {
      setTimeout(() => {
        setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
      }, 120);
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
    setCurrentStep(0);
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

    if (!hasActiveFilters) return scored;

    const narrowed = scored.filter((pkg) => pkg.score > 0);
    if (narrowed.length >= 3) return narrowed;
    return scored.slice(0, 3);
  }, [answers]);

  const activeStepConfig = STEPS[currentStep];
  const completedSteps = STEPS.map((step) => {
    if (Array.isArray(answers[step.key])) return answers[step.key].length > 0;
    return Boolean(answers[step.key]);
  });

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
                  Doorloop 6 korte stappen en zie direct hoe jouw beste
                  pakketten meebewegen
                </div>
              </div>
            </div>
            <p className="text-slate-600 text-sm md:text-base leading-6 max-w-3xl">
              Geen grote filterkolom meer. Je doorloopt hierboven een compacte
              guided flow en na elke stap passen de pakketten hieronder zich
              direct aan.
            </p>
          </div>

          <div className="p-4 md:p-6 lg:p-8 space-y-6">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    Jouw keuzehulp in 6 stappen
                  </h2>
                  <p className="text-slate-600 mt-2 text-sm leading-6 max-w-3xl">
                    Klik door de stappen boven de producten. Bij elke stap
                    worden de resultaten direct opnieuw gerankt en versmald.
                  </p>
                </div>
                <button
                  onClick={resetAnswers}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Reset keuzehulp
                </button>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {STEPS.map((step, index) => (
                  <StepPill
                    key={step.key}
                    index={index}
                    title={step.short}
                    active={currentStep === index}
                    completed={completedSteps[index]}
                    onClick={() => setCurrentStep(index)}
                  />
                ))}
              </div>

              <div className="mt-5 rounded-[1.25rem] border border-slate-200 bg-white p-4 md:p-5">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <div className="text-sm text-slate-500">
                      Stap {currentStep + 1} van {STEPS.length}
                    </div>
                    <h3 className="text-xl font-bold mt-1">
                      {activeStepConfig.title}
                    </h3>
                    <p className="text-slate-600 mt-2 text-sm leading-6">
                      {activeStepConfig.description}
                    </p>
                  </div>

                  {currentStep < STEPS.length - 1 && (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentStep((prev) => Math.max(prev - 1, 0))
                        }
                        disabled={currentStep === 0}
                        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-40"
                      >
                        Vorige
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentStep((prev) =>
                            Math.min(prev + 1, STEPS.length - 1)
                          )
                        }
                        className="rounded-xl bg-slate-900 text-white px-4 py-2 text-sm font-medium"
                      >
                        Volgende
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-4 grid md:grid-cols-2 xl:grid-cols-3 gap-2.5">
                  {activeStepConfig.options.map((option) => {
                    const selected =
                      activeStepConfig.type === "multi"
                        ? answers[activeStepConfig.key].includes(option.value)
                        : answers[activeStepConfig.key] === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          if (activeStepConfig.type === "multi") {
                            toggleMulti(activeStepConfig.key, option.value);
                          } else {
                            setSingle(activeStepConfig.key, option.value);
                          }
                        }}
                        className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                          selected
                            ? "border-blue-900 bg-blue-50 text-blue-950"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="font-medium leading-5">
                          {option.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <div className="flex-1">
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
                      Nog geen voorkeuren gekozen.
                    </span>
                  )}
                </div>

                <div className="md:self-end rounded-full bg-white border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
                  {visiblePackages.length} pakketten zichtbaar
                </div>
              </div>
            </div>

            <div className="space-y-5">

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
