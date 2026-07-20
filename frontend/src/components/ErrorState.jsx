import { Link } from "react-router-dom";

export default function ErrorState({
  icon,
  title,
  description,
  onRetry,
}) {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center p-6">
      <div className="relative group max-w-lg w-full">
        
        {/* Animated Background Glow (Red version) */}
        <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>

        <div className="relative bg-[#0a0a0c] border border-white/5 p-10 rounded-[2.5rem] overflow-hidden shadow-2xl">
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Pulsing Icon Effect (Red Tint) */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-rose-500 blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative h-28 w-28 flex items-center justify-center rounded-3xl bg-rose-500/10 border border-rose-500/20 backdrop-blur-md">
                <div className="text-4xl text-rose-400" size={40}>
                  {icon}
                </div>
              </div>
            </div>

            {/* Typography */}
            <h2 className="text-4xl font-black text-white tracking-tighter mb-4">
              {title}
            </h2>
            <p className="text-slate-400 text-center text-lg leading-relaxed max-w-sm mb-10">
              {description}
            </p>

            {/* Error Action Button */}
            
              <button
                onClick={onRetry}
                className="relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-white/5 px-8 py-4 font-bold text-white transition-all hover:bg-rose-600 hover:ring-2 hover:ring-rose-400 hover:ring-offset-2 hover:ring-offset-[#0a0a0c] active:scale-95 shadow-xl"
              >
                <span className="relative z-10">Refresh</span>
              </button>
          
          </div>
        </div>
      </div>
    </div>
  );
}