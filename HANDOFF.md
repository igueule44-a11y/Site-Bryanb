# HANDOFF V2 — Site Bryan Blaevoet / Guides HTML / Contenu vertical

Document de transfert complet. Colle ce fichier en entier au début d'une nouvelle conversation Claude (ou Claude Code) pour reprendre exactement là où on s'est arrêtés.

---

## 1. Contexte projet

Bryan Blaevoet — ex-Partnership Manager chez Markchain (agence marketing crypto), construit désormais une agence marketing IA/automatisation en solo. Basé à Madrid. Documente publiquement son apprentissage de l'IA (~1 mois d'expérience autodidacte) sur LinkedIn, sous son propre nom.

- Site : https://bryan-blaevoet.vercel.app
- Repo GitHub : igueule44-a11y/Site-Bryanb (cloné en local sur le Mac de Bryan dans ~/Site-Bryanb)
- Hébergement : Vercel, déploiement auto sur chaque git push
- Dossier des guides : /guides/ à la racine du repo — non lié depuis le site principal, accès uniquement par URL directe (lead magnets / liens partagés en privé ou en commentaire LinkedIn).

**Contrainte fondamentale** : Claude n'a aucun accès direct au terminal ni au système de fichiers du Mac de Bryan. Les deux environnements sont complètement étanches. Toute commande cp donnée à Bryan ne doit jamais référencer un chemin de l'environnement serveur Claude (/mnt/user-data/outputs/..., /home/claude/...). Pont unique = copier-coller dans la conversation.

---

## 2. Process de publication d'un guide HTML

1. Récupérer le design de référence via raw.githubusercontent.com/igueule44-a11y/Site-Bryanb/main/guides/[nom].html (accessible depuis mon bash, contrairement à bryan-blaevoet.vercel.app).
2. Construire le fichier HTML complet dans mon environnement.
3. Présenter le fichier final via present_files → téléchargement dans ~/Downloads.
4. Bryan exécute lui-même :
   bash
   cd ~/Site-Bryanb
   pwd                                          # toujours vérifier qu'on est à la racine
   cp ~/Downloads/[fichier].html guides/[fichier].html
   git add guides/[fichier].html
   git commit -m "docs: ..."
   git push

5. Vérifier le déploiement sur https://bryan-blaevoet.vercel.app/guides/[fichier].html après 2-3 min de propagation Vercel.

**3 erreurs déjà identifiées (à ne jamais reproduire)** :
1. Donner une commande cp avec un chemin serveur Claude.
2. Oublier le pwd → chemin dupliqué guides/guides/[fichier].html.
3. Retaper un design de mémoire au lieu de récupérer l'original.

---

## 3. Système de design HTML

### Palette / fonts (variables CSS racine)
css
:root{
  --bg-darkest:#060c18;
  --bg-main:#080e1a;
  --bg-card:#0d1a2e;
  --accent:#00d4ff;
  --accent-soft:#7de8f7;
  --text-primary:#f0f8ff;
  --text-secondary:#8ab4cc;
  --border-soft:rgba(0,212,255,0.16);
  --border-strong:rgba(0,212,255,0.32);
  --warn:#ff8a65;
}


Fonts : Space Grotesk (titres), Inter (texte), JetBrains Mono (code/terminal).
Import Google Fonts :
html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@5000;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"rel="stylesheet">


### Composants CSS existants (à réutiliser, pas réinventer)
hero, eyebrow-row / eyebrow-tag, intro-box / intro-emoji, stats-box / stats-label / stats-list, toc / toc-label, part / part-eyebrow, callout (variantes warn / tip / action /
compare), terminal / terminal-header / terminal-dots / terminal-label / coperminal-header / ft-label / prompt / ai-reply / redacted, story-section /story-label / story-shot / story-strip / recreation-note, lightbox / lightbox-trigger / lightbox-close / lightbox-caption, step / step-num / step-body / step-tag, rules / rule-icon,
closing / closing-cta-final / btn-big / fine-print, site-header / site-heada, site-footer / footer-name / footer-meta / footer-links, accordion-box /accordion-trigger / accordion-panel / accordion-inner / chev.

### Structure type
- <header class="site-header"> sticky — nom + bouton Calendly
- <section class="hero"> — eyebrow tags, titre + sous-titre en <em>, stats-box avec flèches
- <section class="intro-box"> — accroche émotionnelle
- Corps en <section class="part"> successives
- <section class="closing"> avec CTA Calendly
- <footer class="site-footer">
- <script> lightbox + toggle accordéon

### SEO
Toujours <meta name="robots" content="noindex, nofollow"> — guides = lead magnets non indexés.

---

## 4. État actuel des guides

- guides/ollama-cloud.html — live. Contient hero/stats, accordéon "📖 Voici toute l'histoire" (7 parties), faux-terminal de démo, grille de 8 captures avec lightbox, guide pratique,
CTA Calendly.
- guides/making-of.html — live. Timeline des 8 allers-retours + 3 sections erreur détaillées.

---

## 5. Process de création de contenu (7 livrables, ordre itératif)

**Règle d'or** : l'article LinkedIn est la source. Tous les autres formats en dérivent. Si l'article est corrigé, les formats suivants sont à régénérer.

