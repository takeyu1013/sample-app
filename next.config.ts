import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		dynamicIO: true,
		ppr: true,
	},
	images: {
		domains: ["secure.gravatar.com"],
	},
};

export default nextConfig;
