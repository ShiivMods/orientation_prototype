/**
 * JusteCap - large secondary demo job catalog.
 * Restores the broad exploration behavior of the previous prototype.
 *
 * IMPORTANT:
 * - the 21 jobs from catalog.js are enriched demo records;
 * - the jobs below are secondary exploration records;
 * - titles and matching heuristics are demo content, not official ROME records.
 */

const EXTRA_JOB_TEMPLATES={
  office:{education:2,training:3,demand:6,salary:1900,skills:["Rédiger des documents","Gérer des données","Utiliser des outils numériques","Organiser son travail"],soft:["Organisation","Rigueur","Autonomie"],macros:["administration-01","administration-02","administration-03","administration-06","administration-10","numerique-01","numerique-02"],prefs:{public:0,team:0,outdoor:-1,physical:-1,routine:1,travel:-1,remote:1,fixed:1,weekend:-1,night:-1}},
  commerce:{education:1,training:2,demand:7,salary:1850,skills:["Accueillir du public","Conseiller une personne","Négocier","Organiser son travail"],soft:["Écoute","Adaptabilité","Prise d'initiative"],macros:["commerce-02","commerce-03","commerce-04","commerce-05","commerce-06","commerce-11","relation-03"],prefs:{public:1,team:0,outdoor:0,physical:0,routine:0,travel:0,remote:-1,fixed:0,weekend:1,night:-1}},
  relation:{education:2,training:3,demand:7,salary:1950,skills:["Accueillir du public","Conseiller une personne","Utiliser des outils numériques","Suivre une procédure"],soft:["Écoute","Diplomatie","Patience"],macros:["relation-02","relation-03","relation-05","relation-06","relation-08","relation-10","communication-10","numerique-04"],prefs:{public:1,team:0,outdoor:-1,physical:-1,routine:0,travel:-1,remote:1,fixed:1,weekend:0,night:-1}},
  it:{education:2,training:6,demand:8,salary:2400,skills:["Utiliser des outils numériques","Analyser des informations","Résoudre des problèmes","Organiser son travail"],soft:["Curiosité","Rigueur","Autonomie"],macros:["creation-08","creation-09","numerique-06","numerique-07","numerique-10","analyse-03","analyse-04","analyse-09","organisation-08"],prefs:{public:-1,team:0,outdoor:-1,physical:-1,routine:-1,travel:-1,remote:1,fixed:1,weekend:-1,night:-1}},
  data:{education:3,training:9,demand:8,salary:2600,skills:["Utiliser des outils numériques","Analyser des informations","Gérer des données","Résoudre des problèmes"],soft:["Rigueur","Curiosité","Autonomie"],macros:["numerique-08","numerique-09","numerique-10","numerique-11","analyse-01","analyse-02","analyse-06","analyse-09"],prefs:{public:-1,team:0,outdoor:-1,physical:-1,routine:0,travel:-1,remote:1,fixed:1,weekend:-1,night:-1}},
  finance:{education:2,training:6,demand:7,salary:2200,skills:["Gérer des données","Analyser des informations","Utiliser des outils numériques","Suivre une procédure"],soft:["Rigueur","Organisation","Autonomie"],macros:["numerique-02","numerique-08","numerique-10","administration-04","administration-10","analyse-02","analyse-06","organisation-10"],prefs:{public:-1,team:0,outdoor:-1,physical:-1,routine:1,travel:-1,remote:1,fixed:1,weekend:-1,night:-1}},
  hr:{education:2,training:6,demand:7,salary:2150,skills:["Accueillir du public","Conseiller une personne","Rédiger des documents","Gérer des données"],soft:["Écoute","Diplomatie","Organisation"],macros:["relation-09","administration-03","administration-04","administration-10","communication-01","communication-02","numerique-08","numerique-11"],prefs:{public:1,team:1,outdoor:-1,physical:-1,routine:0,travel:-1,remote:1,fixed:1,weekend:-1,night:-1}},
  logistics:{education:1,training:3,demand:8,salary:1950,skills:["Organiser son travail","Travailler manuellement","Gérer des données","Suivre une procédure"],soft:["Rigueur","Organisation","Esprit d'équipe"],macros:["logistique-01","logistique-02","logistique-03","logistique-04","logistique-05","logistique-06","logistique-09","logistique-10"],prefs:{public:-1,team:1,outdoor:0,physical:1,routine:1,travel:0,remote:-1,fixed:0,weekend:0,night:0}},
  transport:{education:1,training:3,demand:8,salary:2100,skills:["Conduire un véhicule","Organiser son travail","Suivre une procédure"],soft:["Rigueur","Autonomie","Résistance au stress"],macros:["transport-01","transport-03","transport-04","transport-05","transport-08","transport-09","transport-11"],prefs:{public:0,team:-1,outdoor:0,physical:0,routine:0,travel:1,remote:-1,fixed:-1,weekend:1,night:0}},
  production:{education:1,training:3,demand:8,salary:2000,skills:["Travailler manuellement","Suivre une procédure","Organiser son travail"],soft:["Rigueur","Esprit d'équipe","Adaptabilité"],macros:["production-01","production-02","production-03","production-04","production-05","production-07","production-08","production-09"],prefs:{public:-1,team:1,outdoor:-1,physical:1,routine:1,travel:-1,remote:-1,fixed:0,weekend:0,night:0}},
  maintenance:{education:1,training:6,demand:8,salary:2200,skills:["Réparer / entretenir","Résoudre des problèmes","Travailler manuellement","Suivre une procédure"],soft:["Rigueur","Curiosité","Autonomie"],macros:["technique-01","technique-02","technique-03","technique-04","technique-05","technique-06","technique-08","analyse-03"],prefs:{public:-1,team:0,outdoor:0,physical:1,routine:-1,travel:0,remote:-1,fixed:1,weekend:0,night:0}},
  construction:{education:2,training:9,demand:8,salary:2400,skills:["Analyser des informations","Organiser son travail","Suivre une procédure","Utiliser des outils numériques"],soft:["Rigueur","Organisation","Prise d'initiative"],macros:["organisation-02","organisation-03","organisation-04","organisation-06","analyse-01","analyse-10","securite-01","securite-08","numerique-04"],prefs:{public:0,team:1,outdoor:1,physical:0,routine:-1,travel:1,remote:-1,fixed:1,weekend:-1,night:-1}},
  building:{education:1,training:6,demand:9,salary:2100,skills:["Travailler manuellement","Réparer / entretenir","Suivre une procédure","Organiser son travail"],soft:["Rigueur","Autonomie","Adaptabilité"],macros:["technique-03","technique-04","technique-05","technique-06","technique-07","technique-11","securite-01","organisation-05"],prefs:{public:-1,team:1,outdoor:1,physical:1,routine:0,travel:1,remote:-1,fixed:1,weekend:0,night:-1}},
  auto:{education:1,training:6,demand:8,salary:2050,skills:["Réparer / entretenir","Résoudre des problèmes","Travailler manuellement"],soft:["Rigueur","Curiosité","Autonomie"],macros:["technique-01","technique-03","technique-04","technique-05","technique-06","technique-07","technique-08","technique-10","analyse-03"],prefs:{public:-1,team:1,outdoor:0,physical:1,routine:0,travel:-1,remote:-1,fixed:1,weekend:0,night:-1}},
  hospitality:{education:0,training:3,demand:9,salary:1850,skills:["Accueillir du public","Organiser son travail","Suivre une procédure"],soft:["Adaptabilité","Esprit d'équipe","Résistance au stress"],macros:["relation-03","relation-10","organisation-05","organisation-06","production-09","securite-01"],prefs:{public:1,team:1,outdoor:-1,physical:1,routine:0,travel:-1,remote:-1,fixed:-1,weekend:1,night:1}},
  food:{education:1,training:6,demand:8,salary:1900,skills:["Travailler manuellement","Suivre une procédure","Accueillir du public"],soft:["Rigueur","Organisation","Créativité"],macros:["production-01","production-04","production-09","technique-06","organisation-05","relation-03"],prefs:{public:0,team:1,outdoor:-1,physical:1,routine:0,travel:-1,remote:-1,fixed:0,weekend:1,night:0}},
  health:{education:2,training:12,demand:9,salary:2200,skills:["Conseiller une personne","Suivre une procédure","Organiser son travail","Accueillir du public"],soft:["Écoute","Rigueur","Patience"],macros:["accompagnement-05","accompagnement-08","accompagnement-09","relation-10","securite-01","securite-08","organisation-02"],prefs:{public:1,team:1,outdoor:-1,physical:1,routine:0,travel:0,remote:-1,fixed:-1,weekend:1,night:1}},
  social:{education:2,training:9,demand:8,salary:2050,skills:["Conseiller une personne","Accueillir du public","Rédiger des documents","Organiser son travail"],soft:["Écoute","Diplomatie","Patience"],macros:["accompagnement-01","accompagnement-02","accompagnement-03","accompagnement-04","accompagnement-05","accompagnement-09","accompagnement-10","accompagnement-11"],prefs:{public:1,team:1,outdoor:0,physical:0,routine:-1,travel:0,remote:-1,fixed:0,weekend:0,night:-1}},
  education:{education:2,training:9,demand:7,salary:2050,skills:["Former / expliquer","Accueillir du public","Organiser son travail","Rédiger des documents"],soft:["Patience","Créativité","Écoute"],macros:["formation-01","formation-02","formation-03","formation-05","formation-06","communication-04","communication-09","organisation-02"],prefs:{public:1,team:1,outdoor:0,physical:0,routine:-1,travel:-1,remote:0,fixed:1,weekend:-1,night:-1}},
  environment:{education:1,training:4,demand:7,salary:1850,skills:["Travailler manuellement","Suivre une procédure","Organiser son travail"],soft:["Autonomie","Rigueur","Adaptabilité"],macros:["organisation-05","production-01","securite-01","technique-06","technique-07","analyse-06"],prefs:{public:-1,team:0,outdoor:1,physical:1,routine:0,travel:0,remote:-1,fixed:1,weekend:0,night:-1}},
  security:{education:1,training:3,demand:8,salary:1950,skills:["Suivre une procédure","Accueillir du public","Analyser des informations"],soft:["Rigueur","Résistance au stress","Autonomie"],macros:["securite-01","securite-03","securite-04","securite-05","securite-08","securite-10","securite-11","relation-12"],prefs:{public:0,team:0,outdoor:0,physical:1,routine:1,travel:0,remote:-1,fixed:-1,weekend:1,night:1}},
  creative:{education:2,training:9,demand:6,salary:2050,skills:["Utiliser des outils numériques","Analyser des informations","Organiser son travail","Rédiger des documents"],soft:["Créativité","Curiosité","Autonomie"],macros:["creation-01","creation-02","creation-03","creation-05","creation-06","creation-07","creation-10","creation-11"],prefs:{public:-1,team:0,outdoor:-1,physical:-1,routine:-1,travel:-1,remote:1,fixed:1,weekend:-1,night:-1}},
  marketing:{education:2,training:6,demand:7,salary:2300,skills:["Analyser des informations","Rédiger des documents","Utiliser des outils numériques","Organiser son travail"],soft:["Créativité","Curiosité","Prise d'initiative"],macros:["analyse-02","analyse-08","communication-01","creation-05","creation-01","organisation-08","numerique-02","numerique-03"],prefs:{public:0,team:1,outdoor:-1,physical:-1,routine:-1,travel:0,remote:1,fixed:1,weekend:-1,night:-1}},
  agriculture:{education:1,training:5,demand:8,salary:1900,skills:["Travailler manuellement","Conduire un véhicule","Suivre une procédure","Organiser son travail"],soft:["Autonomie","Rigueur","Adaptabilité"],macros:["organisation-02","organisation-05","transport-01","technique-02","technique-06","securite-01","production-01"],prefs:{public:-1,team:0,outdoor:1,physical:1,routine:0,travel:0,remote:-1,fixed:-1,weekend:1,night:0}},
  animals:{education:1,training:6,demand:6,salary:1850,skills:["Travailler manuellement","Suivre une procédure","Organiser son travail"],soft:["Patience","Autonomie","Rigueur"],macros:["accompagnement-08","organisation-05","securite-01","technique-06","analyse-06"],prefs:{public:-1,team:0,outdoor:1,physical:1,routine:0,travel:0,remote:-1,fixed:0,weekend:1,night:0}},
  culture:{education:2,training:6,demand:6,salary:1950,skills:["Accueillir du public","Former / expliquer","Organiser son travail","Utiliser des outils numériques"],soft:["Créativité","Écoute","Adaptabilité"],macros:["relation-03","relation-10","communication-05","communication-06","formation-03","organisation-02","numerique-04"],prefs:{public:1,team:1,outdoor:0,physical:0,routine:-1,travel:0,remote:-1,fixed:0,weekend:1,night:0}},
  realestate:{education:2,training:6,demand:7,salary:2200,skills:["Accueillir du public","Conseiller une personne","Négocier","Gérer des données"],soft:["Écoute","Diplomatie","Organisation"],macros:["commerce-01","commerce-02","commerce-03","commerce-04","relation-05","relation-06","administration-03","organisation-09"],prefs:{public:1,team:0,outdoor:0,physical:-1,routine:-1,travel:1,remote:0,fixed:0,weekend:0,night:-1}},
  law:{education:3,training:9,demand:6,salary:2300,skills:["Rédiger des documents","Analyser des informations","Gérer des données","Suivre une procédure"],soft:["Rigueur","Organisation","Diplomatie"],macros:["communication-01","communication-02","communication-07","administration-03","administration-04","analyse-01","analyse-10","securite-06","securite-08"],prefs:{public:0,team:0,outdoor:-1,physical:-1,routine:0,travel:-1,remote:1,fixed:1,weekend:-1,night:-1}}
};

