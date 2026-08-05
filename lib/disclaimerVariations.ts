import { SupportedLanguage } from './languages';

// 10 complete disclaimer variations per language
// Variables: {website_name}, {contact_email} - interpolated at render time
const disclaimerVariations: Record<SupportedLanguage, string[]> = {
  Swedish: [
    "Delar eller hela innehållet, inklusive bilderna, är AI-genererat. Kontakta oss om du har upptäckt faktafel.",
    "Detta innehåll och tillhörande bilder har skapats med hjälp av AI. Hör av dig till {website_name} om du hittar felaktigheter.",
    "AI har använts för att skapa detta innehåll och dess bilder. Rapportera eventuella faktafel till {contact_email}.",
    "Text och bild på {website_name} är helt eller delvis AI-skapat. Låt oss veta om något är felaktigt.",
    "Denna artikel och dess bilder är framtagna med AI-stöd. Meddela oss på {contact_email} vid felaktig information.",
    "{website_name} använder AI för att skapa text och bilder. Kontakta redaktionen vid eventuella fel.",
    "Vi använder AI för att skapa vårt innehåll och våra bilder. Upptäcker du ett faktafel? Skriv till {contact_email}.",
    "Artikeln och bilderna har genererats med hjälp av AI-verktyg. Hjälp {website_name} bli bättre genom att rapportera fel.",
    "Detta material, inklusive bildmaterialet, är AI-assisterat. Ser du något som inte stämmer? Kontakta {website_name} på {contact_email}.",
    "Innehåll och bilder har skapats med AI-teknik. Vi uppskattar om du meddelar oss om felaktigheter.",
  ],
  Danish: [
    "Dele eller hele indholdet, inklusive billederne, er AI-genereret. Kontakt os, hvis du har opdaget faktuelle fejl.",
    "Dette indhold og de tilhørende billeder er skabt ved hjælp af AI. Kontakt {website_name}, hvis du finder fejl.",
    "AI er blevet brugt til at skabe dette indhold og dets billeder. Rapporter eventuelle faktuelle fejl til {contact_email}.",
    "Tekst og billeder på {website_name} er helt eller delvist AI-skabt. Fortæl os, hvis noget er forkert.",
    "Denne artikel og dens billeder er fremstillet med AI-støtte. Kontakt os på {contact_email} ved forkert information.",
    "{website_name} bruger AI til at skabe tekst og billeder. Kontakt redaktionen ved eventuelle fejl.",
    "Vi bruger AI til at skabe vores indhold og billeder. Har du opdaget en fejl? Skriv til {contact_email}.",
    "Artiklen og billederne er genereret ved hjælp af AI-værktøjer. Hjælp {website_name} med at blive bedre ved at rapportere fejl.",
    "Dette materiale, inklusive billedmaterialet, er AI-assisteret. Ser du noget, der ikke stemmer? Kontakt {website_name} på {contact_email}.",
    "Indhold og billeder er skabt med AI-teknologi. Vi sætter pris på, hvis du informerer os om fejl.",
  ],
  Finnish: [
    "Osa tai koko sisältö, kuvat mukaan lukien, on tekoälyn tuottamaa. Ota yhteyttä, jos huomaat asiavirheitä.",
    "Tämä sisältö ja siihen liittyvät kuvat on luotu tekoälyn avulla. Ota yhteyttä {website_name}, jos löydät virheitä.",
    "Tekoälyä on käytetty tämän sisällön ja sen kuvien luomiseen. Ilmoita mahdollisista asiavirheistä osoitteeseen {contact_email}.",
    "Sivuston {website_name} tekstit ja kuvat ovat kokonaan tai osittain tekoälyn luomia. Kerro meille, jos jokin on väärin.",
    "Tämä artikkeli ja sen kuvat on tuotettu tekoälyn tuella. Ilmoita meille osoitteeseen {contact_email} virheellisestä tiedosta.",
    "{website_name} käyttää tekoälyä tekstien ja kuvien luomiseen. Ota yhteyttä toimitukseen mahdollisista virheistä.",
    "Käytämme tekoälyä sisältömme ja kuviemme luomiseen. Löysitkö asiavirheen? Kirjoita osoitteeseen {contact_email}.",
    "Artikkeli ja kuvat on luotu tekoälytyökalujen avulla. Auta {website_name} parantamaan ilmoittamalla virheistä.",
    "Tämä materiaali, kuvamateriaali mukaan lukien, on tekoälyavusteista. Näetkö jotain, mikä ei pidä paikkaansa? Ota yhteyttä {website_name} osoitteessa {contact_email}.",
    "Sisältö ja kuvat on luotu tekoälyteknologialla. Arvostamme, jos ilmoitat meille virheistä.",
  ],
  French: [
    "Une partie ou la totalité du contenu, images comprises, est générée par IA. Contactez-nous si vous avez détecté des erreurs factuelles.",
    "Ce contenu et les images qui l'accompagnent ont été créés à l'aide de l'IA. Contactez {website_name} si vous trouvez des inexactitudes.",
    "L'IA a été utilisée pour créer ce contenu et ses images. Signalez toute erreur factuelle à {contact_email}.",
    "Les textes et les images de {website_name} sont entièrement ou partiellement créés par IA. Faites-nous savoir si quelque chose est incorrect.",
    "Cet article et ses images ont été produits avec l'aide de l'IA. Contactez-nous à {contact_email} pour signaler des informations incorrectes.",
    "{website_name} utilise l'IA pour créer ses textes et ses images. Contactez la rédaction en cas d'erreurs.",
    "Nous utilisons l'IA pour créer notre contenu et nos images. Vous avez détecté une erreur ? Écrivez à {contact_email}.",
    "L'article et les images ont été générés à l'aide d'outils d'IA. Aidez {website_name} à s'améliorer en signalant les erreurs.",
    "Ce matériel, y compris les images, est assisté par IA. Vous voyez quelque chose d'incorrect ? Contactez {website_name} à {contact_email}.",
    "Le contenu et les images ont été créés avec la technologie IA. Nous apprécions si vous nous signalez les inexactitudes.",
  ],
  German: [
    "Teile oder der gesamte Inhalt, einschließlich der Bilder, sind KI-generiert. Kontaktieren Sie uns, wenn Sie Sachfehler entdeckt haben.",
    "Dieser Inhalt und die zugehörigen Bilder wurden mit Hilfe von KI erstellt. Kontaktieren Sie {website_name}, wenn Sie Fehler finden.",
    "KI wurde verwendet, um diesen Inhalt und seine Bilder zu erstellen. Melden Sie eventuelle Sachfehler an {contact_email}.",
    "Texte und Bilder auf {website_name} sind ganz oder teilweise KI-erstellt. Lassen Sie uns wissen, wenn etwas falsch ist.",
    "Dieser Artikel und seine Bilder wurden mit KI-Unterstützung erstellt. Kontaktieren Sie uns unter {contact_email} bei falschen Informationen.",
    "{website_name} verwendet KI zur Erstellung von Texten und Bildern. Kontaktieren Sie die Redaktion bei eventuellen Fehlern.",
    "Wir verwenden KI zur Erstellung unserer Inhalte und Bilder. Haben Sie einen Sachfehler entdeckt? Schreiben Sie an {contact_email}.",
    "Der Artikel und die Bilder wurden mit Hilfe von KI-Tools generiert. Helfen Sie {website_name}, besser zu werden, indem Sie Fehler melden.",
    "Dieses Material, einschließlich des Bildmaterials, ist KI-unterstützt. Sehen Sie etwas, das nicht stimmt? Kontaktieren Sie {website_name} unter {contact_email}.",
    "Inhalte und Bilder wurden mit KI-Technologie erstellt. Wir freuen uns, wenn Sie uns auf Fehler hinweisen.",
  ],
  Norwegian: [
    "Deler eller hele innholdet, inkludert bildene, er AI-generert. Kontakt oss om du har oppdaget faktafeil.",
    "Dette innholdet og tilhørende bilder er skapt ved hjelp av AI. Ta kontakt med {website_name} om du finner feil.",
    "AI har blitt brukt til å lage dette innholdet og bildene. Rapporter eventuelle faktafeil til {contact_email}.",
    "Tekst og bilder på {website_name} er helt eller delvis AI-skapt. Gi oss beskjed om noe er feil.",
    "Denne artikkelen og bildene er laget med AI-støtte. Kontakt oss på {contact_email} ved feilaktig informasjon.",
    "{website_name} bruker AI til å lage tekst og bilder. Kontakt redaksjonen ved eventuelle feil.",
    "Vi bruker AI til å lage innholdet og bildene våre. Oppdaget du en faktafeil? Skriv til {contact_email}.",
    "Artikkelen og bildene er generert ved hjelp av AI-verktøy. Hjelp {website_name} med å bli bedre ved å rapportere feil.",
    "Dette materialet, inkludert bildematerialet, er AI-assistert. Ser du noe som ikke stemmer? Kontakt {website_name} på {contact_email}.",
    "Innhold og bilder er laget med AI-teknologi. Vi setter pris på om du melder fra om feil.",
  ],
  English: [
    "Parts or all of this content, including the images, is AI-generated. Contact us if you have spotted factual errors.",
    "This content and its accompanying images were created with the help of AI. Contact {website_name} if you find inaccuracies.",
    "AI was used to create this content and its images. Report any factual errors to {contact_email}.",
    "The text and images on {website_name} are wholly or partially AI-created. Let us know if something is incorrect.",
    "This article and its images were produced with AI assistance. Contact us at {contact_email} for incorrect information.",
    "{website_name} uses AI to create text and images. Contact the editorial team for any errors.",
    "We use AI to create our content and images. Spotted a factual error? Write to {contact_email}.",
    "This article and its images were generated using AI tools. Help {website_name} improve by reporting errors.",
    "This material, including the imagery, is AI-assisted. See something that doesn't look right? Contact {website_name} at {contact_email}.",
    "The content and images were created using AI technology. We appreciate if you notify us of any inaccuracies.",
  ],
  'English (US)': [
    "Parts or all of this content, including the images, is AI-generated. Contact us if you have spotted factual errors.",
    "This content and its accompanying images were created with the help of AI. Contact {website_name} if you find inaccuracies.",
    "AI was used to create this content and its images. Report any factual errors to {contact_email}.",
    "The text and images on {website_name} are wholly or partially AI-created. Let us know if something is incorrect.",
    "This article and its images were produced with AI assistance. Contact us at {contact_email} for incorrect information.",
    "{website_name} uses AI to create text and images. Contact the editorial team for any errors.",
    "We use AI to create our content and images. Spotted a factual error? Write to {contact_email}.",
    "This article and its images were generated using AI tools. Help {website_name} improve by reporting errors.",
    "This material, including the imagery, is AI-assisted. See something that doesn't look right? Contact {website_name} at {contact_email}.",
    "The content and images were created using AI technology. We appreciate if you notify us of any inaccuracies.",
  ],
};

