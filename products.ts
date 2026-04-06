import { Car, Zap, DollarSign, Gem, Map, type LucideIcon } from "lucide-react"

export type CategoryKey = "Money" | "Gold" | "XP" | "Cars" | "Maps"

export interface ServiceOption {
  id: CategoryKey
  name: string
  icon: LucideIcon
  color: string
  shadowColor: string
  gradient: string
  inputType: "amount" | "select"
  unit: string
  placeholder?: string
  description: string
  options?: { label: string; value: string }[]
  amountStep?: number
  amountMin?: number
}

export const services: ServiceOption[] = [
  {
    id: "Money",
    name: "Money",
    icon: DollarSign,
    color: "#22d3ee",
    shadowColor: "rgba(34,211,238,0.5)",
    gradient: "linear-gradient(135deg, #1a1228 0%, #0f1a24 100%)",
    inputType: "amount",
    unit: "$",
    placeholder: "e.g. 5,000,000",
    description: "Custom amount of in-game cash added directly to your account.",
    amountStep: 100000,
    amountMin: 100000,
  },
  {
    id: "Gold",
    name: "Gold",
    icon: Gem,
    color: "#eab308",
    shadowColor: "rgba(234,179,8,0.5)",
    gradient: "linear-gradient(135deg, #1a1228 0%, #1a1500 100%)",
    inputType: "amount",
    unit: "Gold",
    placeholder: "e.g. 5,000",
    description: "Custom amount of premium Gold coins credited to your account.",
    amountStep: 500,
    amountMin: 500,
  },
  {
    id: "XP",
    name: "XP",
    icon: Zap,
    color: "#a855f7",
    shadowColor: "rgba(168,85,247,0.5)",
    gradient: "linear-gradient(135deg, #1a1228 0%, #0f0524 100%)",
    inputType: "amount",
    unit: "XP",
    placeholder: "e.g. 1,000,000",
    description: "Custom XP amount injected to boost your rank as high as you want.",
    amountStep: 50000,
    amountMin: 50000,
  },
  {
    id: "Cars",
    name: "Cars",
    icon: Car,
    color: "#f472b6",
    shadowColor: "rgba(244,114,182,0.5)",
    gradient: "linear-gradient(135deg, #1a1228 0%, #24001a 100%)",
    inputType: "amount",
    unit: "Cars",
    placeholder: "e.g. 10",
    description: "Choose how many cars you want unlocked with full upgrades.",
    amountStep: 1,
    amountMin: 1,
  },
  {
    id: "Maps",
    name: "Maps",
    icon: Map,
    color: "#34d399",
    shadowColor: "rgba(52,211,153,0.5)",
    gradient: "linear-gradient(135deg, #1a1228 0%, #001a0e 100%)",
    inputType: "select",
    unit: "",
    description: "Select the map or zone you want fully unlocked.",
    options: [
      { label: "Mountain Map", value: "Mountain Map" },
      { label: "Race Map", value: "Race Map" },
      { label: "Both Maps", value: "Mountain Map + Race Map" },
    ],
  },
]
