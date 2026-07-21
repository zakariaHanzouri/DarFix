import React from "react";

function CategorySkeleton() {
  return (
     
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900 p-8">

      <div className="flex flex-col items-center">

        {/* Icon */}
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-slate-800 animate-pulse" />

        {/* Category Name */}
        <div className="mt-6 h-6 w-32 rounded-lg bg-slate-800 animate-pulse" />

        {/* Decorative Line */}
        <div className="mt-4 h-1 w-12 rounded-full bg-slate-800 animate-pulse" />

      </div>

    </div>
  
  );
}

export default CategorySkeleton;
