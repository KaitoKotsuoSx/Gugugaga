"use client"

import { ShoppingCart, Star, Flame, Sparkles } from "lucide-react"
import { type Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const Icon = product.icon

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50" style={{ ["--hover-shadow" as string]: "0 0 40px rgba(124,58,237,0.18), 0 0 80px rgba(219,39,119,0.08)" }}>
      {/* Animated border glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-primary/60 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Hot badge */}
      {product.hot && (
        <span className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full border border-accent/40 bg-accent/20 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-accent" style={{ boxShadow: "0 0 10px rgba(219,39,119,0.4)" }}>
          <Flame className="h-2.5 w-2.5" fill="currentColor" />
          Hot
        </span>
      )}

      {/* Card image area */}
      <div
        className="relative flex h-44 items-center justify-center overflow-hidden"
        style={{ background: product.gradient }}
      >
        {/* Shimmer overlay */}
        <div className="animate-shimmer absolute inset-0" />

        {/* Speed lines decoration */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent"
              style={{ top: `${20 + i * 15}%`, left: "-10%", right: "-10%", transform: "rotate(-5deg)" }}
            />
          ))}
        </div>

        {/* Icon */}
        <div className="animate-float relative flex flex-col items-center gap-2.5">
          <div className="relative flex h-18 w-18 items-center justify-center rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.4)]">
            <Icon className="h-9 w-9 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          </div>
          <span className="rounded-full border border-white/20 bg-black/20 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
            {product.category}
          </span>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-card to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Name & description */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3
              className="text-sm font-black uppercase leading-tight tracking-wide text-foreground"
              style={{ fontFamily: "var(--font-display, 'Orbitron', sans-serif)" }}
            >
              {product.name}
            </h3>
            {product.originalPrice && (
              <span className="shrink-0 rounded-md bg-accent/15 px-1.5 py-0.5 text-[9px] font-bold text-accent">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            )}
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{product.description}</p>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-1">
          {product.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-2.5 w-2.5 shrink-0 text-primary" />
              {f}
            </li>
          ))}
        </ul>

        {/* Stars */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < product.stars ? "fill-gold text-gold" : "text-muted-foreground"}`}
              style={i < product.stars ? { filter: "drop-shadow(0 0 4px rgba(234,179,8,0.6))" } : undefined}
            />
          ))}
          <span className="ml-1 text-[11px] text-muted-foreground/70">({product.reviews})</span>
        </div>

        {/* Price & CTA */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <div>
            {product.originalPrice && (
              <span className="text-xs line-through text-muted-foreground/60">${product.originalPrice}</span>
            )}
            <p
              className="text-2xl font-black text-primary"
              style={{ fontFamily: "var(--font-display, 'Orbitron', sans-serif)", filter: "drop-shadow(0 0 10px rgba(124,58,237,0.5))" }}
            >
              ${product.price}
            </p>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/15 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-primary transition-all hover:border-primary/60 hover:bg-primary/25 active:scale-95"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
