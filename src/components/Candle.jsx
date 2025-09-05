export default function Candle({ blown }) {
  return (
    <div className="relative w-28 h-40">
      <div className="text-7xl text-center select-none">🎂</div>
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-2 h-6 w-3 rounded-b-full bg-amber-300 shadow-[0_0_12px_rgba(255,200,0,0.9)]
        origin-bottom ${
          blown ? "opacity-0" : "animate-[flicker_0.8s_infinite]"
        } `}
        style={{ filter: "blur(0.5px)" }}
      />
      <style>{`
        @keyframes flicker {
          0% { transform: scaleY(1) translateX(-50%) }
          50% { transform: scaleY(1.2) translateX(-50%) }
          100% { transform: scaleY(0.9) translateX(-50%) }
        }
      `}</style>
    </div>
  );
}
