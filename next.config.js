/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return []
  },
  reactStrictMode: false,
}

const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  customWorkerDir: 'worker',
  runtimeCaching,
})

module.exports = withPWA({
  ...nextConfig,
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_KEY: process.env.NEXT_PUBLIC_KEY,
  },
})
