import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function showMatrixTillNewYear(): boolean {
  const now = new Date();
  return now.getMonth() === 11 && now.getDate() >= 1;
}

export function showFestivBanner(expiryDate: Date): boolean {
  const today = new Date();

  const d1 = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const d2 = new Date(
    expiryDate.getFullYear(),
    expiryDate.getMonth(),
    expiryDate.getDate()
  );

  return d1.getTime() <= d2.getTime();
}
