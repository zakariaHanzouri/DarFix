import { Link } from "react-router-dom";
import { Clock3, ArrowRight } from "lucide-react";

export default function ServiceCard({ service }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10">

      {/* Image */}

      <div className="overflow-hidden h-52">

        <img
          src="/placeholder-service.png"
          alt={service.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

      </div>

      {/* Content */}

      <div className="p-6">

        {/* Category */}

        <span className="inline-block rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400">
          {service.category?.name}
        </span>

        {/* Title */}

        <h3 className="mt-4 text-xl font-bold text-white line-clamp-2">
          {service.title}
        </h3>

        {/* Description */}

        <p className="mt-3 text-sm leading-6 text-slate-400 line-clamp-2">
          {service.description}
        </p>

        {/* Artisan */}

        <p className="mt-5 text-sm text-slate-300">
          by{" "}
          <span className="font-semibold">
            {service.artisan?.name}
          </span>
        </p>

        {/* Bottom */}

        <div className="mt-6 flex items-center justify-between">

          <div>

            <h4 className="text-2xl font-bold text-white">
              ${service.price}
            </h4>

            <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">

              <Clock3 size={15} />

              {service.duration} h

            </div>

          </div>

          <Link
            to={`/services/${service.id}`}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white transition hover:scale-105"
          >
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>

    </div>
  );
}