const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans JP", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        slideDown: {
          from: { transform: "translateY(-20px)", opacity: 0 },
        },
        slideUp: {
          to: { transform: "translateY(-20px)", opacity: 0 },
        },
      },
      animation: {
        slideDown: "slideDown 250ms ease-out",
        slideUp: "slideUp 250ms ease-out",
      },
    },
  },
  plugins: [
    plugin(({ addVariant, e }) => {
      addVariant("data-state-open", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            `data-state-open${separator}${className}`
          )}[data-state='open']`;
        });
      });
    }),
  ],
};
