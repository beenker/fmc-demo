export default function GiftCard({ image, title, value }) {
  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200">
      <div className="h-40 rounded-2xl bg-slate-100 overflow-hidden mb-4">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>
      <div className="font-bold text-lg">{title}</div>
      <div className="text-sm text-slate-500">{value}</div>
    </div>
  );
}