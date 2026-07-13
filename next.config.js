function getSupabaseHostname() {
    try {
        return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname;
    }
    catch {
        return "afakpghdgtblnxinpzgy.supabase.co";
    }
}
const nextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: getSupabaseHostname(),
                port: "",
                pathname: "/storage/v1/object/public/**",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};
export default nextConfig;
