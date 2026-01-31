import { 
  Wifi, 
  Snowflake, 
  Flame, 
  Utensils, 
  Shirt,
  Wind,
  Tv,
  Waves,
  Bath,
  Dumbbell,
  Car,
  Flower2,
  Umbrella,
  Sunset,
  Mountain,
  BellRing,
  Shield,
  ArrowUpDown,
  PawPrint,
  CigaretteOff,
  Check,
  LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  wifi: Wifi,
  snowflake: Snowflake,
  flame: Flame,
  utensils: Utensils,
  shirt: Shirt,
  wind: Wind,
  tv: Tv,
  waves: Waves,
  bath: Bath,
  dumbbell: Dumbbell,
  car: Car,
  'flower-2': Flower2,
  umbrella: Umbrella,
  sunset: Sunset,
  mountain: Mountain,
  'bell-ring': BellRing,
  shield: Shield,
  'arrow-up-down': ArrowUpDown,
  'paw-print': PawPrint,
  'cigarette-off': CigaretteOff,
  check: Check,
};

interface AmenityIconProps {
  icon: string;
  className?: string;
}

const AmenityIcon = ({ icon, className = "w-4 h-4" }: AmenityIconProps) => {
  const IconComponent = iconMap[icon] || Check;
  return <IconComponent className={className} />;
};

export default AmenityIcon;
