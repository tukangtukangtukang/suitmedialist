const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/ideas/:path*',
        destination: 'https://suitmedia-backend.suitdev.com/api/ideas/:path*',
      },
    ]
  },
}

export default nextConfig;