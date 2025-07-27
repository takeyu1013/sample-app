import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		cacheComponents: true,
		ppr: true,
		reactCompiler: true,
	},
	images: {
		remotePatterns: [new URL("https://secure.gravatar.com/avatar/**")],
	},
};

export default nextConfig;