const EXTRA_JOB_GROUPS=[
  ["Administration & secrétariat","office",["Secrétaire","Secrétaire médical","Assistant de direction","Agent administratif","Gestionnaire administratif","Opérateur de saisie","Office manager","Secrétaire comptable","Agent d'accueil administratif","Gestionnaire de dossiers"]],
  ["Commerce & vente","commerce",["Employé libre-service","Hôte de caisse","Conseiller de vente","Commercial sédentaire","Commercial terrain","Technico-commercial","Responsable de rayon","Responsable de magasin","Télévendeur","Merchandiser"]],
  ["Relation client","relation",["Chargé d'accueil","Conseiller clientèle bancaire","Conseiller en assurance","Agent de centre d'appels","Customer success manager","Gestionnaire SAV","Agent de réservation","Conseiller voyages","Médiateur de services","Responsable service client"]],
  ["Informatique & développement","it",["Technicien helpdesk","Administrateur systèmes","Administrateur réseaux","Développeur front-end","Développeur back-end","Développeur full-stack","Testeur logiciel QA","Chef de projet informatique","Ingénieur DevOps","UX/UI designer"]],
  ["Data & cybersécurité","data",["Data analyst","Data scientist","Data engineer","Administrateur de bases de données","Analyste cybersécurité","Ingénieur cybersécurité","Consultant BI","Analyste SOC","Responsable sécurité des systèmes d'information","Technicien cybersécurité"]],
  ["Gestion & finance","finance",["Comptable","Gestionnaire de paie","Contrôleur de gestion","Aide-comptable","Gestionnaire facturation","Chargé de recouvrement","Gestionnaire de trésorerie","Auditeur interne","Analyste financier","Assistant de gestion"]],
  ["Ressources humaines","hr",["Chargé de recrutement","Gestionnaire RH","Responsable formation","Chargé de formation","Talent acquisition specialist","HR business partner","Responsable ressources humaines","Gestionnaire administration du personnel","Chargé QVCT","Consultant en recrutement"]],
  ["Logistique","logistics",["Cariste","Magasinier","Agent de quai","Logisticien","Approvisionneur","Gestionnaire de stocks","Exploitant transport","Affréteur","Agent de transit","Responsable d'entrepôt"]],
  ["Transport","transport",["Chauffeur poids lourd","Chauffeur super poids lourd","Chauffeur taxi / VTC","Ambulancier","Chauffeur scolaire","Convoyeur de véhicules","Coursier","Conducteur de train","Agent d'escale","Agent d'exploitation transport"]],
  ["Industrie & production","production",["Agent de fabrication","Conducteur de ligne","Technicien qualité","Technicien méthodes","Automaticien industriel","Soudeur","Chaudronnier","Usineur","Tourneur-fraiseur","Opérateur de conditionnement"]],
  ["Maintenance technique","maintenance",["Électromécanicien","Technicien électrotechnique","Technicien de maintenance CVC","Technicien ascensoriste","Technicien de maintenance bâtiment","Technicien SAV itinérant","Technicien de maintenance électronique","Technicien frigoriste","Technicien de maintenance énergétique","Technicien instrumentation"]],
  ["BTP & construction","construction",["Conducteur de travaux","Chef de chantier","Économiste de la construction","Dessinateur-projeteur BTP","Métreur","Technicien bureau d'études","Géomètre-topographe","BIM manager","Chargé d'affaires BTP","Coordinateur SPS"]],
  ["Second œuvre","building",["Plombier","Électricien bâtiment","Peintre en bâtiment","Plaquiste","Carreleur","Maçon","Couvreur","Menuisier poseur","Serrurier-métallier","Installateur thermique"]],
  ["Automobile & mobilité","auto",["Carrossier","Peintre automobile","Technicien diagnostic automobile","Contrôleur technique automobile","Conseiller service automobile","Magasinier pièces automobiles","Mécanicien moto","Mécanicien poids lourds","Technicien cycle","Dépanneur-remorqueur"]],
  ["Hôtellerie & restauration","hospitality",["Serveur","Cuisinier","Chef de cuisine","Plongeur","Employé polyvalent de restauration","Gouvernant d'hôtel","Valet / femme de chambre","Maître d'hôtel","Barman","Sommelier"]],
  ["Alimentation & artisanat","food",["Boulanger","Pâtissier","Boucher","Charcutier","Poissonnier","Fromager","Traiteur","Chocolatier","Glacier","Vendeur en alimentation"]],
  ["Santé & soins","health",["Aide-soignant","Infirmier","Assistant dentaire","Préparateur en pharmacie","Technicien de laboratoire médical","Agent de service hospitalier","Brancardier","Opticien-lunetier","Audioprothésiste","Masseur-kinésithérapeute"]],
  ["Social & accompagnement","social",["Éducateur spécialisé","Moniteur-éducateur","Assistant de service social","Accompagnant éducatif et social","Technicien de l'intervention sociale et familiale","Conseiller en économie sociale et familiale","Médiateur social","Coordinateur de services à domicile","Responsable de secteur services à la personne","Accompagnant d'élèves en situation de handicap"]],
  ["Enfance & éducation","education",["ATSEM","Assistant maternel","Auxiliaire de crèche","Éducateur de jeunes enfants","Animateur périscolaire","Professeur des écoles","Formateur pour adultes","Assistant d'éducation","Conseiller principal d'éducation","Responsable de crèche"]],
  ["Propreté & environnement","environment",["Agent de propreté","Laveur de vitres","Agent d'entretien urbain","Ripeur","Agent de tri des déchets","Gardien de déchetterie","Technicien assainissement","Jardinier","Paysagiste","Élagueur"]],
  ["Sécurité & surveillance","security",["Agent SSIAP","Agent de sûreté aéroportuaire","Maître-chien","Opérateur de télésurveillance","Gardien d'immeuble","Agent de contrôle des transports","Surveillant de nuit","Convoyeur de fonds","ASVP","Policier municipal"]],
  ["Création & communication","creative",["Infographiste","Webdesigner","Motion designer","Photographe","Vidéaste","Community manager","Chargé de communication","Rédacteur web","Copywriter","Illustrateur"]],
  ["Marketing & digital","marketing",["Assistant marketing","Chargé de marketing","Responsable marketing","Traffic manager","Consultant SEO","Consultant SEA","CRM manager","Responsable e-commerce","Product marketing manager","Growth marketer"]],
  ["Agriculture & horticulture","agriculture",["Ouvrier agricole","Maraîcher","Arboriculteur","Viticulteur","Tractoriste","Éleveur","Agent d'élevage","Conducteur de machines agricoles","Technicien agricole","Horticulteur"]],
  ["Animaux & nature","animals",["Soigneur animalier","Auxiliaire vétérinaire","Toiletteur animalier","Éducateur canin","Palefrenier-soigneur","Agent de chenil","Technicien faune sauvage","Garde nature","Agent forestier","Bûcheron"]],
  ["Culture, sport & loisirs","culture",["Bibliothécaire","Agent de médiathèque","Libraire","Régisseur de spectacle","Technicien du spectacle","Agent de billetterie","Animateur sportif","Éducateur sportif","Coach sportif","Maître-nageur sauveteur"]],
  ["Immobilier & habitat","realestate",["Agent immobilier","Négociateur immobilier","Gestionnaire locatif","Gestionnaire de copropriété","Assistant immobilier","Conseiller habitat","Chargé d'attribution logement","Prospecteur foncier","Home stager","Responsable de résidence"]],
  ["Droit & secteur public","law",["Assistant juridique","Secrétaire juridique","Clerc de notaire","Juriste","Gestionnaire contentieux","Agent d'état civil","Instructeur urbanisme","Chargé de marchés publics","Gestionnaire de prestations","Médiateur administratif"]]
];

