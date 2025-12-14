export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Logo */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg animate-pulse">
          <svg
            className="w-10 h-10 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 13l5-5 5 5" />
            <path d="M7 18l5-5 5 5" />
          </svg>
        </div>
        
        {/* Loading Text */}
        <p className="text-neutral-500 font-medium animate-pulse">
          A carregar...
        </p>
        
        {/* Loading Bar */}
        <div className="w-48 h-1 bg-neutral-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-500 rounded-full"
            style={{
              animation: "loading-bar 1.5s ease-in-out infinite"
            }}
          />
        </div>
      </div>
    </div>
  );
}
