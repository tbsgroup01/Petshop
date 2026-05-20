import React, { useState } from "react";
import { 
  ChevronDown, Utensils, Home, Heart, 
  Dog, Cat, MousePointer2, Bone, PawPrint, ShoppingBag, HandHeart, Menu, X 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getDashboardPath, getStoredUser, isAuthenticated } from "../../../utils/auth";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const loggedIn = isAuthenticated();
  const user = getStoredUser();
  const profilePath =
    user?.role === "user" ? "/user/profile" : getDashboardPath(user?.role);

  const menuData = {
    "Pet": [
      { name: "Dog", icon: <Dog size={18} />, path: "/dog", color: "text-orange-500", bg: "bg-orange-50" },
      { name: "Cat", icon: <Cat size={18} />, path: "/cat", color: "text-amber-500", bg: "bg-amber-50" },
      { name: "Small Pets", icon: <MousePointer2 size={18} />, path: "/small-pets", color: "text-purple-500", bg: "bg-purple-50" },
    ],
    "Services": [
      { name: "Feeding", icon: <Utensils size={18} />, path: "/pet-care/feeding", color: "text-red-500", bg: "bg-red-50" },
      { name: "Habitat", icon: <Home size={18} />, path: "/pet-care/habitat", color: "text-emerald-500", bg: "bg-emerald-50" },
      { name: "Mating Services", icon: <Heart size={18} />, path: "/mating-services", color: "text-rose-500", bg: "bg-rose-50" },
    ],
    "List Your Pet": [
      { name: "For Adoption", icon: <HandHeart size={18} />, path: "/list-pet/adoption", color: "text-teal-500", bg: "bg-teal-50" },
      { name: "For Buy", icon: <ShoppingBag size={18} />, path: "/list-pet/buy", color: "text-blue-500", bg: "bg-blue-50" },
      { name: "For Mating", icon: <Heart size={18} />, path: "/list-pet/mating", color: "text-pink-500", bg: "bg-pink-50" },
    ],
    "Breeds": [
      { name: "Dog Breeds", icon: <Dog size={18} />, path: "/dog-breeds", color: "text-orange-600", bg: "bg-orange-100/50" },
      { name: "Cat Breeds", icon: <Cat size={18} />, path: "/cat-breeds", color: "text-amber-600", bg: "bg-amber-100/50" },
      { name: "Small Breeds", icon: <PawPrint size={18} />, path: "/small-breeds", color: "text-purple-600", bg: "bg-purple-100/50" },
    ],
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 sm:h-20 flex items-center justify-between px-3 sm:px-6 lg:px-10 bg-white/90 backdrop-blur-md border-b border-gray-100 z-[100] shadow-sm">
      <Link to="/" className="text-sm sm:text-lg lg:text-xl font-bold text-slate-800 flex items-center gap-1 sm:gap-2 group">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-100">
          <Bone className="text-white rotate-45" size={16} />
        </div>
        <span className="tracking-tight hidden sm:inline text-xs sm:text-sm">Shiva Dog Clinic</span>
      </Link>

      <div className="hidden lg:flex items-center space-x-7 h-full">
        <Link to="/" className={`${isActive('/') ? 'text-indigo-600' : 'text-slate-600'} hover:text-indigo-600 transition-colors font-bold text-[11px] uppercase tracking-widest`}>Home</Link>

        {Object.keys(menuData).map((menuName) => (
          <div key={menuName} className="relative group h-full flex items-center">
            <button className={`flex items-center font-bold text-[11px] uppercase tracking-widest transition-colors ${menuData[menuName].some(item => isActive(item.path)) ? 'text-indigo-600' : 'text-slate-600 group-hover:text-indigo-600'}`}>
              {menuName} <ChevronDown size={14} className="ml-1 group-hover:rotate-180 transition-transform duration-300" />
            </button>

            <div className="absolute top-[80%] left-[-20%] w-64 bg-white border border-gray-100 rounded-b-[2rem] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:top-[100%] transition-all duration-300 p-3 z-[110]">
              <div className="grid gap-1">
                {menuData[menuName].map((item) => (
                  <Link key={item.name} to={item.path} className={`group/item flex items-center gap-4 p-3 rounded-2xl transition-all ${isActive(item.path) ? 'bg-indigo-50' : 'hover:bg-slate-50'}`}>
                    <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-xl flex items-center justify-center shrink-0 group-hover/item:animate-bounce shadow-sm`}>
                      {item.icon}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className={`text-[13px] font-bold ${isActive(item.path) ? 'text-indigo-600' : 'text-slate-700'}`}>{item.name}</h4>
                      <p className="text-[10px] text-slate-400 font-medium truncate">Click to explore</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}

        <Link to="/blogs" className={`${isActive('/blogs') ? 'text-indigo-600' : 'text-slate-600'} hover:text-indigo-600 transition-colors font-bold text-[11px] uppercase tracking-widest`}>Blog</Link>
        <Link to="/contact" className={`${isActive('/contact') ? 'text-indigo-600' : 'text-slate-600'} hover:text-indigo-600 transition-colors font-bold text-[11px] uppercase tracking-widest`}>Contact</Link>
      </div>

      <div className="hidden lg:flex items-center space-x-5">
        {loggedIn ? (
          <Link to={profilePath} className="bg-indigo-600 text-white px-7 py-3 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95 text-sm">
            Profile
          </Link>
        ) : (
          <>
            <Link to="/login" className="text-slate-600 font-bold text-sm hover:text-indigo-600 transition-colors">Login</Link>
            <Link to="/signup" className="bg-indigo-600 text-white px-7 py-3 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95 text-sm">Sign Up</Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-slate-100 transition-colors"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 sm:top-20 left-0 w-full bg-white border-b border-gray-100 shadow-lg lg:hidden max-h-[calc(100vh-64px)] sm:max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-3 sm:px-6 py-3 sm:py-4 space-y-2 sm:space-y-3">
            {/* Home Link */}
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm uppercase tracking-widest transition-colors ${isActive('/') ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Home
            </Link>

            {/* Mobile Menu Items */}
            {Object.keys(menuData).map((menuName) => (
              <div key={menuName} className="border-t border-gray-100 pt-3">
                <button 
                  onClick={() => setExpandedMenu(expandedMenu === menuName ? null : menuName)}
                  className="w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 font-bold text-xs sm:text-sm uppercase tracking-widest text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  {menuName}
                  <ChevronDown size={16} className={`transition-transform ${expandedMenu === menuName ? 'rotate-180' : ''}`} />
                </button>

                {/* Submenu Items */}
                {expandedMenu === menuName && (
                  <div className="space-y-2 pl-4 py-2">
                    {menuData[menuName].map((item) => (
                      <Link 
                        key={item.name} 
                        to={item.path}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setExpandedMenu(null);
                        }}
                        className={`flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg transition-colors ${isActive(item.path) ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        <div className={`w-8 h-8 ${item.bg} ${item.color} rounded-lg flex items-center justify-center`}>
                          {item.icon}
                        </div>
                        <span className="text-sm font-bold">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="border-t border-gray-100 pt-2 sm:pt-3 space-y-1 sm:space-y-2">
              <Link 
                to="/blogs"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm uppercase tracking-widest transition-colors ${isActive('/blogs') ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                Blog
              </Link>
              <Link 
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm uppercase tracking-widest transition-colors ${isActive('/contact') ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                Contact
              </Link>
            </div>

            {/* Auth Links */}
            <div className="border-t border-gray-100 pt-2 sm:pt-3 space-y-1 sm:space-y-2">
              {loggedIn ? (
                <Link 
                  to={profilePath}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full bg-indigo-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-2xl font-bold text-xs sm:text-sm hover:bg-indigo-700 transition-colors text-center"
                >
                  Profile
                </Link>
              ) : (
                <>
                  <Link 
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full bg-indigo-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-2xl font-bold text-xs sm:text-sm hover:bg-indigo-700 transition-colors text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


// import React, { useState, useEffect } from "react";
// import { 
//   ChevronDown, Utensils, Home, Heart, 
//   Dog, Cat, MousePointer2, Bone, PawPrint, ShoppingBag, HandHeart, Menu, X 
// } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";

// const Navbar = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [expandedMenu, setExpandedMenu] = useState(null);
//   const location = useLocation();

//   // Page badalte hi menu band karne ke liye
//   useEffect(() => {
//     setMobileMenuOpen(false);
//     setExpandedMenu(null);
//   }, [location]);

//   const menuData = {
//     "Pets": [
//       { name: "Dogs", icon: <Dog size={18} />, path: "/dog", color: "text-orange-500", bg: "bg-orange-50" },
//       { name: "Cats", icon: <Cat size={18} />, path: "/cat", color: "text-amber-500", bg: "bg-amber-50" },
//       { name: "Small Pets", icon: <MousePointer2 size={18} />, path: "/small-pets", color: "text-purple-500", bg: "bg-purple-50" },
//     ],
//     "Breeds": [
//       { name: "Dog Breeds", icon: <Dog size={18} />, path: "/dog-breeds", color: "text-orange-600", bg: "bg-orange-100/50" },
//       { name: "Cat Breeds", icon: <Cat size={18} />, path: "/cat-breeds", color: "text-amber-600", bg: "bg-amber-100/50" },
//       { name: "Small Breeds", icon: <PawPrint size={18} />, path: "/small-breeds", color: "text-purple-600", bg: "bg-purple-100/50" },
//     ],
//     "Services": [
//       { name: "Mating Services", icon: <Heart size={18} />, path: "/mating-services", color: "text-rose-500", bg: "bg-rose-50" },
//       { name: "Pet Care", icon: <Utensils size={18} />, path: "/pet-care/general", color: "text-red-500", bg: "bg-red-50" },
//     ],
//     "Listings": [
//       { name: "For Adoption", icon: <HandHeart size={18} />, path: "/list-pet/adoption", color: "text-teal-500", bg: "bg-teal-50" },
//       { name: "For Buy", icon: <ShoppingBag size={18} />, path: "/list-pet/buy", color: "text-blue-500", bg: "bg-blue-50" },
//     ]
//   };

//   return (
//     <>
//       <nav className="fixed top-0 left-0 w-full h-16 sm:h-20 bg-white border-b border-gray-100 z-[100] shadow-sm flex items-center justify-between px-4 sm:px-10">
        
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-2 shrink-0">
//           <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
//             <Bone className="text-white rotate-45" size={18} />
//           </div>
//           <span className="font-bold text-slate-800 text-base sm:text-lg">Shiva Dog Clinic</span>
//         </Link>

//         {/* Desktop Links (Hidden on Mobile) */}
//         <div className="hidden lg:flex items-center space-x-7">
//           <Link to="/" className="text-[11px] font-bold uppercase tracking-widest text-slate-600 hover:text-indigo-600">Home</Link>
          
//           {Object.keys(menuData).map((menuName) => (
//             <div key={menuName} className="relative group flex items-center h-16">
//               <button className="flex items-center font-bold text-[11px] uppercase tracking-widest text-slate-600 group-hover:text-indigo-600">
//                 {menuName} <ChevronDown size={14} className="ml-1 group-hover:rotate-180 transition-transform" />
//               </button>

//               <div className="absolute top-full left-0 w-56 bg-white border border-gray-100 rounded-b-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2">
//                 {menuData[menuName].map((item) => (
//                   <Link key={item.name} to={item.path} className="flex items-center gap-3 p-2.5 hover:bg-slate-50 rounded-xl">
//                     <div className={`w-8 h-8 ${item.bg} ${item.color} rounded-lg flex items-center justify-center`}>{item.icon}</div>
//                     <span className="text-xs font-bold text-slate-700">{item.name}</span>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           ))}
//           <Link to="/blogs" className="text-[11px] font-bold uppercase tracking-widest text-slate-600 hover:text-indigo-600">Blog</Link>
//           <Link to="/contact" className="text-[11px] font-bold uppercase tracking-widest text-slate-600 hover:text-indigo-600">Contact</Link>
//         </div>

//         {/* Mobile Toggle & Desktop Auth */}
//         <div className="flex items-center gap-3">
//           <div className="hidden sm:flex gap-3">
//             <Link to="/login" className="px-4 py-2 text-xs font-bold text-slate-600">Login</Link>
//             <Link to="/signup" className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs">Sign Up</Link>
//           </div>

//           {/* Three Lines Hamburger Icon */}
//           <button 
//             onClick={() => setMobileMenuOpen(true)}
//             className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
//           >
//             <Menu size={28} />
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Drawer Overlay */}
//       <div 
//         className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[150] transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
//         onClick={() => setMobileMenuOpen(false)}
//       />

//       {/* Mobile Sidebar (Drawer) */}
//       <div className={`fixed top-0 right-0 h-full w-[280px] bg-white z-[200] shadow-2xl transition-transform duration-300 ease-in-out transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
//         <div className="flex flex-col h-full">
//           <div className="flex items-center justify-between p-5 border-b">
//             <span className="font-bold text-slate-800">Menu</span>
//             <button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
//           </div>

//           <div className="flex-1 overflow-y-auto p-4 space-y-2">
//             <Link to="/" className="block p-3 font-bold text-sm text-slate-600 hover:bg-indigo-50 rounded-xl">Home</Link>
            
//             {Object.keys(menuData).map((menuName) => (
//               <div key={menuName}>
//                 <button 
//                   onClick={() => setExpandedMenu(expandedMenu === menuName ? null : menuName)}
//                   className="w-full flex items-center justify-between p-3 font-bold text-sm text-slate-600"
//                 >
//                   {menuName} <ChevronDown size={16} className={expandedMenu === menuName ? "rotate-180" : ""} />
//                 </button>
//                 {expandedMenu === menuName && (
//                   <div className="bg-slate-50 rounded-xl p-2 ml-2 space-y-1">
//                     {menuData[menuName].map((item) => (
//                       <Link key={item.name} to={item.path} className="flex items-center gap-3 p-2">
//                         <div className={`w-8 h-8 ${item.bg} ${item.color} rounded-lg flex items-center justify-center`}>{item.icon}</div>
//                         <span className="text-xs font-bold text-slate-600">{item.name}</span>
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
            
//             <Link to="/blogs" className="block p-3 font-bold text-sm text-slate-600">Blog</Link>
//             <Link to="/contact" className="block p-3 font-bold text-sm text-slate-600">Contact</Link>
//           </div>

//           <div className="p-4 border-t space-y-3">
//             <Link to="/login" className="block w-full py-3 text-center font-bold text-sm text-slate-600 bg-slate-50 rounded-xl">Login</Link>
//             <Link to="/signup" className="block w-full py-3 text-center font-bold text-sm text-white bg-indigo-600 rounded-xl">Sign Up</Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;
