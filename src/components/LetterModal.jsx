export default function LetterModal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 max-w-2xl w-full">
        <div className="rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-[url('/img/paper.jpg')] bg-cover bg-center p-8 md:p-10">
            <div className="backdrop-brightness-110 bg-white/70 p-6 md:p-8 rounded-xl text-gray-800">
              {children}
              <div className="mt-6 text-right">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
