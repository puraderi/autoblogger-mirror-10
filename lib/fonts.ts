import {
  Inter,
  Roboto,
  Lora,
  Playfair_Display,
  Montserrat,
  Open_Sans,
  Merriweather,
  Raleway,
  Poppins,
} from 'next/font/google';

// Sans-serif fonts
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-roboto' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' });
const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' });
const poppins = Poppins({ weight: ['400', '600', '700'], subsets: ['latin'], variable: '--font-poppins' });

// Serif fonts
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const merriweather = Merriweather({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-merriweather' });

export const fontMap = {
  'sans-serif': inter,
  'serif': lora,
  'display': playfair,
  'cursive': poppins, // Using Poppins as a friendly alternative
  'monospace': roboto,
};

export function getFontClassName(fontType: string): string {
  const font = fontMap[fontType as keyof typeof fontMap] || fontMap['sans-serif'];
  return font.className;
}

export function getFontVariable(fontType: string): string {
  const font = fontMap[fontType as keyof typeof fontMap] || fontMap['sans-serif'];
  return font.variable;
}

export function getCSSFontFamily(fontType: string): string {
  const fontFamilies: Record<string, string> = {
    'sans-serif': 'var(--font-inter, ui-sans-serif, system-ui, sans-serif)',
    'serif': 'var(--font-lora, ui-serif, Georgia, serif)',
    'display': 'var(--font-playfair, ui-serif, Georgia, serif)',
    'cursive': 'var(--font-poppins, cursive)',
    'monospace': 'var(--font-roboto, ui-monospace, monospace)',
  };

  return fontFamilies[fontType] || fontFamilies['sans-serif'];
}
