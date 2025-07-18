import { Navbar } from "@/components/navbar";
import "@/styles/globals.css";
import clsx from "clsx";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

export const metadata: Metadata = {
    title: {
        default: "Voice-to-Text",
        template: `%s - Whisper`,
    },
    description: "",
    icons: {
        icon: "/favicon.ico",
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning lang="en">
            <head />
            <body
                className={clsx(
                    "min-h-screen text-foreground bg-background font-sans antialiased",
                    inter.className,
                )}
            >
                <Providers
                    themeProps={{ attribute: "class", defaultTheme: "dark" }}
                >
                    <div className="relative flex flex-col h-screen">
                        <Navbar />
                        <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                            {children}
                        </main>
                        <footer className="w-full flex items-center justify-center py-3">
                            Powered by OpenAI Whisper
                        </footer>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
