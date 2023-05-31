/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack(config) {
        config.experiments = {...config.experiments, topLevelAwait: true};
        return config;
    },
    basePath: '/gpt-ui',
};

export default nextConfig;