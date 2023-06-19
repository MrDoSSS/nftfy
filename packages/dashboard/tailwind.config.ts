import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'

export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: ['dracula'],
  },
} satisfies Config
