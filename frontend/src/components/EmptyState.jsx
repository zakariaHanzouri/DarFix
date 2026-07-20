import { Link } from "react-router-dom";

export default function EmptyState({ icon, title, description, actionLabel, actionLink }) {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center p-6 selection:bg-indigo-500/30">
      <div className="relative group max-w-lg w-full">
        
        {/* Animated Background Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

        <div className="relative bg-[#0a0a0c] border border-white/10 p-10 rounded-[2.5rem] overflow-hidden shadow-2xl">
          
          {/* Decorative Top Grid/Lines */}
          <div className="absolute inset-0  opacity-20"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

          <div className="relative z-10 flex flex-col items-center">
            
            {/* Pulsing Icon Effect */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative h-28 w-28 flex items-center justify-center rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="text-4xl text-indigo-400 "size={34}>
                  {icon}
                </div>
              </div>
            </div>

            {/* Typography */}
            <h2 className="text-4xl font-black text-white tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              {title}
            </h2>
            <p className="text-slate-400 text-center text-lg leading-relaxed max-w-sm mb-10">
              {description}
            </p>

            {/* Premium Button */}
            {actionLabel && actionLink && (
              <Link
                to={actionLink}
                className="relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-indigo-600 px-8 py-4 font-bold text-white transition-all hover:bg-indigo-500 hover:ring-2 hover:ring-indigo-400 hover:ring-offset-2 hover:ring-offset-[#0a0a0c] active:scale-95 shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)]"
              >
                <span className="relative z-10">{actionLabel}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-[shine_1s_ease-in-out]"></div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}