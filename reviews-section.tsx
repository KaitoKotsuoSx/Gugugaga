"use client"

import { useState } from "react"
import { Star, ChevronDown } from "lucide-react"

interface Review {
  id: number
  username: string
  avatar: string
  stars: number
  text: string
  date: string
  flag: string
}

const reviews: Review[] = [
  { id: 1,  username: "ViperXGaming",      avatar: "V", stars: 5, flag: "🇮🇳", date: "1 day ago",    text: "bhai ye shop ekdum mast hai. money add hua 5 min mein. trusted seller 100%" },
  { id: 2,  username: "ProRacer_Arjun",    avatar: "P", stars: 5, flag: "🇮🇳", date: "2 days ago",   text: "Got 10M money and all cars unlocked. Everything delivered super fast on Telegram. Highly recommend." },
  { id: 3,  username: "sk_drifts99",       avatar: "S", stars: 5, flag: "🇮🇳", date: "2 days ago",   text: "bhai mast hai ye. gold add hogaya turant. bilkul sahi kaam karta hai. 5 star dena banta hai" },
  { id: 4,  username: "NightRider_Rahul",  avatar: "N", stars: 5, flag: "🇮🇳", date: "3 days ago",   text: "Excellent service. XP was added within 10 minutes and I reached max level. Very professional seller." },
  { id: 5,  username: "turboking_krish",   avatar: "T", stars: 5, flag: "🇮🇳", date: "3 days ago",   text: "omg bhai ye real hai. mujhe laga fake hoga but nahi tha. gold aaya sahi mein. best shop" },
  { id: 6,  username: "Rohan_Speedster",   avatar: "R", stars: 4, flag: "🇮🇳", date: "4 days ago",   text: "Money and gold both added correctly. Took around 20 minutes total. Good service, will come back for maps." },
  { id: 7,  username: "xX_Sniperboy_Xx",   avatar: "X", stars: 5, flag: "🇮🇳", date: "4 days ago",   text: "yaar itna fast tha delivery. maine socha nahi tha itna quick hoga. cars sab unlock ho gaye. legend seller" },
  { id: 8,  username: "DriftMaster_Dev",   avatar: "D", stars: 5, flag: "🇮🇳", date: "5 days ago",   text: "Got the mountain map unlocked plus XP boost. Works perfectly in game. This is the only legit CarX shop." },
  { id: 9,  username: "kartik_godgamer",   avatar: "K", stars: 5, flag: "🇮🇳", date: "5 days ago",   text: "bhai 50M money dale. aur koi dikkat nahi aayi. ekdum real hai ye shop. sabko bolunga" },
  { id: 10, username: "ShadowDrive_Aman",  avatar: "S", stars: 4, flag: "🇮🇳", date: "6 days ago",   text: "Ordered XP custom amount. Seller confirmed price quickly on Telegram and delivered in under 15 minutes. Solid." },
  { id: 11, username: "ryzen_racer_08",    avatar: "R", stars: 5, flag: "🇮🇳", date: "6 days ago",   text: "bhai kya bolu ye to best hai. maine cars liye aur xp bhi. dono aa gaye. seller is too good yaar" },
  { id: 12, username: "Vivek_CarXPro",     avatar: "V", stars: 5, flag: "🇮🇳", date: "1 week ago",   text: "Very smooth transaction. Got gold added to my account and the price was very fair. Trusted seller on Telegram." },
  { id: 13, username: "dark_hunt3r_in",    avatar: "D", stars: 5, flag: "🇮🇳", date: "1 week ago",   text: "5 star no doubt. maine gold aur money dono liye ek saath. koi problem nahi. real deal hai bhai" },
  { id: 14, username: "FastLane_Sahil",    avatar: "F", stars: 5, flag: "🇮🇳", date: "1 week ago",   text: "Purchased all maps including mountain. Everything unlocked as promised. Great communication on Telegram." },
  { id: 15, username: "neon_gamer_aj",     avatar: "N", stars: 3, flag: "🇮🇳", date: "8 days ago",   text: "thoda late aaya delivery but aaya sahi. seller ne explain kiya delay kyun hua. next time fast hoga shayad" },
  { id: 16, username: "Suresh_Drifter",    avatar: "S", stars: 5, flag: "🇮🇳", date: "8 days ago",   text: "Max XP added. Went from level 3 to max overnight. The seller is honest and prices are reasonable. 10 out of 10." },
  { id: 17, username: "blaze_yt_gaming",   avatar: "B", stars: 5, flag: "🇮🇳", date: "9 days ago",   text: "bhai real hai bhai. maine 2 baar liya. pehle money phir gold. dono baar same day mila. 100% trusted" },
  { id: 18, username: "RocketDrift_Nitin", avatar: "R", stars: 4, flag: "🇮🇳", date: "9 days ago",   text: "Ordered custom car unlock. Took slightly longer than expected but all cars delivered correctly. Would use again." },
  { id: 19, username: "ghost_speed_in",    avatar: "G", stars: 5, flag: "🇮🇳", date: "10 days ago",  text: "ye shop ekdum genuine hai. mera dost bola tha trusted hai to maine liya. bilkul sahi nikla. thanks bhai" },
  { id: 20, username: "Ankush_ProGamer",   avatar: "A", stars: 5, flag: "🇮🇳", date: "10 days ago",  text: "Everything works as described. Got money, gold and XP all in one order. Seller replied very fast on Telegram." },
  { id: 21, username: "xdrifter_sonu",     avatar: "X", stars: 5, flag: "🇮🇳", date: "11 days ago",  text: "bhai mast service hai. maine pehle dara tha dene ke liye details but sab theek raha. ab regular customer hun" },
  { id: 22, username: "Aditya_NFS_Fan",    avatar: "A", stars: 4, flag: "🇮🇳", date: "11 days ago",  text: "Got race map unlocked. Works great in the game. Seller was helpful when I asked questions. Fair pricing." },
  { id: 23, username: "turbo_paji99",      avatar: "T", stars: 5, flag: "🇮🇳", date: "12 days ago",  text: "paji ye to mast hai. gold 10k dala mere account mein. koi jhol nahi tha. seedha kaam kiya. bohot accha" },
  { id: 24, username: "Rishi_DriftKing",   avatar: "R", stars: 5, flag: "🇮🇳", date: "12 days ago",  text: "Ordered 5M money and mountain map. Both delivered perfectly. The seller sends confirmation on Telegram. Legit shop." },
  { id: 25, username: "cr7_gamer_india",   avatar: "C", stars: 5, flag: "🇮🇳", date: "2 weeks ago",  text: "bhai ye free fire wala nahi hai ye real hai lol. cars sab aa gaye. mere saare friends ne bhi order kiya" },
  { id: 26, username: "Mohit_XStreet",     avatar: "M", stars: 4, flag: "🇮🇳", date: "2 weeks ago",  text: "Service was good. Took about 25 minutes for XP to be added but the amount was correct. Price was fair too." },
  { id: 27, username: "sniper_drift777",   avatar: "S", stars: 5, flag: "🇮🇳", date: "2 weeks ago",  text: "bhai koi scam nahi hai ye. maine 1 crore money liya game mein. seller ne fast diya. trust karo bhai" },
  { id: 28, username: "Harshit_Racer",     avatar: "H", stars: 5, flag: "🇮🇳", date: "15 days ago",  text: "Exceptional. Ordered custom XP and all cars. Delivered in one go. Seller is very responsive. Best CarX service." },
  { id: 29, username: "op_gamer_lokesh",   avatar: "O", stars: 4, flag: "🇮🇳", date: "15 days ago",  text: "accha service hai bhai. thoda time laga but koi baat nahi. sab sahi tha. telegram pe helpful hai seller" },
  { id: 30, username: "FlashDrive_Pranav", avatar: "F", stars: 5, flag: "🇮🇳", date: "16 days ago",  text: "Top class service. Got gold and race map together. Everything unlocked within 20 minutes. Will definitely order again." },
  { id: 31, username: "dark_mode_gamer",   avatar: "D", stars: 5, flag: "🇮🇳", date: "16 days ago",  text: "bhai trusted hai 100%. maine apne dost ko bhi send kiya link. usne bhi liya. dono ko mila. real shop hai" },
  { id: 32, username: "Kunal_SpeedRacer",  avatar: "K", stars: 5, flag: "🇧🇩", date: "17 days ago",  text: "Amazing experience. The seller confirms everything before charging. Got max XP and 5M money. Totally worth it." },
]