// Fixed warning appended to every disclaimer. Not rotated — the "verify before
// you rely on this" instruction should read the same on every article.
const verifyWarnings: Record<SupportedLanguage, string> = {
  Swedish: 'Betrakta inte innehållet som fakta. Dubbelkolla alltid viktig information mot en oberoende källa innan du använder eller agerar på den.',
  Danish: 'Betragt ikke indholdet som fakta. Dobbelttjek altid vigtige oplysninger mod en uafhængig kilde, før du bruger eller handler på dem.',
  Finnish: 'Älä pidä sisältöä faktana. Tarkista tärkeät tiedot aina riippumattomasta lähteestä ennen kuin käytät niitä tai toimit niiden perusteella.',
  French: "Ne considérez pas ce contenu comme un fait établi. Vérifiez toujours les informations importantes auprès d'une source indépendante avant de les utiliser ou d'agir en conséquence.",
  German: 'Betrachten Sie die Inhalte nicht als Tatsachen. Prüfen Sie wichtige Informationen immer anhand einer unabhängigen Quelle, bevor Sie sie verwenden oder danach handeln.',
  Norwegian: 'Ikke betrakt innholdet som fakta. Dobbeltsjekk alltid viktig informasjon mot en uavhengig kilde før du bruker den eller handler på den.',
  English: 'Do not treat this content as fact. Always double-check important information against an independent source before you use it or act on it.',
  'English (US)': 'Do not treat this content as fact. Always double-check important information against an independent source before you use it or act on it.',
};

