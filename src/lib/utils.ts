import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/*
 * tailwind-merge must know the custom display sizes from tailwind.config.ts,
 * otherwise it reads `text-display-lg` as a text colour and drops it when a
 * `text-foreground` follows in the same cn() call.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['display-xl', 'display-lg', 'display-md', 'display-sm'] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
