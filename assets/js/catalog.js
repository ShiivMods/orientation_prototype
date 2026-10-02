/**
 * JusteCap / Orientation Pro - demo catalog
 * Static demo options, territory indicators, helpers and job records.
 * No DOM manipulation belongs in this file.
 */

const steps = [
  ["Profil","Identité et situation"],
  ["Aptitudes","Savoir-faire et savoir-être"],
  ["Expérience","Loisirs et conditions de travail"],
  ["Préférences","Environnement et contraintes"],
  ["Résultats","Métiers correspondants"]
];

const skillOptions = [
  "Accueillir du public","Rédiger des documents","Analyser des informations","Utiliser des outils numériques",
  "Organiser son travail","Résoudre des problèmes","Conseiller une personne","Travailler manuellement",
  "Conduire un véhicule","Suivre une procédure","Former / expliquer","Gérer des données","Négocier","Réparer / entretenir"
];
const softOptions = [
  "Autonomie","Écoute","Rigueur","Curiosité","Créativité","Patience","Adaptabilité",
  "Organisation","Esprit d'équipe","Prise d'initiative","Résistance au stress","Diplomatie"
];
const qualityOptions = [
  ["methodical","Méthodique"],["punctual","Ponctuel"],["reliable","Fiable"],["patient","Patient"],
  ["empathetic","Empathique"],["creative","Créatif"],["curious","Curieux"],["persistent","Persévérant"],
  ["diplomatic","Diplomate"],["calm","Calme"],["meticulous","Minutieux"],["dynamic","Dynamique"],
  ["versatile","Polyvalent"],["pedagogical","Pédagogue"],["sociable","Sociable"],["independent","Autonome"]
];
const defectOptions = [
  ["impatient","Impatient"],["disorganized","Désorganisé"],["stress_difficulty","Difficulté avec le stress"],
  ["team_difficulty","Difficulté à travailler en équipe"],["public_difficulty","Difficulté avec le contact public"],
  ["routine_difficulty","Difficulté avec les tâches répétitives"],["change_difficulty","Difficulté avec le changement"],
  ["autonomy_difficulty","Besoin d'un cadre très précis"],["initiative_difficulty","Difficulté à prendre des initiatives"],
  ["concentration_difficulty","Difficulté de concentration prolongée"],["conflict_difficulty","Difficulté avec les conflits"],
  ["noise_difficulty","Difficulté avec les environnements bruyants"],["reserved","Très réservé / timide"],
  ["perfectionist","Perfectionniste"],["slow_pace","Difficulté avec les cadences soutenues"]
];
const disabilityOptions = [
  ["visual_impairment","Déficience visuelle / malvoyance"],
  ["blindness","Cécité"],
  ["hearing_impairment","Déficience auditive"],
  ["deafness","Surdité"],
  ["mobility_impairment","Handicap moteur / mobilité réduite"],
  ["upper_limb_impairment","Handicap moteur des membres supérieurs"],
  ["chronic_condition","Maladie chronique / affection longue durée"],
  ["chronic_pain","Douleurs chroniques"],
  ["neurodevelopmental","Trouble neurodéveloppemental"],
  ["cognitive_disability","Handicap cognitif / troubles cognitifs"],
  ["psychic_disability","Handicap psychique"],
  ["speech_impairment","Trouble de la parole / communication orale"],
  ["multiple_disabilities","Handicaps multiples / polyhandicap"],
  ["other_disability","Autre handicap"]
];
const functionalLimitOptions = [
  ["no_professional_driving","Conduite professionnelle impossible ou non autorisée"],
  ["no_driving","Conduite de véhicule impossible ou non autorisée"],
  ["limited_standing","Station debout prolongée difficile ou impossible"],
  ["limited_walking","Marche / déplacements à pied prolongés difficiles"],
  ["wheelchair_access","Besoin d'un environnement accessible en fauteuil"],
  ["limited_lifting","Port de charges difficile ou impossible"],
  ["limited_fine_motor","Gestes fins / manipulation précise difficiles"],
  ["limited_upper_limb","Usage prolongé des membres supérieurs difficile"],
  ["limited_screen","Travail prolongé sur écran difficile"],
  ["limited_visual_detail","Repérage visuel fin / lecture visuelle difficile"],
  ["limited_phone","Communication téléphonique difficile"],
  ["limited_oral","Communication orale prolongée difficile"],
  ["limited_noise","Environnement bruyant difficile"],
  ["limited_public","Contact permanent avec le public difficile"],
  ["limited_travel","Déplacements professionnels fréquents difficiles"],
  ["limited_night","Travail de nuit incompatible"],
  ["limited_pace","Cadence soutenue difficile"],
  ["needs_regular_breaks","Besoin de pauses régulières / rythme aménagé"]
];
const experienceOptions = [
  ["fixed","Horaires fixes"],["variable_hours","Horaires variables ou décalés"],["night","Travail de nuit"],
  ["weekend","Travail le week-end"],["physical","Métier physique"],["outdoor","Travail en extérieur"],
  ["indoor","Travail principalement en intérieur"],["public","Contact avec le public"],["team","Travail en équipe"],
  ["solo","Travail en autonomie / seul"],["travel","Déplacements fréquents"],["remote","Télétravail"],
  ["routine","Tâches répétitives"],["screen","Travail prolongé sur écran"]
];
const preferenceOptions = [
  ["public","Contact avec le public"],["team","Travail en équipe"],["outdoor","Travail en extérieur"],
  ["physical","Travail physique"],["routine","Tâches répétitives"],["travel","Déplacements fréquents"],
  ["remote","Télétravail"],["fixed","Horaires fixes"],["weekend","Travail le week-end"],["night","Travail de nuit"]
];
const prefValues = [
  ["want","Je préfère"],["neutral","Peu importe"],["avoid","À éviter"],["impossible","Impossible"]
];

