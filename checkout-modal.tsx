"use client"

import { useState } from "react"
import { X, Mail, Lock, Eye, EyeOff, Send, AlertTriangle, CheckCircle2, Zap } from "lucide-react"
import { type CartItem } from "./cart-sidebar"

interface CheckoutModalProps {
  open: boolean
  items: CartItem[]
  onClose: () => void
}

export default function CheckoutModal({ open, items, onClose }: CheckoutModalProps) {
  const [gmail, setGmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [step, setStep] = useState<"form" | "success">("form")
  const [errors, setErrors] = useState<{ gmail?: string; password?: string; agreed?: string }>({})

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  function validate() {
    const e: typeof errors = {}
    if (!gmail.trim()) e.gmail = "Gmail is required"
    else if (!gmail.includes("@gmail.com")) e.gmail = "Must be a valid @gmail.com address"
    if (!password.trim()) e.password = "Password is required"
    else if (password.length < 6) e.password = "Password must be at least 6 characters"
    if (!agreed) e.agreed = "You must agree to continue"
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setStep("success")
    setTimeout(() => {
      window.open("https://t.me/lustkaito", "_blank")
      handleClose()
    }, 2200)
  }

  function handleClose() {
    setStep("form")
    setGmail("")
    setPassword("")
    setAgreed(false)
    setErrors({})
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={handleClose} />

      {/* Modal */}
      <div className="animate-slide-up relative w-full max-w-md overflow-hidden rounded-2xl border border-border/70 bg-card" style={{ boxShadow: "0 0 60px rgba(124,58,237,0.15), 0 0 120px rgba(219,39,119,0.08)" }}>
        {/* Top gradient bar */}
        <div className="h-[3px] w-full bg-gradient-to-r from-primary via-accent to-primary" />

        {/* Subtle background glow inside */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-64 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-border/60 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
              <Zap className="h-4 w-4 text-primary" fill="currentColor" />
            </div>
            <div>
              <h2
                className="text-sm font-black uppercase tracking-wider text-foreground"
                style={{ fontFamily: "var(--font-display, 'Orbitron', sans-serif)" }}
              >
                Complete Order
              </h2>
              <p className="text-[10px] text-muted-foreground">Enter your CarX Street details</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="rounded-xl p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="relative flex flex-col gap-5 p-6">
            {/* Order summary */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-primary/70">Order Summary</p>
              <ul className="flex flex-col gap-1.5">
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between text-xs">
                    <span className="text-foreground/80">
                      {item.name}{" "}
                      <span className="text-muted-foreground">×{item.qty}</span>
                    </span>
                    <span className="font-bold text-primary">${(item.price * item.qty).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
                <span className="text-xs font-bold text-foreground">Total</span>
                <span
                  className="text-lg font-black text-primary"
                  style={{ filter: "drop-shadow(0 0 8px rgba(124,58,237,0.5))", fontFamily: "var(--font-display, 'Orbitron', sans-serif)" }}
                >
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Warning */}
            <div className="flex gap-2.5 rounded-xl border border-yellow-500/25 bg-yellow-500/8 p-3.5">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />
              <p className="text-xs leading-relaxed text-yellow-300/90">
                Your credentials are only used to deliver your mods. We never store or share your info.
                Consider using a secondary account for safety.
              </p>
            </div>

            {/* Gmail */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                CarX Street Gmail
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                <input
                  type="email"
                  value={gmail}
                  onChange={(e) => {
                    setGmail(e.target.value)
                    setErrors((prev) => ({ ...prev, gmail: undefined }))
                  }}
                  placeholder="yourname@gmail.com"
                  className={`w-full rounded-xl border bg-input py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all focus:border-primary focus:shadow-[0_0_12px_oklch(0.70_0.28_295_/_0.2)] ${
                    errors.gmail ? "border-destructive" : "border-border/60"
                  }`}
                />
              </div>
              {errors.gmail && (
                <p className="text-xs text-destructive-foreground">{errors.gmail}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                Account Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setErrors((prev) => ({ ...prev, password: undefined }))
                  }}
                  placeholder="Enter your password"
                  className={`w-full rounded-xl border bg-input py-3 pl-10 pr-11 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-all focus:border-primary focus:shadow-[0_0_12px_oklch(0.70_0.28_295_/_0.2)] ${
                    errors.password ? "border-destructive" : "border-border/60"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive-foreground">{errors.password}</p>
              )}
            </div>

            {/* Agree checkbox */}
            <label className="flex cursor-pointer items-start gap-3">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked)
                    setErrors((prev) => ({ ...prev, agreed: undefined }))
                  }}
                  className="h-4 w-4 rounded border-border/60 accent-primary"
                />
              </div>
              <span className="text-xs leading-relaxed text-muted-foreground">
                I confirm these are my CarX Street account credentials and I agree to the service terms.
              </span>
            </label>
            {errors.agreed && (
              <p className="-mt-3 text-xs text-destructive-foreground">{errors.agreed}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent py-3.5 text-sm font-black uppercase tracking-widest text-white transition-all hover:brightness-110 active:scale-[0.98]"
            >
              <Send className="h-4 w-4" />
              Submit &amp; Go to Telegram
            </button>
          </form>
        ) : (
          /* Success state */
          <div className="relative flex flex-col items-center gap-5 px-6 py-14 text-center">
            {/* Glow behind icon */}
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-primary/40 bg-primary/15" style={{ boxShadow: "0 0 30px rgba(124,58,237,0.4), 0 0 60px rgba(219,39,119,0.2)" }}>
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>

            <div>
              <h3
                className="text-xl font-black uppercase text-foreground"
                style={{ fontFamily: "var(--font-display, 'Orbitron', sans-serif)" }}
              >
                Order Placed!
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Redirecting to Telegram to complete payment...
              </p>
            </div>

            {/* Loading dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-2 w-2 rounded-full bg-primary"
                  style={{ animation: `pulse 1s ease-in-out ${i * 0.25}s infinite` }}
                />
              ))}
            </div>

            <a
              href="https://t.me/lustkaito"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition-all hover:brightness-110"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.04 9.614c-.147.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.903.607z"/>
              </svg>
              Open Telegram Now
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