// Corner badge overlaid on article images.
const imageBadgeLabels: Record<SupportedLanguage, string> = {
  Swedish: 'AI-genererad bild',
  Danish: 'AI-genereret billede',
  Finnish: 'Tekoälyn luoma kuva',
  French: 'Image générée par IA',
  German: 'KI-generiertes Bild',
  Norwegian: 'AI-generert bilde',
  English: 'AI-generated image',
  'English (US)': 'AI-generated image',
};

// Short chip shown next to the byline.
const authorBadgeLabels: Record<SupportedLanguage, string> = {
  Swedish: 'AI-persona',
  Danish: 'AI-persona',
  Finnish: 'Tekoälyhahmo',
  French: 'Persona IA',
  German: 'KI-Persona',
  Norwegian: 'AI-persona',
  English: 'AI persona',
  'English (US)': 'AI persona',
};

// Author disclosure for the author box and author page. Split in two so the
// publisher sentence can be dropped when the site has no website_name.
const authorDisclosures: Record<SupportedLanguage, { persona: string; publisher: string }> = {
  Swedish: {
    persona: '{author_name} är en AI-genererad persona, inte en verklig person.',
    publisher: 'Innehållet skapas med AI och publiceras av {website_name}.',
  },
  Danish: {
    persona: '{author_name} er en AI-genereret persona, ikke en rigtig person.',
    publisher: 'Indholdet skabes med AI og udgives af {website_name}.',
  },
  Finnish: {
    persona: '{author_name} on tekoälyn luoma hahmo, ei todellinen henkilö.',
    publisher: 'Sisältö luodaan tekoälyllä ja sen julkaisee {website_name}.',
  },
  French: {
    persona: '{author_name} est un personnage généré par IA, et non une personne réelle.',
    publisher: "Le contenu est créé avec l'IA et publié par {website_name}.",
  },
  German: {
    persona: '{author_name} ist eine KI-generierte Persona und keine reale Person.',
    publisher: 'Die Inhalte werden mit KI erstellt und von {website_name} veröffentlicht.',
  },
  Norwegian: {
    persona: '{author_name} er en AI-generert persona, ikke en virkelig person.',
    publisher: 'Innholdet lages med AI og publiseres av {website_name}.',
  },
  English: {
    persona: '{author_name} is an AI-generated persona, not a real person.',
    publisher: 'The content is created with AI and published by {website_name}.',
  },
  'English (US)': {
    persona: '{author_name} is an AI-generated persona, not a real person.',
    publisher: 'The content is created with AI and published by {website_name}.',
  },
};

