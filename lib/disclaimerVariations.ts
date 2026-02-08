import { SupportedLanguage } from './languages';

// 10 complete disclaimer variations per language
// Variables: {website_name}, {contact_email} - interpolated at render time
const disclaimerVariations: Record<SupportedLanguage, string[]> = {
  Swedish: [
    "Delar eller hela innehållet är AI-genererat. Kontakta oss om du har upptäckt faktafel.",
    "Detta innehåll har skapats med hjälp av AI. Hör av dig till {website_name} om du hittar felaktigheter.",
    "AI har använts för att skapa detta innehåll. Rapportera eventuella faktafel till {contact_email}.",
    "Innehållet på {website_name} är helt eller delvis AI-skapat. Låt oss veta om något är felaktigt.",
    "Denna artikel är framtagen med AI-stöd. Meddela oss på {contact_email} vid felaktig information.",
    "{website_name} använder AI för att skapa innehåll. Kontakta redaktionen vid eventuella fel.",
    "Vi använder AI för att skapa vårt innehåll. Upptäcker du ett faktafel? Skriv till {contact_email}.",
    "Artikeln har genererats med hjälp av AI-verktyg. Hjälp {website_name} bli bättre genom att rapportera fel.",
    "Detta material är AI-assisterat. Ser du något som inte stämmer? Kontakta {website_name} på {contact_email}.",
    "Innehållet har skapats med AI-teknik. Vi uppskattar om du meddelar oss om felaktigheter.",
  ],
  Danish: [
    "Dele eller hele indholdet er AI-genereret. Kontakt os, hvis du har opdaget faktuelle fejl.",
    "Dette indhold er skabt ved hjælp af AI. Kontakt {website_name}, hvis du finder fejl.",
    "AI er blevet brugt til at skabe dette indhold. Rapporter eventuelle faktuelle fejl til {contact_email}.",
    "Indholdet på {website_name} er helt eller delvist AI-skabt. Fortæl os, hvis noget er forkert.",
    "Denne artikel er fremstillet med AI-støtte. Kontakt os på {contact_email} ved forkert information.",
    "{website_name} bruger AI til at skabe indhold. Kontakt redaktionen ved eventuelle fejl.",
    "Vi bruger AI til at skabe vores indhold. Har du opdaget en fejl? Skriv til {contact_email}.",
    "Artiklen er genereret ved hjælp af AI-værktøjer. Hjælp {website_name} med at blive bedre ved at rapportere fejl.",
    "Dette materiale er AI-assisteret. Ser du noget, der ikke stemmer? Kontakt {website_name} på {contact_email}.",
    "Indholdet er skabt med AI-teknologi. Vi sætter pris på, hvis du informerer os om fejl.",
  ],
  Finnish: [
    "Osa tai koko sisältö on tekoälyn tuottamaa. Ota yhteyttä, jos huomaat asiavirheitä.",
    "Tämä sisältö on luotu tekoälyn avulla. Ota yhteyttä {website_name}, jos löydät virheitä.",
    "Tekoälyä on käytetty tämän sisällön luomiseen. Ilmoita mahdollisista asiavirheistä osoitteeseen {contact_email}.",
    "Sisältö sivustolla {website_name} on kokonaan tai osittain tekoälyn luomaa. Kerro meille, jos jokin on väärin.",
    "Tämä artikkeli on tuotettu tekoälyn tuella. Ilmoita meille osoitteeseen {contact_email} virheellisestä tiedosta.",
    "{website_name} käyttää tekoälyä sisällön luomiseen. Ota yhteyttä toimitukseen mahdollisista virheistä.",
    "Käytämme tekoälyä sisällön luomiseen. Löysitkö asiavirheen? Kirjoita osoitteeseen {contact_email}.",
    "Artikkeli on luotu tekoälytyökalujen avulla. Auta {website_name} parantamaan ilmoittamalla virheistä.",
    "Tämä materiaali on tekoälyavusteista. Näetkö jotain, mikä ei pidä paikkaansa? Ota yhteyttä {website_name} osoitteessa {contact_email}.",
    "Sisältö on luotu tekoälyteknologialla. Arvostamme, jos ilmoitat meille virheistä.",
  ],
  French: [
    "Une partie ou la totalité du contenu est généré par IA. Contactez-nous si vous avez détecté des erreurs factuelles.",
    "Ce contenu a été créé à l'aide de l'IA. Contactez {website_name} si vous trouvez des inexactitudes.",
    "L'IA a été utilisée pour créer ce contenu. Signalez toute erreur factuelle à {contact_email}.",
    "Le contenu de {website_name} est entièrement ou partiellement créé par IA. Faites-nous savoir si quelque chose est incorrect.",
    "Cet article a été produit avec l'aide de l'IA. Contactez-nous à {contact_email} pour signaler des informations incorrectes.",
    "{website_name} utilise l'IA pour créer du contenu. Contactez la rédaction en cas d'erreurs.",
    "Nous utilisons l'IA pour créer notre contenu. Vous avez détecté une erreur ? Écrivez à {contact_email}.",
    "L'article a été généré à l'aide d'outils d'IA. Aidez {website_name} à s'améliorer en signalant les erreurs.",
    "Ce matériel est assisté par IA. Vous voyez quelque chose d'incorrect ? Contactez {website_name} à {contact_email}.",
    "Le contenu a été créé avec la technologie IA. Nous apprécions si vous nous signalez les inexactitudes.",
  ],
  German: [
    "Teile oder der gesamte Inhalt sind KI-generiert. Kontaktieren Sie uns, wenn Sie Sachfehler entdeckt haben.",
    "Dieser Inhalt wurde mit Hilfe von KI erstellt. Kontaktieren Sie {website_name}, wenn Sie Fehler finden.",
    "KI wurde verwendet, um diesen Inhalt zu erstellen. Melden Sie eventuelle Sachfehler an {contact_email}.",
    "Der Inhalt auf {website_name} ist ganz oder teilweise KI-erstellt. Lassen Sie uns wissen, wenn etwas falsch ist.",
    "Dieser Artikel wurde mit KI-Unterstützung erstellt. Kontaktieren Sie uns unter {contact_email} bei falschen Informationen.",
    "{website_name} verwendet KI zur Erstellung von Inhalten. Kontaktieren Sie die Redaktion bei eventuellen Fehlern.",
    "Wir verwenden KI zur Erstellung unserer Inhalte. Haben Sie einen Sachfehler entdeckt? Schreiben Sie an {contact_email}.",
    "Der Artikel wurde mit Hilfe von KI-Tools generiert. Helfen Sie {website_name}, besser zu werden, indem Sie Fehler melden.",
    "Dieses Material ist KI-unterstützt. Sehen Sie etwas, das nicht stimmt? Kontaktieren Sie {website_name} unter {contact_email}.",
    "Der Inhalt wurde mit KI-Technologie erstellt. Wir freuen uns, wenn Sie uns auf Fehler hinweisen.",
  ],
  Norwegian: [
    "Deler eller hele innholdet er AI-generert. Kontakt oss om du har oppdaget faktafeil.",
    "Dette innholdet er skapt ved hjelp av AI. Ta kontakt med {website_name} om du finner feil.",
    "AI har blitt brukt til å lage dette innholdet. Rapporter eventuelle faktafeil til {contact_email}.",
    "Innholdet på {website_name} er helt eller delvis AI-skapt. Gi oss beskjed om noe er feil.",
    "Denne artikkelen er laget med AI-støtte. Kontakt oss på {contact_email} ved feilaktig informasjon.",
    "{website_name} bruker AI til å lage innhold. Kontakt redaksjonen ved eventuelle feil.",
    "Vi bruker AI til å lage innholdet vårt. Oppdaget du en faktafeil? Skriv til {contact_email}.",
    "Artikkelen er generert ved hjelp av AI-verktøy. Hjelp {website_name} med å bli bedre ved å rapportere feil.",
    "Dette materialet er AI-assistert. Ser du noe som ikke stemmer? Kontakt {website_name} på {contact_email}.",
    "Innholdet er laget med AI-teknologi. Vi setter pris på om du melder fra om feil.",
  ],
  English: [
    "Parts or all of this content is AI-generated. Contact us if you have spotted factual errors.",
    "This content was created with the help of AI. Contact {website_name} if you find inaccuracies.",
    "AI was used to create this content. Report any factual errors to {contact_email}.",
    "The content on {website_name} is wholly or partially AI-created. Let us know if something is incorrect.",
    "This article was produced with AI assistance. Contact us at {contact_email} for incorrect information.",
    "{website_name} uses AI to create content. Contact the editorial team for any errors.",
    "We use AI to create our content. Spotted a factual error? Write to {contact_email}.",
    "This article was generated using AI tools. Help {website_name} improve by reporting errors.",
    "This material is AI-assisted. See something that doesn't look right? Contact {website_name} at {contact_email}.",
    "The content was created using AI technology. We appreciate if you notify us of any inaccuracies.",
  ],
  'English (US)': [
    "Parts or all of this content is AI-generated. Contact us if you have spotted factual errors.",
    "This content was created with the help of AI. Contact {website_name} if you find inaccuracies.",
    "AI was used to create this content. Report any factual errors to {contact_email}.",
    "The content on {website_name} is wholly or partially AI-created. Let us know if something is incorrect.",
    "This article was produced with AI assistance. Contact us at {contact_email} for incorrect information.",
    "{website_name} uses AI to create content. Contact the editorial team for any errors.",
    "We use AI to create our content. Spotted a factual error? Write to {contact_email}.",
    "This article was generated using AI tools. Help {website_name} improve by reporting errors.",
    "This material is AI-assisted. See something that doesn't look right? Contact {website_name} at {contact_email}.",
    "The content was created using AI technology. We appreciate if you notify us of any inaccuracies.",
  ],
};

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
    ctaText,
    hasEmail,
    email: contactEmail,
  };
}
