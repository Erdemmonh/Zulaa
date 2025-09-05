import { Children, cloneElement, useEffect, useRef, useState } from "react";

/**
 * Full-screen “Instagram story” shell:
 * - top progress lines
 * - left/right nav buttons (fixed width so center stays perfectly centered)
 * - swipe & keyboard support
 * - track translates in PERCENT (not vw) and each slide is w-full
 */
export default function StoryShell({ children, initial = 0 }) {
  const slides = Children.toArray(children);
  const [idx, setIdx] = useState(Math.min(initial, slides.length - 1));
  const dragRef = useRef({ startX: 0, deltaX: 0, dragging: false });

  // keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight")
        setIdx((i) => Math.min(i + 1, slides.length - 1));
      if (e.key === "ArrowLeft") setIdx((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides.length]);

  // touch swipe
  const onTouchStart = (e) => {
    const x = e.touches?.[0]?.clientX ?? 0;
    dragRef.current = { startX: x, deltaX: 0, dragging: true };
  };
  const onTouchMove = (e) => {
    if (!dragRef.current.dragging) return;
    const x = e.touches?.[0]?.clientX ?? 0;
    dragRef.current.deltaX = x - dragRef.current.startX;
  };
  const onTouchEnd = () => {
    const { deltaX } = dragRef.current;
    const THRESH = 50;
    if (deltaX < -THRESH) setIdx((i) => Math.min(i + 1, slides.length - 1));
    if (deltaX > THRESH) setIdx((i) => Math.max(i - 1, 0));
    dragRef.current.dragging = false;
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-black text-white grid grid-rows-[auto_1fr] select-none">
      {/* progress lines (very thin) */}
      <div className="w-full flex justify-center pt-2 pb-2">
        <div className="flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={[
                "h-[2px] sm:h-[3px] rounded-full",
                "w-16 sm:w-24",
                i === idx ? "bg-white" : "bg-white/30 hover:bg-white/45",
                "transition-colors",
              ].join(" ")}
            />
          ))}
        </div>
      </div>

      {/* fixed side columns keep center perfectly centered */}
      <div className="grid grid-cols-[56px_1fr_56px] items-center h-full">
        {/* left */}
        <div className="h-full flex items-center justify-center">
          <button
            onClick={() => setIdx((i) => Math.max(i - 1, 0))}
            className="w-10 h-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-40"
            disabled={idx === 0}
            aria-label="Previous"
          >
            ‹
          </button>
        </div>

        {/* viewport & track (percent-based) */}
        <div
          className="h-full overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex h-full w-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {slides.map((child, i) => (
              <div key={i} className="w-full h-full shrink-0">
                {cloneElement(child, {
                  className: [child.props.className, "h-full w-full"].join(" "),
                })}
              </div>
            ))}
          </div>
        </div>

        {/* right */}
        <div className="h-full flex items-center justify-center">
          <button
            onClick={() => setIdx((i) => Math.min(i + 1, slides.length - 1))}
            className="w-10 h-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-40"
            disabled={idx === slides.length - 1}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
