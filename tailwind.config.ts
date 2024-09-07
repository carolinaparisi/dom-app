import type { Config } from 'tailwindcss';

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
      fontFamily: {
        silk: ['var(--font-silk)'],
      },
    },
    colors: {
      transparent: 'transparent',
      black: '#2F2C2B',
      white: '#FFFFFF',
      primary: '#6E604A',
      gray: '#989185',
      gray_soft: '#ECE7DE',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
