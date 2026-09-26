export const defaultSettings = {
  siteName: "Eden Canine",
  logo: "/logo.jpeg",
  whatsapp: "+4915905491841",
  email: "edencanine@gmail.com",
  address: "France",
  phone: "+4915905491841",
  hours: "Lun. - Sam. • 9h - 18h",
  socials: {
    instagram: "",
    facebook: ""
  },
  languages: ["fr", "en", "de"],
  disablePurchaseWhenPending: true
};

export const testimonials = [
  {
    id: "t1",
    name: "Camille",
    city: "",
    puppy: "Luna",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80",
    text: {
      fr: "Accueil chaleureux, chiot en parfaite santé et un suivi exemplaire. Luna s’est intégrée immédiatement. Un élevage de confiance.",
      en: "Warm welcome, a perfectly healthy puppy and outstanding follow-up. Luna settled in immediately. A kennel you can trust.",
      de: "Herzlicher Empfang, kerngesunder Welpe und vorbildliche Betreuung. Luna hat sich sofort eingelebt. Eine vertrauenswürdige Zucht."
    }
  },
  {
    id: "t2",
    name: "Thomas",
    city: "",
    puppy: "Coco",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80",
    text: {
      fr: "Processus simple via WhatsApp, documents complets, et un Caniche magnifique. Merci Eden Canine.",
      en: "Simple WhatsApp process, complete paperwork, and a beautiful Poodle. Thank you Eden Canine.",
      de: "Einfacher Ablauf über WhatsApp, vollständige Unterlagen und ein wunderschöner Pudel. Danke Eden Canine."
    }
  },
  {
    id: "t3",
    name: "Marie",
    city: "",
    puppy: "Atlas",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=800&q=80",
    text: {
      fr: "Élevage professionnel, parents présentés, et un Border Collie au caractère exceptionnel. Nous recommandons les yeux fermés.",
      en: "Professional breeding, parents introduced, and a Border Collie with an exceptional temperament. We recommend without hesitation.",
      de: "Professionelle Zucht, vorgestellte Eltern und ein Border Collie mit außergewöhnlichem Wesen. Wir empfehlen ohne Vorbehalt."
    }
  }
];

