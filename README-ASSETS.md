# Assets à fournir — noms exacts attendus par le code

Format : toutes les photos sont en **.webp**. Logo et fragments en **.png** (transparence).
Pas de favicon pour le moment.

## assets/icons/ (logo uniquement)
logo-francom.png — fond bordeaux (placeholder actuel), hauteur conseillée ≥ 200px

## assets/images/hero/
tissu-diagonale.webp — photo de pagne plein cadre, devient la diagonale qui traverse le hero
og-image.webp — 1200×630, partage Facebook/LinkedIn

## assets/images/pagnes/ (catalogue — 8 fichiers)
mariage.webp · anniversaire.webp · saint-valentin.webp · nonvitcha.webp
1er-mai.webp · 8mars.webp · noel.webp · fete-meres.webp

## assets/images/lookbook/ (lifestyle H/F — tous les pagnes ont les 2 genres)
mariage-femme.webp · mariage-homme.webp
anniversaire-femme.webp · anniversaire-homme.webp
saint-valentin-femme.webp · saint-valentin-homme.webp
nonvitcha-femme.webp · nonvitcha-homme.webp
1er-mai-femme.webp · 1er-mai-homme.webp
8mars-femme.webp · 8mars-homme.webp
meres-femme.webp · meres-homme.webp

## assets/images/fragments/ (recadrages serrés de motifs — PNG transparent)
fragment-1.png (hero + vague aubergine — réutilisé)
fragment-2.png (vague creme-fonce)
fragment-3.png (vague post-hero)
fragment-4.png (bandeau gros)

## assets/images/whatsapp/ (captures d'écran — preuve sociale, 6 fichiers)
capture-1.webp à capture-6.webp
Captures réelles de conversations WhatsApp clients, format vertical natif
du téléphone (object-fit:contain — rien n'est recadré). Penser à flouter
les numéros si tu veux préserver la confidentialité des clients.

---
Tant que ces fichiers sont absents, chaque image affiche une couleur de
fond de secours — le site reste fonctionnel et démontrable sans planter.

## Convertir en WebP
cwebp -q 82 photo.jpg -o photo.webp
