export type SupportedLanguage =
  | 'Swedish'
  | 'Danish'
  | 'Finnish'
  | 'French'
  | 'German'
  | 'Norwegian'
  | 'English'
  | 'English (US)';

export interface LanguageConfig {
  code: string;        // HTML lang attribute
  locale: string;      // Full locale for dates
  slugs: {
    blog: string;
    about: string;
    contact: string;
  };
  labels: {
    blog: string;
    about: string;
    contact: string;
    home: string;
    readMore: string;
    latestPosts: string;
    relatedPosts: string;
    share: string;
    author: string;
    publishedAt: string;
    readingTime: string;
    minutes: string;
    subscribe: string;
    email: string;
    sitemap: string;
    allRightsReserved: string;
    tableOfContents: string;
    previous: string;
    next: string;
    searchPlaceholder: string;
    noResults: string;
    viewAll: string;
    exploreBlog: string;
    featuredPost: string;
    allPosts: string;
    quickLinks: string;
    noPosts: string;
    navigation: string;
    haveQuestions: string;
    sendMessage: string;
    hereToHelp: string;
    pages: string;
    stayInTouch: string;
    subscribeToNewsletter: string;
    getLatestArticles: string;
    shareOnX: string;
    shareOnFacebook: string;
    shareOnLinkedIn: string;
    copyLink: string;
    linkCopied: string;
    post: string;
  };
}

