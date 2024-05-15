import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        desktop: '500px',
      },
      colors: {
        primary: '#FC4F59',
        secondary: '#B3B3B3',
        yellow: '#FFFCE5',
        zeroyellow: '#FFF5ED',
        zeropink: '#FFF3F4',
        onepink: '#FFE5E7',
        twopink: '#FEB3B8',
        threepink: '#FD8188',
        darkgray: '#333333',
        lightgray: '#E6E6E6',
        white: '#FFFFFF',
      },
      tilities: {
        '.smooth-scroll': {
          '-webkit-overflow-scrolling': 'touch',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
export default config
