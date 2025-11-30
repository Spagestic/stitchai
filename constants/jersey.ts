// Team data for pre-filling
export const teamData: Record<
  string,
  { name: string; primaryColor: string; secondaryColor: string; style: string }
> = {
  "real-madrid": {
    name: "Real Madrid",
    primaryColor: "#FFFFFF",
    secondaryColor: "#00529F",
    style: "classic white with blue accents",
  },
  barcelona: {
    name: "Barcelona",
    primaryColor: "#A50044",
    secondaryColor: "#004D98",
    style: "red and blue stripes",
  },
  "man-united": {
    name: "Man United",
    primaryColor: "#DA291C",
    secondaryColor: "#FBE122",
    style: "classic red with gold details",
  },
  liverpool: {
    name: "Liverpool",
    primaryColor: "#C8102E",
    secondaryColor: "#00B2A9",
    style: "vibrant red with teal accents",
  },
  bayern: {
    name: "Bayern Munich",
    primaryColor: "#DC052D",
    secondaryColor: "#0066B2",
    style: "bold red with blue trim",
  },
  psg: {
    name: "Paris SG",
    primaryColor: "#004170",
    secondaryColor: "#DA291C",
    style: "navy blue with red stripe",
  },
  juventus: {
    name: "Juventus",
    primaryColor: "#000000",
    secondaryColor: "#FFFFFF",
    style: "black and white stripes",
  },
  portugal: {
    name: "Portugal",
    primaryColor: "#006600",
    secondaryColor: "#FF0000",
    style: "green and red national colors",
  },
};

// Color palette options
export const colorPalettes = [
  { id: "classic", name: "Classic", colors: ["#FFFFFF", "#000000", "#C8102E"] },
  { id: "ocean", name: "Ocean", colors: ["#0077B6", "#00B4D8", "#90E0EF"] },
  { id: "sunset", name: "Sunset", colors: ["#FF6B6B", "#FFA500", "#FFE66D"] },
  { id: "forest", name: "Forest", colors: ["#2D5A27", "#52B788", "#95D5B2"] },
  { id: "royal", name: "Royal", colors: ["#5E548E", "#9F86C0", "#BE95C4"] },
  { id: "neon", name: "Neon", colors: ["#FF00FF", "#00FFFF", "#39FF14"] },
  {
    id: "midnight",
    name: "Midnight",
    colors: ["#0D1B2A", "#1B263B", "#415A77"],
  },
  { id: "cherry", name: "Cherry", colors: ["#590D22", "#A4133C", "#FF4D6D"] },
  { id: "gold", name: "Gold", colors: ["#FFD700", "#FFC300", "#F4A261"] },
  { id: "arctic", name: "Arctic", colors: ["#CAF0F8", "#ADE8F4", "#48CAE4"] },
  { id: "earth", name: "Earth", colors: ["#774936", "#A68A64", "#E6CCB2"] },
  { id: "candy", name: "Candy", colors: ["#FF69B4", "#FF1493", "#FFB6C1"] },
  { id: "vintage", name: "Vintage", colors: ["#8B4513", "#D2691E", "#F4A460"] },
  { id: "cyber", name: "Cyber", colors: ["#00FF41", "#008F11", "#003B00"] },
  {
    id: "lavender",
    name: "Lavender",
    colors: ["#E6E6FA", "#D8BFD8", "#DDA0DD"],
  },
  { id: "fire", name: "Fire", colors: ["#FF0000", "#FF4500", "#FF8C00"] },
];

export type ColorPalette = {
  id: string;
  name: string;
  colors: string[];
  isCustom?: boolean;
};

// Jersey style options
export const jerseyStyles = [
  { id: "classic", name: "Classic", icon: "shirt-outline" as const },
  { id: "modern", name: "Modern", icon: "flash-outline" as const },
  { id: "retro", name: "Retro", icon: "time-outline" as const },
  { id: "minimalist", name: "Minimal", icon: "remove-outline" as const },
  { id: "bold", name: "Bold", icon: "bonfire-outline" as const },
  { id: "gradient", name: "Gradient", icon: "color-fill-outline" as const },
];
