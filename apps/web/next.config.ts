import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // domains: [
    //   'assets.loket.com',
    //   'loket-production-sg.s3.ap-southeast-1.amazonaws.com'
    // ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com'
      }
    ]
  }
}

export default nextConfig
