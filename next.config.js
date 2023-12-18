/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // {
      //   source: '/userinfo/:slug',
      //   destination: '/login',
      //   permanent: false,
      // },
    ]
  },
}

module.exports = {
  ...nextConfig,
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    GOOGLE_LOGIN: process.env.GOOGLE_LOGIN,
  },
}
