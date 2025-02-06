/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},  // Added autoprefixer for better cross-browser compatibility
  },
};

export default config;
