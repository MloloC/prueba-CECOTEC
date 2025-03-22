/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Evita el uso del paquete @tailwindcss/postcss
    serverComponentsExternalPackages: [],
  },
  images: {
    domains: ['media.cecotec.cloud'],
  }
};

module.exports = nextConfig; 