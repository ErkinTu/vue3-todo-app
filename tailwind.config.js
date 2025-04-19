// /** @type {import('tailwindcss').Config} */
// export default {
//     content: [
//         "./index.html",
//         "./src/**/*.{vue,js,ts,jsx,tsx}",
//     ],
//     theme: {
//         extend: {},
//     },
//     plugins: [],
// }

// Для старой версии tailwindcss@3.3.0 мы используем более устаревший синтаксис module.exports
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // переключение темы на основе класса
    theme: {
        extend: {},
    },
    plugins: [],
}