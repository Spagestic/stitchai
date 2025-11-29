import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get initials for avatar fallback
export const getInitials = (name?: string) => {
  if (!name) {
    return "??";
  }
  const nameParts = name.trim().split(" ");
  if (nameParts.length === 1) {
    return nameParts[0][0].toUpperCase();
  }
  return (nameParts[0][0] + nameParts.at(-1)?.[0]).toUpperCase();
};
