import type { Config } from 'tailwindcss'

// Tokens are locked in DESIGN.md §3 and live as CSS custom properties in src/app/globals.css.
// The components use the plain classes there; Tailwind keeps only the reset and a few utilities.
export default {
  content: ['./src/**/*.{ts,tsx}', './content/**/*.ts'],
  theme: {
    screens: { sm: '600px', md: '768px', lg: '1024px', xl: '1200px' },
    extend: {
      colors: {
        sky: 'var(--sky)',
        pane: 'var(--pane)',
        ink: 'var(--ink)',
        soft: 'var(--ink-soft)',
        line: 'var(--line)',
        deep: 'var(--deep)',
        signal: 'var(--signal)',
      },
      fontFamily: { sans: ['var(--font-text)', 'Verdana', 'sans-serif'] },
    },
  },
  plugins: [],
} satisfies Config
