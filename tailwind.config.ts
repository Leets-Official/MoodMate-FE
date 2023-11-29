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
      // colors: {
      //   primary: '#FC4F59',
      //   zeropink: '#FC5862',
      //   chatpink: '#FF848C',
      //   onepink: '#FD8188',
      //   twopink: '#FEB3B8',
      //   threepink: '#FFE5E7',
      //   fourpink: '#FFF3F4',
      //   keypink: '#FC616A',
      //   keyspink: '#FC626A',
      //   secondary: '#CCCCCC',
      //   zerogray: '#B3B3B3',
      //   onegray: '#999999',
      //   twogray: '#808080',
      //   threegray: '#666666',
      //   fourgray: '#4D4D4D',
      //   fivegray: '#E6E6E6',
      //   logingray: '#757575',
      //   agegray: '#D9D9D9',
      //   black: '#333333',
      //   realblack: '#000000',
      //   white: '#FFFFFF',
      // },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('tailwind-scrollbar-hide')],
}
export default config
