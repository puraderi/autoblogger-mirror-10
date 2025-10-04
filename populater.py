#!/usr/bin/env python3
"""
AutoBloggerX Content Populater
Generates Swedish website content using Claude API
and populates Supabase database.

Usage:
    python populater.py --website-name "TechBloggen" --topic "Teknik och innovation" --hostname "techbloggen.se"
"""

import os
import sys
import json
import re
import argparse
from datetime import datetime, timedelta
from typing import Dict, List, Optional
from dotenv import load_dotenv
import anthropic
from supabase import create_client, Client

# Load environment variables from .env.local
load_dotenv('.env.local')

# Configuration
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")

if not ANTHROPIC_API_KEY:
    print("❌ Error: ANTHROPIC_API_KEY environment variable not set")
    sys.exit(1)

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ Error: SUPABASE_URL and SUPABASE_KEY environment variables must be set")
    sys.exit(1)

# Initialize clients
anthropic_client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Writing rules to append to every prompt
WRITING_RULES = """
SKRIVREGLER (följ dessa strikt):
- Använd dependency grammar för enkel läsbarhet
- Skriv på 8:e klass nivå, undvik nischade ord och C2-vokabulär
- Ange sakliga fakta utan symbolisk inramning (ex: inte "står som ett monument", utan "färdigställdes 1845")
- Använd neutrala, mätbara beskrivningar istället för värdeladdade adjektiv
- Ta bort personliga påpekanden som "det är värt att notera"
- Minimera överanvändning av konnektorer ("Dessutom", "Vidare")
- Undvik minisammanfattningar i slutet av stycken
- Använd aldrig töntiga fraser som "i dagens snabbrörliga värld", "mer än bara en blogg", "är mer än bara", "djupdykning", "i hjärtat av", etc. Var mer grundad och specifik.
- Ersätt "trestegsformeln" (tre adjektiv i rad) med konkreta detaljer
- Undvik "denna" - skriv om meningen istället
- Variera menings- och styckelängd för naturlig rytm
- Använd kommatecken istället för tankstreck där det passar
- Avsluta INTE med "sammanfattning" eller "slutsats" - avsluta med något intressant
"""


def generate_slug(title: str) -> str:
    """Generate URL-friendly slug from Swedish title"""
    slug = title.lower()
    slug = slug.replace('å', 'a').replace('ä', 'a').replace('ö', 'o')
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    slug = slug.strip('-')
    return slug


def call_claude(prompt: str, context: Optional[str] = None) -> str:
    """Call Claude API without streaming"""
    system_prompt = """Du är en expert på att skapa svenskt webbinnehåll.
Du skriver alltid på flytande svenska med korrekt grammatik och ton.
Du skapar engagerande, informativt och välskrivet innehåll."""

    if context:
        system_prompt += f"\n\nKontext från tidigare genererat innehåll:\n{context}"

    print(f"  🤖 Anropar Claude API...")

    response = anthropic_client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=4000,
        system=system_prompt,
        messages=[{"role": "user", "content": prompt}]
    )

    print("  ✅ Svar mottaget")

    # Clean up markdown code blocks that Claude sometimes adds
    text = response.content[0].text.strip()
    text = text.replace('```html', '').replace('```', '').strip()

    return text


def generate_about_us(website_name: str, topic: str) -> str:
    """Step 1: Generate About Us content"""
    print("\n📝 Steg 1: Genererar 'Om oss' innehåll...")

    prompt = f"""Skapa en 'Om oss' sida på svenska för en blogg med namnet "{website_name}" som handlar om "{topic}".

VIKTIGT: Förtydliga att det är en blogg (inte tidning, magasin eller företag).

Innehållet ska vara:
- 2-3 stycken (varandra med <p> taggar)
- Professionellt och engagerande
- Beskriva bloggens syfte och värden
- Nämn att det är en blogg och vad läsare kan förvänta sig
- Skrivet i HTML-format med <p> taggar
- Cirka 150-250 ord totalt

{WRITING_RULES}

Returnera ENDAST HTML-innehållet, inga extra förklaringar."""

    return call_claude(prompt)


