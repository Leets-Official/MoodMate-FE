/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return []
  },
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
    GOOGLE_LOGIN: process.env.GOOGLE_LOGIN,
  },
})
