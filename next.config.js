/** @type {import('next').NextConfig} */

const { webpack } = require('next/dist/compiled/webpack/webpack')

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/pgw6541/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      }
    ],
  },
  webpack: (config, {dev, isServer}) => {
    if(dev){   
        // 개발 환경 설정
    } else {
      // 프로덕션 환경 설정
    }
    return config
  }
}

module.exports = nextConfig