const institutions = [
  {id:"enefa-herouville",name:"ENEFA - Hérouville-Saint-Clair",advisors:[
    {id:"demo-advisor",firstName:"Conseiller",lastName:"Démo",login:"conseiller.demo"}
  ]}
];
const territoryData = {
  normandie:{name:"Normandie",departments:{
    "14":{name:"Calvados",basins:[
      {id:"bayeux",name:"Bayeux",projects:2740,difficulty:46.0,seasonal:50.4,change:-12.7},
      {id:"caen",name:"Caen",projects:16010,difficulty:43.2,seasonal:30.3,change:-13.1},
      {id:"falaise",name:"Falaise",projects:910,difficulty:45.1,seasonal:47.3,change:-9.9},
      {id:"lisieux",name:"Lisieux",projects:6210,difficulty:41.4,seasonal:47.5,change:-22.4},
      {id:"vire",name:"Vire",projects:1300,difficulty:46.2,seasonal:30.8,change:-9.1}
    ]},
    "27":{name:"Eure",basins:[
      {id:"bernay",name:"Bernay",projects:1360,difficulty:44.1,seasonal:26.5,change:-15.5},
      {id:"evreux",name:"Évreux",projects:5370,difficulty:52.3,seasonal:17.1,change:-1.1},
      {id:"gisors",name:"Gisors",projects:880,difficulty:65.9,seasonal:46.6,change:-2.2},
      {id:"louviers",name:"Louviers",projects:1920,difficulty:41.7,seasonal:25.5,change:-24.7},
      {id:"pont-audemer",name:"Pont-Audemer",projects:1520,difficulty:42.8,seasonal:21.7,change:9.4},
      {id:"vernon",name:"Vernon",projects:2220,difficulty:38.7,seasonal:37.8,change:-10.5}
    ]},
    "50":{name:"Manche",basins:[
      {id:"saint-lo-coutances",name:"Saint-Lô - Coutances",projects:6760,difficulty:51.9,seasonal:39.8,change:-9.5},
      {id:"nord-cotentin",name:"Nord-Cotentin",projects:5550,difficulty:61.1,seasonal:24.5,change:-7.8},
      {id:"sud-manche",name:"Sud-Manche",projects:5600,difficulty:53.0,seasonal:37.5,change:-5.9}
    ]},
    "61":{name:"Orne",basins:[
      {id:"alencon",name:"Alençon",projects:2110,difficulty:51.7,seasonal:26.5,change:-10.6},
      {id:"argentan",name:"Argentan",projects:1030,difficulty:43.7,seasonal:34.0,change:13.2},
      {id:"flers",name:"Flers",projects:2540,difficulty:59.8,seasonal:18.9,change:-10.9},
      {id:"mortagne-aigle",name:"Mortagne - L'Aigle",projects:1780,difficulty:52.8,seasonal:22.5,change:-15.6}
    ]},
    "76":{name:"Seine-Maritime",basins:[
      {id:"caux-maritime",name:"Caux-Maritime",projects:3200,difficulty:41.9,seasonal:42.5,change:-5.0},
      {id:"fecamp",name:"Fécamp",projects:1530,difficulty:60.8,seasonal:36.6,change:7.7},
      {id:"forges-les-eaux",name:"Forges-les-Eaux",projects:1260,difficulty:60.3,seasonal:33.3,change:-0.8},
      {id:"lillebonne",name:"Lillebonne",projects:1120,difficulty:49.1,seasonal:26.8,change:-8.9},
      {id:"rouen",name:"Rouen",projects:15390,difficulty:45.5,seasonal:18.0,change:-10.5},
      {id:"elbeuf",name:"Elbeuf",projects:2050,difficulty:40.5,seasonal:22.0,change:10.8},
      {id:"le-havre",name:"Le Havre",projects:7370,difficulty:42.1,seasonal:24.6,change:-1.7},
      {id:"pays-de-caux",name:"Pays de Caux",projects:2070,difficulty:54.1,seasonal:26.6,change:-25.8},
      {id:"le-treport",name:"Le Tréport",projects:900,difficulty:53.3,seasonal:52.2,change:-22.4}
    ]}
  }}
};

