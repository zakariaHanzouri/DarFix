import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Briefcase,
  ShieldCheck,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Top */}
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-4xl font-black tracking-wide text-white"
            >
              Dar<span className="text-indigo-500">Fix</span>
            </Link>

            <p className="mt-5 text-slate-400 leading-7 max-w-md">
              Find trusted professionals, hire with confidence,
              and manage every project from one modern platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <span className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900 px-4 py-2 text-sm text-slate-300">
                <ShieldCheck size={16} className="text-indigo-400" />
                Trusted Platform
              </span>

              <span className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900 px-4 py-2 text-sm text-slate-300">
                <Briefcase size={16} className="text-indigo-400" />
                Professional Services
              </span>

            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              Explore
            </h3>

            <div className="space-y-4">

              <Link
                to="/"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition"
              >
                <ArrowRight size={16} />
                Home
              </Link>

              <Link
                to="/services"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition"
              >
                <ArrowRight size={16} />
                Services
              </Link>


            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              Contact
            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-3 text-slate-400">
                <Mail className="text-indigo-500" size={18} />
                support@darfix.com
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <Phone className="text-indigo-500" size={18} />
                +212 600 000 000
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <MapPin className="text-indigo-500" size={18} />
                Casablanca, Morocco
              </div>

            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 mt-8 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-white font-semibold hover:opacity-90 transition"
            >
              Explore Services
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} DarFix. Built for trusted professionals.
          </p>

          <div className="flex gap-6 text-sm">

            <Link
              to="/privacy"
              className="text-slate-500 hover:text-indigo-400 transition"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="text-slate-500 hover:text-indigo-400 transition"
            >
              Terms
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}