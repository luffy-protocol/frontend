/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "app.dynamic.xyz",
        port: "",
      },
      {
        protocol: "https",
        hostname: "testnet.luffyprotocol.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "mainnet.luffyprotocol.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
