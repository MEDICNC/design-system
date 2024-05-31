import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cn, sortPosts } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/config/site";
import { SiteFooter } from "@/components/site-footer";
import { posts } from "@/.velite";
import Link from "next/link";
import { promises as fs } from "fs";
import "../../uikit/dist/css/uikit-core.css";
import "./globals.css";
import Script from "next/script";
import { headers } from "next/headers";
import SideMenu from "@/components/side-menu";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const scriptFile = await fs.readFile(
    "../uikit/dist/js/uikit-core.min.js",
    "utf8",
  );
  const iconScriptFile = await fs.readFile(
    "../uikit/dist/js/uikit-icons.min.js",
    "utf8",
  );

  return (
    <html lang="en" className="scroll-pt-[3.5rem]">
      <head>
        <link
          href="https://webfontworld.github.io/sunn/SUIT.css"
          rel="stylesheet"
        />
      </head>
      <body className={cn("min-h-screen")}>
        <div className="relative flex min-h-dvh flex-col">
          <SiteHeader />
          <div className="container max-w-screen-xl flex flex-auto">
            <div className="flex w-full">
              <aside className="py-6 lg:py-10 w-[20%]">
                <div className="flex flex-col">
                  <SideMenu />
                </div>
              </aside>
              <main className="w-[80%] mb-20">{children}</main>
            </div>
          </div>
          <SiteFooter />
        </div>

        <Script>{scriptFile}</Script>
        <Script>{iconScriptFile}</Script>
      </body>
    </html>
  );
}
