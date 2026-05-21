import type { CategoryId } from "./types";
import {
  Baby,
  Truck,
  Wrench,
  PawPrint,
  HeartHand,
  Sparkle,
} from "@/components/icons";

export type Category = {
  id: CategoryId;
  name: string;
  short: string;
  description: string;
  Icon: React.FC<{ size?: number; className?: string; stroke?: number }>;
  iconColor: string;
  basePrice: number;
  pricePerHour: number;
  /** [min, max] suggested price per hour in RSD */
  hourlyRange: [number, number];
  gradient: string;
  iconBg: string;
  tagline: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "babysitting",
    name: "Briga o deci",
    short: "Babysitting",
    description: "Iskusne dadilje za čuvanje dece u tvom domu",
    Icon: Baby,
    iconColor: "text-rose-500",
    basePrice: 600,
    pricePerHour: 600,
    hourlyRange: [500, 900],
    gradient: "from-pink-400 to-rose-500",
    iconBg: "bg-rose-50",
    tagline: "Sigurnost na prvom mestu",
  },
  {
    id: "moving",
    name: "Fizička pomoć",
    short: "Selidba",
    description: "Selidba i prenos nameštaja",
    Icon: Truck,
    iconColor: "text-amber-600",
    basePrice: 1200,
    pricePerHour: 1500,
    hourlyRange: [1200, 2000],
    gradient: "from-amber-400 to-orange-500",
    iconBg: "bg-amber-50",
    tagline: "Snažne ruke kada trebaju",
  },
  {
    id: "repairs",
    name: "Kućne popravke",
    short: "Majstor",
    description: "Vodoinstalater, električar, brze intervencije",
    Icon: Wrench,
    iconColor: "text-sky-600",
    basePrice: 1500,
    pricePerHour: 2000,
    hourlyRange: [1500, 2800],
    gradient: "from-sky-400 to-blue-500",
    iconBg: "bg-sky-50",
    tagline: "Hitne intervencije 24/7",
  },
  {
    id: "cleaning",
    name: "Čišćenje",
    short: "Čišćenje",
    description: "Čišćenje stana, dubinsko pranje, higijena",
    Icon: Sparkle,
    iconColor: "text-cyan-600",
    basePrice: 1000,
    pricePerHour: 1200,
    hourlyRange: [900, 1500],
    gradient: "from-cyan-400 to-teal-500",
    iconBg: "bg-cyan-50",
    tagline: "Čistoća do detalja",
  },
  {
    id: "pets",
    name: "Ljubimci",
    short: "Šetnja & čuvanje",
    description: "Šetnja, čuvanje i nega kućnih ljubimaca",
    Icon: PawPrint,
    iconColor: "text-emerald-600",
    basePrice: 500,
    pricePerHour: 700,
    hourlyRange: [500, 1000],
    gradient: "from-emerald-400 to-teal-500",
    iconBg: "bg-emerald-50",
    tagline: "Tvoj ljubimac u dobrim rukama",
  },
  {
    id: "elderly",
    name: "Pomoć starijima",
    short: "Kupovina & IT",
    description: "Kupovina, dostava lekova, IT pomoć i administracija",
    Icon: HeartHand,
    iconColor: "text-violet-600",
    basePrice: 400,
    pricePerHour: 500,
    hourlyRange: [400, 800],
    gradient: "from-violet-400 to-purple-500",
    iconBg: "bg-violet-50",
    tagline: "Komšijska pomoć kada se najviše ceni",
  },
];

export function getCategory(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
}
