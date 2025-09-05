// src/pages/home.jsx
import { useState } from "react";
import HeartLock from "../components/HeartLock.jsx";

export default function Home() {
  const [hintOpen, setHintOpen] = useState(false);
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (pwd.trim().toLowerCase() === "juljaga") {
      window.location.href = "/main";
    } else {
      setError("Oops — that’s not it. Try again, my lady ✨");
    }
  };

  return (
    <div className="min-h-dvh w-full bg-gradient-to-b from-rose-50 to-pink-100 flex flex-col items-center px-5 py-8 sm:py-12 gap-8">
      {/* Heading (smaller on mobile, normal on desktop) */}
      <h1
        className="
          text-center font-semibold tracking-tight text-rose-600 leading-tight
          text-3xl sm:text-4xl md:text-5xl
          max-w-[26ch] sm:max-w-[36ch]
        "
      >
        Excuse me young Madam, could you please enter the password to see
        what&apos;s inside?
      </h1>

      {/* Heart + password container */}
      <div className="flex flex-col items-center gap-5 bg-white/40 p-5 sm:p-6 rounded-2xl shadow-lg w-full max-w-xl">
        {/* Heart photo (slightly smaller on phones) */}
        <HeartLock size="min(72vw, 320px)" />

        {/* Name */}
        <h3 className="font-bold text-rose-600 text-lg sm:text-xl">Nyamka</h3>

        {/* Password panel */}
        <div className="w-full flex flex-col items-center gap-3">
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Enter password..."
            className="
              w-full rounded-full
              border border-pink-300 bg-white/95
              px-5 py-3 text-center text-base sm:text-lg text-gray-700
              outline-none focus:ring-2 focus:ring-pink-400 shadow
            "
          />

          <button
            onClick={submit}
            className="
              w-fit px-8 sm:px-10
              rounded-full
              bg-gradient-to-r from-rose-500 to-pink-500
              hover:from-rose-600 hover:to-pink-600
              text-white font-semibold py-2.5 shadow-lg transition
            "
          >
            Enter
          </button>

          {error && (
            <p className="text-rose-600 text-sm text-center">{error}</p>
          )}

          <button
            onClick={() => {
              setError("");
              setHintOpen((v) => !v);
            }}
            className="
              w-fit px-6 rounded-full
              bg-pink-100 text-white font-medium
              hover:bg-pink-200 transition
              py-2
            "
          >
            Hint
          </button>

          {hintOpen && (
            <p className="text-pink-700 text-sm italic text-center">
              The nickname I call you the most.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
