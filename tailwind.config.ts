import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      clipPath: {
        'polygon': 'polygon(50% 0%, 0% 100%, 100% 100%)', // Example of a triangle
        'custom-shape': 'polygon(0 28%, 11% 0, 48% 0, 87% 0, 87% 21%, 100% 21%, 100% 100%, 71% 100%, 71% 89%, 30% 89%, 30% 100%, 0 100%);',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      addUtilities({
        '.clip-triangle': {
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        },
        '.clip-circle': {
          clipPath: 'polygon(0 28%, 11% 0, 48% 0, 87% 0, 87% 21%, 100% 21%, 100% 100%, 71% 100%, 71% 89%, 30% 89%, 30% 100%, 0 100%);',
        },
      });
    },
  ],
};
export default config;
