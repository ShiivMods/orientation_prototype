/**
 * JusteCap - taxonomie UX de compétences.
 * Cette couche compacte sert à rendre le référentiel exploitable dans l'interface.
 * Elle ne prétend pas reproduire les 21 320 savoir-faire ROME un par un.
 * Structure restaurée : 15 catégories, 167 macro-compétences, 668 précisions.
 */

const SKILL_BASES={
  A:"Accueillir du public",R:"Rédiger des documents",N:"Analyser des informations",
  U:"Utiliser des outils numériques",O:"Organiser son travail",P:"Résoudre des problèmes",
  C:"Conseiller une personne",M:"Travailler manuellement",V:"Conduire un véhicule",
  S:"Suivre une procédure",F:"Former / expliquer",D:"Gérer des données",
  G:"Négocier",E:"Réparer / entretenir"
};

const SKILL_CATEGORY_SEEDS=[
  ["relation","Accueil & relation avec le public",[
    "A|Accueillir et orienter une personne","A|Tenir un accueil téléphonique","A|Informer un usager ou un client",
    "A|Gérer une file d'attente ou un flux","C|Analyser une demande individuelle","C|Proposer une solution adaptée",
    "C|Accompagner une personne dans une démarche","A|Gérer une réclamation courante","C|Conduire un entretien individuel",
    "A|Adapter sa communication à différents publics","C|Maintenir une relation de service","A|Désamorcer une situation tendue"
  ]],
  ["communication","Communication & transmission",[
    "R|Rédiger un message professionnel","R|Rédiger un compte rendu","R|Rédiger une procédure ou une consigne",
    "F|Expliquer une notion simplement","F|Présenter une information à l'oral","F|Animer un échange collectif",
    "R|Structurer un document","R|Relire et corriger un contenu","F|Créer un support pédagogique",
    "A|Communiquer sur plusieurs canaux","R|Adapter un contenu à son destinataire","F|Faire une démonstration"
  ]],
  ["administration","Administration & gestion documentaire",[
    "R|Saisir et mettre en forme des documents","D|Classer et archiver des documents","D|Tenir un dossier administratif",
    "S|Contrôler la conformité d'un dossier","R|Préparer un courrier","O|Gérer un agenda","O|Préparer une réunion",
    "D|Numériser et indexer des documents","S|Traiter du courrier entrant et sortant","D|Mettre à jour un fichier de suivi",
    "O|Gérer des échéances administratives"
  ]],
  ["organisation","Organisation & coordination",[
    "O|Prioriser ses tâches","O|Planifier une activité","O|Coordonner plusieurs intervenants",
    "O|Suivre l'avancement d'une activité","O|Préparer son poste de travail","O|Gérer des imprévus",
    "O|Estimer une charge de travail","O|Travailler en mode projet","O|Organiser un déplacement professionnel",
    "O|Gérer plusieurs dossiers en parallèle","O|Passer le relais à un collègue"
  ]],
  ["analyse","Analyse & résolution de problèmes",[
    "N|Lire et synthétiser des informations","N|Interpréter des indicateurs","P|Identifier la cause d'un problème",
    "P|Tester une solution","P|Choisir entre plusieurs solutions","N|Repérer une anomalie","P|Traiter un incident",
    "N|Faire une veille","P|Décomposer un problème complexe","N|Évaluer un risque","P|Améliorer une méthode de travail"
  ]],
  ["numerique","Numérique & données",[
    "U|Utiliser un traitement de texte","U|Utiliser un tableur","U|Utiliser des outils collaboratifs",
    "U|Utiliser un logiciel métier","U|Rechercher efficacement sur internet","U|Gérer des fichiers et dossiers",
    "U|Automatiser une tâche simple","D|Saisir des données avec fiabilité","D|Nettoyer un jeu de données",
    "D|Interroger une base de données","D|Protéger des données sensibles"
  ]],
  ["commerce","Commerce & négociation",[
    "G|Préparer une négociation","G|Présenter une offre commerciale","G|Traiter une objection","G|Conclure une vente",
    "C|Conseiller un client sur un produit","A|Tenir une caisse","D|Mettre à jour un fichier clients",
    "O|Mettre en rayon ou présenter des produits","G|Négocier avec un fournisseur","N|Suivre des résultats commerciaux",
    "C|Fidéliser un client"
  ]],
  ["technique","Technique & maintenance",[
    "E|Diagnostiquer une panne","E|Effectuer une maintenance préventive","E|Remplacer une pièce ou un composant",
    "E|Régler un équipement","E|Lire une documentation technique","M|Utiliser de l'outillage à main",
    "M|Utiliser de l'outillage électroportatif","E|Effectuer un contrôle technique simple",
    "E|Entretenir un équipement informatique","E|Entretenir un véhicule","M|Réaliser un assemblage"
  ]],
  ["production","Production & qualité",[
    "S|Appliquer un mode opératoire","M|Alimenter un poste de production","M|Réaliser une opération de fabrication",
    "S|Contrôler la qualité d'un produit","S|Tracer une production","P|Réagir à un défaut de production",
    "M|Conditionner un produit","O|Préparer une série de production","S|Respecter des règles d'hygiène",
    "N|Lire des indicateurs de production","M|Réaliser une opération de soudage simple"
  ]],
  ["logistique","Logistique & stocks",[
    "O|Préparer une commande","M|Manutentionner des marchandises","D|Enregistrer une entrée ou sortie de stock",
    "O|Ranger un stock","S|Contrôler une réception","O|Réaliser un inventaire","M|Préparer une palette",
    "V|Utiliser un engin de manutention","O|Organiser une expédition","D|Suivre la traçabilité logistique",
    "P|Traiter un écart de livraison"
  ]],
  ["transport","Transport & conduite",[
    "V|Conduire un véhicule léger en sécurité","V|Conduire un véhicule de transport collectif","V|Préparer un itinéraire",
    "V|Effectuer les contrôles avant départ","V|Réaliser une tournée de livraison","S|Appliquer la réglementation du transport",
    "A|Prendre en charge des passagers","O|Gérer les aléas d'une tournée","V|Manœuvrer et stationner",
    "E|Effectuer un entretien courant du véhicule","D|Renseigner des documents de transport"
  ]],
  ["accompagnement","Accompagnement & services aux personnes",[
    "C|Évaluer une situation personnelle","C|Construire un plan d'action avec une personne","C|Orienter vers un service ou dispositif",
    "C|Suivre un parcours d'accompagnement","A|Créer un climat de confiance","O|Organiser une intervention à domicile",
    "M|Aider aux gestes du quotidien","S|Respecter un protocole d'accompagnement","C|Repérer un changement de situation",
    "R|Rédiger une note de suivi","A|Travailler avec des publics vulnérables"
  ]],
  ["formation","Formation & pédagogie",[
    "F|Identifier un besoin de formation","F|Construire une séquence pédagogique","F|Animer une formation",
    "F|Former à l'utilisation d'un outil","F|Évaluer un apprentissage","F|Adapter sa pédagogie",
    "F|Accompagner une prise en main numérique","F|Créer un tutoriel","F|Tutorer un nouveau collègue",
    "F|Donner un feedback constructif","O|Planifier un parcours de formation"
  ]],
  ["creation","Création & conception",[
    "U|Créer un visuel numérique","U|Réaliser une mise en page graphique","N|Interpréter un brief",
    "P|Concevoir une solution à partir d'un besoin","R|Rédiger un contenu éditorial","U|Retoucher une image",
    "U|Monter une vidéo simple","U|Créer une interface web","U|Développer une application web",
    "N|Tester une expérience utilisateur","O|Gérer des versions d'un projet créatif"
  ]],
  ["securite","Sécurité, conformité & procédures",[
    "S|Appliquer une consigne de sécurité","S|Utiliser des équipements de protection","S|Contrôler un accès",
    "S|Effectuer une ronde de sécurité","P|Réagir à une situation d'urgence","S|Respecter la confidentialité",
    "D|Appliquer des règles de protection des données","S|Respecter une norme ou réglementation",
    "N|Contrôler la conformité d'une opération","R|Renseigner un registre ou une main courante",
    "S|Signaler un incident ou une non-conformité"
  ]]
];

