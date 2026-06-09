interface VoiagoLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  dark?: boolean;
}

export function VoiagoLogo({ size = 'md', showText = true, dark = false }: VoiagoLogoProps) {
  const imgSize = { sm: 28, md: 36, lg: 48 }[size];
  const textClass = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  }[size];

  return (
    <div className="flex items-center gap-2.5">
      <img
        src="/V_logo.png"
        alt="Voiago"
        width={imgSize}
        height={imgSize}
        className="object-contain flex-shrink-0"
        style={{ imageRendering: 'crisp-edges' }}
      />
      {showText && (
        <span
          className={`font-bold tracking-tight ${textClass} ${
            dark ? 'text-white' : 'text-navy-900'
          }`}
        >
          Voiago
        </span>
      )}
    </div>
  );
}
