'use server';

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';
import { uploadAuthorImageToSupabase } from '@/lib/author-image-upload';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const WRITING_RULES = `
SKRIVREGLER (följ dessa strikt):
- Använd dependency grammar för enkel läsbarhet
- Skriv på 8:e klass nivå, undvik nischade ord och C2-vokabulär
- Ange sakliga fakta utan symbolisk inramning (ex: inte "står som ett monument", utan "färdigställdes 1845")
- Använd neutrala, mätbara beskrivningar istället för värdeladdade adjektiv
- Ta bort personliga påpekanden som "det är värt att notera"
- Minimera överanvändning av konnektorer ("Dessutom", "Vidare")
- Undvik minisammanfattningar i slutet av stycken
- Ersätt "trestegsformeln" (tre adjektiv i rad) med konkreta detaljer
- Undvik "denna" - skriv om meningen istället
- Variera menings- och styckelängd för naturlig rytm
- Använd kommatecken istället för tankstreck där det passar
- Avsluta INTE med "sammanfattning" eller "slutsats" - avsluta med något intressant
- Undvik klichéer som "i dagens snabbrörliga värld", "mer än bara en blogg"
`;

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/å/g, 'a')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function callClaude(prompt: string, context?: string): Promise<string> {
  let systemPrompt = `Du är en expert på att skapa svenskt webbinnehåll.
Du skriver alltid på flytande svenska med korrekt grammatik och ton.
Du skapar engagerande, informativt och välskrivet innehåll.`;

  if (context) {
    systemPrompt += `\n\nKontext från tidigare genererat innehåll:\n${context}`;
  }

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 4000,
    system: systemPrompt,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = message.content[0].type === 'text' ? message.content[0].text : '';

  // Clean up markdown code blocks
  return text.replace(/```html/g, '').replace(/```/g, '').trim();
}

async function generateAboutUs(websiteName: string, topic: string): Promise<string> {
  const prompt = `Skapa en 'Om oss' sida på svenska för en blogg med namnet "${websiteName}" som handlar om "${topic}".

VIKTIGT: Förtydliga att det är en blogg (inte tidning, magasin eller företag).

Innehållet ska vara:
- 2-3 stycken (varandra med <p> taggar)
- Professionellt och engagerande
- Beskriva bloggens syfte och värden
- Nämn att det är en blogg och vad läsare kan förvänta sig
- Skrivet i HTML-format med <p> taggar
- Cirka 150-250 ord totalt

${WRITING_RULES}

Returnera ENDAST HTML-innehållet, inga extra förklaringar.`;

  return callClaude(prompt);
}

async function generateContactUs(websiteName: string, topic: string, context: string): Promise<string> {
  const slug = generateSlug(websiteName);

  const prompt = `Baserat på den här bloggen, skapa en 'Kontakta oss' sida på svenska.

Bloggnamn: ${websiteName}
Ämne: ${topic}

Innehållet ska innehålla:
- Välkomnande text
- Email: kontakt@${slug}.se
- Fiktiv adress som passar ämnet
- Fiktivt telefonnummer
- HTML-format med <p> och <strong> taggar
- Cirka 100-150 ord

${WRITING_RULES}

Returnera ENDAST HTML-innehållet, inga extra förklaringar.`;

  return callClaude(prompt, context);
}

async function generateHeroContent(websiteName: string, topic: string, context: string) {
  const prompt = `Skapa innehåll för startsidans hero-sektion för bloggen "${websiteName}".

VIKTIGT: Förtydliga att det är en blogg (inte tidning, magasin eller företag).

Generera:
1. HERO_TITLE: En kort, slagkraftig rubrik (5-8 ord)
2. HERO_TEXT: En beskrivande text som förklarar bloggens värde och vad läsare kan förvänta sig (2-3 meningar, ca 50 ord)
3. OUTRO_TEXT: En avslutande text för startsidan med call-to-action (1-2 meningar i HTML <p> format)

${WRITING_RULES}

Formatera svaret EXAKT så här:
HERO_TITLE: [din rubrik]
HERO_TEXT: [din text]
OUTRO_TEXT: [din HTML-text]

Returnera ENDAST dessa tre rader, inget annat.`;

  const response = await callClaude(prompt, context);

  let heroTitle = '';
  let heroText = '';
  let outroText = '';

  for (const line of response.split('\n')) {
    if (line.startsWith('HERO_TITLE:')) {
      heroTitle = line.replace('HERO_TITLE:', '').trim();
    } else if (line.startsWith('HERO_TEXT:')) {
      heroText = line.replace('HERO_TEXT:', '').trim();
    } else if (line.startsWith('OUTRO_TEXT:')) {
      outroText = line.replace('OUTRO_TEXT:', '').trim();
    }
  }

  return { heroTitle, heroText, outroText };
}

