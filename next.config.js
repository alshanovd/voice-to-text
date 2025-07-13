/** @type {import('next').NextConfig} */
const nextConfig = {
    optimizePackageImports: [
        '@prisma/client',
    ]
};

module.exports = nextConfig;
