import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  variant?: 'full' | 'icon' | 'text';
}

const Logo: React.FC<LogoProps> = ({ 
  size = 48, 
  className = '', 
  variant = 'full' 
}) => {
  const iconSize = variant === 'icon' ? size : size * 0.8;

  const LogoIcon = () => (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="transition-all duration-300"
    >
      {/* Outer orbital ring */}
      <circle 
        cx="32" 
        cy="32" 
        r="30" 
        stroke="url(#orbitalGradient)" 
        strokeWidth="1"
        fill="none"
        className="opacity-40"
        strokeDasharray="2,4"
      />
      
      {/* Camera lens outer ring */}
      <circle 
        cx="32" 
        cy="32" 
        r="22" 
        stroke="url(#lensRing)" 
        strokeWidth="2"
        fill="url(#lensBackground)"
        className="opacity-90"
      />
      
      {/* Camera lens inner ring with reflection */}
      <circle 
        cx="32" 
        cy="32" 
        r="18" 
        stroke="url(#innerLensRing)" 
        strokeWidth="1"
        fill="url(#innerLensBackground)"
        className="opacity-80"
      />
      
      {/* Lens reflection/glint */}
      <ellipse 
        cx="28" 
        cy="28" 
        rx="6" 
        ry="3" 
        fill="url(#lensGlint)"
        className="opacity-60"
        transform="rotate(-45 28 28)"
      />
      
      {/* Secondary smaller glint */}
      <circle 
        cx="26" 
        cy="26" 
        r="2" 
        fill="url(#smallGlint)"
        className="opacity-40"
      />
      
      {/* Camera aperture blades forming code brackets */}
      <g transform="translate(32,32)">
        {/* Left bracket - aperture blade */}
        <path 
          d="M-12,-8 L-16,-4 L-16,4 L-12,8 L-10,6 L-12,2 L-12,-2 L-10,-6 Z" 
          fill="url(#gradient3)"
          className="opacity-90"
        />
        
        {/* Right bracket - aperture blade */}
        <path 
          d="M12,-8 L16,-4 L16,4 L12,8 L10,6 L12,2 L12,-2 L10,-6 Z" 
          fill="url(#gradient3)"
          className="opacity-90"
        />
        
        {/* Center S monogram */}
        <text 
          x="0" 
          y="6" 
          textAnchor="middle" 
          fontSize="20" 
          fontWeight="bold" 
          fill="url(#gradient4)"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          S
        </text>
      </g>
      
      {/* Animated Planetary system - outer dots as planets */}
      <g className="opacity-80">
        {/* Planet 1 - Mars-like (orbiting animation) */}
        <g>
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 32 32"
            to="360 32 32"
            dur="20s"
            repeatCount="indefinite"
          />
          <circle cx="12" cy="12" r="3" fill="url(#planet1)"/>
          <circle cx="11" cy="11" r="1" fill="url(#planet1Highlight)" className="opacity-60"/>
          <circle cx="13" cy="13" r="0.5" fill="#8B4513" className="opacity-40"/>
        </g>
        
        {/* Planet 2 - Earth-like (counter-clockwise, faster) */}
        <g>
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="90 32 32"
            to="450 32 32"
            dur="15s"
            repeatCount="indefinite"
          />
          <circle cx="52" cy="12" r="2.5" fill="url(#planet2)"/>
          <circle cx="51" cy="11" r="0.8" fill="url(#planet2Highlight)" className="opacity-50"/>
          <ellipse cx="52.5" cy="12.5" rx="1" ry="0.5" fill="#228B22" className="opacity-60"/>
        </g>
        
        {/* Planet 3 - Gas giant (slow orbit) */}
        <g>
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="180 32 32"
            to="540 32 32"
            dur="25s"
            repeatCount="indefinite"
          />
          <circle cx="12" cy="52" r="2" fill="url(#planet3)"/>
          <ellipse cx="12" cy="51" rx="2.2" ry="0.3" fill="url(#planet3Ring)" className="opacity-70"/>
          <ellipse cx="12" cy="53" rx="2.2" ry="0.3" fill="url(#planet3Ring)" className="opacity-50"/>
          <circle cx="11" cy="51" r="0.6" fill="url(#planet3Highlight)" className="opacity-40"/>
        </g>
        
        {/* Planet 4 - Venus-like (medium speed) */}
        <g>
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="270 32 32"
            to="630 32 32"
            dur="18s"
            repeatCount="indefinite"
          />
          <circle cx="52" cy="52" r="3.5" fill="url(#planet4)"/>
          <circle cx="50" cy="50" r="1.2" fill="url(#planet4Highlight)" className="opacity-50"/>
          <circle cx="53" cy="51" r="0.7" fill="#FFD700" className="opacity-30"/>
        </g>
      </g>
      
      {/* Subtle orbital trail effect */}
      <g className="opacity-20">
        <circle cx="32" cy="32" r="28" stroke="url(#orbitalTrail)" strokeWidth="0.5" fill="none" strokeDasharray="1,3">
          <animate attributeName="stroke-dasharray" values="1,3;3,1;1,3" dur="8s" repeatCount="indefinite"/>
        </circle>
      </g>
      
      {/* Gradient definitions */}
      <defs>
        {/* Orbital ring gradient */}
        <linearGradient id="orbitalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#74A4BC" stopOpacity="0.3"/>
          <stop offset="50%" stopColor="#B6D6CC" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#74A4BC" stopOpacity="0.3"/>
        </linearGradient>
        
        {/* Camera lens gradients */}
        <radialGradient id="lensBackground" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2A2A3A" stopOpacity="0.8"/>
          <stop offset="70%" stopColor="#1A1A2A" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#0A0A1A" stopOpacity="1"/>
        </radialGradient>
        
        <linearGradient id="lensRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C0C0C0"/>
          <stop offset="50%" stopColor="#E8E8E8"/>
          <stop offset="100%" stopColor="#A0A0A0"/>
        </linearGradient>
        
        <radialGradient id="innerLensBackground" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3A3A4A" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#1A1A2A" stopOpacity="0.8"/>
        </radialGradient>
        
        <linearGradient id="innerLensRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B0B0B0"/>
          <stop offset="100%" stopColor="#808080"/>
        </linearGradient>
        
        {/* Lens glint effects */}
        <radialGradient id="lensGlint" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8"/>
          <stop offset="50%" stopColor="#F1FEC6" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        
        <radialGradient id="smallGlint" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        
        {/* Aperture blade gradient */}
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF3A20" stopOpacity="0.9"/>
          <stop offset="50%" stopColor="#F1FEC6" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#B6D6CC" stopOpacity="0.8"/>
        </linearGradient>
        
        {/* S monogram gradient */}
        <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F1FEC6"/>
          <stop offset="50%" stopColor="#FFFFFF"/>
          <stop offset="100%" stopColor="#FF3A20"/>
        </linearGradient>
        
        {/* Planet gradients */}
        <radialGradient id="planet1" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FF6B47"/>
          <stop offset="70%" stopColor="#FF3A20"/>
          <stop offset="100%" stopColor="#CC2E1A"/>
        </radialGradient>
        
        <radialGradient id="planet1Highlight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFB3A3"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        
        <radialGradient id="planet2" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#87CEEB"/>
          <stop offset="50%" stopColor="#74A4BC"/>
          <stop offset="100%" stopColor="#4682B4"/>
        </radialGradient>
        
        <radialGradient id="planet2Highlight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E0F6FF"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        
        <radialGradient id="planet3" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#D4B6E8"/>
          <stop offset="70%" stopColor="#B6D6CC"/>
          <stop offset="100%" stopColor="#9AB5C9"/>
        </radialGradient>
        
        <linearGradient id="planet3Ring" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="30%" stopColor="#C8A2C8"/>
          <stop offset="70%" stopColor="#C8A2C8"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
        
        <radialGradient id="planet3Highlight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F0E8FF"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        
        <radialGradient id="planet4" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#F1FEC6"/>
          <stop offset="70%" stopColor="#E6F2A3"/>
          <stop offset="100%" stopColor="#D4E685"/>
        </radialGradient>
        
        <radialGradient id="planet4Highlight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFEF0"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        
        {/* Orbital trail gradient */}
        <linearGradient id="orbitalTrail" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#74A4BC" stopOpacity="0.1"/>
          <stop offset="50%" stopColor="#B6D6CC" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#74A4BC" stopOpacity="0.1"/>
        </linearGradient>
        
        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </svg>
  );

  if (variant === 'icon') {
    return (
      <div className={`relative ${className}`}>
        <LogoIcon />
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="text-base font-bold bg-gradient-to-r from-white via-ivory to-ash-gray bg-clip-text text-transparent">
          Sachin Venugopalan Nair
        </div>
        <div className="text-xs text-ash-gray/90 font-medium tracking-wide mt-0.5 ml-2">
          Developer & Photographer
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <div className={`flex items-center space-x-3 group ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Glow effect background */}
        <div className="absolute inset-0 bg-gradient-to-r from-scarlet/30 to-ash-gray/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-125"></div>
        
        {/* Logo sized to fit navigation - using fixed height constraint */}
        <div className="relative group-hover:scale-105 transition-all duration-300 drop-shadow-lg flex items-center justify-center"
             style={{ width: 56, height: 56 }}>
          <svg 
            width={56} 
            height={56} 
            viewBox="0 0 64 64" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-300"
          >
            {/* All the existing SVG content from LogoIcon but with fixed size */}
            {/* Outer orbital ring */}
            <circle 
              cx="32" 
              cy="32" 
              r="30" 
              stroke="url(#orbitalGradient)" 
              strokeWidth="1"
              fill="none"
              className="opacity-40"
              strokeDasharray="2,4"
            />
            
            {/* Camera lens outer ring */}
            <circle 
              cx="32" 
              cy="32" 
              r="22" 
              stroke="url(#lensRing)" 
              strokeWidth="2"
              fill="url(#lensBackground)"
              className="opacity-90"
            />
            
            {/* Camera lens inner ring with reflection */}
            <circle 
              cx="32" 
              cy="32" 
              r="18" 
              stroke="url(#innerLensRing)" 
              strokeWidth="1"
              fill="url(#innerLensBackground)"
              className="opacity-80"
            />
            
            {/* Lens reflection/glint */}
            <ellipse 
              cx="28" 
              cy="28" 
              rx="6" 
              ry="3" 
              fill="url(#lensGlint)"
              className="opacity-60"
              transform="rotate(-45 28 28)"
            />
            
            {/* Secondary smaller glint */}
            <circle 
              cx="26" 
              cy="26" 
              r="2" 
              fill="url(#smallGlint)"
              className="opacity-40"
            />
            
            {/* Camera aperture blades forming code brackets */}
            <g transform="translate(32,32)">
              {/* Left bracket - aperture blade */}
              <path 
                d="M-12,-8 L-16,-4 L-16,4 L-12,8 L-10,6 L-12,2 L-12,-2 L-10,-6 Z" 
                fill="url(#gradient3)"
                className="opacity-90"
              />
              
              {/* Right bracket - aperture blade */}
              <path 
                d="M12,-8 L16,-4 L16,4 L12,8 L10,6 L12,2 L12,-2 L10,-6 Z" 
                fill="url(#gradient3)"
                className="opacity-90"
              />
              
              {/* Center S monogram */}
              <text 
                x="0" 
                y="6" 
                textAnchor="middle" 
                fontSize="20" 
                fontWeight="bold" 
                fill="url(#gradient4)"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                S
              </text>
            </g>
            
            {/* Animated Planetary system */}
            <g className="opacity-80">
              {/* Planet 1 - Mars-like */}
              <g>
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0 32 32"
                  to="360 32 32"
                  dur="20s"
                  repeatCount="indefinite"
                />
                <circle cx="12" cy="12" r="3" fill="url(#planet1)"/>
                <circle cx="11" cy="11" r="1" fill="url(#planet1Highlight)" className="opacity-60"/>
                <circle cx="13" cy="13" r="0.5" fill="#8B4513" className="opacity-40"/>
              </g>
              
              {/* Planet 2 - Earth-like */}
              <g>
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="90 32 32"
                  to="450 32 32"
                  dur="15s"
                  repeatCount="indefinite"
                />
                <circle cx="52" cy="12" r="2.5" fill="url(#planet2)"/>
                <circle cx="51" cy="11" r="0.8" fill="url(#planet2Highlight)" className="opacity-50"/>
                <ellipse cx="52.5" cy="12.5" rx="1" ry="0.5" fill="#228B22" className="opacity-60"/>
              </g>
              
              {/* Planet 3 - Gas giant */}
              <g>
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="180 32 32"
                  to="540 32 32"
                  dur="25s"
                  repeatCount="indefinite"
                />
                <circle cx="12" cy="52" r="2" fill="url(#planet3)"/>
                <ellipse cx="12" cy="51" rx="2.2" ry="0.3" fill="url(#planet3Ring)" className="opacity-70"/>
                <ellipse cx="12" cy="53" rx="2.2" ry="0.3" fill="url(#planet3Ring)" className="opacity-50"/>
                <circle cx="11" cy="51" r="0.6" fill="url(#planet3Highlight)" className="opacity-40"/>
              </g>
              
              {/* Planet 4 - Venus-like */}
              <g>
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="270 32 32"
                  to="630 32 32"
                  dur="18s"
                  repeatCount="indefinite"
                />
                <circle cx="52" cy="52" r="3.5" fill="url(#planet4)"/>
                <circle cx="50" cy="50" r="1.2" fill="url(#planet4Highlight)" className="opacity-50"/>
                <circle cx="53" cy="51" r="0.7" fill="#FFD700" className="opacity-30"/>
              </g>
            </g>
            
            {/* Subtle orbital trail effect */}
            <g className="opacity-20">
              <circle cx="32" cy="32" r="28" stroke="url(#orbitalTrail)" strokeWidth="0.5" fill="none" strokeDasharray="1,3">
                <animate attributeName="stroke-dasharray" values="1,3;3,1;1,3" dur="8s" repeatCount="indefinite"/>
              </circle>
            </g>

            {/* All gradient definitions */}
            <defs>
              {/* All existing gradients here... */}
              <linearGradient id="orbitalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#74A4BC" stopOpacity="0.3"/>
                <stop offset="50%" stopColor="#B6D6CC" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#74A4BC" stopOpacity="0.3"/>
              </linearGradient>
              
              <radialGradient id="lensBackground" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2A2A3A" stopOpacity="0.8"/>
                <stop offset="70%" stopColor="#1A1A2A" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#0A0A1A" stopOpacity="1"/>
              </radialGradient>
              
              <linearGradient id="lensRing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C0C0C0"/>
                <stop offset="50%" stopColor="#E8E8E8"/>
                <stop offset="100%" stopColor="#A0A0A0"/>
              </linearGradient>
              
              <radialGradient id="innerLensBackground" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3A3A4A" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#1A1A2A" stopOpacity="0.8"/>
              </radialGradient>
              
              <linearGradient id="innerLensRing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B0B0B0"/>
                <stop offset="100%" stopColor="#808080"/>
              </linearGradient>
              
              <radialGradient id="lensGlint" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="#F1FEC6" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="transparent"/>
              </radialGradient>
              
              <radialGradient id="smallGlint" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="transparent"/>
              </radialGradient>
              
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF3A20" stopOpacity="0.9"/>
                <stop offset="50%" stopColor="#F1FEC6" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#B6D6CC" stopOpacity="0.8"/>
              </linearGradient>
              
              <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F1FEC6"/>
                <stop offset="50%" stopColor="#FFFFFF"/>
                <stop offset="100%" stopColor="#FF3A20"/>
              </linearGradient>
              
              <radialGradient id="planet1" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FF6B47"/>
                <stop offset="70%" stopColor="#FF3A20"/>
                <stop offset="100%" stopColor="#CC2E1A"/>
              </radialGradient>
              
              <radialGradient id="planet1Highlight" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFB3A3"/>
                <stop offset="100%" stopColor="transparent"/>
              </radialGradient>
              
              <radialGradient id="planet2" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#87CEEB"/>
                <stop offset="50%" stopColor="#74A4BC"/>
                <stop offset="100%" stopColor="#4682B4"/>
              </radialGradient>
              
              <radialGradient id="planet2Highlight" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E0F6FF"/>
                <stop offset="100%" stopColor="transparent"/>
              </radialGradient>
              
              <radialGradient id="planet3" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#D4B6E8"/>
                <stop offset="70%" stopColor="#B6D6CC"/>
                <stop offset="100%" stopColor="#9AB5C9"/>
              </radialGradient>
              
              <linearGradient id="planet3Ring" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent"/>
                <stop offset="30%" stopColor="#C8A2C8"/>
                <stop offset="70%" stopColor="#C8A2C8"/>
                <stop offset="100%" stopColor="transparent"/>
              </linearGradient>
              
              <radialGradient id="planet3Highlight" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F0E8FF"/>
                <stop offset="100%" stopColor="transparent"/>
              </radialGradient>
              
              <radialGradient id="planet4" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#F1FEC6"/>
                <stop offset="70%" stopColor="#E6F2A3"/>
                <stop offset="100%" stopColor="#D4E685"/>
              </radialGradient>
              
              <radialGradient id="planet4Highlight" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFEF0"/>
                <stop offset="100%" stopColor="transparent"/>
              </radialGradient>
              
              <linearGradient id="orbitalTrail" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#74A4BC" stopOpacity="0.1"/>
                <stop offset="50%" stopColor="#B6D6CC" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#74A4BC" stopOpacity="0.1"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      {variant === 'full' && (
        <div className="hidden sm:block flex-shrink-0" style={{ minWidth: '240px', width: 'auto' }}>
          <div className="text-lg font-bold text-white/90 bg-gradient-to-r from-ash-gray via-ivory to-air-superiority-blue bg-clip-text text-transparent tracking-wide group-hover:from-scarlet group-hover:via-ivory group-hover:to-ash-gray transition-all duration-700 drop-shadow-sm whitespace-nowrap" style={{ 
            minWidth: '240px',
            animation: 'gentle-glow 3s ease-in-out infinite alternate',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.4), 0 0 20px rgba(182, 214, 204, 0.3), 0 0 30px rgba(116, 164, 188, 0.2)',
            filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.2))'
          }}>
            Sachin Venugopalan Nair
          </div>
          <div className="text-sm font-semibold text-white/90 bg-gradient-to-r from-ash-gray via-ivory to-air-superiority-blue bg-clip-text text-transparent tracking-wide mt-1 group-hover:from-scarlet group-hover:via-ivory group-hover:to-ash-gray transition-all duration-300 drop-shadow-sm whitespace-nowrap" style={{ minWidth: '240px' }}>
            Developer & Photographer
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;