function getDepartmentData(regionId,departmentCode){return territoryData[regionId]?.departments?.[departmentCode]||null}
function getBasinById(id){
  for(const [regionId,r] of Object.entries(territoryData)) for(const [departmentCode,d] of Object.entries(r.departments)){
    const basin=d.basins.find(b=>b.id===id); if(basin) return {...basin,regionId,regionName:r.name,departmentCode,departmentName:d.name};
  }
  return null;
}

const hobbyOptions = [
  ["video_games","Jeux vidéo"],["strategy_games","Jeux de stratégie"],["board_games","Jeux de société"],
  ["diy","Bricolage"],["mechanics","Mécanique"],["computing","Informatique"],["coding","Programmation"],
  ["drawing","Dessin"],["photo","Photo / vidéo"],["music","Musique"],["reading","Lecture"],["writing","Écriture"],
  ["sports","Sport"],["team_sports","Sport collectif"],["hiking","Randonnée"],["nature","Nature"],["animals","Animaux"],
  ["cooking","Cuisine"],["travel","Voyage"],["science","Sciences"],["social","Vie associative / entraide"]
];
const jobInterestMap = {
  "Conseiller en insertion professionnelle":["social","reading","writing"],
  "Technicien support informatique":["computing","coding","video_games","strategy_games"],
  "Préparateur de commandes":["sports","team_sports"],
  "Assistant administratif":["reading","writing","computing"],
  "Vendeur conseil":["social","team_sports","travel"],
  "Agent de maintenance":["diy","mechanics","science"],
  "Conducteur-livreur":["travel"],
  "Médiateur numérique":["computing","social","video_games"],
  "Opérateur de production":["diy","mechanics"],
  "Assistant ressources humaines":["social","reading","writing"],
  "Agent d'entretien des espaces verts":["nature","hiking","diy"],
  "Téléconseiller":["social","computing"],
  "Développeur web junior":["coding","computing","video_games","strategy_games"],
  "Graphiste":["drawing","photo","video_games"],
  "Aide à domicile":["social","cooking"],
  "Agent de sécurité":["sports","team_sports"],
  "Commis de cuisine":["cooking"],
  "Animateur socioculturel":["social","team_sports","board_games","music"],
  "Assistant comptable":["strategy_games","computing"],
  "Mécanicien automobile":["mechanics","diy","science"]
};
const qualityToSoft = {
  methodical:["Rigueur","Organisation"], punctual:["Rigueur"], reliable:["Rigueur","Autonomie"], patient:["Patience"],
  empathetic:["Écoute","Diplomatie"], creative:["Créativité"], curious:["Curiosité"], persistent:["Résistance au stress","Autonomie"],
  diplomatic:["Diplomatie"], calm:["Résistance au stress","Patience"], meticulous:["Rigueur"], dynamic:["Prise d'initiative","Adaptabilité"],
  versatile:["Adaptabilité"], pedagogical:["Écoute","Patience"], sociable:["Diplomatie","Esprit d'équipe"], independent:["Autonomie"]
};
const defectRules = {
  impatient:{soft:["Patience"],penalty:3}, disorganized:{soft:["Organisation","Rigueur"],penalty:3},
  stress_difficulty:{soft:["Résistance au stress"],penalty:4}, team_difficulty:{soft:["Esprit d'équipe"],pref:"team",penalty:4},
  public_difficulty:{pref:"public",penalty:4}, routine_difficulty:{pref:"routine",penalty:3},
  change_difficulty:{soft:["Adaptabilité"],penalty:3}, autonomy_difficulty:{soft:["Autonomie"],penalty:3},
  initiative_difficulty:{soft:["Prise d'initiative"],penalty:3}, concentration_difficulty:{soft:["Rigueur"],penalty:2},
  conflict_difficulty:{soft:["Diplomatie","Résistance au stress"],penalty:2}, noise_difficulty:{penalty:0},
  reserved:{pref:"public",penalty:2}, perfectionist:{penalty:0}, slow_pace:{soft:["Adaptabilité","Résistance au stress"],penalty:2}
};


