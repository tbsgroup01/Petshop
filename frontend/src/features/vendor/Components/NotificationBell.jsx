// import React, { useEffect, useState } from 'react';
// import { Bell } from 'lucide-react';
// import { loadUnreadInquiries } from '../utils/petStorage';
// import { Link } from 'react-router-dom';

// // import {
// //   loadUnreadInquiries,
// //   clearUnreadInquiries
// // } from '../utils/petStorage';

// const NotificationBell = ({ className = '', iconClassName = '', count: propCount, onClick }) => {
//   const [count, setCount] = useState(propCount ?? loadUnreadInquiries());

//   useEffect(() => {
//     const refreshCount = () => setCount(loadUnreadInquiries());
//     window.addEventListener('focus', refreshCount);
//     window.addEventListener('petshop.inquiryUpdated', refreshCount);
//     return () => {
//       window.removeEventListener('focus', refreshCount);
//       window.removeEventListener('petshop.inquiryUpdated', refreshCount);
//     };
//   }, []);

//   useEffect(() => {
//     if (typeof propCount === 'number') {
//       setCount(propCount);
//     }
//   }, [propCount]);

//   return (
//     <Link to="/inquiries"
//       type="button"
//       onClick={onClick}
//       className={`relative ${className}`}
//     >
//       <Bell size={20} className={`transition ${iconClassName || 'text-gray-400 hover:text-indigo-600'}`} />
//       {count > 0 && (
//         <span className="absolute -top-1 -right-1 min-w-[1.15rem] h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center px-1.5">
//           {count}
//         </span>
//       )}
//     </Link>
//   );
// };

// export default NotificationBell;

import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

import {
  loadUnreadInquiries,
  clearUnreadInquiries
} from '../utils/petStorage';

const NotificationBell = ({
  className = '',
  iconClassName = '',
  count: propCount,
  onClick
}) => {

  const [count, setCount] = useState(
    propCount ?? loadUnreadInquiries()
  );

  useEffect(() => {
    const refreshCount = () => {
      setCount(loadUnreadInquiries());
    };

    window.addEventListener('focus', refreshCount);
    window.addEventListener(
      'petshop.inquiryUpdated',
      refreshCount
    );

    return () => {
      window.removeEventListener('focus', refreshCount);
      window.removeEventListener(
        'petshop.inquiryUpdated',
        refreshCount
      );
    };
  }, []);

  useEffect(() => {
    if (typeof propCount === 'number') {
      setCount(propCount);
    }
  }, [propCount]);

  const handleClick = () => {
    clearUnreadInquiries();
    setCount(0);

    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      to="/inquiries"
      onClick={handleClick}
      className={`relative ${className}`}
    >
      <Bell
        size={20}
        className={`transition ${
          iconClassName ||
          'text-gray-400 hover:text-indigo-600'
        }`}
      />

      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[1.15rem] h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center px-1.5">
          {count}
        </span>
      )}
    </Link>
  );
};

export default NotificationBell;