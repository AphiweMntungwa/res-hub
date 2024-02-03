/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    ...nextConfig,
    webpack: (config, options) => {
        // Add rule for .node files
        config.module.rules.push({
            test: /\.node$/,
            use: 'raw-loader',
        });

        return config;
    }
}