function extraFunctional(job){
  const d=job.domain.toLocaleLowerCase("fr");
  return {
    professionalDrivingRegulated:false,
    drivingRequired:job.skills.includes("Conduire un véhicule"),
    prolongedStanding:job.prefs.physical===1 && !d.includes("transport"),
    walking:job.prefs.outdoor===1,
    lifting:job.prefs.physical===1 && /(logistique|production|second œuvre|automobile|restauration|alimentation|santé|propreté|agriculture|animaux)/i.test(job.domain),
    fineMotor:/(maintenance|automobile|artisanat|création|santé)/i.test(job.domain),
    screen:job.skills.includes("Utiliser des outils numériques")||job.skills.includes("Gérer des données"),
    visualDetail:/(maintenance|automobile|création|sécurité|industrie|santé)/i.test(job.domain),
    phone:/(relation client|administration|ressources humaines|immobilier)/i.test(job.domain),
    oral:job.prefs.public===1,
    noise:/(industrie|production|logistique|restauration|bâtiment|second œuvre)/i.test(job.domain),
    publicContact:job.prefs.public===1,
    frequentTravel:job.prefs.travel===1,
    night:job.prefs.night===1,
    sustainedPace:/(restauration|logistique|production|santé|commerce)/i.test(job.domain)
  };
}

