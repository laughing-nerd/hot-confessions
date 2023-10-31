import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#699BF7',
        'secondary': '#C7B9FF',
        'secondary-dark': '#A259FF',
        'accent-yellow': '#FFC700',
        'accent-yellow-dark': '#FFBB00',
        'accent-red': '#F24E1E',
        'accent-red-dark': '#D24E1E',
        'accent-green': '#0FA958',
        'accent-green-dark': "#0F9958"
      },
    },
  },
  plugins: [],
}
export default config
