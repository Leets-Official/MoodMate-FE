/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return []
  },
}

const withPWA = require('next-pwa')({
  dest: 'public',
})

module.exports = withPWA({
  ...nextConfig,
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    GOOGLE_LOGIN: process.env.GOOGLE_LOGIN,
  },
})
