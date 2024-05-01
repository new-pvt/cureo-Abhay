/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        c1: "#1F51C6",
        c2: "#ffffff",
        c3: "#108ED6",
        c4: "#706D6D",
        c5: "#B8B8BA99",
        c6: "#D7ECF8",
        c7: "#14D61047",
        c8: "#EA43359C",
        c9: "#EA4335",
        c10: "#1F51C699",
        c11: "#353535",
        c12: "#24232387",
        c13: "#828489",
        c14: "#263238",
        c15: "#353535",
        c16: "#000000",
        c17: "#D9D9D980",
        c18: "#D9D9D9",
        c19: "#242323",
        c20: "#383838",
        c21: "#353535CC",
        c22: "#5D5E61BD",
        c23: "#1F51C6AD",
        c24: "#F23E3E",
        c25: "#5D5E6170",
        c26: "#D9D9D961",
        c27: "#D9D9D933",
        c28: "#86888A",
        c29: "#D12719",
        c30: "#E91010",
      },
      fontFamily: {
        f1: "Playfair Display",
        f2: "Poppins",
        f3: 'Lato'
      },
      fontWeight: {
        w1: 500,
        w2: 600,
        w3: 700,
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "-scrollbar-width": "none",
        },
        ".myScrollbar::-webkit-scrollbar": {
          height: "4px",
          width: "4px"
        },
        ".myScrollbar::-webkit-scrollbar-track": {
          borderRadius: "5px",
          backgroundColor: "#FFFFFF",
        },
        ".myScrollbar::-webkit-scrollbar-track:hover": {
          backgroundColor: "#5D5E612E",
        },
        ".myScrollbar::-webkit-scrollbar-track:active": {
          backgroundColor: "#5D5E612E",
        },
        ".myScrollbar::-webkit-scrollbar-thumb": {
          borderRadius: "5px",
          backgroundColor: "#108ED6"
        },
        ".myScrollBar::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#5D5E612E",
        },
        ".myScrollBar::-webkit-scrollbar-thumb:active": {
          backgroundColor: "#5D5E612E"
        }
      };
      addUtilities(newUtilities);
    }
  ],
}