const SKILL_DETAIL_OVERRIDES={
  "Utiliser un traitement de texte":["Microsoft Word","LibreOffice Writer","Styles et modèles","Publipostage"],
  "Utiliser un tableur":["Microsoft Excel","LibreOffice Calc","Formules","Tableaux croisés dynamiques"],
  "Utiliser des outils collaboratifs":["Microsoft Teams","Slack","Google Workspace","Partage de documents"],
  "Utiliser un logiciel métier":["ERP","CRM","Logiciel de gestion","Application interne"],
  "Automatiser une tâche simple":["Macro","Règle automatique","Workflow","No-code"],
  "Interroger une base de données":["SQL","SELECT et filtres","Jointures","Requêtes de contrôle"],
  "Protéger des données sensibles":["Droits d'accès","Minimisation","Confidentialité","RGPD"],
  "Tenir une caisse":["Encaissement","Monnaie","Terminal de paiement","Clôture de caisse"],
  "Réaliser une opération de soudage simple":["Soudage","Pointage","Préparation des surfaces","Contrôle du cordon"],
  "Utiliser un engin de manutention":["Chariot élévateur","CACES","Transpalette électrique","Règles de circulation"],
  "Conduire un véhicule léger en sécurité":["Permis B","Code de la route","Manœuvres","Éco-conduite"],
  "Conduire un véhicule de transport collectif":["Permis D","Transport de voyageurs","Arrêts","Sécurité des passagers"],
  "Créer un visuel numérique":["Canva","Adobe Photoshop","GIMP","Formats d'image"],
  "Réaliser une mise en page graphique":["Adobe InDesign","Grille","Typographie","Export PDF"],
  "Créer une interface web":["HTML","CSS","Responsive","Accessibilité numérique"],
  "Développer une application web":["JavaScript","TypeScript","API","Base de données"],
  "Gérer des versions d'un projet créatif":["Git","Historique","Branches","Validation"],
  "Entretenir un équipement informatique":["Changer un composant","Pilotes","Nettoyage matériel","Test de fonctionnement"],
  "Entretenir un véhicule":["Vidange","Freinage","Pneumatiques","Niveaux"],
  "Rechercher efficacement sur internet":["Moteur de recherche","Opérateurs de recherche","Sources fiables","Recherche avancée"],
  "Gérer des fichiers et dossiers":["Explorateur Windows","Arborescence","Formats de fichiers","Compression ZIP"],
  "Rédiger un message professionnel":["E-mail professionnel","Réponse à une demande","Objet clair","Formule adaptée"],
  "Communiquer sur plusieurs canaux":["Téléphone","E-mail","Chat","Visioconférence"],
  "Créer un support pédagogique":["Diaporama","Fiche pratique","Exercice","Guide utilisateur"],
  "Faire une démonstration":["Montrer un geste","Présenter un logiciel","Commenter les étapes","Faire reproduire la procédure"],
  "Préparer une commande":["Bon de préparation","Picking","Contrôle des quantités","Emballage"],
  "Enregistrer une entrée ou sortie de stock":["Scan code-barres","Référence article","Quantité","Emplacement"],
  "Réaliser un inventaire":["Comptage","Écart de stock","Recomptage","Correction"],
  "Préparer un itinéraire":["GPS","Plan de tournée","Temps de trajet","Restrictions"],
  "Renseigner des documents de transport":["Bon de livraison","Feuille de route","Kilométrage","Application conducteur"],
  "Appliquer des règles de protection des données":["RGPD","Droits d'accès","Durée de conservation","Minimisation"],
  "Effectuer une ronde de sécurité":["Points de contrôle","Anomalies","Main courante","Alerte"],
  "Renseigner un registre ou une main courante":["Heure","Faits","Personnes concernées","Action menée"]
};

