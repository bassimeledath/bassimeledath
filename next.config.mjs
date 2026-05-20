/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/blog/traits-of-ai-native-people",
        destination: "/blog/token-count-is-a-terrible-proxy-for-ai-competence",
        permanent: true,
      },
      {
        source: "/blog/token-count-is-a-bad-proxy-for-ai-native-work",
        destination: "/blog/token-count-is-a-terrible-proxy-for-ai-competence",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
