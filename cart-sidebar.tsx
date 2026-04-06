"use client"

import { X, Trash2, ShoppingCart, ArrowRight, Zap } from "lucide-react"
import { type Product } from "@/lib/products"

export interface CartItem extends Product {
  qty: number
}

interface CartSidebarProps {
  open: boolean
  items: CartItem[]
  onClose: () => void
  onRemove: (id: string) => void
  onCheckout: () => void
}

export default function CartSidebar({ open, items, onClose, onRemove, onCheckout }: CartSidebarProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col border-l border-border/60 bg-card transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top accent line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-primary via-accent to-primary" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
              <ShoppingCart className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h2
                className="text-sm font-black uppercase tracking-wider text-foreground"
                style={{ fontFamily: "var(--font-display, 'Orbitron', sans-serif)" }}
              >
                Your Cart
              </h2>
              {items.length > 0 && (
                <p className="text-[10px] text-muted-foreground">
                  {items.reduce((s, i) => s + i.qty, 0)} item{items.reduce((s, i) => s + i.qty, 0) !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border/60 bg-secondary">
                <ShoppingCart className="h-7 w-7 text-muted-foreground/40" />
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground">Cart is empty</p>
                <p className="mt-1 text-xs text-muted-foreground/50">Add mods to get started!</p>
              </div>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {items.map((item) => {
                const Icon = item.icon
                return (
                  <li
                    key={item.id}
                    className="animate-slide-up flex items-center gap-3 rounded-xl border border-border/60 bg-secondary/40 p-3 transition-all hover:border-primary/30"
                  >
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10"
                      style={{ background: item.gradient }}
                    >
                      <Icon className="h-5 w-5 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className="truncate text-xs font-black uppercase tracking-wide text-foreground"
                        style={{ fontFamily: "var(--font-display, 'Orbitron', sans-serif)" }}
                      >
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">Qty: {item.qty}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-primary">${(item.price * item.qty).toFixed(2)}</span>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-destructive/20 hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border/60 px-5 py-5">
            {/* Total */}
            <div className="mb-4 flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
              <span className="text-sm text-muted-foreground">Total</span>
              <span
                className="text-xl font-black text-primary"
                style={{ filter: "drop-shadow(0 0 8px rgba(124,58,237,0.6))", fontFamily: "var(--font-display, 'Orbitron', sans-serif)" }}
              >
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Buy Now button */}
            <button
              onClick={onCheckout}
              className="animate-pulse-glow flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent py-3.5 text-sm font-black uppercase tracking-widest text-white transition-all hover:brightness-110 active:scale-[0.98]"
              style={{ boxShadow: "0 0 20px rgba(124,58,237,0.3)" }}
            >
              <Zap className="h-4 w-4" fill="currentColor" />
              Buy Now
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="mt-3 text-center text-[10px] text-muted-foreground/60">
              Redirected to Telegram <span className="text-primary/80">@lustkaito</span> to complete order.
            </p>
          </div>
        )}
      </aside>
    </>
  )
}