function buildSkillDetails(label,base){
  if(SKILL_DETAIL_OVERRIDES[label]) return SKILL_DETAIL_OVERRIDES[label];
  return [
    "Préparer : "+label,
    "Réaliser : "+label,
    "Adapter au contexte professionnel",
    "Contrôler le résultat et signaler les écarts"
  ];
}

const skillTaxonomy=[];
SKILL_CATEGORY_SEEDS.forEach(([category,categoryLabel,seeds])=>{
  seeds.forEach((seed,index)=>{
    const [baseCode,label]=seed.split("|");
    const base=SKILL_BASES[baseCode];
    skillTaxonomy.push({
      id:category+"-"+String(index+1).padStart(2,"0"),
      label,base,category,categoryLabel,
      details:buildSkillDetails(label,base)
    });
  });
});

const skillById=new Map(skillTaxonomy.map(s=>[s.id,s]));
const skillTaxonomyByBase=new Map();
skillTaxonomy.forEach(s=>{
  if(!skillTaxonomyByBase.has(s.base)) skillTaxonomyByBase.set(s.base,[]);
  skillTaxonomyByBase.get(s.base).push(s);
});

const skillTaxonomyStats={
  categories:new Set(skillTaxonomy.map(s=>s.category)).size,
  macros:skillTaxonomy.length,
  details:skillTaxonomy.reduce((n,s)=>n+s.details.length,0)
};

if(skillTaxonomyStats.categories!==15 || skillTaxonomyStats.macros!==167 || skillTaxonomyStats.details!==668){
  throw new Error("Taxonomie JusteCap invalide : "+JSON.stringify(skillTaxonomyStats));
}
