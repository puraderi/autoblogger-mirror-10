import type { Metadata } from "next";
import "./globals.css";
import { headers } from "next/headers";
import { getWebsiteDataByHostname } from "@/lib/services/website";
import Header from "@/components/headers";
import Footer from "@/components/footers";
import { getFontVariable, getCSSFontFamily } from "@/lib/fonts";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const hostname = headersList.get("host") || "localhost";
  const websiteData = await getWebsiteDataByHostname(hostname);

  return {
    title: websiteData?.website_name || "Blog",
    description: websiteData?.meta_description || websiteData?.topic || "A blog website",
    icons: {
      icon: websiteData?.favicon_url || "/favicon.ico",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const hostname = headersList.get("host") || "localhost";
  const websiteData = await getWebsiteDataByHostname(hostname);

  if (!websiteData) {
    return (
      <html lang="sv">
        <body className="antialiased">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Webbplats hittades inte</h1>
              <p className="text-gray-600">Ingen webbplatsdata hittades för detta värdnamn: {hostname}</p>
            </div>
          </div>
        </body>
      </html>
    );
  }

  const bodyFont = getFontVariable(websiteData.font_body);
  const headingFont = getFontVariable(websiteData.font_heading);

  return (
    <html lang="sv">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --color-primary: ${websiteData.primary_color};
              --color-secondary: ${websiteData.secondary_color};
              --color-accent: ${websiteData.accent_color};
              --color-background: ${websiteData.background_color};
              --color-text: ${websiteData.text_color};
            }
            body {
              background-color: ${websiteData.background_color};
              color: ${websiteData.text_color};
              font-family: ${getCSSFontFamily(websiteData.font_body)};
            }
            h1, h2, h3, h4, h5, h6 {
              font-family: ${getCSSFontFamily(websiteData.font_heading)};
            }
          `
        }} />
      </head>
      <body className={`${bodyFont} ${headingFont} antialiased flex flex-col min-h-screen`}>
        <Header websiteData={websiteData} />
        <main className="flex-1">
          {children}
        </main>
        <Footer websiteData={websiteData} />
      </body>
    </html>
  );
}
