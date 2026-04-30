export default function DarkGradientLayout({ children }) {
  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-black
        via-slate-900
        to-blue-950
        text-white
      "
    >
      {/* Glow inferior */}
      <div className="absolute inset-0 pointer-events-none
        bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.25),transparent_60%)]
      " />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
