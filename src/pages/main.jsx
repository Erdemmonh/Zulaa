import { useRef, useState } from "react";
import StoryShell from "../components/StoryShell.jsx";
import bgVideo from "../assets/bgVideo.MOV";
import birthdaySong from "../assets/Zulaabirthday.mp3";

export default function Main() {
  // Slide 2: letter
  const [letterOpen, setLetterOpen] = useState(false);

  // Slide 3: music + candle
  const audioRef = useRef(null);
  const [audioEnded, setAudioEnded] = useState(false);
  const [isLit, setIsLit] = useState(true);
  const [blowing, setBlowing] = useState(false);

  const onAudioEnded = () => setAudioEnded(true);
  const onAudioPlay = () => {
    setAudioEnded(false);
    setBlowing(false);
    setIsLit(true);
  };
  const blowCandle = () => {
    if (!audioEnded) return;
    setBlowing(true);
    setTimeout(() => setIsLit(false), 3000);
  };

  // Slide 1: video controls
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      try {
        await v.play();
        setIsPlaying(true);
      } catch {}
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };
  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  return (
    <div className="h-screen w-screen overflow-hidden text-white">
      <StoryShell>
        {/* -------- Slide 1: only HORIZONTAL center -------- */}
        <section className="w-full h-full flex flex-col items-center justify-start bg-transparent">
          {/* Video (phone-ish size) */}
          <div className="w-full flex justify-center pt-4">
            <video
              ref={videoRef}
              className="
    aspect-[9/16]
    h-[62vh] sm:h-[64vh] md:h-[66vh]   /* taller */
    w-auto                               /* width follows aspect ratio */
    rounded-2xl shadow-xl object-cover
  "
              src={bgVideo}
              playsInline
              loop
              muted={isMuted}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              preload="metadata"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 pt-3">
            <button
              onClick={togglePlay}
              className="w-fit px-5 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold shadow transition"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button
              onClick={toggleMute}
              className="w-fit px-5 py-1.5 rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200 text-sm font-medium shadow transition"
            >
              {isMuted ? "Unmute" : "Mute"}
            </button>
          </div>

          {/* Text */}
          <div className="text-center leading-tight pt-2 pb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold">
              Happy Birthday!!!
            </h1>
            <p className="text-sm sm:text-base opacity-90">
              My Beautiful Princess
            </p>
            <p className="text-xs opacity-75">
              Swipe to continue your surprise…
            </p>
          </div>
        </section>

        {/* -------- Slide 2: Letter -------- */}
        <section className="w-full h-full grid place-items-center bg-transparent px-6">
          <div className="w-full max-w-xl bg-amber-50/90 text-amber-900 rounded-2xl shadow-xl p-5 sm:p-6 flex flex-col items-center gap-4 max-h-[72%] overflow-auto">
            {!letterOpen ? (
              <>
                <div className="text-5xl">✉️</div>
                <h2 className="text-xl font-semibold">
                  A Special Letter for You
                </h2>
                <p className="opacity-80 text-center">
                  I wrote something special just for you…
                </p>
                <button
                  onClick={() => setLetterOpen(true)}
                  className="w-fit px-7 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-semibold transition"
                >
                  Open
                </button>
              </>
            ) : (
              <div className="w-full">
                <div
                  className="w-full rounded-2xl bg-white/95 text-amber-900 shadow-inner p-5 sm:p-6 leading-relaxed"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(#fff 0 28px, rgba(255,192,203,0.15) 28px 29px)",
                  }}
                >
                  <p className="mb-3">
                    Хайр гэдэг үгний утга учир миний хувьд чи ❤
                  </p>
                  <p className="mb-3">
                    Дахиад илүү олон жил миний амьдралыг гэрэлтүүлээрэй
                  </p>
                  <p>Үнэхээр их хайртай шүү ✨</p>
                </div>
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => setLetterOpen(false)}
                    className="w-fit px-6 py-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* -------- Slide 3: Cake + music + blow candle -------- */}
        <section className="w-full h-full grid place-items-center bg-transparent px-6">
          <div className="w-full max-w-xl flex flex-col items-center gap-4 max-h-[78%]">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`text-3xl transition-opacity ${
                  isLit ? "opacity-100" : "opacity-0"
                }`}
              >
                🔥
              </div>
              <div className="text-6xl">🎂</div>
            </div>

            <div className="w-full max-w-md bg-white/5 rounded-2xl p-3">
              <audio
                ref={audioRef}
                className="w-full"
                controls
                preload="auto"
                src={birthdaySong}
                onEnded={onAudioEnded}
                onPlay={onAudioPlay}
              />
            </div>

            <div className="w-full max-w-md grid gap-2 overflow-auto">
              <div className="rounded-xl bg-white/10 backdrop-blur p-3 text-center">
                <p className="font-medium">Step 1</p>
                <p className="opacity-90 text-sm">First, play the music! 🎵</p>
              </div>

              <div className="rounded-xl bg-white/10 backdrop-blur p-3 text-center">
                <p className="font-medium">Step 2</p>
                {!audioEnded ? (
                  <p className="opacity-80 text-sm">
                    Wait until the music finishes… ⏳
                  </p>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <p className="opacity-90 text-sm">
                      Make a wish and blow the candle! 🎉
                    </p>
                    <button
                      onClick={blowCandle}
                      className="w-fit px-7 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-black font-semibold transition disabled:opacity-50"
                      disabled={!audioEnded || blowing}
                    >
                      {blowing ? "Blowing…" : "Blow the Candle"}
                    </button>
                  </div>
                )}
              </div>

              {!isLit && (
                <div className="rounded-xl bg-white/10 backdrop-blur p-3 text-center">
                  <p className="opacity-90 text-sm">
                    ✨ The candle is out. Happy Birthday, my love!
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </StoryShell>
    </div>
  );
}
