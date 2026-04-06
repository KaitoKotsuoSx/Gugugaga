"use client"

import { Shield, Clock, Zap, Flame, TrendingUp } from "lucide-react"

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden border-b border-white/10" style={{ background: "#0d0a14" }}>
      {/* Deep layered background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0d0a14 0%, #110d1e 50%, #0e0b18 100%)",
        }}
      />

      {/* Diagonal speed lines (anime style) */}
      <div className="absolute inset-0 overflow-hidden" style={{ opacity: 0.06 }}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px"
            style={{
              top: `${8 + i * 8}%`,
              left: "-20%",
              right: "-20%",
              transform: "rotate(-8deg)",
              background: "linear-gradient(90deg, transparent, #7c3aed, transparent)",
              opacity: i % 3 === 0 ? 0.8 : 0.4,
            }}
          />
        ))}
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.03,
          backgroundImage: "linear-gradient(#7c3aed 1px, transparent 1px), linear-gradient(90deg, #7c3aed 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute -left-20 top-0 h-80 w-80 rounded-full blur-[80px]" style={{ background: "rgba(124,58,237,0.08)" }} />
      <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full blur-[70px]" style={{ background: "rgba(219,39,119,0.08)" }} />
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" style={{ background: "rgba(124,58,237,0.05)" }} />

      {/* Car silhouette */}
      <div className="absolute bottom-0 right-0 hidden opacity-[0.18] lg:block">
        <img
          src="https://placehold.co/600x280?text=Anime+sports+car+silhouette+neon+violet+glow+side+view+low+rider"
          alt="Anime sports car silhouette with neon violet glow"
          className="h-64 w-auto object-contain"
          style={{ filter: "drop-shadow(0 0 30px rgba(124,58,237,0.6)) saturate(0) brightness(2)" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        {/* Top badges row */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.15em]"
            style={{
              borderColor: "rgba(124,58,237,0.4)",
              background: "rgba(124,58,237,0.1)",
              color: "#a78bfa",
              boxShadow: "0 0 12px rgba(124,58,237,0.25)",
            }}
          >
            <Flame className="h-3 w-3" style={{ color: "#ec4899" }} fill="currentColor" />
            Mod Accounts — Instant Delivery
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.15em]"
            style={{
              borderColor: "rgba(219,39,119,0.3)",
              background: "rgba(219,39,119,0.1)",
              color: "#f472b6",
            }}
          >
            Trusted Seller
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="text-balance text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl"
          style={{ fontFamily: "var(--font-display, 'Orbitron', sans-serif)", color: "#f5f3fa" }}
        >
          <span className="block" style={{ color: "rgba(245,243,250,0.9)" }}>CarX</span>
          <span
            className="block"
            style={{
              color: "#a78bfa",
              textShadow: "0 0 40px rgba(124,58,237,0.6), 0 0 80px rgba(124,58,237,0.3)",
            }}
          >
            Street
          </span>
          <span
            className="block"
            style={{
              background: "linear-gradient(90deg, #7c3aed, #ec4899, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Mod Shop
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-pretty text-sm leading-relaxed sm:text-base" style={{ color: "rgba(245,243,250,0.55)" }}>
          Unlock unlimited{" "}
          <span className="font-semibold" style={{ color: "#f5f3fa" }}>Cars, XP, Money, Gold</span> &amp; all{" "}
          <span className="font-semibold" style={{ color: "#f5f3fa" }}>Maps</span>. Safe modded accounts delivered straight to your
          CarX Street profile — trusted by{" "}
          <span className="font-semibold" style={{ color: "#a78bfa" }}>10,000+ racers</span> worldwide.
        </p>

        {/* Stats row */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          {/* 500+ Sold counter */}
          <div
            className="flex items-center gap-3 rounded-2xl border px-5 py-3"
            style={{
              borderColor: "rgba(124,58,237,0.35)",
              background: "rgba(124,58,237,0.08)",
              boxShadow: "0 0 20px rgba(124,58,237,0.15)",
            }}
          >
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)" }}
            >
              <TrendingUp className="h-4 w-4" style={{ color: "#a78bfa" }} />
            </div>
            <div>
              <p
                className="text-2xl font-black leading-none"
                style={{
                  fontFamily: "var(--font-display, 'Orbitron', sans-serif)",
                  color: "#a78bfa",
                  textShadow: "0 0 15px rgba(124,58,237,0.5)",
                }}
              >
                500+
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "rgba(167,139,250,0.7)" }}>
                Accounts Sold
              </p>
            </div>
          </div>

          {/* Trust badges */}
          {[
            { icon: Shield, label: "100% Safe", color: "#a78bfa" },
            { icon: Clock, label: "Instant Delivery", color: "#f472b6" },
            { icon: Zap, label: "10K+ Orders", color: "#a78bfa" },
          ].map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color }}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-semibold" style={{ color: "rgba(245,243,250,0.8)" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