const jobs = [
  {
    id:1,title:"Conseiller en insertion professionnelle",domain:"Social & accompagnement",education:2,training:8,apprenticeship:true,demand:8,salary:1850,evol:9,
    skills:["Accueillir du public","Rédiger des documents","Analyser des informations","Conseiller une personne","Utiliser des outils numériques","Organiser son travail"],
    soft:["Écoute","Organisation","Diplomatie","Adaptabilité","Autonomie"],
    prefs:{public:1,team:1,outdoor:-1,physical:-1,routine:0,travel:0,remote:0,fixed:1,weekend:-1,night:-1},
    access:"Titre professionnel ou diplôme du secteur social / insertion selon les postes.",
    evolution:["Chargé de projet insertion","Coordinateur d'équipe","Conseiller emploi / formation"]
  },
  {
    id:2,title:"Technicien support informatique",domain:"Informatique",education:2,training:6,apprenticeship:true,demand:8,salary:1900,evol:9,
    skills:["Utiliser des outils numériques","Analyser des informations","Résoudre des problèmes","Suivre une procédure","Former / expliquer"],
    soft:["Patience","Rigueur","Curiosité","Adaptabilité"],
    prefs:{public:0,team:1,outdoor:-1,physical:-1,routine:0,travel:0,remote:1,fixed:1,weekend:0,night:-1},
    access:"Possible via titre professionnel, formation courte ou expérience technique démontrable.",
    evolution:["Administrateur systèmes","Technicien réseau","Support N2/N3"]
  },
  {
    id:3,title:"Préparateur de commandes",domain:"Logistique",education:0,training:1,apprenticeship:false,demand:9,salary:1700,evol:6,
    skills:["Organiser son travail","Suivre une procédure","Travailler manuellement"],
    soft:["Rigueur","Organisation","Esprit d'équipe"],
    prefs:{public:-1,team:1,outdoor:0,physical:1,routine:1,travel:-1,remote:-1,fixed:0,weekend:0,night:0},
    access:"Souvent accessible sans diplôme. CACES parfois demandé selon les postes.",
    evolution:["Cariste","Chef d'équipe logistique","Gestionnaire de stocks"]
  },
  {
    id:4,title:"Assistant administratif",domain:"Administration",education:1,training:3,apprenticeship:true,demand:7,salary:1750,evol:7,
    skills:["Rédiger des documents","Utiliser des outils numériques","Organiser son travail","Gérer des données","Accueillir du public"],
    soft:["Organisation","Rigueur","Diplomatie","Autonomie"],
    prefs:{public:0,team:1,outdoor:-1,physical:-1,routine:1,travel:-1,remote:0,fixed:1,weekend:-1,night:-1},
    access:"Accessible avec un niveau CAP/Bac selon les structures. Titres professionnels possibles.",
    evolution:["Assistant RH","Assistant de direction","Gestionnaire administratif"]
  },
  {
    id:5,title:"Vendeur conseil",domain:"Commerce",education:0,training:2,apprenticeship:true,demand:8,salary:1700,evol:7,
    skills:["Accueillir du public","Conseiller une personne","Négocier","Organiser son travail"],
    soft:["Écoute","Diplomatie","Adaptabilité","Prise d'initiative"],
    prefs:{public:1,team:1,outdoor:-1,physical:0,routine:0,travel:-1,remote:-1,fixed:0,weekend:1,night:-1},
    access:"De nombreux postes sont accessibles sans diplôme, avec formation interne possible.",
    evolution:["Responsable de rayon","Adjoint de magasin","Commercial"]
  },
  {
    id:6,title:"Agent de maintenance",domain:"Industrie & maintenance",education:1,training:6,apprenticeship:true,demand:9,salary:2100,evol:8,
    skills:["Réparer / entretenir","Résoudre des problèmes","Travailler manuellement","Suivre une procédure"],
    soft:["Rigueur","Autonomie","Curiosité","Adaptabilité"],
    prefs:{public:-1,team:1,outdoor:0,physical:1,routine:0,travel:0,remote:-1,fixed:0,weekend:0,night:0},
    access:"CAP/Bac pro souvent demandé, mais reconversion possible via titre professionnel.",
    evolution:["Technicien maintenance","Chef d'équipe","Responsable maintenance"]
  },
  {
    id:7,title:"Conducteur-livreur",domain:"Transport",education:0,training:1,apprenticeship:false,demand:8,salary:1800,evol:5,
    skills:["Conduire un véhicule","Organiser son travail","Suivre une procédure"],
    soft:["Autonomie","Rigueur","Adaptabilité"],
    prefs:{public:0,team:-1,outdoor:0,physical:0,routine:0,travel:1,remote:-1,fixed:-1,weekend:0,night:0},
    access:"Permis adapté indispensable. Formation interne fréquente.",
    evolution:["Conducteur poids lourd","Exploitant transport","Chef d'équipe livraison"]
  },
  {
    id:8,title:"Médiateur numérique",domain:"Numérique & accompagnement",education:1,training:4,apprenticeship:true,demand:7,salary:1800,evol:7,
    skills:["Utiliser des outils numériques","Former / expliquer","Conseiller une personne","Accueillir du public"],
    soft:["Patience","Écoute","Adaptabilité","Diplomatie","Curiosité"],
    prefs:{public:1,team:1,outdoor:-1,physical:-1,routine:0,travel:0,remote:0,fixed:1,weekend:-1,night:-1},
    access:"Titre professionnel ou expérience numérique et pédagogique selon les structures.",
    evolution:["Conseiller numérique","Formateur","Coordinateur d'espace numérique"]
  },
  {
    id:9,title:"Opérateur de production",domain:"Industrie & maintenance",education:0,training:1,apprenticeship:false,demand:9,salary:1800,evol:6,
    skills:["Suivre une procédure","Travailler manuellement","Organiser son travail"],
    soft:["Rigueur","Esprit d'équipe","Adaptabilité"],
    prefs:{public:-1,team:1,outdoor:-1,physical:1,routine:1,travel:-1,remote:-1,fixed:0,weekend:0,night:0},
    access:"De nombreux postes accessibles sans diplôme avec formation au poste.",
    evolution:["Conducteur de ligne","Régleur","Chef d'équipe"]
  },
  {
    id:10,title:"Assistant ressources humaines",domain:"Ressources humaines",education:2,training:8,apprenticeship:true,demand:7,salary:1950,evol:8,
    skills:["Rédiger des documents","Gérer des données","Utiliser des outils numériques","Organiser son travail","Accueillir du public"],
    soft:["Diplomatie","Organisation","Rigueur","Écoute"],
    prefs:{public:0,team:1,outdoor:-1,physical:-1,routine:0,travel:-1,remote:0,fixed:1,weekend:-1,night:-1},
    access:"Bac+2 souvent apprécié. Titres professionnels accessibles en reconversion.",
    evolution:["Gestionnaire RH","Chargé de recrutement","Responsable RH"]
  },
  {
    id:11,title:"Agent d'entretien des espaces verts",domain:"Environnement",education:0,training:2,apprenticeship:true,demand:7,salary:1700,evol:5,
    skills:["Travailler manuellement","Organiser son travail","Suivre une procédure","Réparer / entretenir"],
    soft:["Autonomie","Rigueur","Esprit d'équipe"],
    prefs:{public:-1,team:1,outdoor:1,physical:1,routine:0,travel:0,remote:-1,fixed:1,weekend:0,night:-1},
    access:"Souvent accessible sans diplôme. CAP possible pour progresser.",
    evolution:["Jardinier paysagiste","Chef d'équipe espaces verts"]
  },
  {
    id:12,title:"Téléconseiller",domain:"Relation client",education:0,training:1,apprenticeship:false,demand:8,salary:1700,evol:6,
    skills:["Accueillir du public","Conseiller une personne","Utiliser des outils numériques","Suivre une procédure"],
    soft:["Écoute","Patience","Diplomatie","Résistance au stress"],
    prefs:{public:1,team:1,outdoor:-1,physical:-1,routine:1,travel:-1,remote:1,fixed:0,weekend:0,night:-1},
    access:"Souvent accessible sans diplôme avec formation interne.",
    evolution:["Conseiller clientèle","Superviseur","Chargé de relation client"]
  },
  {id:13,title:"Développeur web junior",domain:"Informatique",education:2,training:12,apprenticeship:true,demand:7,salary:2200,evol:9,skills:["Utiliser des outils numériques","Résoudre des problèmes","Analyser des informations"],soft:["Curiosité","Rigueur","Autonomie"],prefs:{public:-1,team:1,outdoor:-1,physical:-1,routine:0,travel:-1,remote:1,fixed:1,weekend:-1,night:-1},access:"Formation qualifiante, BTS/BUT ou portfolio solide selon les employeurs.",evolution:["Développeur full-stack","Lead développeur","Chef de projet technique"]},
  {id:14,title:"Graphiste",domain:"Création",education:2,training:12,apprenticeship:true,demand:5,salary:1850,evol:7,skills:["Utiliser des outils numériques","Organiser son travail"],soft:["Créativité","Curiosité","Autonomie"],prefs:{public:-1,team:0,outdoor:-1,physical:-1,routine:0,travel:-1,remote:1,fixed:1,weekend:-1,night:-1},access:"Portfolio essentiel. Formation graphique souvent appréciée.",evolution:["Directeur artistique","Motion designer","UX/UI designer"]},
  {id:15,title:"Aide à domicile",domain:"Services à la personne",education:0,training:3,apprenticeship:true,demand:9,salary:1650,evol:6,skills:["Conseiller une personne","Organiser son travail","Suivre une procédure"],soft:["Écoute","Patience","Autonomie","Adaptabilité"],prefs:{public:1,team:-1,outdoor:0,physical:1,routine:0,travel:1,remote:-1,fixed:-1,weekend:1,night:0},access:"Accessible sans diplôme sur certains postes. Certifications possibles.",evolution:["Auxiliaire de vie","Coordinateur de secteur"]},
  {id:16,title:"Agent de sécurité",domain:"Sécurité",education:0,training:2,apprenticeship:false,demand:8,salary:1800,evol:6,skills:["Suivre une procédure","Accueillir du public"],soft:["Rigueur","Résistance au stress","Autonomie"],prefs:{public:0,team:0,outdoor:0,physical:1,routine:1,travel:0,remote:-1,fixed:-1,weekend:1,night:1},access:"Carte professionnelle et formation réglementaire nécessaires.",evolution:["Chef de poste","Responsable sécurité"]},
  {id:17,title:"Commis de cuisine",domain:"Hôtellerie & restauration",education:0,training:3,apprenticeship:true,demand:9,salary:1700,evol:7,skills:["Travailler manuellement","Suivre une procédure","Organiser son travail"],soft:["Rigueur","Esprit d'équipe","Adaptabilité"],prefs:{public:-1,team:1,outdoor:-1,physical:1,routine:0,travel:-1,remote:-1,fixed:-1,weekend:1,night:1},access:"Accessible sans diplôme dans certains établissements. CAP cuisine utile.",evolution:["Cuisinier","Chef de partie","Second de cuisine"]},
  {id:18,title:"Animateur socioculturel",domain:"Animation & social",education:1,training:6,apprenticeship:true,demand:7,salary:1750,evol:7,skills:["Accueillir du public","Former / expliquer","Organiser son travail"],soft:["Créativité","Écoute","Adaptabilité"],prefs:{public:1,team:1,outdoor:0,physical:0,routine:-1,travel:0,remote:-1,fixed:0,weekend:1,night:-1},access:"BAFA/BPJEPS ou expérience associative selon le poste.",evolution:["Coordinateur animation","Responsable de structure"]},
  {id:19,title:"Assistant comptable",domain:"Gestion & finance",education:2,training:6,apprenticeship:true,demand:7,salary:1900,evol:8,skills:["Gérer des données","Utiliser des outils numériques","Suivre une procédure"],soft:["Rigueur","Organisation","Autonomie"],prefs:{public:-1,team:0,outdoor:-1,physical:-1,routine:1,travel:-1,remote:1,fixed:1,weekend:-1,night:-1},access:"Bac pro, BTS ou titre professionnel selon les postes.",evolution:["Comptable","Gestionnaire de paie","Contrôleur de gestion"]},
  {id:20,title:"Mécanicien automobile",domain:"Automobile",education:1,training:6,apprenticeship:true,demand:8,salary:1950,evol:8,skills:["Réparer / entretenir","Résoudre des problèmes","Travailler manuellement"],soft:["Rigueur","Curiosité","Autonomie"],prefs:{public:-1,team:1,outdoor:0,physical:1,routine:0,travel:-1,remote:-1,fixed:1,weekend:0,night:-1},access:"CAP/Bac pro ou titre professionnel généralement demandé.",evolution:["Technicien diagnostic","Chef d'atelier"]}

];

