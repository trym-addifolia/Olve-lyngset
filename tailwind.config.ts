import type { Config } from 'tailwindcss'
import { site } from './src/site.config'

/*
 * Token architecture (kept from the template): CSS semantic variables for
 * shadcn + named brand scales (fjord, the home accent ochre,
 * krystall for the sister-site link, ember, ink) + two neutrals. The
 * hex values come from site.config.ts theme; globals.css mirrors the HSL
 * semantic tokens. No hex literals anywhere else in src/.
 */
export default {
  darkMode: ['class'],
  content: ['./src/components/**/*.{ts,tsx}', './src/app/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-display)', 'Georgia', 'serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      colors: {
        fjord: site.theme.fjord,
        ochre: site.theme.ochre,
        krystall: site.theme.krystall,
        ember: site.theme.ember,
        ink: site.theme.ink,
        paper: site.theme.paper,
        mist: site.theme.mist,
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      maxWidth: {
        prose: '66ch',
      },
      /* Bringhurst-style scale, ratio ~1.2 to 1.25 from a 17px base */
      fontSize: {
        'display-xl': ['3.5rem', { lineHeight: '1.04', letterSpacing: '-0.015em' }],
        'display-lg': ['2.75rem', { lineHeight: '1.06', letterSpacing: '-0.01em' }],
        'display-md': ['2.125rem', { lineHeight: '1.12', letterSpacing: '-0.005em' }],
        'display-sm': ['1.625rem', { lineHeight: '1.2' }],
      },
      container: {
        center: true,
        padding: { DEFAULT: '1rem', sm: '2rem', lg: '4rem', xl: '5rem', '2xl': '6rem' },
        screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