async function generateDesignSystem(websiteName: string, topic: string, context: string) {
  const prompt = `Skapa ett färgschema och designsystem för bloggen "${websiteName}" om "${topic}".

Välj färger och typsnitt som passar ämnet och skapar en professionell, modern känsla.

KRITISKT - WCAG Kontrastregler (följ dessa STRIKT):
- Text på bakgrund MÅSTE ha minst 4.5:1 kontrastförhållande (WCAG AA standard)
- Stora rubriker kan ha 3:1 men helst högre
- Använd ALDRIG ljus text på ljus bakgrund eller mörk text på mörk bakgrund
- Testa färgerna mentalt: Vit bakgrund (#ffffff) kräver TEXT_COLOR som är mörk (#1f2937, #111827, etc)
- Ljus bakgrund kräver mörk text, mörk bakgrund kräver ljus text

Tillgängliga typsnitt att välja från:
- Inter (modern, neutral, tech-friendly)
- Roboto (clean, Google standard)
- Poppins (geometric, friendly)
- Playfair Display (elegant, editorial)
- Lora (classic, readable serif)
- Merriweather (traditional, trustworthy)
- Open Sans (humanist, approachable)
- Montserrat (urban, contemporary)
- DM Sans (geometric, balanced)
- Source Sans Pro (professional, versatile)

Formatera svaret EXAKT så här:
PRIMARY_COLOR: #hexkod (för rubriker och knappar - måste ha god kontrast mot bakgrund)
SECONDARY_COLOR: #hexkod (ljusare/mörkare variant för bakgrunder och borders)
ACCENT_COLOR: #hexkod (kontrastfärg för call-to-actions)
BACKGROUND_COLOR: #hexkod (huvudbakgrund - oftast vit #ffffff eller mycket ljus #f8f9fa)
TEXT_COLOR: #hexkod (MÅSTE vara mycket mörk som #1f2937, #111827, #0f172a om bakgrund är ljus)
FONT_HEADING: [välj ett typsnitt från listan ovan]
FONT_BODY: [välj ett typsnitt från listan ovan]

EXEMPEL på bra kombinationer:
- Background: #ffffff, Text: #1f2937, Primary: #2563eb (blå tema)
- Background: #f8f9fa, Text: #111827, Primary: #059669 (grön tema)
- Background: #fffbeb, Text: #78350f, Primary: #ea580c (varm tema)

Returnera ENDAST dessa 7 rader.`;

  const response = await callClaude(prompt, context);

  const design = {
    primary_color: '#2563eb',
    secondary_color: '#e0e7ff',
    accent_color: '#7c3aed',
    background_color: '#ffffff',
    text_color: '#1f2937',
    font_heading: 'Inter',
    font_body: 'Inter',
  };

  for (const line of response.split('\n')) {
    if (line.includes(':')) {
      const [key, value] = line.split(':', 2);
      const cleanKey = key.trim().toLowerCase().replace(/_/g, '_');
      const cleanValue = value.split('(')[0].trim(); // Remove comments in parentheses

      if (cleanKey === 'primary_color') design.primary_color = cleanValue;
      if (cleanKey === 'secondary_color') design.secondary_color = cleanValue;
      if (cleanKey === 'accent_color') design.accent_color = cleanValue;
      if (cleanKey === 'background_color') design.background_color = cleanValue;
      if (cleanKey === 'text_color') design.text_color = cleanValue;
      if (cleanKey === 'font_heading') design.font_heading = cleanValue;
      if (cleanKey === 'font_body') design.font_body = cleanValue;
    }
  }

  return design;
}

async function generateMetaDescription(websiteName: string, topic: string, context: string): Promise<string> {
  const prompt = `Skapa en SEO meta description på svenska för "${websiteName}".

Krav:
- Exakt 140-160 tecken
- Inkludera "${topic}"
- Lockande och beskrivande
- Bra för sökmotoroptimering

${WRITING_RULES}

Returnera ENDAST meta description-texten, inget annat.`;

  return callClaude(prompt, context);
}

