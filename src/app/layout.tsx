import "../global/globals.css";
import type { Metadata } from "next";
import { geistMono, geistSans } from "@/fonts";

export const metadata: Metadata = {
  title: "Multi Step Form React",
  description: "Create a react multi step with next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
