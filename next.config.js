/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images : {
    domains : ['images.unsplash.com','plus.unsplash.com'],
  },
  env: {
    SIDEHUSSLR_TEST_API: 'http://localhost:5000',
    SIDEHUSSLR_API:'https://sidehusslr.cleverapps.io'
  }
}

module.exports = nextConfig
