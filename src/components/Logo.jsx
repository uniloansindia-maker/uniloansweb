/**
 * Logo — SVG icon + HTML text so font-weight renders correctly in browsers.
 * light=false  →  navy icon + navy "Uni" + gold "Loans"  (on white navbar)
 * light=true   →  white icon + white "Uni" + gold "Loans" (on dark hero / footer)
 */
export default function Logo({ className = '', height = 44, light = false }) {
  const iconW = Math.round(height * 0.92);
  const fs    = Math.round(height * 0.54);          // font-size for brand text

  const wall   = light ? '#FFFFFF' : '#003366';
  const gold   = '#D4AF37';
  const knob   = '#002244';

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`} aria-label="UniLoans">
      {/* ── House + coin SVG icon ── */}
      <svg
        width={iconW}
        height={height}
        viewBox="0 0 44 48"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        {/* Roof – thick gold stroke, max visibility */}
        <path
          d="M2 26 L22 6 L42 26"
          stroke={gold}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Walls */}
        <rect x="7" y="25" width="30" height="20" rx="2.5" fill={wall} />
        {/* Door */}
        <rect x="16" y="31" width="12" height="14" rx="2.5" fill={gold} />
        {/* Door knob */}
        <circle cx="26.5" cy="38" r="1.6" fill={knob} />
        {/* Coin badge */}
        <circle cx="38" cy="13" r="8.5" fill={gold} />
        <text
          x="38"
          y="17.5"
          textAnchor="middle"
          fill={knob}
          fontSize="11"
          fontWeight="900"
          fontFamily="Arial, sans-serif"
        >
          ₹
        </text>
      </svg>

      {/* ── Brand name — real HTML text for crisp font-black weight ── */}
      <span
        className="font-black tracking-tight leading-none"
        style={{ fontSize: fs, lineHeight: 1 }}
      >
        <span style={{ color: wall }}>Uni</span>
        <span style={{ color: gold }}>Loans</span>
      </span>
    </div>
  );
}