const INITIAL_SHOW = 8

const avatarColors = [
  { bg: "rgba(124,58,237,0.2)",  border: "rgba(124,58,237,0.45)", text: "#a78bfa" },
  { bg: "rgba(219,39,119,0.18)", border: "rgba(219,39,119,0.4)",  text: "#f472b6" },
  { bg: "rgba(109,40,217,0.22)", border: "rgba(109,40,217,0.45)", text: "#c4b5fd" },
  { bg: "rgba(147,51,234,0.18)", border: "rgba(147,51,234,0.4)",  text: "#d8b4fe" },
]

export default function ReviewsSection() {
  const [showAll, setShowAll] = useState(false)
  const displayed = showAll ? reviews : reviews.slice(0, INITIAL_SHOW)
  const avgStars = (reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1)

  return (
    <section
      className="mx-auto max-w-7xl px-4 pb-14 pt-4 sm:px-6"
      style={{ backgroundColor: "transparent" }}
    >
      {/* Section header */}
      <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p
            className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em]"
            style={{ color: "rgba(124,58,237,0.7)" }}
          >
            What Players Say
          </p>
          <h2
            className="text-lg font-black uppercase tracking-[0.15em]"
            style={{
              fontFamily: "var(--font-display, 'Orbitron', sans-serif)",
              color: "#f0ecfa",
            }}
          >
            Customer Reviews
          </h2>
        </div>

        {/* Summary bar */}
        <div
          className="flex items-center gap-4 rounded-2xl px-5 py-3"
          style={{
            border: "1px solid rgba(124,58,237,0.3)",
            background: "rgba(124,58,237,0.07)",
          }}
        >
          <div className="text-center">
            <p
              className="text-3xl font-black leading-none"
              style={{
                fontFamily: "var(--font-display,'Orbitron',sans-serif)",
                color: "#a78bfa",
              }}
            >
              {avgStars}
            </p>
            <div className="mt-1 flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-3 w-3"
                  fill={i < 5 ? "#eab308" : "none"}
                  style={{ color: "#eab308" }}
                />
              ))}
            </div>
          </div>
          <div className="h-10 w-px" style={{ background: "rgba(124,58,237,0.3)" }} />
          <div className="text-center">
            <p className="text-xl font-black" style={{ color: "#f0ecfa" }}>
              {reviews.length}
            </p>
            <p
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "rgba(240,236,250,0.4)" }}
            >
              Reviews
            </p>
          </div>
          <div className="h-10 w-px" style={{ background: "rgba(124,58,237,0.3)" }} />
          <div className="text-center">
            <p className="text-xl font-black" style={{ color: "#f0ecfa" }}>500+</p>
            <p
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "rgba(240,236,250,0.4)" }}
            >
              Sold
            </p>
          </div>
        </div>
      </div>

      {/* Reviews grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {displayed.map((review, idx) => {
          const colors = avatarColors[idx % avatarColors.length]
          return (
            <div
              key={review.id}
              className="flex flex-col gap-3 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5"
              style={{
                border: "1px solid rgba(124,58,237,0.18)",
                background: "#120d1e",
                boxShadow: "0 2px 16px rgba(0,0,0,0.35)",
                animationDelay: `${(idx % INITIAL_SHOW) * 40}ms`,
              }}
            >
              {/* Top row — avatar + name + date */}
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black"
                  style={{
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                  }}
                >
                  {review.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <p
                      className="truncate text-xs font-bold"
                      style={{ color: "#f0ecfa" }}
                    >
                      {review.username}
                    </p>
                    <span className="text-xs">{review.flag}</span>
                  </div>
                  <p className="text-[10px]" style={{ color: "rgba(240,236,250,0.35)" }}>
                    {review.date}
                  </p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3 w-3"
                    fill={i < review.stars ? "#eab308" : "none"}
                    style={{
                      color: i < review.stars ? "#eab308" : "rgba(255,255,255,0.12)",
                    }}
                  />
                ))}
              </div>

              {/* Review text */}
              <p
                className="flex-1 text-xs leading-relaxed"
                style={{ color: "rgba(240,236,250,0.58)" }}
              >
                &ldquo;{review.text}&rdquo;
              </p>
            </div>
          )
        })}
      </div>

      {/* Show more */}
      {!showAll && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5"
            style={{
              border: "1px solid rgba(124,58,237,0.35)",
              background: "rgba(124,58,237,0.08)",
              color: "#a78bfa",
            }}
          >
            <ChevronDown className="h-4 w-4" />
            Show All {reviews.length} Reviews
          </button>
        </div>
      )}
    </section>
  )
}
