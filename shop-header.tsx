"use client"

import type React from "react"
import { ShoppingCart, Zap } from "lucide-react"

interface ShopHeaderProps {
  cartCount: number
  onCartClick: () => void
}

export default function ShopHeader({ cartCount, onCartClick }: ShopHeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl"
      style={{
        borderBottom: "1px solid rgba(42,31,61,0.7)",
        backgroundColor: "rgba(13,10,20,0.92)",
      }}
    >
      {/* Neon top line */}
      <div
        className="h-[2px] w-full"
        style={{
          background: "linear-gradient(90deg, transparent, #7c3aed, #db2777, #7c3aed, transparent)",
          opacity: 0.85,
        }}
      />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-primary/40 bg-primary/10">
            <Zap className="h-5 w-5 text-primary" style={{ filter: "drop-shadow(0 0 6px rgba(124,58,237,0.9))" }} fill="currentColor" />
            <div className="absolute inset-0 rounded-xl bg-primary/5 blur-sm" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span
                className="font-display text-base font-black uppercase tracking-widest"
              style={{ ...({ fontFamily: "var(--font-display, 'Orbitron', sans-serif)" } as React.CSSProperties), color: "#f0ecfa" }}
                style={{ fontFamily: "var(--font-display, 'Orbitron', sans-serif)" }}
              >
                CARX
              </span>
              <span
                className="font-display text-base font-black uppercase tracking-widest text-primary"
                style={{ fontFamily: "var(--font-display, 'Orbitron', sans-serif)", filter: "drop-shadow(0 0 8px rgba(124,58,237,0.8))" }}
              >
                STREET
              </span>
            </div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(219,39,119,0.8)" }}>
              Mod Shop
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href="https://t.me/lustkaito"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all sm:flex"
            style={{
              border: "1px solid rgba(124,58,237,0.25)",
              background: "rgba(124,58,237,0.07)",
              color: "rgba(124,58,237,0.85)",
            }}
          >
            Telegram
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.04 9.614c-.147.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.903.607z"/>
            </svg>
          </a>

          <button
            onClick={onCartClick}
            className="group relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all"
            style={{
              border: "1px solid rgba(124,58,237,0.35)",
              background: "rgba(124,58,237,0.12)",
              color: "#a78bfa",
            }}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Order</span>
            {cartCount > 0 && (
              <span
                className="animate-badge-pop absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-black text-accent-foreground"
                style={{ boxShadow: "0 0 10px rgba(219,39,119,0.8)" }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
