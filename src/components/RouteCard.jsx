export default function RouteCard({
  badge,
  badgeClassName,
  title,
  description,
  tags,
  cta,
  onClick,
  className = ''
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-[2rem] border p-8 shadow-sm hover:shadow-lg transition-shadow ${className}`}
    >
      <div className={`inline-flex rounded-full px-3 py-1 text-sm font-medium mb-5 ${badgeClassName}`}>
        {badge}
      </div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-3 text-slate-600 leading-7">{description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full bg-white/80 px-3 py-1 text-sm text-slate-600">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-8 font-semibold text-slate-900">{cta} →</div>
    </button>
  );
}