function resolveLanguage(language: string | null | undefined): SupportedLanguage {
  const lang = language as SupportedLanguage;
  return lang && lang in imageBadgeLabels ? lang : 'Swedish';
}

export function getImageBadgeLabel(language: string | null | undefined): string {
  return imageBadgeLabels[resolveLanguage(language)];
}

export function getAuthorBadgeLabel(language: string | null | undefined): string {
  return authorBadgeLabels[resolveLanguage(language)];
}

export function getAuthorDisclosure(
  language: string | null | undefined,
  authorName: string | null,
  websiteName: string | null
): string {
  const { persona, publisher } = authorDisclosures[resolveLanguage(language)];
  const sentences = [persona.replace(/{author_name}/g, authorName || '')];

  if (websiteName) {
    sentences.push(publisher.replace(/{website_name}/g, websiteName));
  }

  return sentences.join(' ');
}

// CTA variations for scroll hint
const ctaVariations: Record<SupportedLanguage, string[]> = {
  Swedish: [
    "AI-genererat innehåll",
    "Om detta innehåll",
    "Innehållsinformation",
    "AI-information",
  ],
  Danish: [
    "AI-genereret indhold",
    "Om dette indhold",
    "Indholdsinformation",
    "AI-information",
  ],
  Finnish: [
    "Tekoälyn tuottama sisältö",
    "Tietoa sisällöstä",
    "Sisältötiedot",
    "Tekoälytiedot",
  ],
  French: [
    "Contenu généré par IA",
    "À propos de ce contenu",
    "Information sur le contenu",
    "Information IA",
  ],
  German: [
    "KI-generierter Inhalt",
    "Über diesen Inhalt",
    "Inhaltsinformation",
    "KI-Information",
  ],
  Norwegian: [
    "AI-generert innhold",
    "Om dette innholdet",
    "Innholdsinformasjon",
    "AI-informasjon",
  ],
  English: [
    "AI-generated content",
    "About this content",
    "Content information",
    "AI information",
  ],
  'English (US)': [
    "AI-generated content",
    "About this content",
    "Content information",
    "AI information",
  ],
};

