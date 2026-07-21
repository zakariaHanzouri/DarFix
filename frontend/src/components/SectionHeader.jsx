export default function SectionHeader({
  badge,
  title,
  subtitle,
  center = false,
}) {
  return (
    <div className={`${center ? "text-center" : ""} mb-12`}>
      {/* Badge */}
      {badge && (
        <span className="inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-400">
          {badge}
        </span>
      )}

      {/* Title */}
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-3 max-w-2xl text-slate-400 leading-7">
          {subtitle}
        </p>
      )}
    </div>
  );
}