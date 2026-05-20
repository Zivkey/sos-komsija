import type { CategoryId } from "./types";
import {
  Baby,
  Truck,
  Wrench,
  PawPrint,
  HeartHand,
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
    gradient: "from-pink-400 to-rose-500",
    iconBg: "bg-rose-50",
    tagline: "Sigurnost na prvom mestu",
  },
  {
    id: "moving",
    name: "Fizička pomoć",
    short: "Selidba",
    description: "Selidba, prenos nameštaja, ručna pomoć",
    Icon: Truck,
    iconColor: "text-amber-600",
    basePrice: 1200,
    pricePerHour: 1500,
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
    gradient: "from-sky-400 to-blue-500",
    iconBg: "bg-sky-50",
    tagline: "Hitne intervencije 24/7",
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
    gradient: "from-emerald-400 to-teal-500",
    iconBg: "bg-emerald-50",
    tagline: "Tvoj ljubimac u dobrim rukama",
  },
  {
    id: "elderly",
    name: "Pomoć starijima",
    short: "Kupovina & društvo",
    description: "Kupovina, dostava lekova, društvo i razgovor",
    Icon: HeartHand,
    iconColor: "text-violet-600",
    basePrice: 400,
    pricePerHour: 500,
    gradient: "from-violet-400 to-purple-500",
    iconBg: "bg-violet-50",
    tagline: "Komšijska pomoć kada se najviše ceni",
  },
];

export function getCategory(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
}
