import z from "zod";
import UseAuth from "../hooks/UseAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const schema = z
  .object({
    name: z.string().trim().min(2, "Name is required"),
    email: z.string().email().trim(),
    city: z.string().trim().min(2, "City is required"),
    phone: z.string().trim().min(2, "phone is required"),
    password: z
      .string()
      .min(8, "must be at least 8 characters")
      .regex(/[A-Z]/, "Should have at least one uppercase letter ")
      .regex(/[a-z]/, "Should have at least one lower letter ")
      .regex(/[0-9]/, "Should have some numbers  ")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "The password field must contain at least one symbol",
      ),
    password_confirmation: z.string().min(8, "must be at least 8 characters"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "password Not match",
    path: ["password_confirmation"],
  });
function Register() {
  const { register: registerUser, loading } = UseAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center px-16 py-20 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 text-white relative overflow-hidden">
          <div className="absolute w-72 h-72 rounded-full bg-white/10 blur-3xl -top-20 -left-20"></div>
          <div className="absolute w-96 h-96 rounded-full bg-indigo-300/10 blur-3xl bottom-0 right-0"></div>

          <div className="relative z-10">
            <h1 className="text-5xl font-black tracking-wide">DarFix</h1>

            <p className="mt-6 text-lg text-indigo-100 leading-8">
              Join the DarFix community and connect with trusted clients and
              skilled professionals across your city.
            </p>

            <div className="mt-12 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-white"></div>
                <span>Create your profile in seconds</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-white"></div>
                <span>Find trusted opportunities</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-white"></div>
                <span>Grow your business with DarFix</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-slate-900 px-8 md:px-16 py-14 flex items-center">
          <div className="w-full">
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-white">Create Account</h2>

              <p className="text-slate-400 mt-3">
                Fill in your information to get started.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  {...register("name")}
                  placeholder="John Doe"
                  className="w-full h-14 rounded-xl bg-slate-800 border border-slate-700 px-5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.name && (
                  <p className="font-semibold text-red-600">
                    {" "}
                    {errors.name.message}{" "}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  {...register("email")}
                  placeholder="example@email.com"
                  className="w-full h-14 rounded-xl bg-slate-800 border border-slate-700 px-5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.email && (
                  <p className="font-semibold text-red-600">
                    {" "}
                    {errors.email.message}{" "}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    {...register("phone")}
                    placeholder="+212 6XXXXXXXX"
                    className="w-full h-14 rounded-xl bg-slate-800 border border-slate-700 px-5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errors.phone && (
                    <p className="font-semibold text-red-600">
                      {" "}
                      {errors.phone.message}{" "}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    City
                  </label>

                  <input
                    type="text"
                    {...register("city")}
                    placeholder="Casablanca"
                    className="w-full h-14 rounded-xl bg-slate-800 border border-slate-700 px-5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errors.city && (
                    <p className="font-semibold text-red-600">
                      {" "}
                      {errors.city.message}{" "}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  {...register("password")}
                  placeholder="••••••••••"
                  className="w-full h-14 rounded-xl bg-slate-800 border border-slate-700 px-5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.password && (
                  <p className="font-semibold text-red-600">
                    {" "}
                    {errors.password.message}{" "}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  {...register("password_confirmation")}
                  placeholder="••••••••••"
                  className="w-full h-14 rounded-xl bg-slate-800 border border-slate-700 px-5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.password_confirmation && (
                  <p className="font-semibold text-red-600">
                    {" "}
                    {errors.password_confirmation.message}{" "}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-indigo-600/30"
              >
                {loading ? "Create Account..." : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
