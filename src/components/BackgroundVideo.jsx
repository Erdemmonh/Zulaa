// Fixed, full-screen background video with a soft overlay.
// Use MP4 if possible for best browser support; MOV may not autoplay on some Android browsers.
export default function BackgroundVideo({ src }) {
  return (
    <>
      <video
        className="fixed inset-0 -z-10 h-screen w-screen object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
      />
      {/* gentle dark overlay so text remains readable */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-black/30" />
    </>
  );
}
