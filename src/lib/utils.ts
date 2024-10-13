import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ensure<T>(argument: T | undefined | null): T {
  if (argument === undefined || argument === null) {
    throw new TypeError("This value was promised to be there.");
  }

  return argument;
}
