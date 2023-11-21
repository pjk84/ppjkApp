/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = {
  nextConfig,
  withBundleAnalyzer,
  async rewrites() {
    return [
      {
        source: "/api/dotnet/:path*",
        destination: process.env.API_BASE_URL_DOTNET + "/:path*", // Use the API_BASE_URL environment variable
      },
      {
        source: "/api/flask/:path*",
        destination: process.env.API_BASE_URL_FLASK + "/:path*", // Use the API_BASE_URL environment variable
      },
    ];
  },
};
