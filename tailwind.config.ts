import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,md,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0f766e',
          fg: '#064e3b',
          soft: '#ccfbf1',
        },
        charcoal: {
          DEFAULT: '#2d3748',
          mid: '#4a5568',
          deep: '#1a202c',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        nav: ['var(--font-nav)', 'Oswald', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
