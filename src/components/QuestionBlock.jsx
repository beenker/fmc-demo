export default function QuestionBlock({ title, children, bordered = false }) {
  return (
    <div className={bordered ? 'border-t border-slate-200 pt-8' : ''}>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}