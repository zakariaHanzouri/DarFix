import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/categories/${category.id}`}
      className="
group
relative
overflow-hidden
rounded-3xl
border
border-white/10
bg-slate-900/60
p-8
backdrop-blur-xl
transition-all
duration-300
hover:-translate-y-2
hover:border-indigo-500/40
hover:ring-2
hover:ring-indigo-500/20
hover:shadow-2xl
hover:shadow-indigo-500/20
"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 via-transparent to-violet-600/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-indigo-600/10 group-hover:to-violet-600/10" />

      {/* Content */}
      <div className="relative flex flex-col items-center text-center">
        {/* Icon */}
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:scale-105 group-hover:bg-white/10">
          <img
            src="/placeholder-category.png"
            alt={category.name}
            className="
h-14
w-14
object-contain
transition-all
duration-500
group-hover:scale-110
group-hover:-rotate-6
"
          />
        </div>

        {/* Category Name */}
        <h3 className="mt-6 text-xl font-bold text-white transition-colors duration-300 group-hover:text-indigo-400">
          {category.name}
        </h3>

        {/* Decorative Line */}
        <div className="mt-4 h-1 w-10 rounded-full bg-slate-700 transition-all duration-300 group-hover:w-20 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-violet-500" />
      </div>
    </Link>
  );
}
