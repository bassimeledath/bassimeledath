/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/projects',
                destination: '/posts/projects',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
