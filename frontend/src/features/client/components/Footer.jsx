import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#F8F9FE] px-3 sm:px-6 md:px-10 py-6  sm:py-10 md:py-16">
      {/* Main Footer Box */}
      <div className="bg-white rounded-lg sm:rounded-2xl p-4 sm:p-8 md:p-12 lg:p-16 shadow-sm border border-gray-100 w-full">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 md:gap-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="text-base sm:text-xl font-bold text-slate-800 mb-3 sm:mb-6">
              Shiva Dog Clinic
            </h2>
            <p className="text-slate-500 text-xs sm:text-base leading-relaxed">
              Building the future of pet healthcare and clinical breed sourcing
              with trust and transparency.
            </p>
          </div>

          {/* Resources Column */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h3 className="text-slate-400 font-bold text-xs tracking-widest uppercase mb-3 sm:mb-6">
              Resources
            </h3>
            <ul className="space-y-2 sm:space-y-4 text-slate-600 font-medium text-xs sm:text-base">
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">
                Pet
              </li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">
                Services
              </li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">
                Breeds
              </li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">
                Blog
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h3 className="text-slate-400 font-bold text-xs tracking-widest uppercase mb-3 sm:mb-6">
              Support
            </h3>
            <ul className="space-y-2 sm:space-y-4 text-slate-600 font-medium text-xs sm:text-base">
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">
                About Us
              </li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">
                Contact
              </li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">
                FAQ
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-slate-400 font-bold text-xs tracking-widest uppercase mb-3 sm:mb-6">
              Legal
            </h3>
            <ul className="space-y-2 sm:space-y-4 text-slate-600 font-medium text-xs sm:text-base">
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">
                Privacy Policy
              </li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">
                Terms of Service
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mt-6 sm:mt-10 md:mt-12 pt-4 sm:pt-8">
          <p className="text-slate-500 text-xs sm:text-sm">
            � 2026 Shiva Dog Clinic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