// Exigences fonctionnelles de démonstration.
// La version réelle devra les définir métier par métier à partir de sources documentées.
jobs.forEach(job=>{
  job.functional={
    professionalDrivingRegulated:false,
    drivingRequired:job.skills.includes("Conduire un véhicule"),
    prolongedStanding:job.prefs.physical===1 && ["Commerce","Hôtellerie & restauration","Sécurité"].includes(job.domain),
    walking:job.prefs.outdoor===1 || job.domain==="Environnement",
    lifting:job.prefs.physical===1 && ["Logistique","Industrie & maintenance","Services à la personne","Hôtellerie & restauration","Automobile"].includes(job.domain),
    fineMotor:["Automobile","Industrie & maintenance","Création"].includes(job.domain),
    screen:job.skills.includes("Utiliser des outils numériques") || job.skills.includes("Gérer des données"),
    visualDetail:["Automobile","Industrie & maintenance","Création","Sécurité"].includes(job.domain),
    phone:job.domain==="Relation client",
    oral:job.prefs.public===1,
    noise:["Industrie & maintenance","Hôtellerie & restauration","Logistique"].includes(job.domain),
    publicContact:job.prefs.public===1,
    frequentTravel:job.prefs.travel===1,
    night:job.prefs.night===1,
    sustainedPace:["Hôtellerie & restauration","Logistique","Industrie & maintenance"].includes(job.domain)
  };
});
jobs.push({
  id:21,title:"Conducteur de bus / autocar",domain:"Transport",education:0,training:3,apprenticeship:true,demand:9,salary:2050,evol:7,
  skills:["Conduire un véhicule","Accueillir du public","Suivre une procédure","Organiser son travail"],
  soft:["Rigueur","Patience","Résistance au stress","Autonomie"],
  prefs:{public:1,team:-1,outdoor:0,physical:0,routine:1,travel:1,remote:-1,fixed:-1,weekend:1,night:0},
  access:"Permis D, qualification professionnelle et aptitude médicale réglementaire nécessaires.",
  evolution:["Conducteur grand tourisme","Formateur conduite","Responsable d'exploitation"],
  functional:{professionalDrivingRegulated:true,drivingRequired:true,prolongedStanding:false,walking:false,lifting:false,fineMotor:false,screen:false,visualDetail:true,phone:false,oral:true,noise:true,publicContact:true,frequentTravel:true,night:false,sustainedPace:false}
});
