/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-green-1": "#012F41",
      },
      gradientColorStops: {
        "brand-gradient": [
          "#068AA7",
          "#05668B",
          "#04416F",
          "#03275B",
          "#02023E",
        ],
      },
      backgroundImage: (theme) => ({
        "brand-gradient": `linear-gradient(180deg, ${theme(
          "gradientColorStops.brand-gradient"
        )})`,
      }),
    },
  },
  plugins: [],
};
