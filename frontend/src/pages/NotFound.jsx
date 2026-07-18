import { Link } from "react-router-dom";
import { SearchX, ArrowLeft, Home, Wrench } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-6">

      <div className="max-w-2xl w-full text-center">

        {/* Icon */}
        <div className="mx-auto mb-8 w-28 h-28 rounded-full bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center">
          <SearchX className="w-14 h-14 text-indigo-400" />
        </div>

        {/* 404 */}
        <h1 className="text-8xl font-black text-white tracking-tight">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-white">
          We couldn't find this service.
        </h2>

        <p className="mt-5 text-slate-400 leading-8 max-w-xl mx-auto">
          The page you're looking for may have been moved, removed,
          or never existed. Don't worry, there are still plenty of
          trusted professionals waiting to help you on DarFix.
        </p>

        {/* Decorative Card */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

          <div className="flex items-center justify-center gap-3 text-slate-300">
            <Wrench className="text-indigo-400" size={22} />
            <span>Your next professional is just one click away.</span>
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-white font-semibold hover:opacity-90 transition"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            to="/services"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-6 py-3 text-slate-300 hover:text-white hover:border-indigo-500 transition"
          >
            <ArrowLeft size={18} />
            Browse Services
          </Link>

        </div>

      </div>

    </div>
  );
}