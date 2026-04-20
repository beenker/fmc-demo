import { useEffect, useRef, useState } from "react";
import { ASSISTANT_PACKAGES } from "../data/assistantPackages";

const QUESTIONS = [
  "Woon je klein, gemiddeld of ruim?",
  "Gebruik je internet vooral licht, gemiddeld of intensief?",
  "Wil je liever iPhone of Android?",
  "Kijk je vooral standaard tv, films & series of juist sport?",
];

const INITIAL_MESSAGES = [
  {
    id: "init-1",
    role: "assistant",
    type: "text",
    content:
      "Hoi, ik ben de One Assistant 👋 Ik help je in een paar korte vragen naar het juiste pakket.",
  },
  {
    id: "init-2",
    role: "assistant",
    type: "text",
    content: QUESTIONS[0],
  },
];

function recommendPackages(input) {
  const text = input.toLowerCase();

  if (text.includes("beste") || text.includes("onbeperkt") || text.includes("sport")) {
    return ASSISTANT_PACKAGES.slice(2, 5);
  }

  if (text.includes("goedkoop") || text.includes("klein")) {
    return ASSISTANT_PACKAGES.slice(0, 3);
  }

  if (text.includes("android") || text.includes("samsung")) {
    return ASSISTANT_PACKAGES.filter(p => p.phoneBrand === "Android").slice(0, 3);
  }

  return ASSISTANT_PACKAGES.slice(1, 4);
}

function PackageCard({ pkg, featured }) {
  return (
    <div className={`rounded-2xl border bg-white p-4 shadow-sm ${featured ? "ring-2 ring-orange-200 border-orange-400" : "border-slate-200"}`}>
      {featured && (
        <div className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full inline-block mb-2">
          Beste match
        </div>
      )}

      <img src={pkg.image} className="w-full h-32 object-cover rounded-xl mb-3" />

      <div className="font-bold text-lg">{pkg.name}</div>
      <div className="text-sm text-slate-500 mb-2">{pkg.vibe}</div>

      <div className="text-sm space-y-1">
        <div>📶 {pkg.internet}</div>
        <div>📺 {pkg.tv}</div>
        <div>📱 {pkg.mobile}</div>
      </div>

      <div className="mt-3">
        <div className="font-bold text-lg">{pkg.priceNow}</div>
        <div className="text-xs line-through text-slate-400">{pkg.priceWas}</div>
      </div>
    </div>
  );
}

export default function Assistant() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const scrollRef = useRef(null);
  const idRef = useRef(1);

  const nextId = () => idRef.current++;

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const trimmedInput = input.trim();
    const nextQuestionCount = questionCount + 1;

    const newMessages = [
      {
        id: nextId(),
        role: "user",
        type: "text",
        content: trimmedInput,
      },
    ];

    if (nextQuestionCount < 3) {
      newMessages.push({
        id: nextId(),
        role: "assistant",
        type: "text",
        content:
          QUESTIONS[nextQuestionCount] ||
          "Nog één ding: wat vind je belangrijker, prijs of zoveel mogelijk opties?",
      });
    } else {
      const contextText = messages
        .filter((m) => m.type === "text")
        .map((m) => m.content)
        .join(" ");
      const matches = recommendPackages(`${contextText} ${trimmedInput}`);

      newMessages.push(
        {
          id: nextId(),
          role: "assistant",
          type: "text",
          content: "Top, ik heb genoeg om iets moois voor je te vinden 👇",
        },
        {
          id: nextId(),
          role: "assistant",
          type: "packages",
          packages: matches,
        }
      );
    }

    setMessages((prev) => [...prev, ...newMessages]);
    setQuestionCount(nextQuestionCount);
    setInput("");
  };

  return (
    <main className="max-w-[900px] mx-auto px-4 py-10">
      <div className="rounded-3xl border bg-white shadow-sm overflow-hidden">

        {/* Header */}
        <div className="bg-orange-500 text-white p-6">
          <h1 className="text-3xl font-bold">AI Assistant</h1>
          <p className="text-orange-100 mt-2">
            Stel een vraag en krijg direct een passend pakket.
          </p>
        </div>

        {/* Chat */}
        <div className="p-4">
          <div ref={scrollRef} className="h-[500px] overflow-y-auto space-y-4">

            {messages.map(msg => {
              if (msg.type === "packages") {
                return (
                  <div key={msg.id} className="grid gap-3">
                    {msg.packages.map((p, i) => (
                      <PackageCard key={p.id} pkg={p} featured={i === 0} />
                    ))}
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${msg.role === "user" ? "bg-orange-500 text-white ml-auto" : "bg-slate-100"}`}
                >
                  {msg.content}
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div className="mt-4 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-xl px-3 py-2"
              placeholder="Bijv: ik wil goedkoop en simpel..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-orange-500 text-white px-4 rounded-xl"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
