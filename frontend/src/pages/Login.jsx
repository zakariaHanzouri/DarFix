import { useForm } from "react-hook-form";
import UseAuth from "../hooks/useAuth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "Should have at least one uppercase letter ")
    .regex(/[a-z]/, "Should have at least one uppercase letter ")
    .regex(/[0-9]/, "Should have some numbers  ")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "The password field must contain at least one symbol",
    ),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { login, loading } = UseAuth();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-6">
      <div className="w-full max-w-6xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center px-16 py-20 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 text-white relative overflow-hidden">
          <div className="absolute w-72 h-72 rounded-full bg-white/10 blur-3xl -top-20 -left-20"></div>
          <div className="absolute w-96 h-96 rounded-full bg-indigo-300/10 blur-3xl bottom-0 right-0"></div>

          <div className="relative z-10">
            <h1 className="text-5xl font-black tracking-wide">DarFix</h1>

            <p className="mt-6 text-lg text-indigo-100 leading-8">
              Connect with trusted professionals, and build something amazing
              together.
            </p>

            <div className="mt-12 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-white"></div>
                <span>Verified Professionals</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-white"></div>
                <span>Secure Services</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-white"></div>
                <span>Fast Reflextion</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-slate-900 px-8 md:px-16 py-14 flex items-center">
          <div className="w-full">
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-white">Welcome Back</h2>

              <p className="text-slate-400 mt-3">Sign in</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  {...register("email")}
                  placeholder="example@email.com"
                  className="w-full h-14 rounded-xl bg-slate-800 border border-slate-700 px-5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
                {errors.email && (
                  <p className="text-red-600 font-semibold">
                    {" "}
                    {errors.email.message}{" "}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  {...register("password")}
                  placeholder="••••••••••••"
                  className="w-full h-14 rounded-xl bg-slate-800 border border-slate-700 px-5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
                {errors.password && (
                  <p className="text-red-600 font-semibold">
                    {" "}
                    {errors.password.message}{" "}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold transition duration-300 shadow-lg shadow-indigo-600/30"
              >
                {loading ? "Sign In..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
