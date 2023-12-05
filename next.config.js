/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    GOOGLE_LOGIN: process.env.GOOGLE_LOGIN,
  },
}
