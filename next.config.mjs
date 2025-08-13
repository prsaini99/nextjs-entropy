import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.prod.website-files.com",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
		],
	},
	webpack: (config) => {
		config.resolve.alias = {
			...config.resolve.alias,
			'@': resolve(__dirname, 'src'),
		};
		return config;
	},
};

export default nextConfig;