**Workflow itératif** : chaque étape est validée avant de passer à la suivante. Pas d'automatisation tant que la qualité n'est pas stable.

### Étape 1 — article-linkedin.md
- 300-400 mots, conversationnel, ton honnête et auto-dérisif
- Structure : hook → contexte court → 3-7 sections (métaphores du quotidien) → leçon → CTA engagement
- Listes avec flèches → (jamais puces classiques)
- CTA toujours = engagement en commentaire ("lien en commentaire"), JAMAIS URL dans le corps
- Métaphores du quotidien (GPS, clé de maison, voiture qui bouge pas) > jar

### Étape 2 — guide-html.html
- Récupérer le design via raw.githubusercontent.com/igueule44-a11y/Site-Bryanb/main/guides/ollama-cloud.html
- Prolonge l'article LinkedIn validé : ajoute la partie pratique / pas-à-pa
- Même structure type que les autres guides (voir section 3)
- Présenter via present_files → cp ~/Downloads/... → git push

### Étape 3 — brief-visuel.md
Brief créatif photoréaliste à coller dans ChatGPT → prompt Magnific → image via Nano ou Banana 2.

**Structure du brief** :

markdown
# Brief visuel — [nom]

## Contexte narratif
- Histoire / émotion à transmettre
- Moment précis de l'article
- Métaphore principale à incarner

## Ambiance recherchée
- Ton général
- Émotion dominante
- Ce qu'on doit ressentir en 2 secondes

## Direction artistique
- Palette : bleu nuit profond, accent cyan, lumière écran
- Cadrage préféré
- Références visuelles (vibes d'autres photographes / films)

## Contraintes de réalisme (NON NÉGOCIABLES)
- Photoréaliste uniquement — JAMAIS illustration / flat / 3D
- Photo 35mm : grain, profondeur de champ, vignettage légère
- Peau avec imperfections — INTERDIT peau lisse type "AI beauty"
- Éclairage naturel ou sources réalistes
- Couleurs légèrement désaturées
- Léger grain argentique, micro-aberration chromatique, halation
- Réflexions physiquement correctes
- Anti-stéréotypes IA : pas de symétrie parfaite, pas de poses de mannequin

## Modèle cible Magnific
- Image : Nano | Banana 2 | autre
- Vidéo : Kling 2.5 | autre
- Format : 1:1 / 9:16 / 16:9
- Durée vidéo : 5s / 8s / autre

## Éléments à inclure
- [liste]

## Éléments à éviter
- [liste]

## Motion souhaitée (vidéo)
- Caméra : push-in / pan / statique
- Boucle : oui / non
- Grain 35mm à préserver
- Profondeur de champ maintenue
- Mouvements organiques, pas de morphing fluide


**Workflow** : coller le brief dans ChatGPT avec consigne "génère le prompt Magnific optimal pour [modèle]" → coller le prompt dans Magnific → générer.

### Étape 4 — motion-prompt.md (si vidéo)
Prompt pour transformer l'image en vidéo via Kling 2.5. Briques fixes : grade champ maintenue, micro-mouvements organiques (respiration, particulescyan, glitch léger), pas de morphing fluide entre frames, mouvements de caméra lents.

### Étape 5 — instagram-caption.md
- Caption 100-150 mots avant le bouton "plus"
- 1 visuel fort (image générée ou citation sur fond sombre du design system)
- Hook = 1ère ligne = image mentale forte
- 1 métaphore principale reprise du LinkedIn
- CTA : "lien en bio" ou "DM moi OLLAMA"
- Hashtags : 5-10 max, mélange niche + large (#buildinpublic #IA #nondev)

### Étape 6 — tiktok-script.md
- Script parlé 30-45s
- Hook 0-2s : phrase choc / question provocante / affirmation qui casse
- Corps 2-40s : 1 erreur principale + 1 métaphore + résolution en 3 phrases
- CTA 40-50s : "Lien en bio. Follow pour la suite."
- 1 seule métaphore par short (format force à choisir l'angle le plus visue
- Pattern interrupt : qqch qui casse la routine, plus de second degré que Shorts

### Étape 7 — youtube-short-script.md
- Script parlé 45s, ton posé / pédagogique
- Hook 0-3s (1s de plus que TikTok)
- Corps 3-40s : version plus développée que TikTok, peut contenir 2 métapho
- CTA 40-45s : "Lien en bio / dans la description"

---

## 6. Outils / comptes

- GitHub repo : igueule44-a11y/Site-Bryanb
- Vercel : déploiement auto-lié au repo
- Calendly : https://calendly.com/bryan-blaevoet/nouvelle-reunion
- Stack Bryan : Claude Code, N8n, Claude Cowork, Antigravity, Notion, ManyC
- Génération visuels : Magnific (via prompt ChatGPT) → Nano, Banana 2 (images) + Kling 2.5 (vidéo)

---

## 7. Reprise rapide

Coller ce fichier au début d'une conversation + phrase de contexte :

> "Je veux créer du contenu (article LinkedIn + guide HTML + visuels) sur mon site. Le process et le design system sont décrits dans le handoff. Récupère le design depuis
raw.githubusercontent.com/igueule44-a11y/Site-Bryanb/main/guides/ollama-cloapes, livre-moi le fichier à télécharger — je ferai le cp + git pushmoi-même."

---

**Fin du handoff v2.**
