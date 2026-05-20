// import React from 'react';
// import { Search, HelpCircle } from 'lucide-react';
// import NotificationBell from '../Components/NotificationBell';

// const Header = ({
//   search = '',
//   setSearch = () => {}
// }) => {

//   return (
//     <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">

//       {/* Search */}
//       {/* <div className="relative w-96">
//         <Search
//           className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//           size={18}
//         />

//         <input
//           type="text"
//           value={search}
//           onChange={(e) =>
//             setSearch(e.target.value)
//           }
//           placeholder="Search pets, inquiries or reports..."
//           className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none border border-transparent focus:border-indigo-300"
//         />
//       </div> */}

//       {/* Right Side */}
//       <div className="flex items-center gap-4">

//         {/* Notification */}
//         <NotificationBell />

//         {/* Help */}
//         <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full">
//           <HelpCircle size={20} />
//         </button>

//         {/* Profile */}
//         <div className="flex items-center gap-3 ml-4 pl-4 border-l">
//           <div className="text-right">
//             <p className="text-sm font-bold">
//               Dr. Sarah Miller
//             </p>
// {/*
//             <p className="text-xs text-gray-500">
//               ID: 882342
//             </p> */}
//           </div>

//           <img
//             src="https://i.pravatar.cc/150?u=sarah"
//             alt="Profile"
//             className="w-10 h-10 rounded-full border-2 border-indigo-100"
//           />
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from "react";
import { Search, HelpCircle } from "lucide-react";
import NotificationBell from "../Components/NotificationBell";

const Header = ({ search = "", setSearch = () => {} }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-4 sm:px-6 md:px-8">
      {/* Right Side */}
      <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
        {/* Notification */}
        <NotificationBell />

        {/* Help */}
        <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full">
          <HelpCircle size={20} />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 sm:gap-3 ml-2 pl-2 sm:ml-4 sm:pl-4 border-l">
          <div className="text-right hidden xs:block">
            <p className="text-sm font-bold whitespace-nowrap">
              Dr. Sarah Miller
            </p>
          </div>

          <img
            src="https://i.pravatar.cc/150?u=sarah"
            alt="Profile"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-indigo-100 flex-shrink-0"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
