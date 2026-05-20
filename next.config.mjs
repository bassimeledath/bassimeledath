/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/blog/traits-of-ai-native-people",
        destination: "/tokenmaxxing",
        permanent: true,
      },
      {
        source: "/blog/token-count-is-a-bad-proxy-for-ai-native-work",
        destination: "/tokenmaxxing",
        permanent: true,
      },
      {
        source: "/blog/token-count-is-a-terrible-proxy-for-ai-competence",
        destination: "/tokenmaxxing",
        permanent: true,
      },
      {
        source: "/blog/tokenmaxxing",
        destination: "/tokenmaxxing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
