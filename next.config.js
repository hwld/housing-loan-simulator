/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async function () {
    return [
      {
        source: "/",
        destination: "/repayment",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
