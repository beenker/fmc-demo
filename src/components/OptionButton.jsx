export default function OptionButton({ label, selected, onClick, type = 'single' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border px-4 py-5 text-left transition-all ${
        selected ? 'border-blue-700 bg-blue-50 shadow-sm' : 'border-slate-300 bg-white hover:border-slate-400'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`h-7 w-7 border flex items-center justify-center ${
            type === 'single' ? 'rounded-full' : 'rounded-lg'
          } ${selected ? 'border-blue-700' : 'border-slate-400'}`}
        >
          {selected && (
            <div className={`bg-blue-700 ${type === 'single' ? 'h-3 w-3 rounded-full' : 'h-3 w-3 rounded-sm'}`} />
          )}
        </div>
        <span className="text-lg text-slate-700">{label}</span>
      </div>
    </button>
  );
}