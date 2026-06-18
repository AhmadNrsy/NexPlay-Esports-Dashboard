import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import authService from "../services/authService";
import {
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  Gamepad2,
  Monitor,
} from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // 1. Tembak API CI4 lu pake authService
      const response = await authService.login(username, password);

      // 2. THE FIX: Ekstrak token JWT asli dari response backend
      // CI4 lu ngebungkus tokennya di dalem object 'data'
      const actualToken = response.data?.token || response.token;

      if (actualToken) {
        // 3. Masukin token asli ke Context (otomatis ke-save ke localStorage)
        login(actualToken);
        navigate("/dashboard");
      } else {
        setError("Token tidak ditemukan. Cek struktur response CI4 lu.");
      }
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans selection:bg-[var(--color-primary)] selection:text-white">
      {/* ================= LEFT SIDE (LOGIN FORM) ================= */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 sm:p-12 relative animate-fade-in">
        {/* Mobile Logo (Hidden on Desktop) */}
        <div className="absolute top-8 left-8 flex lg:hidden items-center gap-2">
          <div className="w-8 h-8 bg-[var(--color-primary)] text-white rounded-lg flex items-center justify-center font-bold">
            N
          </div>
          <span className="font-bold text-[var(--color-ink-primary)]">
            NexPlay
          </span>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-[var(--color-ink-primary)] tracking-tight mb-2">
              Welcome Back.
            </h1>
            <p className="text-[var(--color-ink-muted)]">
              Sign in to manage your esports facility.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-sm flex items-start gap-2 animate-fade-in">
              <ShieldCheck size={18} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1.5">
              {/* Note: Ingat masukin USERNAME, bukan Email ya bro! */}
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Username
              </label>
              <div className="relative group">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your admin username"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-soft)] focus:border-[var(--color-primary)] transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors"
                  size={20}
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-soft)] focus:border-[var(--color-primary)] transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <span className="text-sm text-gray-600 font-medium">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white py-4 rounded-xl font-bold text-base shadow-[var(--shadow-raised)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-4 group"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-xs text-gray-400 font-medium">
            © 2026 NexPlay Esports Management. All rights reserved.
          </p>
        </div>
      </div>

      {/* ================= RIGHT SIDE (BRANDING / HERO) ================= */}
      <div className="hidden lg:flex w-[55%] bg-[#0B0F19] relative overflow-hidden items-center justify-center p-12">
        <div className="absolute top-0 right-0 w-full h-full opacity-40">
          <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-[var(--color-primary)] rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-indigo-600 rounded-full blur-[100px] opacity-60"></div>
        </div>

        <div className="relative z-10 w-full max-w-lg">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white text-[var(--color-primary)] rounded-xl flex items-center justify-center font-black text-2xl shadow-xl">
              N
            </div>
            <div>
              <h2 className="font-bold text-white text-2xl tracking-tight leading-none">
                NexPlay
              </h2>
              <p className="text-[11px] text-gray-400 font-semibold tracking-widest uppercase">
                Elite Esports Mgmt
              </p>
            </div>
          </div>

          <h2 className="text-5xl font-black text-white leading-[1.1] mb-6">
            Command Center for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              Esports Excellence.
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-md">
            Streamline your gaming facility, monitor PC telemetry, and manage
            tournaments with industrial-grade precision.
          </p>

          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs font-semibold text-gray-400">
                System Status: <span className="text-green-400">Online</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 flex flex-col gap-2">
                <Gamepad2 size={24} className="text-purple-400" />
                <span className="text-sm text-gray-300">Active Sessions</span>
                <span className="text-2xl font-bold text-white">142</span>
              </div>
              <div className="bg-white/5 rounded-xl p-4 flex flex-col gap-2">
                <Monitor size={24} className="text-blue-400" />
                <span className="text-sm text-gray-300">Fleet Health</span>
                <span className="text-2xl font-bold text-white">98%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-20"></div>
      </div>
    </div>
  );
};

export default Login;
