interface LogoProps { onClick?: () => void; }

export function Logo({ onClick }: LogoProps) {
  return (
    <div onClick={onClick} className={`flex items-center gap-3 bg-transparent border-0 ${onClick ? "cursor-pointer" : ""}`}>
      <div className="hex-badge w-10 h-10 bg-primary/15 border border-primary flex items-center justify-center text-primary text-xl font-bold shadow-glow">
        🛡
      </div>
      <div className="text-left">
        <div className="font-display font-black text-white text-lg leading-none tracking-wider">
          cyberhawk UG
        </div>
        <div className="font-mono text-[10px] text-primary tracking-[3px] mt-0.5 uppercase">
          Intelligence // v2.6
        </div>
      </div>
    </div>
  );
}