// Simple hash function to get deterministic index from website ID
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Select a variation deterministically based on website ID
function selectVariation<T>(websiteId: string, pool: T[], salt: string = ''): T {
  const hash = hashString(websiteId + salt);
  const index = hash % pool.length;
  return pool[index];
}

// Interpolate variables into the disclaimer text
function interpolateVariables(
  text: string,
  websiteName: string | null,
  contactEmail: string | null
): string {
  let result = text;

  // Replace {website_name} - use fallback if not available
  if (result.includes('{website_name}')) {
    result = result.replace(/{website_name}/g, websiteName || 'oss');
  }

  // Replace {contact_email} - use fallback if not available
  if (result.includes('{contact_email}')) {
    result = result.replace(/{contact_email}/g, contactEmail || 'oss');
  }

  return result;
}

export interface DisclaimerText {
  disclaimerText: string;
  // Fixed "don't take this as fact, verify it" warning. Rendered as its own
  // emphasized line so it does not get lost in the rotating disclaimer copy.
  verifyWarning: string;
  ctaText: string;
  hasEmail: boolean;
  email: string | null;
}

export function getDisclaimerText(
  websiteId: string,
  language: string | null | undefined,
  websiteName: string | null,
  contactEmail: string | null
): DisclaimerText {
  // Default to Swedish if language not found
  const lang = (language as SupportedLanguage) || 'Swedish';
  const variations = disclaimerVariations[lang] || disclaimerVariations.Swedish;
  const ctaPool = ctaVariations[lang] || ctaVariations.Swedish;

  // Select disclaimer and CTA variations
  const rawDisclaimer = selectVariation(websiteId, variations, 'disclaimer');
  const ctaText = selectVariation(websiteId, ctaPool, 'cta');

  // Check if this variation uses email
  const hasEmail = rawDisclaimer.includes('{contact_email}') && !!contactEmail;

  // Interpolate variables
  const disclaimerText = interpolateVariables(rawDisclaimer, websiteName, contactEmail);

  return {
    disclaimerText,
    verifyWarning: verifyWarnings[resolveLanguage(language)],
    ctaText,
    hasEmail,
    email: contactEmail,
  };
}
