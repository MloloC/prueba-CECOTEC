/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Evita el uso del paquete @tailwindcss/postcss
    serverComponentsExternalPackages: [],
  },
  // Desactivar optimizaciones que puedan causar problemas
  swcMinify: false
};

module.exports = nextConfig; 