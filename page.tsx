"use client"

import { useState, useCallback } from "react"
import ShopHeader from "@/components/shop-header"
import HeroBanner from "@/components/hero-banner"
import ReviewsSection from "@/components/reviews-section"
import OrderModal from "@/components/order-modal"
import { services, type ServiceOption, type CategoryKey } from "@/lib/products"
import { CheckCircle, Plus, Minus, ChevronDown, Sparkles, ShoppingCart } from "lucide-react"

export interface OrderSelection {
  id: CategoryKey
  name: string
  value: string
  unit: string
}

export default function CarXShopPage() {
  const [selections, setSelections] = useState<Record<CategoryKey, string>>({
    Money: "",
    Gold: "",
    XP: "",
    Cars: "",
    Maps: "",
  })
  const [activeServices, setActiveServices] = useState<Set<CategoryKey>>(new Set())
  const [orderOpen, setOrderOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }, [])

  function toggleService(id: CategoryKey) {
    setActiveServices((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        setSelections((s) => ({ ...s, [id]: "" }))
      } else {
        next.add(id)
      }
      return next
    })
  }

  function updateValue(id: CategoryKey, val: string) {
    setSelections((prev) => ({ ...prev, [id]: val }))
  }

  function stepAmount(service: ServiceOption, direction: 1 | -1) {
    const step = service.amountStep ?? 1
    const min = service.amountMin ?? 0
    const current = Number(selections[service.id].replace(/,/g, "")) || min
    const next = Math.max(min, current + direction * step)
    updateValue(service.id, next.toLocaleString())
  }

  const selectedItems: OrderSelection[] = services
    .filter((s) => activeServices.has(s.id) && selections[s.id])
    .map((s) => ({
      id: s.id,
      name: s.name,
      value: selections[s.id],
      unit: s.unit,
    }))

  const hasSelections = selectedItems.length > 0

  function handleOrder() {
    if (!hasSelections) {
      showToast("Select at least one option first!")
      return
    }
    setOrderOpen(true)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0d0a14", color: "#f0ecfa" }}>
      <ShopHeader cartCount={selectedItems.length} onCartClick={handleOrder} />

      <main>
        <HeroBanner />

        {/* Configurator section */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          {/* Section header */}
          <div className="mb-8 text-center">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/70">
              Mod Account Builder
            </p>
            <h2
              className="text-2xl font-black uppercase tracking-wider text-foreground sm:text-3xl"
              style={{ fontFamily: "var(--font-display, 'Orbitron', sans-serif)" }}
            >
              Customize Your Order
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Pick what you want, set the amount — price is estimated and confirmed on Telegram.
            </p>
          </div>

          {/* Service cards */}
          <div className="flex flex-col gap-4">
            {services.map((service) => {
              const Icon = service.icon
              const isActive = activeServices.has(service.id)
              const value = selections[service.id]

              return (
                <div
                  key={service.id}
                  className="overflow-hidden rounded-2xl border transition-all duration-300"
                  style={{
                    borderColor: isActive ? service.color + "60" : "rgba(42,31,61,0.8)",
                    background: isActive ? service.gradient : "#120d1e",
                    boxShadow: isActive ? `0 0 30px ${service.shadowColor}25` : "none",
                  }}
                >
                  {/* Card header — always visible, click to toggle */}
                  <button
                    onClick={() => toggleService(service.id)}
                    className="flex w-full items-center gap-4 p-5 text-left transition-all hover:bg-white/[0.02]"
                  >
                    {/* Icon */}
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
                      style={{
                        background: isActive ? service.color + "22" : "rgba(255,255,255,0.04)",
                        borderColor: isActive ? service.color + "50" : "rgba(255,255,255,0.08)",
                        boxShadow: isActive ? `0 0 14px ${service.shadowColor}` : "none",
                      }}
                    >
                      <Icon
                        className="h-6 w-6"
                        style={{ color: isActive ? service.color : "#7c6fa0" }}
                      />
                    </div>

                    {/* Label */}
                    <div className="flex-1">
                      <p
                        className="text-base font-black uppercase tracking-wider"
                        style={{
                          fontFamily: "var(--font-display, 'Orbitron', sans-serif)",
                          color: isActive ? service.color : "#f0ecfa",
                        }}
                      >
                        {service.name}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{service.description}</p>
                    </div>

                    {/* Toggle indicator */}
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all"
                      style={{
                        background: isActive ? service.color : "transparent",
                        borderColor: isActive ? service.color : "rgba(124,111,160,0.4)",
                      }}
                    >
                      {isActive ? (
                        <Minus className="h-3.5 w-3.5 text-white" />
                      ) : (
                        <Plus className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {/* Expandable input area */}
                  {isActive && (
                    <div className="border-t px-5 pb-5 pt-4" style={{ borderColor: service.color + "25" }}>
                      {service.inputType === "amount" ? (
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                            Enter Amount ({service.unit})
                          </label>
                          <div className="flex items-center gap-2">
                            {/* Decrease */}
                            <button
                              onClick={() => stepAmount(service, -1)}
                              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-all hover:border-white/20 hover:bg-white/10 hover:text-foreground active:scale-90"
                            >
                              <Minus className="h-4 w-4" />
                            </button>

                            {/* Input */}
                            <div className="relative flex-1">
                              <input
                                type="text"
                                value={value}
                                onChange={(e) => updateValue(service.id, e.target.value)}
                                placeholder={service.placeholder}
                                className="w-full rounded-xl border bg-black/30 py-3 px-4 text-center text-sm font-bold text-foreground placeholder:text-muted-foreground/40 outline-none transition-all"
                                style={{
                                  borderColor: value ? service.color + "60" : "rgba(42,31,61,0.8)",
                                  boxShadow: value ? `0 0 10px ${service.shadowColor}20` : "none",
                                }}
                              />
                            </div>

                            {/* Increase */}
                            <button
                              onClick={() => stepAmount(service, 1)}
                              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-all hover:border-white/20 hover:bg-white/10 hover:text-foreground active:scale-90"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Quick presets */}
                          {service.id === "Money" && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {["1,000,000", "5,000,000", "10,000,000", "50,000,000"].map((preset) => (
                                <button
                                  key={preset}
                                  onClick={() => updateValue(service.id, preset)}
                                  className="rounded-lg border px-2.5 py-1 text-[10px] font-bold transition-all hover:scale-105 active:scale-95"
                                  style={{
                                    borderColor: value === preset ? service.color + "80" : "rgba(42,31,61,0.8)",
                                    background: value === preset ? service.color + "18" : "transparent",
                                    color: value === preset ? service.color : "#7c6fa0",
                                  }}
                                >
                                  ${preset}
                                </button>
                              ))}
                            </div>
                          )}
                          {service.id === "Gold" && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {["1,000", "5,000", "10,000", "50,000"].map((preset) => (
                                <button
                                  key={preset}
                                  onClick={() => updateValue(service.id, preset)}
                                  className="rounded-lg border px-2.5 py-1 text-[10px] font-bold transition-all hover:scale-105 active:scale-95"
                                  style={{
                                    borderColor: value === preset ? service.color + "80" : "rgba(42,31,61,0.8)",
                                    background: value === preset ? service.color + "18" : "transparent",
                                    color: value === preset ? service.color : "#7c6fa0",
                                  }}
                                >
                                  {preset} Gold
                                </button>
                              ))}
                            </div>
                          )}
                          {service.id === "XP" && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {["500,000", "1,000,000", "5,000,000", "Max Level"].map((preset) => (
                                <button
                                  key={preset}
                                  onClick={() => updateValue(service.id, preset)}
                                  className="rounded-lg border px-2.5 py-1 text-[10px] font-bold transition-all hover:scale-105 active:scale-95"
                                  style={{
                                    borderColor: value === preset ? service.color + "80" : "rgba(42,31,61,0.8)",
                                    background: value === preset ? service.color + "18" : "transparent",
                                    color: value === preset ? service.color : "#7c6fa0",
                                  }}
                                >
                                  {preset}
                                </button>
                              ))}
                            </div>
                          )}
                          {service.id === "Cars" && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {["1", "5", "10", "All Cars"].map((preset) => (
                                <button
                                  key={preset}
                                  onClick={() => updateValue(service.id, preset)}
                                  className="rounded-lg border px-2.5 py-1 text-[10px] font-bold transition-all hover:scale-105 active:scale-95"
                                  style={{
                                    borderColor: value === preset ? service.color + "80" : "rgba(42,31,61,0.8)",
                                    background: value === preset ? service.color + "18" : "transparent",
                                    color: value === preset ? service.color : "#7c6fa0",
                                  }}
                                >
                                  {preset === "All Cars" ? preset : `${preset} Cars`}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Select input for Maps */
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                            Choose Map
                          </label>
                          <div className="relative">
                            <select
                              value={value}
                              onChange={(e) => updateValue(service.id, e.target.value)}
                              className="w-full appearance-none rounded-xl border bg-black/30 py-3 pl-4 pr-10 text-sm font-bold text-foreground outline-none transition-all"
                              style={{
                                borderColor: value ? service.color + "60" : "rgba(42,31,61,0.8)",
                                boxShadow: value ? `0 0 10px ${service.shadowColor}20` : "none",
                                color: value ? "#f0ecfa" : "#7c6fa0",
                              }}
                            >
                              <option value="" disabled style={{ background: "#120d1e" }}>
                                Select a map...
                              </option>
                              {service.options?.map((opt) => (
                                <option key={opt.value} value={opt.value} style={{ background: "#120d1e" }}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Order summary + CTA */}
          <div className="mt-8 rounded-2xl border p-6" style={{ borderColor: "rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.05)" }}>
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <p
                className="text-xs font-black uppercase tracking-[0.2em] text-primary"
                style={{ fontFamily: "var(--font-display, 'Orbitron', sans-serif)" }}
              >
                Your Order
              </p>
            </div>

            {hasSelections ? (
              <ul className="mb-5 flex flex-col gap-2">
                {selectedItems.map((item) => {
                  const svc = services.find((s) => s.id === item.id)!
                  return (
                    <li key={item.id} className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-4 py-2.5">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{item.name}</span>
                      <span
                        className="text-sm font-black"
                        style={{ color: svc.color, textShadow: `0 0 8px ${svc.shadowColor}` }}
                      >
                        {item.value} {item.unit}
                      </span>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="mb-5 text-sm text-muted-foreground/60">
                No options selected yet. Toggle the items above to build your order.
              </p>
            )}

            {/* Price note */}
            <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-primary/20 bg-primary/8 px-4 py-3">
              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/80" />
              <p className="text-xs leading-relaxed text-muted-foreground">
                <span className="font-bold text-foreground">Price is estimated after your request.</span>{" "}
                Once you submit, you will be redirected to Telegram{" "}
                <span className="font-bold text-primary">@lustkaito</span> where the final price is confirmed.
              </p>
            </div>

            <button
              onClick={handleOrder}
              disabled={!hasSelections}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                background: hasSelections
                  ? "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)"
                  : "#1a1228",
                boxShadow: hasSelections ? "0 0 25px rgba(124,58,237,0.35)" : "none",
              }}
            >
              <ShoppingCart className="h-4 w-4" />
              Submit Order
            </button>
          </div>
        </section>

        <ReviewsSection />

        {/* Footer */}
        <footer className="border-t py-10 text-center" style={{ borderColor: "rgba(124,58,237,0.2)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-3 flex items-center justify-center gap-3">
              <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(124,58,237,0.3))" }} />
              <span
                className="text-xs font-black uppercase tracking-[0.2em] text-primary"
                style={{ fontFamily: "var(--font-display, 'Orbitron', sans-serif)" }}
              >
                CARX STREET MOD SHOP
              </span>
              <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(124,58,237,0.3))" }} />
            </div>
            <p className="text-xs text-muted-foreground">
              Mods delivered via Telegram{" "}
              <a
                href="https://t.me/lustkaito"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary transition-colors hover:text-accent"
              >
                @lustkaito
              </a>
            </p>
            <p className="mt-1.5 text-[10px]" style={{ color: "rgba(124,111,160,0.4)" }}>
              Not affiliated with CarX Technologies. For entertainment purposes only.
            </p>
          </div>
        </footer>
      </main>

      {/* Order modal */}
      <OrderModal
        open={orderOpen}
        selections={selectedItems}
        onClose={() => setOrderOpen(false)}
      />

      {/* Toast */}
      {toast && (
        <div
          className="animate-slide-up fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2.5 rounded-2xl border px-5 py-3"
          style={{
            borderColor: "rgba(124,58,237,0.3)",
            background: "#120d1e",
            boxShadow: "0 0 30px rgba(124,58,237,0.25), 0 8px 24px rgba(0,0,0,0.4)",
            whiteSpace: "nowrap",
          }}
        >
          <CheckCircle className="h-4 w-4 text-primary" />
          <span className="text-sm font-bold text-foreground">{toast}</span>
        </div>
      )}
    </div>
  )
}
