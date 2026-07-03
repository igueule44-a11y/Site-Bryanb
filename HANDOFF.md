# Handoff — Site OMNYX (Bryan Blaevoet) — 2026-07-03 11:45

## État actuel
Site déployé sur `omnyx.agency` (+ `www`) via Vercel, DNS chez OVH et SSL fonctionnels des deux côtés. Logo OMNYX corrigé (le "O" était illisible, confondu avec un carré par les amis de Bryan) sur tous les fichiers assets et déployé en prod. Carousel LinkedIn (PDF 8 pages format document), guide PDF récap, page guide HTML (`guides/6-cas-usage-google-ia.html`) et story Instagram créés pour le post "6 cas d'usage Google IA". Une vidéo trailer d'intro à l'agence est en discussion : un prompt cinématique complet a été fourni à Bryan, pas encore générée.

Contrairement à d'anciennes notes de handoff, cet environnement a un accès direct au terminal et au système de fichiers du Mac de Bryan (`/Users/brabra/Site-Bryanb`) — pas besoin de passer par `~/Downloads` + cp manuel pour les fichiers du repo.

## Décisions prises cette session
- Logo : remplacer l'icône carrée illisible par le "O" que Bryan a fourni en image, intégré dans `assets/logo-omnyx-nav.png`, `logo-omnyx-original-nav.png` (identique) et `logo-omnyx-bleu.png` (recoloré cyan par gradient positionnel). Ne jamais réinventer un design custom sans son image de référence approuvée.
- Jamais de tiret cadratin (—) dans aucun texte pour Bryan (mémoire `feedback_no_em_dash.md`).
- Livraison PDF/visuels : toujours un seul fichier dans `~/Downloads`, jamais de doublons/anciennes versions qui traînent (mémoire `feedback_pdf_generation_mac.md` mise à jour : police fpdf2 jamais nommée comme un core font ; vérifier avec 2 lecteurs PDF différents avant de dire "c'est prêt").
- Domaine `omnyx.agency` (OVH) : A record → IP Vercel actuelle `216.198.79.1`, CNAME `www` → `cname.vercel-dns.com`, et `www.omnyx.agency` ajouté explicitement comme domaine Vercel (`vercel domains add www.omnyx.agency`) pour que le certificat SSL soit émis correctement.
- `omnyx-agency.app` supprimé du compte Vercel (jamais acheté par Bryan, ajouté par erreur lors d'une session précédente).
- Google Drive de Bryan monté en local (`~/Library/CloudStorage/GoogleDrive-blaevoet.b@gmail.com/Mon Drive/`) — dossier dédié créé à la racine : `OMNYX - Site & Contenus`.

## Prochaine étape
Si Bryan revient sur la vidéo trailer : le prompt cinématique (dark navy + néon cyan, logo qui s'assemble, tagline "Votre marque avance. Même quand vous dormez.") est dans la conversation précédente, pas sauvegardé ailleurs. Lui redemander s'il veut que je la génère directement avec un outil vidéo de la session, ou s'il l'a déjà généré de son côté.

## À ne pas refaire / pièges évités
- Ne jamais transférer de fichiers volumineux (images/PDF) vers Google Drive via l'API MCP en base64 dans le contexte de conversation — ça sature tout (un PDF de 74 Ko en base64 représente déjà ~25k tokens). Utiliser le Drive synchronisé localement et de simples `cp`.
- L'upload de fichier via Claude in Chrome (`file_upload`) refuse tout fichier non explicitement partagé par l'utilisateur dans la conversation — copier vers le scratchpad ne débloque pas cette restriction.
- Avant de dire "c'est prêt" sur un rendu visuel (PDF, logo, image), vérifier avec au moins un moteur de rendu différent du sien (Quick Look, Chrome réel) — un rendu correct dans un outil ne garantit rien ailleurs.