def generate_contact_us(website_name: str, topic: str, about_context: str) -> str:
    """Step 2: Generate Contact Us content"""
    print("\n📝 Steg 2: Genererar 'Kontakta oss' innehåll...")

    prompt = f"""Baserat på den här bloggen, skapa en 'Kontakta oss' sida på svenska.

Bloggnamn: {website_name}
Ämne: {topic}

Innehållet ska innehålla:
- Välkomnande text
- Email: kontakt@{generate_slug(website_name)}.se
- Fiktiv adress som passar ämnet
- Fiktivt telefonnummer
- HTML-format med <p> och <strong> taggar
- Cirka 100-150 ord

{WRITING_RULES}

Returnera ENDAST HTML-innehållet, inga extra förklaringar."""

    return call_claude(prompt, about_context)


def generate_hero_content(website_name: str, topic: str, about_context: str) -> Dict[str, str]:
    """Step 3: Generate homepage hero section"""
    print("\n📝 Steg 3: Genererar startsidans hero-sektion...")

    prompt = f"""Skapa innehåll för startsidans hero-sektion för bloggen "{website_name}".

VIKTIGT: Förtydliga att det är en blogg (inte tidning, magasin eller företag).

Generera:
1. HERO_TITLE: En kort, slagkraftig rubrik (5-8 ord)
2. HERO_TEXT: En beskrivande text som förklarar bloggens värde och vad läsare kan förvänta sig (2-3 meningar, ca 50 ord)
3. OUTRO_TEXT: En avslutande text för startsidan med call-to-action (1-2 meningar i HTML <p> format)

{WRITING_RULES}

Formatera svaret EXAKT så här:
HERO_TITLE: [din rubrik]
HERO_TEXT: [din text]
OUTRO_TEXT: [din HTML-text]

Returnera ENDAST dessa tre rader, inget annat."""

    response = call_claude(prompt, about_context)

    # Parse response
    hero_title = ""
    hero_text = ""
    outro_text = ""

    for line in response.split('\n'):
        if line.startswith('HERO_TITLE:'):
            hero_title = line.replace('HERO_TITLE:', '').strip()
        elif line.startswith('HERO_TEXT:'):
            hero_text = line.replace('HERO_TEXT:', '').strip()
        elif line.startswith('OUTRO_TEXT:'):
            outro_text = line.replace('OUTRO_TEXT:', '').strip()

    return {
        'hero_title': hero_title,
        'hero_text': hero_text,
        'outro_text': outro_text
    }


def generate_design_system(website_name: str, topic: str, about_context: str) -> Dict[str, any]:
    """Step 4: Generate color scheme and design system"""
    print("\n🎨 Steg 4: Genererar färgschema och designsystem...")

    prompt = f"""Skapa ett färgschema och designsystem för bloggen "{website_name}" om "{topic}".

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

Returnera ENDAST dessa 7 rader."""

    response = call_claude(prompt, about_context)

    # Parse response with defaults
    design = {
        'primary_color': '#2563eb',
        'secondary_color': '#e0e7ff',
        'accent_color': '#7c3aed',
        'background_color': '#ffffff',
        'text_color': '#1f2937',
        'font_heading': 'Inter',
        'font_body': 'Inter'
    }

    for line in response.split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            key = key.strip().lower()
            value = value.strip()

            if key in design:
                design[key] = value

    return design


def generate_meta_description(website_name: str, topic: str, about_context: str) -> str:
    """Step 5: Generate SEO meta description"""
    print("\n🔍 Steg 5: Genererar SEO meta description...")

    prompt = f"""Skapa en SEO meta description på svenska för "{website_name}".

Krav:
- Exakt 140-160 tecken
- Inkludera "{topic}"
- Lockande och beskrivande
- Bra för sökmotoroptimering

{WRITING_RULES}

Returnera ENDAST meta description-texten, inget annat."""

    return call_claude(prompt, about_context)


