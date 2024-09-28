/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*", // Apply headers to all paths
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "unsafe-none", // Relax COEP
          },
        ],
      },
    ];
  },
};

export default nextConfig;
