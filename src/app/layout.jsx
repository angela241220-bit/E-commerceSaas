import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { ReactQueryProvider } from "@/providers/react-query-provider";
// Minimal root metadata - marketing SEO is defined in (public) route
// This prevents Zynkart branding from appearing on customer store pages
export const metadata = {
    icons: [
        {
            url: "/icons/web/favicon.ico",
            type: "image/x-icon",
            sizes: "16x16 32x32",
        },
        {
            url: "/icons/web/icon-192.png",
            type: "image/png",
            sizes: "192x192",
        },
        {
            url: "/icons/web/icon-192-maskable.png",
            type: "image/png",
            sizes: "192x192",
        },
        {
            url: "/icons/web/icon-512-maskable.png",
            type: "image/png",
            sizes: "512x512",
        },
    ],
    metadataBase: new URL("https://zynkart.store"),
};
export default function RootLayout({ children, }) {
    return (<html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextTopLoader color="#F97316"/>
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <Toaster position="top-center" richColors/>
        </ThemeProvider>
      </body>
    </html>);
}
