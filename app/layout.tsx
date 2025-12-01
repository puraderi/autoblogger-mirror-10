import type { Metadata } from "next";
import "./globals.css";
import { headers } from "next/headers";
import { getWebsiteDataByHostname } from "@/lib/services/website";
import Header from "@/components/headers";
import Footer from "@/components/footers";
import { getFontVariable, getCSSFontFamily } from "@/lib/fonts";
import { normalizeHostname, iconToUrl } from "@/lib/utils";
import { getLanguageConfig } from "@/lib/languages";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const hostname = normalizeHostname(headersList.get("host") || "localhost");
  const websiteData = await getWebsiteDataByHostname(hostname);

  // Prioritize icon_identifier, then favicon_url, then default
  const faviconUrl = websiteData?.icon_identifier
    ? iconToUrl(websiteData.icon_identifier)
    : websiteData?.favicon_url || "/favicon.ico";

  const baseUrl = hostname.includes('localhost')
    ? `http://${hostname}`
    : `https://${hostname}`;

  const langConfig = getLanguageConfig(websiteData?.language);
  const ogLocale = langConfig.locale.replace('-', '_'); // sv-SE -> sv_SE

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: websiteData?.website_name || "Blog",
      template: `%s | ${websiteData?.website_name || "Blog"}`,
    },
    description: websiteData?.meta_description || websiteData?.topic || "A blog website",
    icons: {
      icon: faviconUrl || "/favicon.ico",
    },
    openGraph: {
      type: "website",
      siteName: websiteData?.website_name,
      locale: ogLocale,
    },
    twitter: {
      card: "summary_large_image",
    },
    other: {
      "theme-color": websiteData?.primary_color || "#000000",
    },
    alternates: {
      canonical: "/",
      types: {
        "application/rss+xml": "/feed.xml",
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const hostname = normalizeHostname(headersList.get("host") || "localhost");
  console.log('Hostname received:', hostname);
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
  const langConfig = getLanguageConfig(websiteData.language);

  return (
    <html lang={langConfig.code}>
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
