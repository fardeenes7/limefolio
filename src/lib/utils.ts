import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLayoutWidthValue(widthStr: string): string {
    switch (widthStr) {
        case 'narrow': return '48rem'; // max-w-3xl
        case 'default': return '64rem'; // max-w-5xl
        case 'wide': return '80rem'; // max-w-7xl
        case 'full': return '100%';
        default: return '64rem';
    }
}
