export const IDCardSVG = () => (
  <svg viewBox="0 0 220 155" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="bg" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="#0f4c75" />
        <stop offset="100%" stopColor="#061b2a" />
      </radialGradient>
      <radialGradient id="glow" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.18" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>
    <rect width="220" height="155" rx="10" fill="url(#bg)" />
    <rect width="220" height="155" rx="10" fill="url(#glow)" />
    <line x1="0" y1="40" x2="220" y2="40" stroke="#00e5ff" strokeOpacity="0.07" strokeWidth="0.5" />
    <line x1="0" y1="115" x2="220" y2="115" stroke="#00e5ff" strokeOpacity="0.07" strokeWidth="0.5" />
    {/* Avatar */}
    <circle cx="70" cy="72" r="28" fill="#1a3a5c" stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.4" />
    <path d="M50 100 Q70 88 90 100 L95 155 H45 Z" fill="#0d2137" />
    <ellipse cx="70" cy="64" rx="14" ry="16" fill="#c8956c" />
    <ellipse cx="70" cy="51" rx="14" ry="8" fill="#2c1810" />
    <path d="M60 82 L70 90 L80 82 L78 78 L70 84 L62 78 Z" fill="white" opacity="0.9" />
    {/* Text lines */}
    <rect x="105" y="30" width="90" height="6" rx="3" fill="#00e5ff" opacity="0.5" />
    <rect x="105" y="42" width="70" height="4" rx="2" fill="white" opacity="0.3" />
    <rect x="105" y="52" width="80" height="4" rx="2" fill="white" opacity="0.2" />
    <rect x="105" y="62" width="60" height="4" rx="2" fill="white" opacity="0.2" />
    <rect x="105" y="72" width="75" height="4" rx="2" fill="white" opacity="0.2" />
    {/* Barcode */}
    <rect x="105" y="100" width="90" height="22" rx="2" fill="white" opacity="0.06" />
    {[108,112,115,120,123,127,130,135,138,142,145,150,153,157,160,164,169,172,176,179,184,187,191].map((x, i) => (
      <rect key={i} x={x} y="103" width={i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1} height="14" fill="white" opacity="0.5" />
    ))}
    {/* Corner accents */}
    <path d="M8 8 L20 8 L20 10 L10 10 L10 20 L8 20 Z" fill="#00e5ff" opacity="0.5" />
    <path d="M212 8 L200 8 L200 10 L210 10 L210 20 L212 20 Z" fill="#00e5ff" opacity="0.5" />
    <path d="M8 147 L20 147 L20 145 L10 145 L10 135 L8 135 Z" fill="#00e5ff" opacity="0.5" />
    <path d="M212 147 L200 147 L200 145 L210 145 L210 135 L212 135 Z" fill="#00e5ff" opacity="0.5" />
  </svg>
);
