export default function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">

      {/* Image */}
      <div className="h-52 w-full bg-slate-800  animate-pulse"  />

      {/* Content */}
      <div className="p-6">

        {/* Category */}
        <div className="h-6 w-24 rounded-full bg-slate-800  animate-pulse" />

        {/* Title */}
        <div className="mt-5 space-y-3">
          <div className="h-6 w-4/5 rounded bg-slate-800  animate-pulse" />
          <div className="h-6 w-2/3 rounded bg-slate-800  animate-pulse" />
        </div>

        {/* Description */}
        <div className="mt-5 space-y-2">
          <div className="h-4 w-full rounded bg-slate-800  animate-pulse" />
          <div className="h-4 w-5/6 rounded bg-slate-800  animate-pulse" />
        </div>

        {/* Artisan */}
        <div className="mt-6 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-800  animate-pulse" />
          <div className="h-4 w-32 rounded bg-slate-800  animate-pulse" />
        </div>

        {/* Bottom */}
        <div className="mt-8 flex items-center justify-between">

          <div className="space-y-2">
            <div className="h-6 w-20 rounded bg-slate-800  animate-pulse" />
            <div className="h-4 w-16 rounded bg-slate-800  animate-pulse" />
          </div>

          <div className="h-11 w-11 rounded-xl bg-slate-800  animate-pulse " />

        </div>

      </div>

    </div>
  );
}