/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'light-orange-1': '#F1C1B4', //se connecter btn
        'light-orange-2':'#F0AB99',//footer and navbar bg
        'light-orange-3':'#FDF5F3',
        'light-orange-4':'#FCEEEB',
        'orange-1':'#ED8166' ,//text orange
        'orange-2':'#E35936',
        'gray-1':'#666666',//text gray
        'blue-primary':'#008B8D',
        'blue-secondary':'#8EDBDD',
        'blue-third':'#3FAAAD',
        
      },
      fontFamily:{
        body:['Outfit'],
        sans: ['Shantell Sans', 'sans-serif'],
      },
  
    },
  },
  plugins: [],
}