def insert_website_data(
    hostname: str,
    website_name: str,
    topic: str,
    about_us: str,
    contact_us: str,
    hero: Dict[str, str],
    design: Dict[str, any],
    meta_description: str
) -> str:
    """Insert website data into Supabase and return website_id"""
    print("\n💾 Sparar webbplatsdata till Supabase...")

    import random

    website_data = {
        'host_name': hostname,
        'website_name': website_name,
        'topic': topic,
        'about_us': about_us,
        'contact_us': contact_us,
        'frontpage_hero_title': hero['hero_title'],
        'frontpage_hero_text': hero['hero_text'],
        'frontpage_outro_text': hero['outro_text'],
        'template_header': random.randint(1, 5),
        'template_footer': random.randint(1, 5),
        'template_blog_post': random.randint(1, 5),
        'template_page': random.randint(1, 5),
        'template_front_page': random.randint(1, 5),
        'primary_color': design['primary_color'],
        'secondary_color': design['secondary_color'],
        'accent_color': design['accent_color'],
        'background_color': design['background_color'],
        'text_color': design['text_color'],
        'font_heading': design['font_heading'],
        'font_body': design['font_body'],
        'container_width': 'max-w-7xl',
        'border_radius': 'rounded-lg',
        'meta_description': meta_description,
        'show_breadcrumbs': random.choice([True, False]),
        'show_related_posts': random.choice([True, False]),
        'show_search_bar': random.choice([True, False]),
        'show_share_buttons': random.choice([True, False]),
        'show_table_of_contents': random.choice([True, False]),
        'show_author_box': random.choice([True, False]),
        'show_tags_display': random.choice([True, False]),
        'show_reading_time': random.choice([True, False]),
        'show_post_navigation': random.choice([True, False]),
        'show_reading_progress_bar': random.choice([True, False])
    }

    result = supabase.table('website_data').insert(website_data).execute()

    if result.data and len(result.data) > 0:
        website_id = result.data[0]['id']
        print(f"  ✅ Webbplats skapad med ID: {website_id}")
        return website_id
    else:
        raise Exception("Failed to insert website data")


def main():
    parser = argparse.ArgumentParser(description='Generate Swedish blog content using Claude AI')
    parser.add_argument('--website-name', required=True, help='Name of the website')
    parser.add_argument('--topic', required=True, help='Main topic/theme of the blog')
    parser.add_argument('--hostname', required=True, help='Hostname for the website')

    args = parser.parse_args()

    print("=" * 70)
    print("🚀 AutoBloggerX Content Populater")
    print("=" * 70)
    print(f"Webbplatsnamn: {args.website_name}")
    print(f"Ämne: {args.topic}")
    print(f"Hostname: {args.hostname}")
    print("=" * 70)

    # Step 1: Generate About Us
    about_us = generate_about_us(args.website_name, args.topic)
    context = f"Om oss: {about_us}\n"

    # Step 2: Generate Contact Us
    contact_us = generate_contact_us(args.website_name, args.topic, context)
    context += f"Kontakt: {contact_us}\n"

    # Step 3: Generate Hero Content
    hero = generate_hero_content(args.website_name, args.topic, context)
    context += f"Hero: {hero['hero_title']} - {hero['hero_text']}\n"

    # Step 4: Generate Design System
    design = generate_design_system(args.website_name, args.topic, context)

    # Step 5: Generate Meta Description
    meta_description = generate_meta_description(args.website_name, args.topic, context)

    # Insert website data
    website_id = insert_website_data(
        args.hostname,
        args.website_name,
        args.topic,
        about_us,
        contact_us,
        hero,
        design,
        meta_description
    )

    print("\n" + "=" * 70)
    print("✨ Klart! Webbplatsinnehåll har genererats och sparats.")
    print("=" * 70)
    print(f"Webbplats-ID: {website_id}")
    print(f"Hostname: {args.hostname}")
    print("\n🎉 Du kan nu besöka din nya blogg!")
    print("📝 Nästa steg: Skapa blogginlägg via din admin-panel eller separat script")
    print("=" * 70)


if __name__ == "__main__":
    main()
