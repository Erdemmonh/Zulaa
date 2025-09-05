// HeartLock.jsx — image clipped inside a pink heart (no children overlay)
import gfPic from "../assets/gf.jpeg";

export default function HeartLock({ size = "min(88vw, 360px)" }) {
  return (
    <div
      className="grid place-items-center"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[8px_12px_18px_rgba(0,0,0,0.15)]"
        aria-hidden="true"
      >
        <defs>
          {/* inner-heart clip path (same shape as outer, scaled) */}
          <clipPath id="inner-heart">
            <path d="M50 15 C35 0, 5 12, 5 40 C5 65, 30 85, 50 98 C70 85, 95 65, 95 40 C95 12, 65 0, 50 15 Z" />
          </clipPath>
        </defs>

        {/* outer pink heart */}
        <path
          d="M50 15 C35 0, 5 12, 5 40 C5 65, 30 85, 50 98 C70 85, 95 65, 95 40 C95 12, 65 0, 50 15 Z"
          fill="#f43f8c"
        />

        {/* inner photo: same path, scaled to create border */}
        <g transform="translate(50 50) scale(0.83) translate(-50 -50)">
          <image
            href={gfPic}
            width="100"
            height="100"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#inner-heart)"
          />
        </g>
      </svg>
    </div>
  );
}
