import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronsRight, Home } from "lucide-react";

const Breadcrumbs = () => {
  const location = useLocation();
  
  // In paths par breadcrumbs nahi dikhenge
  const excludedPaths = ["/", "/login", "/signup", "/forgot-password", "/create-account", "/contact"];

  if (excludedPaths.includes(location.pathname) || location.pathname.startsWith("/list-pet")) {
    return null;
  }

  const pathnames = location.pathname
    .split("/")
    .filter((x) => x && x.toLowerCase() !== "pet-care");

  return (
    <nav 
      // 'absolute' taaki ye layout space na le aur hero section upar chipak jaye
      // 'top-20' ya 'top-24' ko navbar ki height ke hisaab se adjust karein
      // 'left-6' ya 'md:left-12' se breadcrumbs left mein align ho jayenge
      className="absolute top-18 left-52 md:left-12 lg:left-310 z-[40] pointer-events-none" 
      aria-label="Breadcrumb"
    >
      <div className="bg-white/80 backdrop-blur-md border border-slate-200 px-3 py-1.5 mt-2.5  rounded-xl shadow-sm inline-block pointer-events-auto">
        <ol className="flex items-center list-none p-0 m-0 flex-nowrap overflow-x-auto no-scrollbar">
          
          {/* Home Link */}
          <li className="flex items-center shrink-0">
            <Link 
              to="/" 
              className="flex items-center text-[10px] md:text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-all uppercase tracking-wider"
            >
              <Home size={12} className="mr-1.5 md:size-3.5" />
              Home
            </Link>
          </li>

          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            
            return (
              <li key={to} className="flex items-center shrink-0">
                <div className="flex items-center justify-center px-1.5">
                  <ChevronsRight 
                    size={14} 
                    className="text-slate-400 stroke-[2.5px]" 
                  />
                </div>
                
                {last ? (
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-slate-900 whitespace-nowrap bg-slate-100/80 px-2 py-0.5 rounded-md">
                    {value.replace(/-/g, " ")}
                  </span>
                ) : (
                  <Link 
                    to={to} 
                    className="text-[10px] md:text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-all uppercase tracking-wider whitespace-nowrap"
                  >
                    {value.replace(/-/g, " ")}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;


