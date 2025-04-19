import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		dynamicIO: true,
	},
};

export default nextConfig;
