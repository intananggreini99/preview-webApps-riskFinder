/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink:       '#0A1929',
        navy:      '#0A2540',
        royal:     '#1E5AA8',
        steel:     '#5B6B7F',
        mint:      '#00C49A',
        cyan2:     '#00A8E8',
        danger:    '#E04A5F',
        warn:      '#F2A341',
        paper:     '#F7F4EE',
        paperdark: '#EDE7DA',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:    ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(10,37,64,.04), 0 4px 16px rgba(10,37,64,.06)',
        lift: '0 10px 30px -10px rgba(10,37,64,.25)',
      },
      animation: {
        'fade-up': 'fadeUp .45s ease both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(8px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
