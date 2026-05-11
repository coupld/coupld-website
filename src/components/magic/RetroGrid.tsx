"use client";

export default function RetroGrid() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ perspective: "800px" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,107,71,0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,107,71,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: "rotateX(55deg) scale(2)",
          transformOrigin: "center top",
          top: "-10%",
        }}
      />
      {/* Fade out top */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0E1A] via-transparent to-transparent" />
      {/* Fade out bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E1A] via-transparent to-transparent" />
      {/* Fade out sides */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0E1A] via-transparent to-[#0D0E1A]" />
    </div>
  );
}