export const languages: Record<SupportedLanguage, LanguageConfig> = {
  Swedish: {
    code: 'sv',
    locale: 'sv-SE',
    slugs: {
      blog: 'blogg',
      about: 'om-oss',
      contact: 'kontakt',
    },
    labels: {
      blog: 'Blogg',
      about: 'Om oss',
      contact: 'Kontakt',
      home: 'Hem',
      readMore: 'Läs mer',
      latestPosts: 'Senaste inläggen',
      relatedPosts: 'Relaterade inlägg',
      share: 'Dela',
      author: 'Författare',
      publishedAt: 'Publicerad',
      readingTime: 'Lästid',
      minutes: 'min',
      subscribe: 'Prenumerera',
      email: 'Din e-postadress',
      sitemap: 'Sitemap',
      allRightsReserved: 'Alla rättigheter förbehållna',
      tableOfContents: 'Innehåll',
      previous: 'Föregående',
      next: 'Nästa',
      searchPlaceholder: 'Sök inlägg...',
      noResults: 'Inga resultat',
      viewAll: 'Visa alla',
      exploreBlog: 'Utforska bloggen',
      featuredPost: 'Utvalt inlägg',
      allPosts: 'Alla blogginlägg',
      quickLinks: 'Snabblänkar',
      noPosts: 'Inga blogginlägg hittades.',
      navigation: 'Navigation',
      haveQuestions: 'Har du frågor?',
      sendMessage: 'Skicka meddelande',
      hereToHelp: 'Vi finns här för att hjälpa dig.',
      pages: 'Sidor',
      stayInTouch: 'Håll kontakten',
      subscribeToNewsletter: 'Prenumerera på vårt nyhetsbrev',
      getLatestArticles: 'Få de senaste artiklarna direkt i din inkorg',
      shareOnX: 'Dela på X',
      shareOnFacebook: 'Dela på Facebook',
      shareOnLinkedIn: 'Dela på LinkedIn',
      copyLink: 'Kopiera länk',
      linkCopied: 'Länken har kopierats!',
      post: 'Inlägg',
    },
  },
  Danish: {
    code: 'da',
    locale: 'da-DK',
    slugs: {
      blog: 'blog',
      about: 'om-os',
      contact: 'kontakt',
    },
    labels: {
      blog: 'Blog',
      about: 'Om os',
      contact: 'Kontakt',
      home: 'Hjem',
      readMore: 'Læs mere',
      latestPosts: 'Seneste indlæg',
      relatedPosts: 'Relaterede indlæg',
      share: 'Del',
      author: 'Forfatter',
      publishedAt: 'Udgivet',
      readingTime: 'Læsetid',
      minutes: 'min',
      subscribe: 'Abonner',
      email: 'Din e-mailadresse',
      sitemap: 'Sitemap',
      allRightsReserved: 'Alle rettigheder forbeholdes',
      tableOfContents: 'Indhold',
      previous: 'Forrige',
      next: 'Næste',
      searchPlaceholder: 'Søg indlæg...',
      noResults: 'Ingen resultater',
      viewAll: 'Vis alle',
      exploreBlog: 'Udforsk bloggen',
      featuredPost: 'Fremhævet indlæg',
      allPosts: 'Alle blogindlæg',
      quickLinks: 'Hurtige links',
      noPosts: 'Ingen blogindlæg fundet.',
      navigation: 'Navigation',
      haveQuestions: 'Har du spørgsmål?',
      sendMessage: 'Send besked',
      hereToHelp: 'Vi er her for at hjælpe dig.',
      pages: 'Sider',
      stayInTouch: 'Hold kontakten',
      subscribeToNewsletter: 'Abonner på vores nyhedsbrev',
      getLatestArticles: 'Få de seneste artikler direkte i din indbakke',
      shareOnX: 'Del på X',
      shareOnFacebook: 'Del på Facebook',
      shareOnLinkedIn: 'Del på LinkedIn',
      copyLink: 'Kopiér link',
      linkCopied: 'Link kopieret!',
      post: 'Indlæg',
    },
  },
  Finnish: {
    code: 'fi',
    locale: 'fi-FI',
    slugs: {
      blog: 'blogi',
      about: 'meista',
      contact: 'yhteystiedot',
    },
    labels: {
      blog: 'Blogi',
      about: 'Meistä',
      contact: 'Yhteystiedot',
      home: 'Etusivu',
      readMore: 'Lue lisää',
      latestPosts: 'Viimeisimmät julkaisut',
      relatedPosts: 'Aiheeseen liittyvät',
      share: 'Jaa',
      author: 'Kirjoittaja',
      publishedAt: 'Julkaistu',
      readingTime: 'Lukuaika',
      minutes: 'min',
      subscribe: 'Tilaa',
      email: 'Sähköpostiosoitteesi',
      sitemap: 'Sivukartta',
      allRightsReserved: 'Kaikki oikeudet pidätetään',
      tableOfContents: 'Sisällysluettelo',
      previous: 'Edellinen',
      next: 'Seuraava',
      searchPlaceholder: 'Hae julkaisuja...',
      noResults: 'Ei tuloksia',
      viewAll: 'Näytä kaikki',
      exploreBlog: 'Tutustu blogiin',
      featuredPost: 'Suositeltu julkaisu',
      allPosts: 'Kaikki blogikirjoitukset',
      quickLinks: 'Pikalinkit',
      noPosts: 'Blogikirjoituksia ei löytynyt.',
      navigation: 'Navigointi',
      haveQuestions: 'Onko sinulla kysyttävää?',
      sendMessage: 'Lähetä viesti',
      hereToHelp: 'Olemme täällä auttaaksemme.',
      pages: 'Sivut',
      stayInTouch: 'Pysy yhteydessä',
      subscribeToNewsletter: 'Tilaa uutiskirjeemme',
      getLatestArticles: 'Saat uusimmat artikkelit suoraan sähköpostiisi',
      shareOnX: 'Jaa X:ssä',
      shareOnFacebook: 'Jaa Facebookissa',
      shareOnLinkedIn: 'Jaa LinkedInissä',
      copyLink: 'Kopioi linkki',
      linkCopied: 'Linkki kopioitu!',
      post: 'Julkaisu',
    },
  },
  French: {
    code: 'fr',
    locale: 'fr-FR',
    slugs: {
      blog: 'blog',
      about: 'a-propos',
      contact: 'contact',
    },
    labels: {
      blog: 'Blog',
      about: 'À propos',
      contact: 'Contact',
      home: 'Accueil',
      readMore: 'Lire la suite',
      latestPosts: 'Derniers articles',
      relatedPosts: 'Articles similaires',
      share: 'Partager',
      author: 'Auteur',
      publishedAt: 'Publié le',
      readingTime: 'Temps de lecture',
      minutes: 'min',
      subscribe: "S'abonner",
      email: 'Votre adresse e-mail',
      sitemap: 'Plan du site',
      allRightsReserved: 'Tous droits réservés',
      tableOfContents: 'Sommaire',
      previous: 'Précédent',
      next: 'Suivant',
      searchPlaceholder: 'Rechercher...',
      noResults: 'Aucun résultat',
      viewAll: 'Voir tout',
      exploreBlog: 'Explorer le blog',
      featuredPost: 'Article en vedette',
      allPosts: 'Tous les articles',
      quickLinks: 'Liens rapides',
      noPosts: 'Aucun article trouvé.',
      navigation: 'Navigation',
      haveQuestions: 'Des questions ?',
      sendMessage: 'Envoyer un message',
      hereToHelp: 'Nous sommes là pour vous aider.',
      pages: 'Pages',
      stayInTouch: 'Restons en contact',
      subscribeToNewsletter: 'Abonnez-vous à notre newsletter',
      getLatestArticles: 'Recevez les derniers articles directement dans votre boîte mail',
      shareOnX: 'Partager sur X',
      shareOnFacebook: 'Partager sur Facebook',
      shareOnLinkedIn: 'Partager sur LinkedIn',
      copyLink: 'Copier le lien',
      linkCopied: 'Lien copié !',
      post: 'Article',
    },
  },
  German: {
    code: 'de',
    locale: 'de-DE',
    slugs: {
      blog: 'blog',
      about: 'ueber-uns',
      contact: 'kontakt',
    },
    labels: {
      blog: 'Blog',
      about: 'Über uns',
      contact: 'Kontakt',
      home: 'Startseite',
      readMore: 'Weiterlesen',
      latestPosts: 'Neueste Beiträge',
      relatedPosts: 'Ähnliche Beiträge',
      share: 'Teilen',
      author: 'Autor',
      publishedAt: 'Veröffentlicht am',
      readingTime: 'Lesezeit',
      minutes: 'Min',
      subscribe: 'Abonnieren',
      email: 'Ihre E-Mail-Adresse',
      sitemap: 'Sitemap',
      allRightsReserved: 'Alle Rechte vorbehalten',
      tableOfContents: 'Inhaltsverzeichnis',
      previous: 'Vorheriger',
      next: 'Nächster',
      searchPlaceholder: 'Beiträge suchen...',
      noResults: 'Keine Ergebnisse',
      viewAll: 'Alle anzeigen',
      exploreBlog: 'Blog entdecken',
      featuredPost: 'Empfohlener Beitrag',
      allPosts: 'Alle Blogbeiträge',
      quickLinks: 'Schnelllinks',
      noPosts: 'Keine Blogbeiträge gefunden.',
      navigation: 'Navigation',
      haveQuestions: 'Haben Sie Fragen?',
      sendMessage: 'Nachricht senden',
      hereToHelp: 'Wir sind hier, um Ihnen zu helfen.',
      pages: 'Seiten',
      stayInTouch: 'Bleiben Sie in Kontakt',
      subscribeToNewsletter: 'Abonnieren Sie unseren Newsletter',
      getLatestArticles: 'Erhalten Sie die neuesten Artikel direkt in Ihren Posteingang',
      shareOnX: 'Auf X teilen',
      shareOnFacebook: 'Auf Facebook teilen',
      shareOnLinkedIn: 'Auf LinkedIn teilen',
      copyLink: 'Link kopieren',
      linkCopied: 'Link kopiert!',
      post: 'Beitrag',
    },
  },
  Norwegian: {
    code: 'no',
    locale: 'nb-NO',
    slugs: {
      blog: 'blogg',
      about: 'om-oss',
      contact: 'kontakt',
    },
    labels: {
      blog: 'Blogg',
      about: 'Om oss',
      contact: 'Kontakt',
      home: 'Hjem',
      readMore: 'Les mer',
      latestPosts: 'Siste innlegg',
      relatedPosts: 'Relaterte innlegg',
      share: 'Del',
      author: 'Forfatter',
      publishedAt: 'Publisert',
      readingTime: 'Lesetid',
      minutes: 'min',
      subscribe: 'Abonner',
      email: 'Din e-postadresse',
      sitemap: 'Nettstedskart',
      allRightsReserved: 'Alle rettigheter reservert',
      tableOfContents: 'Innhold',
      previous: 'Forrige',
      next: 'Neste',
      searchPlaceholder: 'Søk innlegg...',
      noResults: 'Ingen resultater',
      viewAll: 'Vis alle',
      exploreBlog: 'Utforsk bloggen',
      featuredPost: 'Uthevet innlegg',
      allPosts: 'Alle blogginnlegg',
      quickLinks: 'Hurtiglenker',
      noPosts: 'Ingen blogginnlegg funnet.',
      navigation: 'Navigasjon',
      haveQuestions: 'Har du spørsmål?',
      sendMessage: 'Send melding',
      hereToHelp: 'Vi er her for å hjelpe deg.',
      pages: 'Sider',
      stayInTouch: 'Hold kontakten',
      subscribeToNewsletter: 'Abonner på vårt nyhetsbrev',
      getLatestArticles: 'Få de nyeste artiklene rett i innboksen din',
      shareOnX: 'Del på X',
      shareOnFacebook: 'Del på Facebook',
      shareOnLinkedIn: 'Del på LinkedIn',
      copyLink: 'Kopier lenke',
      linkCopied: 'Lenke kopiert!',
      post: 'Innlegg',
    },
  },
  English: {
    code: 'en',
    locale: 'en-GB',
    slugs: {
      blog: 'blog',
      about: 'about',
      contact: 'contact',
    },
    labels: {
      blog: 'Blog',
      about: 'About',
      contact: 'Contact',
      home: 'Home',
      readMore: 'Read more',
      latestPosts: 'Latest posts',
      relatedPosts: 'Related posts',
      share: 'Share',
      author: 'Author',
      publishedAt: 'Published',
      readingTime: 'Reading time',
      minutes: 'min',
      subscribe: 'Subscribe',
      email: 'Your email address',
      sitemap: 'Sitemap',
      allRightsReserved: 'All rights reserved',
      tableOfContents: 'Table of contents',
      previous: 'Previous',
      next: 'Next',
      searchPlaceholder: 'Search posts...',
      noResults: 'No results',
      viewAll: 'View all',
      exploreBlog: 'Explore the blog',
      featuredPost: 'Featured post',
      allPosts: 'All blog posts',
      quickLinks: 'Quick links',
      noPosts: 'No blog posts found.',
      navigation: 'Navigation',
      haveQuestions: 'Have questions?',
      sendMessage: 'Send message',
      hereToHelp: 'We\'re here to help.',
      pages: 'Pages',
      stayInTouch: 'Stay in touch',
      subscribeToNewsletter: 'Subscribe to our newsletter',
      getLatestArticles: 'Get the latest articles directly in your inbox',
      shareOnX: 'Share on X',
      shareOnFacebook: 'Share on Facebook',
      shareOnLinkedIn: 'Share on LinkedIn',
      copyLink: 'Copy link',
      linkCopied: 'Link copied!',
      post: 'Post',
    },
  },
  'English (US)': {
    code: 'en',
    locale: 'en-US',
    slugs: {
      blog: 'blog',
      about: 'about',
      contact: 'contact',
    },
    labels: {
      blog: 'Blog',
      about: 'About',
      contact: 'Contact',
      home: 'Home',
      readMore: 'Read more',
      latestPosts: 'Latest posts',
      relatedPosts: 'Related posts',
      share: 'Share',
      author: 'Author',
      publishedAt: 'Published',
      readingTime: 'Reading time',
      minutes: 'min',
      subscribe: 'Subscribe',
      email: 'Your email address',
      sitemap: 'Sitemap',
      allRightsReserved: 'All rights reserved',
      tableOfContents: 'Table of contents',
      previous: 'Previous',
      next: 'Next',
      searchPlaceholder: 'Search posts...',
      noResults: 'No results',
      viewAll: 'View all',
      exploreBlog: 'Explore the blog',
      featuredPost: 'Featured post',
      allPosts: 'All blog posts',
      quickLinks: 'Quick links',
      noPosts: 'No blog posts found.',
      navigation: 'Navigation',
      haveQuestions: 'Have questions?',
      sendMessage: 'Send message',
      hereToHelp: 'We\'re here to help.',
      pages: 'Pages',
      stayInTouch: 'Stay in touch',
      subscribeToNewsletter: 'Subscribe to our newsletter',
      getLatestArticles: 'Get the latest articles directly in your inbox',
      shareOnX: 'Share on X',
      shareOnFacebook: 'Share on Facebook',
      shareOnLinkedIn: 'Share on LinkedIn',
      copyLink: 'Copy link',
      linkCopied: 'Link copied!',
      post: 'Post',
    },
  },
};

// Default to Swedish if language not found
export function getLanguageConfig(language: string | null | undefined): LanguageConfig {
  if (!language) return languages.Swedish;
  return languages[language as SupportedLanguage] || languages.Swedish;
}

// Get slug for a page type based on language
export function getLocalizedSlug(language: string | null | undefined, page: 'blog' | 'about' | 'contact'): string {
  const config = getLanguageConfig(language);
  return config.slugs[page];
}

// Get the internal Swedish slug from any localized slug
export function getInternalSlug(slug: string): string | null {
  // Map of all possible slugs to internal (Swedish) slugs
  const slugMap: Record<string, string> = {};

  for (const config of Object.values(languages)) {
    slugMap[config.slugs.blog] = 'blogg';
    slugMap[config.slugs.about] = 'om-oss';
    slugMap[config.slugs.contact] = 'kontakt';
  }

  return slugMap[slug] || null;
}

// Check if a slug matches any known page
export function isKnownPageSlug(slug: string): boolean {
  return getInternalSlug(slug) !== null;
}
