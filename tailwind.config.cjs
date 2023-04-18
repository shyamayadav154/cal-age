/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    screens:{
      "xs":"395px",
      "sm":"640px",
      "md":"768px",
      "lg":"1024px",
      "xl":"1280px",
      "2xl":"1536px"
    },

    extend: {
      colors:{
      "brand-purple":"hsl(259, 100%, 65%)",
        "light-red":"hsl(0, 100%, 67%)",
        "off-white":"hsl(0, 0%, 94%)",
        "light-grey":"hsl(0, 0%, 86%)",
        "smoke-grey":"hsl(0, 1%, 44%)",
        "off-black":"hsl(0, 0%, 8%)",
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