async function generateAuthor(websiteName: string, topic: string) {
  const prompt = `Skapa en fiktiv svenskspråkig författare/bloggare för bloggen "${websiteName}" om "${topic}".

Generera:
1. AUTHOR_NAME: Ett vanligt svenskt namn (förnamn och efternamn)
2. AUTHOR_BIO: En kort biografi om författaren (2-3 meningar, ca 100-150 tecken)

Formatera svaret EXAKT så här:
AUTHOR_NAME: [namn]
AUTHOR_BIO: [biografi]

Returnera ENDAST dessa två rader.`;

  const response = await callClaude(prompt);

  let authorName = '';
  let authorBio = '';

  for (const line of response.split('\n')) {
    if (line.startsWith('AUTHOR_NAME:')) {
      authorName = line.replace('AUTHOR_NAME:', '').trim();
    } else if (line.startsWith('AUTHOR_BIO:')) {
      authorBio = line.replace('AUTHOR_BIO:', '').trim();
    }
  }

  // Generate slug from author name
  const authorSlug = authorName
    .toLowerCase()
    .replace(/å/g, 'a')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return { authorName, authorBio, authorSlug };
}

async function generateAuthorImage(authorName: string, authorBio: string, websiteName: string, topic: string): Promise<string> {
  try {
    // Generate image prompt
    const imagePrompt = `A studio photo of a blogger for ${websiteName}, a website about ${topic}. ${authorBio}
Professional headshot, clean background, good lighting, facing camera, friendly expression.
High quality portrait photography.`;

    // Call Flux to generate image
    const response = await fetch('https://fal.run/fal-ai/flux/schnell', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.FAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: imagePrompt,
        image_size: {
          width: 512,
          height: 512
        },
        num_images: 1,
        num_inference_steps: 12,
        enable_safety_checker: true,
        sync_mode: true
      }),
    });

    if (!response.ok) {
      throw new Error(`FAL API error: ${response.statusText}`);
    }

    const data = await response.json();
    const fluxImageUrl = data.images[0].url;

    // Upload cropped and compressed image to Supabase
    const authorImageUrl = await uploadAuthorImageToSupabase(fluxImageUrl, authorName);

    return authorImageUrl;
  } catch (error) {
    console.error('Error generating author image:', error);
    throw error;
  }
}

export async function launchWebsite(
  websiteName: string,
  topic: string,
  hostname: string
) {
  try {
    // Step 1: About Us
    const aboutUs = await generateAboutUs(websiteName, topic);
    let context = `Om oss: ${aboutUs}\n`;

    // Step 2: Contact Us
    const contactUs = await generateContactUs(websiteName, topic, context);
    context += `Kontakt: ${contactUs}\n`;

    // Step 3: Hero Content
    const hero = await generateHeroContent(websiteName, topic, context);
    context += `Hero: ${hero.heroTitle} - ${hero.heroText}\n`;

    // Step 4: Design System
    const design = await generateDesignSystem(websiteName, topic, context);

    // Step 5: Meta Description
    const metaDescription = await generateMetaDescription(websiteName, topic, context);

    // Step 6: Generate Author
    const author = await generateAuthor(websiteName, topic);

    // Step 7: Generate Author Image
    const authorImageUrl = await generateAuthorImage(author.authorName, author.authorBio, websiteName, topic);

    // Step 8: Insert into database
    const randomTemplates = () => Math.floor(Math.random() * 5) + 1;
    const randomBool = () => Math.random() > 0.5;

    const { data, error } = await supabase
      .from('website_data')
      .insert({
        host_name: hostname,
        website_name: websiteName,
        topic: topic,
        about_us: aboutUs,
        contact_us: contactUs,
        frontpage_hero_title: hero.heroTitle,
        frontpage_hero_text: hero.heroText,
        frontpage_outro_text: hero.outroText,
        template_header: randomTemplates(),
        template_footer: randomTemplates(),
        template_blog_post: randomTemplates(),
        template_page: randomTemplates(),
        template_front_page: randomTemplates(),
        primary_color: design.primary_color,
        secondary_color: design.secondary_color,
        accent_color: design.accent_color,
        background_color: design.background_color,
        text_color: design.text_color,
        font_heading: design.font_heading,
        font_body: design.font_body,
        container_width: 'max-w-7xl',
        border_radius: 'rounded-lg',
        meta_description: metaDescription,
        show_breadcrumbs: randomBool(),
        show_related_posts: randomBool(),
        show_search_bar: randomBool(),
        show_share_buttons: randomBool(),
        show_table_of_contents: randomBool(),
        show_author_box: randomBool(),
        show_tags_display: randomBool(),
        show_reading_time: randomBool(),
        show_post_navigation: randomBool(),
        show_reading_progress_bar: randomBool(),
        author_name: author.authorName,
        author_bio: author.authorBio,
        author_image_url: authorImageUrl,
        author_slug: author.authorSlug,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      website_id: data.id,
      hostname,
      design,
    };
  } catch (error: any) {
    throw new Error(error.message || 'Failed to generate website');
  }
}
