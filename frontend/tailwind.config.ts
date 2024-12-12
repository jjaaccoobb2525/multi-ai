import type { Config } from "tailwindcss";
import twAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // neutral 900
        black: "hsl(0, 0%, 9%)",
        // neutral 100
        white: "hsl(0, 0%, 96.1%)",
        red: "hsl(0, 84.2%, 60.2%)",
        yellow: "hsl(45.39999999999998, 93.4%, 47.5%)",
        green: "hsl(142.10000000000002, 70.6%, 45.3%)"
      }
    }
  },
  plugins: [twAnimate]
};
export default config;
