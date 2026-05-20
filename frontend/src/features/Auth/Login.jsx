import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Star, PawPrint } from 'lucide-react';
import { authService } from '../../services';
import { getDashboardPath, normalizeRole, saveAuthSession } from '../../utils/auth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const { data } = await authService.login({ email, password });
      const token = data?.token;
      const user = data?.user;

      if (!token || !user) {
        throw new Error('Invalid login response from server');
      }

      saveAuthSession(token, user);

      const role = normalizeRole(user.role);
      const roleDashboard = getDashboardPath(role);
      const requestedPath = location.state?.from?.pathname;

      const isRoleMatchedRedirect =
        (role === 'admin' && requestedPath?.startsWith('/admin')) ||
        (role === 'vendor' && requestedPath?.startsWith('/vendor')) ||
        (role === 'user' && requestedPath?.startsWith('/user'));

      navigate(isRoleMatchedRedirect ? requestedPath : roleDashboard, { replace: true });
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Login failed';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F3F5FF] flex items-center justify-center p-4 md:p-10 pt-0 py-60 font-sans overflow-x-hidden">
      <div className="max-w-6xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="hidden md:flex md:w-[40%] relative p-10 flex flex-col justify-between text-white shrink-0">
          <div className="absolute inset-0 z-0">
            <img
              src="https://img.magnific.com/free-photo/young-lightskinned-brunette-woman-kisses-her-beloved-dog-tightly-while-holding-arms-pink-background-love-pets-joy-tenderness_197531-31334.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Woman with Dog"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/20 to-indigo-600/90" />
          </div>

          <div className="relative z-10">
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl inline-flex items-center gap-2 border border-white/20">
              <PawPrint size={18} fill="currentColor" />
              <span className="font-bold tracking-tight text-sm">ShivaDogClinic</span>
            </div>
          </div>

          <div className="relative z-10">
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-6">
              Welcome back to our community.
            </h1>

            <div className="bg-white rounded-2xl p-4 shadow-lg text-slate-800 max-w-[280px]">
              <div className="flex gap-1 mb-2 text-emerald-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
              </div>
              <p className="italic text-slate-600 mb-3 leading-relaxed text-[10px]">
                "The best platform to manage my pet's health and find services."
              </p>
              <div className="flex items-center gap-3">
                <img src="https://i.pravatar.cc/100?u=sarah" alt="Sarah" className="w-6 h-6 rounded-full" />
                <div>
                  <p className="font-bold text-[9px] text-slate-700 uppercase">Sarah Jenkins</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-8 md:p-12 flex flex-col bg-white overflow-y-auto">
          <div className="max-w-sm mx-auto w-full my-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-1">Login</h2>
              <p className="text-slate-400 text-[11px] font-medium">Enter your credentials to access your account.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1.5 uppercase tracking-widest">Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 text-sm transition-all focus:ring-4 focus:ring-indigo-50"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest">Password</label>
                  <Link to="/forgot-password" size="sm" className="text-[10px] font-bold text-indigo-600 hover:underline">
                    Forgot?
                  </Link>
                </div>
                <input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 text-sm transition-all focus:ring-4 focus:ring-indigo-50"
                  required
                />
              </div>

              {errorMessage && <p className="text-red-500 text-xs font-semibold">{errorMessage}</p>}

              <div className="flex items-center gap-2 py-1">
                <input type="checkbox" id="remember" className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-0 cursor-pointer" />
                <label htmlFor="remember" className="text-[10px] text-slate-500 font-medium cursor-pointer">Remember me on this device</label>
              </div>

              <button disabled={isLoading} className="w-full py-3 bg-[#4F46E5] text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>

              <div className="relative py-3 text-center">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-100" />
                <span className="bg-white px-4 text-slate-400 text-[8px] font-black uppercase relative z-10 tracking-[0.2em]">OR</span>
              </div>

              <button type="button" className="w-full py-2.5 border border-slate-200 rounded-xl font-bold text-slate-700 flex items-center justify-center gap-3 hover:bg-slate-50 transition-all text-[11px]">
                <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4" alt="Google" />
                Sign in with Google
              </button>
            </form>

            <p className="text-center mt-6 text-slate-500 text-[11px]">
              Don't have an account? <Link to="/signup" className="text-indigo-600 font-bold hover:underline">Create account</Link>
            </p>
          </div>

          <p className="text-center mt-auto pt-6 text-slate-300 text-[8px] font-bold uppercase tracking-widest">
            © 2026 ShivaDogClinic Security
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
