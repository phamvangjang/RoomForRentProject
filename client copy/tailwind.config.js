/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      width: {
        '1100': '1100px',
      },
      backgroundColor: {
        primary: '#F5F5F5',
        secondary1: '#1266dd',
        secondary2: '#f73859',
        secondary3: '#fff9f3',
      },
      textColor: {
        main: '#333333',
        title: '#E13427',
        price:'#16c784',
        desc: '#8a8d91'
      }
    }
  },
  plugins: [],
}

