import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { Button } from "../../components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("stanley@gmail.com");
  const [password, setPassword] = useState("Password123");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // specific mock user
      dispatch(
        setCredentials({
          user: {
            id: "1",
            name: "Stanley",
            email: email,
            role: "ADMIN",
          },
          token: "mock-token",
        }),
      );
      navigate("/");
    }, 1000);
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="w-full max-w-6xl bg-background-light dark:bg-background-dark rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[700px]">
        <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative">
          <div className="absolute top-8 left-8 sm:left-12 lg:left-16 flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-md shadow-sm"></div>
            <span className="font-bold text-lg tracking-wide text-gray-900 dark:text-white">
              Finnger
            </span>
          </div>
          <div className="mt-12 md:mt-0 mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Holla, <br />
              Welcome Back
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              Hey, welcome back to your special place
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="sr-only" htmlFor="email">
                Email address
              </label>
              <input
                autoComplete="email"
                className="block w-full rounded-xl border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-surface-dark dark:border-gray-700 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500"
                id="email"
                name="email"
                placeholder="stanley@gmail.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <input
                autoComplete="current-password"
                className="block w-full rounded-xl border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-surface-dark dark:border-gray-700 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500"
                id="password"
                name="password"
                placeholder="••••••••••••••••"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                />
                <label
                  className="ml-2 block text-sm text-gray-600 dark:text-gray-400"
                  htmlFor="remember-me">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  className="font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                  href="#">
                  Forgot Password?
                </a>
              </div>
            </div>
            <div>
              <Button
                className="flex w-full justify-center rounded-xl bg-primary px-3 py-3.5 text-sm font-bold leading-6 text-white shadow-lg hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all transform hover:scale-[1.01]"
                type="submit"
                isLoading={isLoading}>
                Sign In
              </Button>
            </div>
          </form>
          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              className="font-semibold leading-6 text-primary hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
              to="/register">
              Sign Up
            </Link>
          </p>
        </div>
        <div className="hidden md:flex md:w-1/2 illustration-bg relative items-center justify-center p-8 overflow-hidden">
          <style>{`
            .illustration-bg {
              background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%);
            }
          `}</style>
          <div className="absolute top-10 left-10 w-24 h-12 bg-white/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-16 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10 max-w-md w-full transform transition-transform hover:scale-105 duration-500">
            <img
              alt="3D illustration of a secure mobile phone with biometric fingerprint scanning concepts in a purple environment"
              className="w-full h-auto object-contain drop-shadow-2xl rounded-2xl mix-blend-normal opacity-90"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAT0A1cEly_J_c9t9nf_GoWvXpqm9C9mIhcruBVjbvwQdjAai2c2Uctdilxpa_Qq7s2IS6wxOYq2q43rGQWP7DWwCqZiA06yt6hgiJQSjQMEVgMBFOXQaTNuNgKQRgPd_tFFbg2JHlGfME8uA0e4SzJA8bk0--VpVf8NX9-O5hWhiwhDLKM5HrCYwFGt4NYVSt-qJrOcFLL-P16HNtfejz6URoiL8Zd80n5DgZ3dmEAVQxKwwY2DaPIVMmNH6DAeTar1yvgzApASg86"
            />
            <div
              className="absolute -top-6 -left-6 bg-white dark:bg-surface-dark p-3 rounded-2xl shadow-xl animate-bounce"
              style={{ animationDuration: "3s" }}>
              <span className="material-icons-round text-primary text-3xl">
                check_circle
              </span>
            </div>
            <div
              className="absolute bottom-10 -right-4 bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-xl animate-bounce"
              style={{ animationDuration: "4s", animationDelay: "1s" }}>
              <span className="material-icons-round text-primary text-4xl">
                lock
              </span>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent mix-blend-overlay pointer-events-none"></div>
        </div>
      </div>
      <button
        className="fixed bottom-4 right-4 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 z-50 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
        onClick={toggleDarkMode}
        title="Toggle Dark Mode">
        <span className="material-icons-round dark:hidden">dark_mode</span>
        <span className="material-icons-round hidden dark:block">
          light_mode
        </span>
      </button>
    </div>
  );
}
