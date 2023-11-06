/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'c.pxhere.com',
            port: ''
        }]
    }
}

module.exports = nextConfig