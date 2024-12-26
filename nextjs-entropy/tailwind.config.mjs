/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'slideUpFadeIn-0.2': 'slideUpFadeIn 0.2s ease-out forwards', // Animation definition
        'slideUpFadeIn-0.3': 'slideUpFadeIn 0.3s ease-out forwards', // Animation definition
        'slideUpFadeIn-0.5': 'slideUpFadeIn 0.5s ease-out forwards', // Animation definition
        'slideUpFadeIn-0.6': 'slideUpFadeIn 0.6s ease-out forwards', // Animation definition
        'slideUpFadeIn-0.7': 'slideUpFadeIn 0.7s ease-out forwards', // Animation definition
        'slideUpFadeIn-0.8': 'slideUpFadeIn 0.8s ease-out forwards', // Animation definition
        'slideUpFadeIn-1': 'slideUpFadeIn 1s ease-out forwards', // Animation definition
        'slideUpFadeIn-1.2': 'slideUpFadeIn 1.2s ease-out forwards', // Animation definition
        'slideUpFadeIn-1.5': 'slideUpFadeIn 1.5s ease-out forwards', // Animation definition
      },
      keyframes: {
        slideUpFadeIn: {
          '0%': { opacity: 0, transform: 'translateY(80px)' },  // Start: opacity 0, below screen
          '100%': { opacity: 1, transform: 'translateY(0)' },   // End: opacity 1, in place
        },
      },
    },
  },
  plugins: [],
};

