import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoBloggerX Admin",
  description: "Admin interface for creating multi-tenant blog websites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
