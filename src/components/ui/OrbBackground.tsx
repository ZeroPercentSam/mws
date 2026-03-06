"use client";

export default function OrbBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary orb — orange */}
      <div
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 107, 0, 0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "orb-float-1 18s ease-in-out infinite",
        }}
      />
      {/* Secondary orb — warm orange */}
      <div
        className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 133, 51, 0.35) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "orb-float-2 22s ease-in-out infinite",
        }}
      />
      {/* Tertiary orb — subtle amber */}
      <div
        className="absolute bottom-1/3 left-1/2 w-[350px] h-[350px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 160, 50, 0.3) 0%, transparent 70%)",
          filter: "blur(90px)",
          animation: "orb-float-3 25s ease-in-out infinite",
        }}
      />
    </div>
  );
}
