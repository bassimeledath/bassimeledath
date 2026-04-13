export default function InvariantSpectrum() {
  return (
    <div className="my-10 flex justify-center px-4">
      <div className="w-full max-w-[520px] mx-auto">
        <div className="flex justify-between mb-2.5">
          <span className="text-sm font-semibold text-[#B05A4A] dark:text-[#E8A090]">
            Broken
          </span>
          <span className="text-sm font-semibold text-[#8A8078] dark:text-[#B0A89E]">
            Boring
          </span>
        </div>
        <div className="relative">
          {/* Annotation above the bar */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-11 flex flex-col items-center gap-1">
            <span className="text-xs font-medium text-[#D97757] dark:text-[#E8A080] whitespace-nowrap">
              your AI agent
            </span>
            <svg width="12" height="10" viewBox="0 0 12 10">
              <path d="M6 10 L0 0 L12 0 Z" fill="#D97757" />
            </svg>
          </div>
          <div
            className="h-7 rounded-full"
            style={{
              background:
                "linear-gradient(to right, #D9A49A, #D97757 35%, #D97757 65%, #D5CEC4)",
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-[#aaa] dark:text-[#8A8078]">Too free</span>
          <span className="text-xs text-[#aaa] dark:text-[#8A8078]">Too rigid</span>
        </div>
      </div>
    </div>
  );
}
