// CATALOGUE — Données Francom Shop


const WHATSAPP_NUMBER = "22995345437";

const pagnes = [
  {
    id: 1,
    nom: "Pagne Mariage",
    event: "Mariage",
    categorie: "ceremonie",
    couleur: "#6B1535",
    prix: 7000,
    description: "Le pagne qui scelle l'union devant tous. Motifs riches, couleurs profondes, fait pour les photos qu'on regarde encore 20 ans après.",
    image: "assets/images/pagnes/mariage.webp",
    lookbook_femme: "assets/images/lookbook/mariage-femme.webp",
    lookbook_homme: "assets/images/lookbook/mariage-homme.webp",
  },
  {
    id: 2,
    nom: "Pagne Anniversaire",
    event: "Anniversaire",
    categorie: "famille",
    couleur: "#C9922A",
    prix: 7000,
    description: "Chaque anniversaire mérite son pagne. Couleurs vives, motif personnalisable selon le thème de la fête.",
    image: "assets/images/pagnes/anniversaire.webp",
    lookbook_femme: "assets/images/lookbook/anniversaire-femme.webp",
    lookbook_homme: "assets/images/lookbook/anniversaire-homme.webp",
  },
  {
    id: 3,
    nom: "Pagne Saint-Valentin",
    event: "Saint-Valentin",
    categorie: "saison",
    couleur: "#6B1535",
    prix: 7000,
    description: "Pour les couples qui veulent célébrer leur amour avec élégance. Motifs romantiques aux tons chauds, à porter à deux.",
    image: "assets/images/pagnes/saint-valentin.webp",
    lookbook_femme: "assets/images/lookbook/saint-valentin-femme.webp",
    lookbook_homme: "assets/images/lookbook/saint-valentin-homme.webp",
  },
  {
    id: 4,
    nom: "Pagne Nonvitcha",
    event: "Nonvitcha",
    categorie: "ceremonie",
    couleur: "#6B1535",
    prix: 7000,
    description: "Pour la cérémonie Nonvitcha, chargée de tradition et de symbolique vodoun.",
    image: "assets/images/pagnes/nonvitcha.webp",
    lookbook_femme: "assets/images/lookbook/nonvitcha-femme.webp",
    lookbook_homme: "assets/images/lookbook/nonvitcha-homme.webp",
  },
  {
    id: 5,
    nom: "Pagne 1er Mai",
    event: "Fête du Travail",
    categorie: "saison",
    couleur: "#3D1A3A",
    prix: 7000,
    description: "Pour défiler avec fierté le 1er mai. Un pagne qui honore le travailleur béninois.",
    image: "assets/images/pagnes/1er-mai.webp",
    lookbook_femme: "assets/images/lookbook/1er-mai-femme.webp",
    lookbook_homme: "assets/images/lookbook/1er-mai-homme.webp",
  },
  {
    id: 6,
    nom: "Pagne 8 Mars",
    event: "Journée de la Femme",
    categorie: "saison",
    couleur: "#C9922A",
    prix: 7000,
    description: "Célébrez la femme africaine avec ce pagne aux couleurs vibrantes.",
    image: "assets/images/pagnes/8mars.webp",
    lookbook_femme: "assets/images/lookbook/8mars-femme.webp",
    lookbook_homme: "assets/images/lookbook/8mars-homme.webp",
  },
  {
    id: 7,
    nom: "Pagne Noël",
    event: "Noël / Nouvel An",
    categorie: "saison",
    couleur: "#6B1535",
    prix: 7000,
    description: "Le pagne festif de fin d'année, pour célébrer en famille avec éclat.",
    image: "assets/images/pagnes/noel.webp",
    lookbook_femme: "assets/images/lookbook/noel-femme.webp",
    lookbook_homme: "assets/images/lookbook/noel-homme.webp",
  },
  {
    id: 8,
    nom: "Pagne Fête des Mères",
    event: "Fête des Mères",
    categorie: "famille",
    couleur: "#3D1A3A",
    prix: 7000,
    description: "Pour honorer celle qui a tout donné. Élégance et douceur dans un même motif.",
    image: "assets/images/pagnes/fete-meres.webp",
    lookbook_femme: "assets/images/lookbook/meres-femme.webp",
    lookbook_homme: "assets/images/lookbook/meres-homme.webp",
  },
];

const categories = [
  { id: "tous", label: "Tous" },
  { id: "ceremonie", label: "Cérémonies" },
  { id: "famille", label: "Famille" },
  { id: "saison", label: "Saisons" },
];

// ============================================
// TÉMOIGNAGES — Preuve par capture WhatsApp
// 6 captures, légende contextuelle (lieu/événement, pas de nom client)
// ============================================

const whatsappCaptures = [
  { image: "assets/images/whatsapp/capture-1.webp", caption: "Mariage" },
  { image: "assets/images/whatsapp/capture-2.webp", caption: "8 Mars" },
  { image: "assets/images/whatsapp/capture-3.webp", caption: "Anniversaire" },
  { image: "assets/images/whatsapp/capture-4.webp", caption: "Nonvitcha" },
  { image: "assets/images/whatsapp/capture-5.webp", caption: "Commande en gros" },
  { image: "assets/images/whatsapp/capture-6.webp", caption: "Saint-Valentin" },
];

export { pagnes, categories, whatsappCaptures, WHATSAPP_NUMBER };
