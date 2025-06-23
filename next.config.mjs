   /** @type {import('next').NextConfig} */
   const nextConfig = {
    images: {
      remotePatterns: [
        { protocol: 'https', hostname: '**' },
        { protocol: 'http', hostname: '**' },
      ],
    },
    output: 'standalone',
    typescript: { ignoreBuildErrors: true },
    eslint: { ignoreDuringBuilds: true },
  };
  export default nextConfig;

export const dynamic = "force-dynamic";