const existingTitles=new Set(jobs.map(j=>j.title.toLocaleLowerCase("fr")));
let extraId=1001;
EXTRA_JOB_GROUPS.forEach(([domain,templateKey,titles])=>{
  const t=EXTRA_JOB_TEMPLATES[templateKey];
  titles.forEach((title,index)=>{
    const key=title.toLocaleLowerCase("fr");
    if(existingTitles.has(key)) return;
    const job={
      id:extraId++,
      title,domain,
      education:t.education,
      training:t.training,
      apprenticeship:false,
      demand:Math.max(4,Math.min(9,t.demand+((index%3)-1))),
      salary:t.salary+((index%4)-1)*100,
      evol:0,
      skills:[...t.skills],
      soft:[...t.soft],
      prefs:{...t.prefs},
      access:"Fiche secondaire du catalogue de démonstration. Conditions d'accès à enrichir à partir du ROME.",
      evolution:[],
      functional:null,
      catalogTier:"secondary",
      demoSecondary:true,
      rome:null,
      officialTitle:null,
      officialAccess:null,
      romeUrl:null,
      sourceNote:"Intitulé du catalogue large de démonstration. La fiche détaillée et le rattachement ROME restent à enrichir.",
      skillMacroIds:[...t.macros]
    };
    job.functional=extraFunctional(job);
    jobs.push(job);
    existingTitles.add(key);
  });
});

const LARGE_DEMO_CATALOG_STATS={
  enriched:jobs.filter(j=>!j.demoSecondary).length,
  secondary:jobs.filter(j=>j.demoSecondary).length,
  total:jobs.length
};
