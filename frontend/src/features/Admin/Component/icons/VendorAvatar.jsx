export const VendorAvatar = ({ type }) => {
  if (type === "clinic") {
    return (
      <div className="w-11 h-11 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
        <svg viewBox="0 0 44 44" className="w-full h-full rounded-lg">
          <rect width="44" height="44" fill="#1e293b" rx="8" />
          <rect x="18" y="10" width="8" height="24" fill="#94a3b8" rx="1" />
          <rect x="10" y="18" width="24" height="8" fill="#94a3b8" rx="1" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-11 h-11 rounded-lg overflow-hidden flex-shrink-0">
      <svg viewBox="0 0 44 44" className="w-full h-full">
        <rect width="44" height="44" fill="#1e3a5f" />
        <ellipse cx="22" cy="18" rx="9" ry="10" fill="#6b8fc5" />
        <path d="M4 44 Q22 30 40 44 Z" fill="#6b8fc5" />
      </svg>
    </div>
  );
};