export const puppies = [
  {
    id: "luna",
    name: "Luna",
    slug: "luna",
    breed: "border-collie",
    variety: { fr: "Type travail", en: "Working type", de: "Arbeitstyp" },
    sex: "female",
    birthDate: "2026-07-02",
    color: { fr: "Noir & blanc", en: "Black & white", de: "Schwarz-weiß" },
    size: { fr: "Moyenne", en: "Medium", de: "Mittel" },
    weight: "4.2 kg",
    personality: {
      fr: "Vive, attentive et câline. Luna aime apprendre et reste d’une douceur remarquable avec les enfants.",
      en: "Lively, attentive and affectionate. Luna loves to learn and is remarkably gentle with children.",
      de: "Lebhaft, aufmerksam und verschmust. Luna lernt gern und ist bemerkenswert sanft mit Kindern."
    },
    description: {
      fr: "Luna est une Border Collie d’exception, née dans notre élevage lyonnais. Curieuse dès les premières semaines, elle montre déjà une belle complicité avec l’humain et un équilibre rare entre énergie et calme. Élevée au contact de la famille, sociabilisée avec d’autres chiens et habituée aux bruits du quotidien, elle est prête à rejoindre un foyer attentif qui saura canaliser son intelligence. Ses parents sont sélectionnés pour la santé, le caractère et la conformation. Luna partira identifiée, vaccinée selon son âge, et accompagnée d’un livret de conseils personnalisé.",
      en: "Luna is an outstanding Border Collie, born in our Lyon kennel. Curious from the first weeks, she already shows a beautiful bond with people and a rare balance between energy and calm. Raised with the family, socialised with other dogs and used to everyday sounds, she is ready to join an attentive home that will channel her intelligence. Her parents are selected for health, temperament and conformation. Luna will leave identified, vaccinated according to her age, and with a personalised care booklet.",
      de: "Luna ist eine außergewöhnliche Border Collie, geboren in unserer Zucht bei Lyon. Von den ersten Wochen an neugierig, zeigt sie bereits eine schöne Bindung zum Menschen und eine seltene Balance zwischen Energie und Ruhe. In der Familie aufgewachsen, mit anderen Hunden sozialisiert und an Alltagsgeräusche gewöhnt, ist sie bereit für ein aufmerksames Zuhause, das ihre Intelligenz fördert. Ihre Eltern sind nach Gesundheit, Wesen und Körperbau ausgewählt. Luna geht identifiziert, altersgerecht geimpft und mit einem persönlichen Ratgeber."
    },
    health: {
      fr: "Suivi vétérinaire complet. Parents testés (hanches, yeux). Aucun signe de pathologie. Vermifugée selon protocole.",
      en: "Full veterinary follow-up. Parents tested (hips, eyes). No sign of pathology. Dewormed according to protocol.",
      de: "Vollständige tierärztliche Betreuung. Elterntiere getestet (Hüften, Augen). Keine Anzeichen einer Erkrankung. Entwurmt gemäß Protokoll."
    },
    vaccinations: {
      fr: "Primo-vaccination CHPPi effectuée. Rappels à planifier avec votre vétérinaire.",
      en: "Primary CHPPi vaccination completed. Boosters to be scheduled with your vet.",
      de: "Erstimpfung CHPPi erfolgt. Auffrischungen mit Ihrem Tierarzt planen."
    },
    identification: {
      fr: "Puce électronique enregistrée. Certificat d’identification fourni.",
      en: "Registered microchip. Identification certificate provided.",
      de: "Registrierter Mikrochip. Identifikationsbescheinigung wird mitgegeben."
    },
    pedigree: {
      fr: "Inscription LOF en cours. Pedigree des parents disponible.",
      en: "LOF registration in progress. Parents’ pedigrees available.",
      de: "LOF-Eintragung in Vorbereitung. Ahnentafeln der Eltern verfügbar."
    },
    location: { fr: "France", en: "France", de: "Frankreich" },
    price: 1500,
    status: "available",
    photos: [
      "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1400&q=80"
    ],
    parents: {
      mother: {
        name: "Nova",
        info: {
          fr: "Femelle LOF, caractère posé, excellents résultats de santé.",
          en: "LOF female, composed temperament, excellent health results.",
          de: "LOF-Hündin, ruhiges Wesen, ausgezeichnete Gesundheitswerte."
        },
        photo: "https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=900&q=80"
      },
      father: {
        name: "Odin",
        info: {
          fr: "Mâle type travail, très attaché à l’humain, hanches A/A.",
          en: "Working-type male, strongly bonded to people, hips A/A.",
          de: "Rüde vom Arbeitstyp, stark menschenbezogen, Hüften A/A."
        },
        photo: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=900&q=80"
      }
    }
  },
  {
    id: "atlas",
    name: "Atlas",
    slug: "atlas",
    breed: "border-collie",
    variety: { fr: "Type berger", en: "Herding type", de: "Hütetyp" },
    sex: "male",
    birthDate: "2026-06-18",
    color: { fr: "Merle bleu", en: "Blue merle", de: "Blue Merle" },
    size: { fr: "Grande", en: "Large", de: "Groß" },
    weight: "5.1 kg",
    personality: {
      fr: "Intelligent, joueur et déjà très concentré. Atlas aime les défis et la complicité.",
      en: "Intelligent, playful and already very focused. Atlas loves challenges and partnership.",
      de: "Intelligent, verspielt und bereits sehr fokussiert. Atlas liebt Herausforderungen und Partnerschaft."
    },
    description: {
      fr: "Atlas est un jeune mâle merle au regard vif. Il combine la puissance naturelle de la race et une sociabilité soignée. Idéal pour une famille active ou un foyer sportif (agility, randonnée, obéissance). Élevé en France, suivi dès la naissance, il bénéficie d’une socialisation progressive et d’un environnement calme.",
      en: "Atlas is a young merle male with a bright gaze. He combines the breed’s natural drive with careful socialisation. Ideal for an active family or a sporting home (agility, hiking, obedience). Raised in France and followed from birth, he enjoys progressive socialisation in a calm setting.",
      de: "Atlas ist ein junger Merle-Rüde mit wachem Blick. Er verbindet den natürlichen Antrieb der Rasse mit sorgfältiger Sozialisierung. Ideal für eine aktive Familie oder ein sportliches Zuhause (Agility, Wandern, Gehorsam). In Frankreich aufgezogen und von Geburt an betreut."
    },
    health: {
      fr: "Examen vétérinaire favorable. Lignée sélectionnée pour la santé oculaire et articulaire.",
      en: "Favourable veterinary exam. Line selected for eye and joint health.",
      de: "Günstige tierärztliche Untersuchung. Linie auf Augen- und Gelenkgesundheit selektiert."
    },
    vaccinations: {
      fr: "Vaccins à jour pour son âge. Carnet de santé fourni.",
      en: "Vaccines up to date for his age. Health booklet provided.",
      de: "Impfungen altersgerecht. Impfausweis wird mitgegeben."
    },
    identification: {
      fr: "Pucé et enregistré au fichier national.",
      en: "Microchipped and registered in the national file.",
      de: "Gechipt und im nationalen Register erfasst."
    },
    pedigree: {
      fr: "Parents LOF. Documents transmis à la commande.",
      en: "LOF parents. Documents provided at sale.",
      de: "LOF-Eltern. Unterlagen bei Verkauf übergeben."
    },
    location: { fr: "France", en: "France", de: "Frankreich" },
    price: 1800,
    status: "available",
    photos: [
      "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1400&q=80"
    ],
    parents: {
      mother: {
        name: "Selene",
        info: {
          fr: "Lignée merle, regard doux, très bonne mère.",
          en: "Merle line, gentle expression, excellent mother.",
          de: "Merle-Linie, sanfter Blick, ausgezeichnete Mutter."
        },
        photo: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=80"
      },
      father: {
        name: "Orion",
        info: {
          fr: "Mâle tricolore, énergie maîtrisée, excellent partenaire de sport.",
          en: "Tricolour male, controlled energy, excellent sport partner.",
          de: "Dreifarbiger Rüde, kontrollierte Energie, hervorragender Sportpartner."
        },
        photo: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=80"
      }
    }
  },
  {
    id: "nala",
    name: "Nala",
    slug: "nala",
    breed: "border-collie",
    variety: { fr: "Type show", en: "Show type", de: "Showtyp" },
    sex: "female",
    birthDate: "2026-06-28",
    color: { fr: "Tricolore", en: "Tricolour", de: "Dreifarbig" },
    size: { fr: "Moyenne", en: "Medium", de: "Mittel" },
    weight: "3.9 kg",
    personality: {
      fr: "Douce, observatrice et déjà très proche de l’humain.",
      en: "Gentle, observant and already very close to people.",
      de: "Sanft, aufmerksam und bereits sehr menschenbezogen."
    },
    description: {
      fr: "Nala est une femelle tricolore au tempérament équilibré. Une famille est actuellement en discussion pour l’accueillir. Son dossier reste consultable ; l’achat en ligne peut être limité selon le statut.",
      en: "Nala is a tricolour female with a balanced temperament. A family is currently discussing her adoption. Her profile remains visible; online purchase may be limited depending on status.",
      de: "Nala ist eine dreifarbige Hündin mit ausgeglichenem Wesen. Eine Familie ist derzeit im Gespräch. Ihr Profil bleibt sichtbar; der Online-Kauf kann je nach Status eingeschränkt sein."
    },
    health: {
      fr: "Bonne condition générale, suivi néonatal sans particularité.",
      en: "Good general condition, uneventful neonatal follow-up.",
      de: "Guter Allgemeinzustand, unauffällige neonatale Betreuung."
    },
    vaccinations: {
      fr: "Protocole vaccinal commencé.",
      en: "Vaccination protocol started.",
      de: "Impfprotokoll begonnen."
    },
    identification: {
      fr: "Identification électronique prévue avant le départ.",
      en: "Electronic identification before departure.",
      de: "Elektronische Kennzeichnung vor der Abgabe."
    },
    pedigree: {
      fr: "Lignée LOF documentée.",
      en: "Documented LOF line.",
      de: "Dokumentierte LOF-Linie."
    },
    location: { fr: "France", en: "France", de: "Frankreich" },
    price: 1600,
    status: "pending",
    photos: [
      "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1400&q=80"
    ],
    parents: {
      mother: {
        name: "Iris",
        info: {
          fr: "Femelle élégante, robe tricolore, caractère stable.",
          en: "Elegant female, tricolour coat, stable temperament.",
          de: "Elegante Hündin, dreifarbiges Fell, stabiles Wesen."
        },
        photo: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80"
      },
      father: {
        name: "Odin",
        info: {
          fr: "Mâle type travail, très attaché à l’humain.",
          en: "Working-type male, strongly bonded to people.",
          de: "Rüde vom Arbeitstyp, stark menschenbezogen."
        },
        photo: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=900&q=80"
      }
    }
  },
  {
    id: "coco",
    name: "Coco",
    slug: "coco",
    breed: "poodle",
    variety: { fr: "Caniche toy", en: "Toy poodle", de: "Toy-Pudel" },
    sex: "female",
    birthDate: "2026-07-10",
    color: { fr: "Abricot", en: "Apricot", de: "Aprikose" },
    size: { fr: "Toy", en: "Toy", de: "Toy" },
    weight: "1.8 kg",
    personality: {
      fr: "Joyeuse, câline et vive d’esprit. Coco adore les bras et les jeux doux.",
      en: "Cheerful, cuddly and bright. Coco loves laps and gentle play.",
      de: "Fröhlich, verschmust und geistreich. Coco liebt Schoß und sanftes Spiel."
    },
    description: {
      fr: "Coco est une Caniche toy à la robe abricot lumineuse. Petite par la taille, grande par le caractère, elle convient parfaitement à un appartement ou une maison, à condition de lui offrir stimulation mentale et brossage régulier. Née et élevée en France, elle a été habituée à la vie de famille, au toilettage en douceur et aux déplacements en voiture.",
      en: "Coco is a toy Poodle with a luminous apricot coat. Small in size, big in personality, she is perfect for an apartment or a house, provided she receives mental stimulation and regular brushing. Born and raised in France, she is used to family life, gentle grooming and car travel.",
      de: "Coco ist ein Toy-Pudel mit leuchtend aprikosefarbenem Fell. Klein an Größe, groß im Charakter – ideal für Wohnung oder Haus, mit geistiger Beschäftigung und regelmäßigem Bürsten. In Frankreich geboren und aufgewachsen, gewöhnt an Familienleben, sanfte Pflege und Autofahrten."
    },
    health: {
      fr: "Suivi vétérinaire, vermifuge à jour, parents contrôlés.",
      en: "Veterinary follow-up, deworming up to date, parents screened.",
      de: "Tierärztliche Betreuung, Entwurmung aktuell, Elterntiere untersucht."
    },
    vaccinations: {
      fr: "Primo-vaccination réalisée.",
      en: "Primary vaccination completed.",
      de: "Erstimpfung erfolgt."
    },
    identification: {
      fr: "Puce électronique.",
      en: "Microchip.",
      de: "Mikrochip."
    },
    pedigree: {
      fr: "LOF. Toilettage et standard de race respectés.",
      en: "LOF. Grooming and breed standard respected.",
      de: "LOF. Pflege und Rassestandard berücksichtigt."
    },
    location: { fr: "France", en: "France", de: "Frankreich" },
    price: 1400,
    status: "available",
    photos: [
      "https://images.unsplash.com/photo-1616190263567-91e2bce65ce3?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1591768575198-88dac390c98c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1400&q=80"
    ],
    parents: {
      mother: {
        name: "Perle",
        info: {
          fr: "Caniche toy, robe claire, caractère sociable.",
          en: "Toy poodle, light coat, sociable temperament.",
          de: "Toy-Pudel, helles Fell, soziales Wesen."
        },
        photo: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=900&q=80"
      },
      father: {
        name: "Léon",
        info: {
          fr: "Mâle abricot, ossature fine, très bon tempérament.",
          en: "Apricot male, fine bone, excellent temperament.",
          de: "Aprikosefarbener Rüde, feines Gebäude, sehr gutes Wesen."
        },
        photo: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=900&q=80"
      }
    }
  },
  {
    id: "hugo",
    name: "Hugo",
    slug: "hugo",
    breed: "poodle",
    variety: { fr: "Caniche royal", en: "Standard poodle", de: "Großpudel" },
    sex: "male",
    birthDate: "2026-06-05",
    color: { fr: "Noir", en: "Black", de: "Schwarz" },
    size: { fr: "Royal", en: "Standard", de: "Groß" },
    weight: "6.4 kg",
    personality: {
      fr: "Noble, calme et affectueux. Hugo a une présence élégante et un bon équilibre.",
      en: "Noble, calm and affectionate. Hugo has an elegant presence and good balance.",
      de: "Edel, ruhig und anhänglich. Hugo hat eine elegante Ausstrahlung und gute Balance."
    },
    description: {
      fr: "Hugo est un Caniche royal noir, déjà imposant et d’une grande douceur. Race intelligente par excellence, il s’épanouira avec une éducation positive et des activités variées. Son poil dense demande un entretien régulier que nous expliquons volontiers lors de la remise.",
      en: "Hugo is a black standard Poodle, already imposing and exceptionally gentle. A highly intelligent breed, he will thrive with positive training and varied activities. His dense coat needs regular care, which we are happy to explain at handover.",
      de: "Hugo ist ein schwarzer Großpudel, bereits stattlich und außergewöhnlich sanft. Als sehr intelligente Rasse blüht er mit positivem Training und abwechslungsreichen Aktivitäten auf. Sein dichtes Fell braucht regelmäßige Pflege, die wir gerne bei der Übergabe erklären."
    },
    health: {
      fr: "Bilan vétérinaire favorable. Lignée suivie pour dysplasie et yeux.",
      en: "Favourable veterinary report. Line followed for dysplasia and eyes.",
      de: "Günstiger tierärztlicher Bericht. Linie auf Dysplasie und Augen betreut."
    },
    vaccinations: {
      fr: "Vaccins à jour. Carnet fourni.",
      en: "Vaccines up to date. Booklet provided.",
      de: "Impfungen aktuell. Ausweis wird mitgegeben."
    },
    identification: {
      fr: "Pucé.",
      en: "Microchipped.",
      de: "Gechipt."
    },
    pedigree: {
      fr: "LOF, parents confirmés.",
      en: "LOF, confirmed parents.",
      de: "LOF, bestätigte Eltern."
    },
    location: { fr: "France", en: "France", de: "Frankreich" },
    price: 1700,
    status: "available",
    photos: [
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1400&q=80"
    ],
    parents: {
      mother: {
        name: "Diane",
        info: {
          fr: "Caniche royal, ossature solide, caractère posé.",
          en: "Standard poodle, solid bone, composed temperament.",
          de: "Großpudel, solides Gebäude, ruhiges Wesen."
        },
        photo: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=900&q=80"
      },
      father: {
        name: "Victor",
        info: {
          fr: "Mâle noir, très sociable, excellent compagnon familial.",
          en: "Black male, very sociable, excellent family companion.",
          de: "Schwarzer Rüde, sehr sozial, ausgezeichneter Familienbegleiter."
        },
        photo: "https://images.unsplash.com/photo-1541364983175-b7c09da9d0d3?auto=format&fit=crop&w=900&q=80"
      }
    }
  },
  {
    id: "mia",
    name: "Mia",
    slug: "mia",
    breed: "poodle",
    variety: { fr: "Caniche moyen", en: "Miniature poodle", de: "Kleinpudel" },
    sex: "female",
    birthDate: "2026-07-08",
    color: { fr: "Crème", en: "Cream", de: "Creme" },
    size: { fr: "Moyen", en: "Miniature", de: "Klein" },
    weight: "2.6 kg",
    personality: {
      fr: "Tendre, curieuse et déjà très propre. Mia s’adapte facilement.",
      en: "Tender, curious and already quite clean. Mia adapts easily.",
      de: "Zärtlich, neugierig und bereits recht stubenrein. Mia passt sich leicht an."
    },
    description: {
      fr: "Mia est une Caniche moyenne crème, au regard malicieux. Format idéal pour de nombreuses familles : assez petite pour l’intérieur, assez sportive pour les sorties. Elle aime le contact et apprend très vite.",
      en: "Mia is a cream miniature Poodle with a mischievous gaze. An ideal size for many families: small enough indoors, sporty enough for outings. She loves contact and learns very quickly.",
      de: "Mia ist ein cremefarbener Kleinpudel mit schelmischem Blick. Ideale Größe für viele Familien: klein genug für drinnen, sportlich genug für Ausflüge. Sie liebt Kontakt und lernt sehr schnell."
    },
    health: {
      fr: "Bonne vitalité, suivi sans alerte.",
      en: "Good vitality, follow-up without concern.",
      de: "Gute Vitalität, Betreuung ohne Auffälligkeiten."
    },
    vaccinations: {
      fr: "Primo-vaccination effectuée.",
      en: "Primary vaccination completed.",
      de: "Erstimpfung erfolgt."
    },
    identification: {
      fr: "Puce enregistrée.",
      en: "Registered chip.",
      de: "Registrierter Chip."
    },
    pedigree: {
      fr: "Inscription LOF.",
      en: "LOF registration.",
      de: "LOF-Eintragung."
    },
    location: { fr: "France", en: "France", de: "Frankreich" },
    price: 1550,
    status: "available",
    photos: [
      "https://images.unsplash.com/photo-1591768575198-88dac390c98c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1616190263567-91e2bce65ce3?auto=format&fit=crop&w=1400&q=80"
    ],
    parents: {
      mother: {
        name: "Perle",
        info: {
          fr: "Femelle claire, très maternelle.",
          en: "Light female, very maternal.",
          de: "Helle Hündin, sehr mütterlich."
        },
        photo: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=900&q=80"
      },
      father: {
        name: "Léon",
        info: {
          fr: "Mâle abricot, tempérament joyeux.",
          en: "Apricot male, joyful temperament.",
          de: "Aprikosefarbener Rüde, fröhliches Wesen."
        },
        photo: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=900&q=80"
      }
    }
  },
  {
    id: "rex",
    name: "Rex",
    slug: "rex",
    breed: "border-collie",
    variety: { fr: "Type travail", en: "Working type", de: "Arbeitstyp" },
    sex: "male",
    birthDate: "2026-05-12",
    color: { fr: "Noir & blanc", en: "Black & white", de: "Schwarz-weiß" },
    size: { fr: "Moyenne", en: "Medium", de: "Mittel" },
    weight: "8.2 kg",
    personality: {
      fr: "Sportif et loyal. Rex a déjà rejoint sa famille.",
      en: "Sporty and loyal. Rex has already joined his family.",
      de: "Sportlich und loyal. Rex ist bereits bei seiner Familie."
    },
    description: {
      fr: "Rex a trouvé son foyer. Son profil reste visible afin de présenter le travail de l’élevage. Merci de découvrir nos autres chiots disponibles.",
      en: "Rex has found his home. His profile remains visible to present our breeding work. Please discover our other available puppies.",
      de: "Rex hat sein Zuhause gefunden. Sein Profil bleibt sichtbar, um unsere Zuchtarbeit zu zeigen. Entdecken Sie gern unsere anderen verfügbaren Welpen."
    },
    health: {
      fr: "Chiot parti en excellente santé.",
      en: "Puppy left in excellent health.",
      de: "Welpe in ausgezeichneter Gesundheit abgegeben."
    },
    vaccinations: {
      fr: "Protocole complet pour son âge au départ.",
      en: "Full protocol for his age at departure.",
      de: "Vollständiges Protokoll für sein Alter bei Abgabe."
    },
    identification: {
      fr: "Identifié.",
      en: "Identified.",
      de: "Gekennzeichnet."
    },
    pedigree: {
      fr: "LOF.",
      en: "LOF.",
      de: "LOF."
    },
    location: { fr: "France", en: "France", de: "Frankreich" },
    price: 2000,
    status: "sold",
    photos: [
      "https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1400&q=80"
    ],
    parents: {
      mother: {
        name: "Nova",
        info: {
          fr: "Femelle LOF, caractère posé.",
          en: "LOF female, composed temperament.",
          de: "LOF-Hündin, ruhiges Wesen."
        },
        photo: "https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=900&q=80"
      },
      father: {
        name: "Odin",
        info: {
          fr: "Mâle type travail.",
          en: "Working-type male.",
          de: "Rüde vom Arbeitstyp."
        },
        photo: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=900&q=80"
      }
    }
  },
  {
    id: "etoile",
    name: "Étoile",
    slug: "etoile",
    breed: "poodle",
    variety: { fr: "Caniche toy", en: "Toy poodle", de: "Toy-Pudel" },
    sex: "female",
    birthDate: "2026-07-14",
    color: { fr: "Blanc", en: "White", de: "Weiß" },
    size: { fr: "Toy", en: "Toy", de: "Toy" },
    weight: "1.6 kg",
    personality: {
      fr: "Fine, vive et très câline. Étoile aime être au centre de l’attention.",
      en: "Fine, lively and very cuddly. Étoile loves to be the centre of attention.",
      de: "Fein, lebhaft und sehr verschmust. Étoile ist gern Mittelpunkt."
    },
    description: {
      fr: "Étoile est une Caniche toy blanche, au poil soyeux et au regard lumineux. Elle apportera beaucoup de présence dans un foyer calme et attentif. Nous accompagnons chaque famille sur l’entretien du poil et les premières semaines.",
      en: "Étoile is a white toy Poodle with a silky coat and a bright gaze. She will bring a lot of presence to a calm, attentive home. We support every family with coat care and the first weeks.",
      de: "Étoile ist ein weißer Toy-Pudel mit seidigem Fell und hellem Blick. Sie bringt viel Präsenz in ein ruhiges, aufmerksames Zuhause. Wir begleiten jede Familie bei der Fellpflege und in den ersten Wochen."
    },
    health: {
      fr: "Excellent état général.",
      en: "Excellent general condition.",
      de: "Ausgezeichneter Allgemeinzustand."
    },
    vaccinations: {
      fr: "Protocole commencé.",
      en: "Protocol started.",
      de: "Protokoll begonnen."
    },
    identification: {
      fr: "Identification avant départ.",
      en: "Identification before departure.",
      de: "Kennzeichnung vor Abgabe."
    },
    pedigree: {
      fr: "LOF.",
      en: "LOF.",
      de: "LOF."
    },
    location: { fr: "France", en: "France", de: "Frankreich" },
    price: 1350,
    status: "available",
    photos: [
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1400&q=80"
    ],
    parents: {
      mother: {
        name: "Perle",
        info: {
          fr: "Caniche toy, robe claire.",
          en: "Toy poodle, light coat.",
          de: "Toy-Pudel, helles Fell."
        },
        photo: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=900&q=80"
      },
      father: {
        name: "Léon",
        info: {
          fr: "Mâle abricot, très bon tempérament.",
          en: "Apricot male, excellent temperament.",
          de: "Aprikosefarbener Rüde, sehr gutes Wesen."
        },
        photo: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=900&q=80"
      }
    }
  }
];

export const kennelPhotos = [
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1616190263567-91e2bce65ce3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1591768575198-88dac390c98c?auto=format&fit=crop&w=1200&q=80"
];
