/** @type {import('next').NextConfig} */
const nextConfig = {}
/** @type {import('next').NextConfig} */
const nextConfigSSG = {
    output: "export",
    images: { unoptimized: true },
}

module.exports = nextConfigSSG
