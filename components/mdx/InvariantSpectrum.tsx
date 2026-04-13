export default function InvariantSpectrum() {
  return (
    <div className="my-8 flex justify-center">
      <div className="w-full max-w-[520px]">
        <div className="flex justify-between mb-2.5">
          <span className="text-sm font-semibold text-[#B05A4A] dark:text-[#E8A090]">
            Broken
          </span>
          <span className="text-sm font-semibold text-[#8A8078] dark:text-[#B0A89E]">
            Boring
          </span>
        </div>
        <div
          className="h-7 rounded-full relative"
          style={{
            background:
              "linear-gradient(to right, #D9A49A, #D97757 35%, #D97757 65%, #D5CEC4)",
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
            style={{
              backgroundColor: "rgb(var(--background))",
              boxShadow: "0 0 0 2px #D97757",
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
