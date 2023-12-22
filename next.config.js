/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return []
  },
}

module.exports = {
  ...nextConfig,
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    GOOGLE_LOGIN: process.env.GOOGLE_LOGIN,
  },
}
