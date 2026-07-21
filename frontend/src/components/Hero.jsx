import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* Glow Effects */}
      

      <div className="relative max-w-6xl mx-auto px-6 py-15 md:py-15">

        <div className="text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
            <ShieldCheck size={16} />
            Trusted Professionals Across Morocco
          </div>

          {/* Title */}
          <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-white">
            Find The Right
            <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Professional
            </span>
            For Every Job
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-400 leading-8">
            From electricians and plumbers to painters and cleaners,
            DarFix helps you connect with trusted professionals quickly
            and easily.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

            <Link
              to="/services"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-white font-semibold hover:opacity-90 transition"
            >
              Explore Services
              <ArrowRight size={18} />
            </Link>

          

          </div>

         
        

        </div>

      </div>
    </section>
  );
}