interface LogoProps { onClick?: () => void; }

export function Logo({ onClick }: LogoProps) {
  return (
    <button onClick={onClick} className="flex items-center gap-3 bg-transparent border-0 cursor-pointer">
      <div className="hex-badge w-10 h-10 bg-primary/15 border border-primary flex items-center justify-center text-primary text-xl font-bold shadow-glow">
        🛡
      </div>
      <div className="text-left">
        <div className="font-display font-black text-white text-lg leading-none tracking-wider">
          CyberSec
        </div>
        <div className="font-mono text-[10px] text-primary tracking-[3px] mt-0.5">
          UPDATES // v2.5
        </div>
      </div>
    </button>
  );
}
