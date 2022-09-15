/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important: "#root",
  theme: {
    extend: {
			fontFamily: {
				publicSans: ['"Public Sans"', 'sans-serif']
			},
			maxWidth: {
        '100': '100px',
        '400': '400px',
        '1400': '1400px',
        'calc-xxl': 'calc(1440px - calc(1.625rem * 2))',
      },
      minHeight: {
        '1': '1px',
      },
      zIndex: {
        '1': '1',
      },
      boxShadow: {
        'my': '0 2px 6px 0 rgb(67 89 113 / 12%)',
        'my-2': '0 0 0.375rem 0.25rem rgb(161 172 184 / 15%)',
        'dropMenu': '0 0.25rem 1rem rgb(161 172 184 / 45%)'
      },
      justifyContent: {
        'c-impo': 'center !important'
      },
      padding: {
        'btn': '0.4375rem 1.25rem',
        'input': '0.4375rem 0.875rem'
      },
      colors: {
        'primary': '#696cff',
        'border-color': '#d9dee3',
        'form': '#566a7f',
        'root-bg': '#f5f5f9',
        'body-color': '#697a8d',
      },
      backgroundColor: {
        'primary-impo': '#696cff !important',
        'nav-hover': 'rgba(105, 108, 255, 0.16)'
      },
      inset: {
        'a40': '-40px',
        'a46': '-46px',
        'a68': '-68px',
      },
      width: {
        '148': '148px',
        '243': '243px',
        'calc-full': 'calc(100% - calc(1.625rem * 2))',
      },
      height: {
        '148': '148px',
        '240': '240px',
      },
		},
    screens: {
      'xs': '992px',
      'xl': '1200px',
      'xxl': '1400px',
    }
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}
