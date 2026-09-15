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
  {id:"enefa-caen",name:"Enefa - Caen",advisors:[
    {id:"cyril-brunet",firstName:"Cyril",lastName:"Brunet",login:"cyril.brunet"},
    {id:"alain-langlois",firstName:"Alain",lastName:"Langlois",login:"alain.langlois"}
  ]},
  {id:"structure-demo-lisieux",name:"Structure Démo - Lisieux",advisors:[
    {id:"marie-dupont",firstName:"Marie",lastName:"Dupont",login:"marie.dupont"}
  ]}
];
const territoryData = {
  normandie:{name:"Normandie",departments:{
    "14":{name:"Calvados",basins:[
      {id:"bayeux",name:"Bayeux",projects:2736,difficulty:46,seasonal:51,propensity:28.3,change:-12.9},
      {id:"caen",name:"Caen",projects:16006,difficulty:43,seasonal:30,propensity:25.0,change:-13.2},
      {id:"falaise",name:"Falaise",projects:914,difficulty:45,seasonal:47,propensity:18.6,change:-9.2},
      {id:"lisieux",name:"Lisieux",projects:6210,difficulty:41,seasonal:47,propensity:26.6,change:-22.3},
      {id:"vire",name:"Vire",projects:1300,difficulty:46,seasonal:31,propensity:18.1,change:-9.3}
    ]},
    "27":{name:"Eure",basins:[
      {id:"bernay",name:"Bernay",projects:1361,difficulty:44,seasonal:26,propensity:16.3,change:-15.3},
      {id:"evreux",name:"Évreux",projects:5366,difficulty:52,seasonal:17,propensity:20.7,change:-1.2},
      {id:"gisors",name:"Gisors",projects:876,difficulty:66,seasonal:46,propensity:18.5,change:-2.7},
      {id:"louviers",name:"Louviers",projects:1924,difficulty:41,seasonal:25,propensity:22.1,change:-24.5},
      {id:"pont-audemer",name:"Pont-Audemer",projects:1522,difficulty:42,seasonal:22,propensity:20.9,change:9.8},
      {id:"vernon",name:"Vernon",projects:2220,difficulty:38,seasonal:38,propensity:20.3,change:-10.5}
    ]},
    "50":{name:"Manche",basins:[
      {id:"saint-lo-coutances",name:"Saint-Lô - Coutances",projects:6759,difficulty:52,seasonal:40,propensity:26.4,change:-9.5},
      {id:"nord-cotentin",name:"Nord-Cotentin",projects:5548,difficulty:61,seasonal:24,propensity:27.1,change:-7.9},
      {id:"sud-manche",name:"Sud-Manche",projects:5596,difficulty:53,seasonal:37,propensity:26.7,change:-5.9}
    ]},
    "61":{name:"Orne",basins:[
      {id:"alencon",name:"Alençon",projects:2108,difficulty:52,seasonal:26,propensity:20.9,change:-10.5},
      {id:"argentan",name:"Argentan",projects:1025,difficulty:44,seasonal:34,propensity:15.6,change:13.0},
      {id:"flers",name:"Flers",projects:2541,difficulty:60,seasonal:19,propensity:23.6,change:-10.7},
      {id:"mortagne-aigle",name:"Mortagne - L'Aigle",projects:1783,difficulty:53,seasonal:22,propensity:22.9,change:-15.7}
    ]},
    "76":{name:"Seine-Maritime",basins:[
      {id:"caux-maritime",name:"Caux-Maritime",projects:3195,difficulty:42,seasonal:42,propensity:20.1,change:-5.1},
      {id:"fecamp",name:"Fécamp",projects:1532,difficulty:61,seasonal:36,propensity:21.5,change:7.7},
      {id:"forges-les-eaux",name:"Forges-les-Eaux",projects:1259,difficulty:60,seasonal:33,propensity:20.2,change:-0.8},
      {id:"lillebonne",name:"Lillebonne",projects:1122,difficulty:49,seasonal:27,propensity:19.8,change:-9.0},
      {id:"rouen",name:"Rouen",projects:15393,difficulty:45,seasonal:18,propensity:23.3,change:-10.5},
      {id:"elbeuf",name:"Elbeuf",projects:2054,difficulty:41,seasonal:22,propensity:27.2,change:10.9},
      {id:"le-havre",name:"Le Havre",projects:7370,difficulty:42,seasonal:25,propensity:21.9,change:-1.7},
      {id:"pays-de-caux",name:"Pays de Caux",projects:2071,difficulty:54,seasonal:27,propensity:17.6,change:-25.7},
      {id:"le-treport",name:"Le Tréport",projects:901,difficulty:54,seasonal:51,propensity:20.3,change:-22.4}
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
let territoryRowCounter=0;
function territoryRowTemplate(removable=false){
  return `<label class="field"><span>Région</span><select class="region-select" onchange="updateTerritoryDepartments(this)"></select></label>
    <label class="field"><span>Département</span><select class="department-select" onchange="updateTerritoryBasins(this)"></select></label>
    <label class="field basin-field"><span>Bassin d'emploi</span><select class="basin-select" onchange="renderTerritorySummary()"></select></label>
    ${removable?`<div class="territory-remove-wrap"><button type="button" class="territory-remove-btn" onclick="removeTerritorySelector(this)" title="Retirer cette zone" aria-label="Retirer cette zone">×</button></div>`:`<div class="territory-remove-wrap"></div>`}`;
}
function populateTerritoryRow(row,preferredRegion="normandie",preferredDepartment="14",preferredBasin="caen"){
  const r=row.querySelector(".region-select");
  r.innerHTML=Object.entries(territoryData).map(([id,x])=>`<option value="${id}">${x.name}</option>`).join("");
  if(territoryData[preferredRegion]) r.value=preferredRegion;
  updateTerritoryDepartments(r,preferredDepartment,preferredBasin);
}
function initTerritorySelectors(){
  const container=document.getElementById("territorySelectors");
  container.innerHTML="";
  const row=document.createElement("div");
  row.className="territory-selector-row"; row.dataset.territoryRow=territoryRowCounter++;
  row.innerHTML=territoryRowTemplate(false); container.appendChild(row);
  populateTerritoryRow(row,"normandie","14","caen");
  renderTerritorySummary();
}
function updateTerritoryDepartments(regionSelect,preferredDepartment=null,preferredBasin=null){
  const row=regionSelect.closest(".territory-selector-row");
  const regionId=regionSelect.value;
  const dsel=row.querySelector(".department-select");
  const deps=territoryData[regionId]?.departments||{};
  dsel.innerHTML=Object.entries(deps).map(([code,d])=>`<option value="${code}">${d.name} (${code})</option>`).join("");
  if(preferredDepartment&&deps[preferredDepartment]) dsel.value=preferredDepartment;
  updateTerritoryBasins(dsel,preferredBasin);
}
function updateTerritoryBasins(departmentSelect,preferredBasin=null){
  const row=departmentSelect.closest(".territory-selector-row");
  const regionId=row.querySelector(".region-select").value,dep=departmentSelect.value;
  const basins=getDepartmentData(regionId,dep)?.basins||[];
  const bsel=row.querySelector(".basin-select");
  bsel.innerHTML=basins.map(b=>`<option value="${b.id}">${b.name}</option>`).join("");
  if(preferredBasin&&basins.some(b=>b.id===preferredBasin)) bsel.value=preferredBasin;
  renderTerritorySummary();
}
function addTerritorySelector(){
  const container=document.getElementById("territorySelectors");
  const last=container.lastElementChild;
  const regionId=last?.querySelector(".region-select")?.value||"normandie";
  const dep=last?.querySelector(".department-select")?.value||"14";
  const used=new Set(getSelectedTerritoryIds());
  const basins=getDepartmentData(regionId,dep)?.basins||[];
  const preferred=(basins.find(b=>!used.has(b.id))||basins[0]||getBasinById("caen"))?.id||"caen";
  const row=document.createElement("div");
  row.className="territory-selector-row"; row.dataset.territoryRow=territoryRowCounter++;
  row.innerHTML=territoryRowTemplate(true); container.appendChild(row);
  populateTerritoryRow(row,regionId,dep,preferred);
  row.scrollIntoView({behavior:"smooth",block:"nearest"});
}
function removeTerritorySelector(button){
  const row=button.closest(".territory-selector-row"); if(!row)return;
  row.remove(); renderTerritorySummary();
}
function getSelectedTerritoryIds(){
  const ids=[...document.querySelectorAll("#territorySelectors .basin-select")].map(s=>s.value).filter(Boolean);
  return [...new Set(ids)];
}
function renderTerritorySummary(){
  const target=document.getElementById("territorySummary"); if(!target)return;
  const basins=getSelectedTerritoryIds().map(getBasinById).filter(Boolean);
  target.innerHTML=basins.map(b=>`<span class="territory-chip">${esc(b.regionName)} • ${esc(b.departmentName)} • ${esc(b.name)}</span>`).join("");
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

let currentStep=0;
let currentAdvisor=null;
let profile={};
let lastSentDossierRef=null;
let selectedPastJobIds=[];

function init(){
  document.getElementById("steps").innerHTML = steps.map((s,i)=>`
    <div class="step ${i===0?'active':''}" data-stepnav="${i}">
      <div class="step-num">${i+1}</div><div><strong>${s[0]}</strong><br><span style="font-size:11px">${s[1]}</span></div>
    </div>`).join("");

  document.getElementById("skillsTags").innerHTML = skillOptions.map((s,i)=>`
    <div class="tag"><input type="checkbox" id="skill_${i}" value="${s}" name="skills"><label for="skill_${i}">${s}</label></div>`).join("");
  document.getElementById("softTags").innerHTML = softOptions.map((s,i)=>`
    <div class="tag"><input type="checkbox" id="soft_${i}" value="${s}" name="soft"><label for="soft_${i}">${s}</label></div>`).join("");
  document.getElementById("qualityTags").innerHTML = qualityOptions.map(([key,label],i)=>`
    <div class="tag"><input type="checkbox" id="quality_${i}" value="${key}" name="qualitiesSelected"><label for="quality_${i}">${label}</label></div>`).join("");
  document.getElementById("defectTags").innerHTML = defectOptions.map(([key,label],i)=>`
    <div class="tag"><input type="checkbox" id="defect_${i}" value="${key}" name="defectsSelected"><label for="defect_${i}">${label}</label></div>`).join("");
  document.getElementById("disabilityTags").innerHTML = disabilityOptions.map(([key,label],i)=>`
    <div class="tag"><input type="checkbox" id="disability_${i}" value="${key}" name="disabilitiesSelected"><label for="disability_${i}">${label}</label></div>`).join("");
  document.getElementById("functionalLimitTags").innerHTML = functionalLimitOptions.map(([key,label],i)=>`
    <div class="tag"><input type="checkbox" id="functional_${i}" value="${key}" name="functionalLimits"><label for="functional_${i}">${label}</label></div>`).join("");
  document.getElementById("hobbyTags").innerHTML = hobbyOptions.map(([key,label],i)=>`
    <div class="tag"><input type="checkbox" id="hobby_${i}" value="${key}" name="hobbiesSelected"><label for="hobby_${i}">${label}</label></div>`).join("");
  document.getElementById("experienceTags").innerHTML = experienceOptions.map(([key,label],i)=>`
    <div class="tag"><input type="checkbox" id="experience_${i}" value="${key}" name="experienceSelected"><label for="experience_${i}">${label}</label></div>`).join("");
  document.getElementById("institution").innerHTML += institutions.map(i=>`<option value="${i.id}">${i.name}</option>`).join("");
  initTerritorySelectors();

  document.getElementById("prefGrid").innerHTML = preferenceOptions.map(([key,label])=>`
    <div class="pref-card">
      <strong>${label}</strong>
      <div class="pref-options">
        ${prefValues.map(([val,lbl])=>`
          <div><input type="radio" name="pref_${key}" id="${key}_${val}" value="${val}" ${val==="neutral"?"checked":""}>
          <label for="${key}_${val}">${lbl}</label></div>`).join("")}
      </div>
    </div>`).join("");

  const domains=[...new Set(jobs.map(j=>j.domain))].sort();
  document.getElementById("domainFilter").innerHTML += domains.map(d=>`<option>${d}</option>`).join("");
  document.getElementById("pastJobSelect").innerHTML = `<option value="">Choisir un métier...</option>` + jobs.slice().sort((a,b)=>a.title.localeCompare(b.title,"fr")).map(j=>`<option value="${j.id}">${j.title}</option>`).join("");
  seedDemoDossiers();
  updateNav();
}

function updateNav(){
  document.querySelectorAll(".step").forEach((el,i)=>{
    el.classList.toggle("active",i===currentStep);
    el.classList.toggle("done",i<currentStep);
  });
  const titles=[
    ["Votre profil","Commençons par quelques informations simples."],
    ["Vos aptitudes","Sélectionnez ce que vous savez déjà faire et votre manière de travailler."],
    ["Votre expérience","Indiquez vos loisirs et les conditions de travail que vous connaissez déjà."],
    ["Vos préférences","Indiquez ce que vous recherchez et ce que vous souhaitez éviter."],
    ["Métiers correspondants","Résultats calculés à partir de votre profil et de vos contraintes."]
  ];
  document.getElementById("pageTitle").textContent=titles[currentStep][0];
  document.getElementById("pageSubtitle").textContent=titles[currentStep][1];
}
function goToStep(n){
  currentStep=n;
  document.getElementById("beneficiaryMode").classList.add("active");
  document.getElementById("skillsMode").classList.remove("active");
  document.getElementById("advisorMode").classList.remove("active");
  document.querySelectorAll(".section").forEach(s=>s.classList.toggle("active",Number(s.dataset.step)===n));
  updateNav(); window.scrollTo({top:0,behavior:"smooth"});
}
function clearStepValidation(){
  const profileBox=document.getElementById("profileValidation");
  const aptitudeBox=document.getElementById("aptitudeValidation");
  if(profileBox){profileBox.classList.remove("show");profileBox.textContent=""}
  if(aptitudeBox){aptitudeBox.classList.remove("show");aptitudeBox.textContent=""}
  ["firstName","lastName"].forEach(id=>document.getElementById(id)?.classList.remove("invalid"));
}
function validateCurrentStep(){
  clearStepValidation();
  if(currentStep===0){
    const first=document.getElementById("firstName"),last=document.getElementById("lastName");
    const missing=[];
    if(!first.value.trim()){missing.push("Prénom");first.classList.add("invalid")}
    if(!last.value.trim()){missing.push("Nom");last.classList.add("invalid")}
    if(missing.length){
      const box=document.getElementById("profileValidation");
      box.textContent=`Vous devez renseigner ${missing.join(" et ")} avant de continuer.`;
      box.classList.add("show");
      (missing[0]==="Prénom"?first:last).focus();
      return false;
    }
  }
  if(currentStep===1){
    const aptitudeCount=document.querySelectorAll(
      'input[name="skills"]:checked, input[name="soft"]:checked, input[name="qualitiesSelected"]:checked, input[name="defectsSelected"]:checked'
    ).length;
    if(aptitudeCount<1){
      const box=document.getElementById("aptitudeValidation");
      box.textContent="Sélectionnez au moins une aptitude, parmi les savoir-faire, savoir-être, qualités ou défauts, avant de continuer.";
      box.classList.add("show");
      box.scrollIntoView({behavior:"smooth",block:"center"});
      return false;
    }
  }
  return true;
}
function nextStep(){
  if(!validateCurrentStep()) return;
  goToStep(Math.min(4,currentStep+1));
}
function prevStep(){clearStepValidation();goToStep(Math.max(0,currentStep-1))}

function readProfile(){
  const selectedAreaIds=getSelectedTerritoryIds();
  const primaryBasin=getBasinById(selectedAreaIds[0])||getBasinById("caen");
  const effectiveAreaIds=selectedAreaIds.length?selectedAreaIds:[primaryBasin.id];
  profile={
    firstName:document.getElementById("firstName").value.trim(),
    lastName:document.getElementById("lastName").value.trim(),
    age:Number(document.getElementById("age").value)||0,
    education:Number(document.getElementById("education").value),
    situation:document.getElementById("situation").value,
    disabilitiesSelected:[...document.querySelectorAll('input[name="disabilitiesSelected"]:checked')].map(x=>x.value),
    functionalLimits:[...document.querySelectorAll('input[name="functionalLimits"]:checked')].map(x=>x.value),
    disabilityNotes:document.getElementById("disabilityNotes").value.trim(),
    regionId:primaryBasin.regionId,
    departmentCode:primaryBasin.departmentCode,
    employmentAreaId:primaryBasin.id,
    employmentAreaIds:effectiveAreaIds,
    employmentAreas:effectiveAreaIds.map(id=>getBasinById(id)?.name).filter(Boolean),
    employmentArea:effectiveAreaIds.map(id=>getBasinById(id)?.name).filter(Boolean).join(", "),
    institutionId:document.getElementById("institution").value,
    advisorId:document.getElementById("advisor").value,
    maxTraining:Number(document.getElementById("maxTraining").value),
    salary:Number(document.getElementById("salary").value),
    skills:[...document.querySelectorAll('input[name="skills"]:checked')].map(x=>x.value),
    soft:[...document.querySelectorAll('input[name="soft"]:checked')].map(x=>x.value),
    qualitiesSelected:[...document.querySelectorAll('input[name="qualitiesSelected"]:checked')].map(x=>x.value),
    defectsSelected:[...document.querySelectorAll('input[name="defectsSelected"]:checked')].map(x=>x.value),
    hobbiesSelected:[...document.querySelectorAll('input[name="hobbiesSelected"]:checked')].map(x=>x.value),
    experienceSelected:[...document.querySelectorAll('input[name="experienceSelected"]:checked')].map(x=>x.value),
    prefs:{}
  };
  preferenceOptions.forEach(([key])=>{
    const v=document.querySelector(`input[name="pref_${key}"]:checked`);
    profile.prefs[key]=v?v.value:"neutral";
  });
}

function preferenceScore(job){
  let total=0, max=0, conflicts=0;
  const userMap={want:1,neutral:0,avoid:-1,impossible:-2};
  Object.keys(job.prefs).forEach(k=>{
    const u=userMap[profile.prefs[k]||"neutral"];
    const j=job.prefs[k];
    if(u===0)return;
    max+=2;
    if(u===1){
      total += j===1?2:j===0?1:0;
    } else if(u===-1){
      total += j===-1?2:j===0?1:0;
    } else if(u===-2){
      if(j===1) conflicts++;
      total += j===-1?2:j===0?1:0;
    }
  });
  return {score:max?Math.round((total/max)*100):75, conflicts};
}

function interestBonus(job){
  const selected=profile.hobbiesSelected||[];
  const interests=jobInterestMap[job.title]||[];
  const matches=interests.filter(x=>selected.includes(x));
  return {bonus:Math.min(10,matches.length*3),matches};
}

function experienceBonus(job){
  const selected=profile.experienceSelected||[];
  const matched=[];
  const match=(key,condition)=>{if(selected.includes(key)&&condition) matched.push(key)};
  match("fixed",job.prefs.fixed===1);
  match("variable_hours",job.prefs.fixed===-1 || job.prefs.night===1 || job.prefs.weekend===1);
  match("night",job.prefs.night===1);
  match("weekend",job.prefs.weekend===1);
  match("physical",job.prefs.physical===1);
  match("outdoor",job.prefs.outdoor===1);
  match("indoor",job.prefs.outdoor===-1);
  match("public",job.prefs.public===1);
  match("team",job.prefs.team===1);
  match("solo",job.prefs.team===-1);
  match("travel",job.prefs.travel===1);
  match("remote",job.prefs.remote===1);
  match("routine",job.prefs.routine===1);
  match("screen",job.skills.includes("Utiliser des outils numériques") || job.skills.includes("Gérer des données"));
  return {bonus:Math.min(8,matched.length*2),matches:matched};
}

function traitAdjustment(job){
  const qualities=profile.qualitiesSelected||[];
  const defects=profile.defectsSelected||[];
  const qualityMatches=[];
  qualities.forEach(q=>{
    const mapped=qualityToSoft[q]||[];
    if(mapped.some(s=>job.soft.includes(s))) qualityMatches.push(q);
  });
  const qualityBonus=Math.min(6,qualityMatches.length*2);
  let defectPenalty=0;
  const defectMatches=[];
  defects.forEach(d=>{
    const rule=defectRules[d]; if(!rule) return;
    const softConflict=(rule.soft||[]).some(s=>job.soft.includes(s));
    const prefConflict=rule.pref ? job.prefs[rule.pref]===1 : false;
    if(softConflict||prefConflict){ defectPenalty+=rule.penalty||0; defectMatches.push(d); }
  });
  return {qualityBonus,qualityMatches,defectPenalty:Math.min(12,defectPenalty),defectMatches};
}


function accessibilityAssessment(job){
  const limits=new Set(profile.functionalLimits||[]);
  const disabilities=new Set(profile.disabilitiesSelected||[]);
  const f=job.functional||{};
  const hard=[],warnings=[];
  let penalty=0;

  if((limits.has("no_professional_driving") && f.professionalDrivingRegulated) ||
     (limits.has("no_driving") && f.drivingRequired)){
    hard.push("La conduite requise est incompatible avec la limitation déclarée.");
  }
  if(limits.has("limited_standing") && f.prolongedStanding){warnings.push("Station debout prolongée fréquente.");penalty+=14}
  if(limits.has("limited_walking") && f.walking){warnings.push("Déplacements à pied fréquents.");penalty+=12}
  if(limits.has("wheelchair_access") && (f.prolongedStanding||f.walking||f.lifting)){warnings.push("L'accessibilité et l'aménagement concret du poste doivent être vérifiés.");penalty+=10}
  if(limits.has("limited_lifting") && f.lifting){warnings.push("Port de charges ou effort physique fréquent.");penalty+=16}
  if(limits.has("limited_fine_motor") && f.fineMotor){warnings.push("Manipulation précise / gestes fins fréquents.");penalty+=12}
  if(limits.has("limited_upper_limb") && (f.fineMotor||f.lifting)){warnings.push("Usage important des membres supérieurs.");penalty+=12}
  if(limits.has("limited_screen") && f.screen){warnings.push("Travail prolongé sur écran.");penalty+=12}
  if(limits.has("limited_visual_detail") && f.visualDetail){warnings.push("Repérage ou contrôle visuel important.");penalty+=14}
  if(limits.has("limited_phone") && f.phone){warnings.push("Usage fréquent du téléphone.");penalty+=14}
  if(limits.has("limited_oral") && f.oral){warnings.push("Communication orale fréquente.");penalty+=10}
  if(limits.has("limited_noise") && f.noise){warnings.push("Environnement potentiellement bruyant.");penalty+=10}
  if(limits.has("limited_public") && f.publicContact){warnings.push("Contact fréquent avec le public.");penalty+=12}
  if(limits.has("limited_travel") && f.frequentTravel){warnings.push("Déplacements professionnels fréquents.");penalty+=14}
  if(limits.has("limited_night") && f.night){hard.push("Le travail de nuit est incompatible avec la limitation déclarée.")}
  if(limits.has("limited_pace") && f.sustainedPace){warnings.push("Cadence de travail potentiellement soutenue.");penalty+=12}
  if(limits.has("needs_regular_breaks") && f.sustainedPace){warnings.push("Le rythme du poste peut nécessiter un aménagement.");penalty+=8}

  // Pour une profession réglementée, le handicap seul déclenche une vérification,
  // mais Orientation Pro ne prononce pas d'inaptitude médicale.
  if(f.professionalDrivingRegulated && disabilities.has("blindness")){
    hard.push("La cécité déclarée est incompatible avec l'exigence de conduite professionnelle de ce métier.");
  } else if(f.professionalDrivingRegulated && disabilities.has("visual_impairment")){
    warnings.unshift("Aptitude médicale réglementée à la conduite professionnelle à vérifier.");
    penalty+=20;
  }
  if(f.professionalDrivingRegulated && (disabilities.has("hearing_impairment")||disabilities.has("deafness"))){
    warnings.unshift("Aptitude médicale réglementée à vérifier pour la conduite professionnelle.");
    penalty+=8;
  }

  penalty=Math.min(45,penalty);
  let status="ok",label="Aucune incompatibilité déclarée";
  if(hard.length){status="blocked";label="Écarté par une limitation déclarée"}
  else if(f.professionalDrivingRegulated && warnings.some(w=>w.includes("réglementée"))){status="check";label="Aptitude réglementée à vérifier"}
  else if(warnings.length){status="adjust";label="Aménagement / compatibilité à vérifier"}

  return {hard,warnings,penalty,status,label,blocked:hard.length>0};
}

function scoreJob(job){
  const matchedSkills=job.skills.filter(s=>profile.skills.includes(s));
  const matchedSoft=job.soft.filter(s=>profile.soft.includes(s));
  const skillScore=job.skills.length?matchedSkills.length/job.skills.length*100:50;
  const softScore=job.soft.length?matchedSoft.length/job.soft.length*100:50;
  const pref=preferenceScore(job);
  const accessEducation=profile.education>=job.education?100:Math.max(20,100-(job.education-profile.education)*25);
  const trainingFit=profile.maxTraining>=job.training?100:Math.max(0,100-(job.training-profile.maxTraining)*8);
  const salaryFit=profile.salary<=job.salary?100:Math.max(20,100-(profile.salary-job.salary)/12);
  let base=skillScore*.28+softScore*.18+pref.score*.27+accessEducation*.10+trainingFit*.10+salaryFit*.07;
  base -= pref.conflicts*12;
  base=Math.max(0,Math.min(99,Math.round(base)));
  const interest=interestBonus(job);
  const experience=experienceBonus(job);
  const traits=traitAdjustment(job);
  const accessibility=accessibilityAssessment(job);
  const total=accessibility.blocked?0:Math.max(0,Math.min(100,base+interest.bonus+experience.bonus+traits.qualityBonus-traits.defectPenalty-accessibility.penalty));
  return {total,base,interestBonus:interest.bonus,interestMatches:interest.matches,
    experienceBonus:experience.bonus,experienceMatches:experience.matches,
    qualityBonus:traits.qualityBonus,qualityMatches:traits.qualityMatches,
    defectPenalty:traits.defectPenalty,defectMatches:traits.defectMatches,
    accessibilityPenalty:accessibility.penalty,accessibility,
    matchedSkills,matchedSoft,
    breakdown:{"Savoir-faire":Math.round(skillScore),"Savoir-être":Math.round(softScore),"Préférences":Math.round(pref.score),"Accessibilité formation":Math.round((accessEducation+trainingFit)/2)},
    conflicts:pref.conflicts};
}

function clamp(v,min,max){return Math.max(min,Math.min(max,v))}
function stableLocalFactor(text){let h=2166136261;for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619)}return 0.90+((h>>>0)%21)/100}
function marketLabel(index){if(index>=80)return "Très fort";if(index>=65)return "Fort";if(index>=50)return "Moyen";if(index>=35)return "Faible";return "Très faible"}
function localMarketForBasin(job,basin){
  const maxProjects=16006;
  const volume=Math.log1p(basin.projects)/Math.log1p(maxProjects);
  const propensity=basin.propensity/28.3;
  const difficulty=basin.difficulty/66;
  const nonSeasonal=1-basin.seasonal/100;
  const trend=clamp((basin.change+25.7)/(13+25.7),0,1);
  const baseDemand=clamp(job.demand/10,0,1);
  // Couche métier encore simulée dans le prototype. Les indicateurs territoriaux BMO sont réels.
  const localFactor=stableLocalFactor(basin.id+"|"+job.domain);
  const raw=(baseDemand*45 + volume*20 + propensity*15 + difficulty*10 + nonSeasonal*5 + trend*5)*localFactor;
  const index=clamp(Math.round(raw),5,100);
  return {index,label:marketLabel(index),basin,nonSeasonal:100-basin.seasonal};
}
function localMarket(job){
  const ids=(profile.employmentAreaIds&&profile.employmentAreaIds.length?profile.employmentAreaIds:[profile.employmentAreaId||"caen"]);
  const basins=[...new Set(ids)].map(getBasinById).filter(Boolean);
  if(!basins.length) basins.push(getBasinById("caen"));
  const markets=basins.map(b=>localMarketForBasin(job,b)).sort((a,b)=>b.index-a.index);
  const best=markets[0];
  return {...best,markets,selectedCount:markets.length,averageIndex:Math.round(markets.reduce((s,m)=>s+m.index,0)/markets.length)};
}
function renderMarketContext(){
  let ids=(profile.employmentAreaIds&&profile.employmentAreaIds.length?profile.employmentAreaIds:[profile.employmentAreaId||"caen"]);
  const basins=[...new Set(ids)].map(getBasinById).filter(Boolean);
  if(!basins.length) basins.push(getBasinById("caen"));
  const totalProjects=basins.reduce((s,b)=>s+b.projects,0);
  const weighted=field=>totalProjects?basins.reduce((s,b)=>s+b[field]*b.projects,0)/totalProjects:0;
  const difficulty=weighted("difficulty"),seasonal=weighted("seasonal"),propensity=weighted("propensity"),change=weighted("change");
  const title=basins.length===1?basins[0].name:`${basins.length} bassins sélectionnés`;
  const subtitle=basins.length===1?`${basins[0].departmentName} • ${basins[0].regionName}`:`${[...new Set(basins.map(b=>b.departmentName))].join(", ")} • ${[...new Set(basins.map(b=>b.regionName))].join(", ")}`;
  const chips=basins.map(b=>`<span class="territory-chip">${esc(b.name)}</span>`).join("");
  const changeTxt=(change>0?"+":"")+change.toFixed(1)+" %";
  document.getElementById("marketContext").innerHTML=`<div class="market-context"><div class="market-context-head"><div><strong>Marché de l'emploi : ${esc(title)}</strong><div class="hint">${esc(subtitle)} • BMO 2026 France Travail</div><div class="territory-summary">${chips}</div></div><span class="pill info">Le tri retient le meilleur indice parmi les bassins sélectionnés</span></div><div class="market-context-grid"><div><strong>${totalProjects.toLocaleString("fr-FR")}</strong><span>projets BMO cumulés, tous métiers</span></div><div><strong>${difficulty.toFixed(0)} %</strong><span>difficulté moyenne pondérée</span></div><div><strong>${seasonal.toFixed(0)} %</strong><span>saisonnalité moyenne pondérée</span></div><div><strong>${propensity.toFixed(1)} %</strong><span>propension moyenne à recruter</span></div><div><strong>${changeTxt}</strong><span>évolution moyenne pondérée vs 2025</span></div></div></div>`;
}

function showResults(){
  readProfile();
  lastSentDossierRef = null;
  document.getElementById("saveNotice").innerHTML = "";
  goToStep(4);
  renderJobs();
}

function recruitmentTooltipHtml(market){
  if(!market || market.selectedCount<=1) return "";
  const rows=market.markets.map(m=>`
    <span class="market-tooltip-row">
      <strong>${esc(m.basin.name)}</strong> : ${m.index}/100 • ${esc(m.label)}
      <br>Difficulté : ${m.basin.difficulty.toFixed(0)} % • Saisonnier : ${m.basin.seasonal.toFixed(0)} %
    </span>`).join("");
  return `<span class="market-tooltip" tabindex="0" aria-label="Détail du recrutement par bassin">
    <span class="pill good">Recrutement local : ${esc(market.label)} (${market.index}/100) • meilleur bassin : ${esc(market.basin.name)} (${market.selectedCount} zones) ⓘ</span>
    <span class="market-tooltip-content"><span class="market-tooltip-title">Indice de recrutement par bassin</span>${rows}</span>
  </span>`;
}

function renderJobs(){
  if(!profile.skills) readProfile();
  const domain=document.getElementById("domainFilter").value;
  const access=document.getElementById("accessFilter").value;
  const demand=Number(document.getElementById("demandFilter").value);
  const minScore=Number(document.getElementById("scoreFilter").value);
  const sort=document.getElementById("sortFilter").value;
  const showBlocked=document.getElementById("showBlockedJobs")?.checked||false;

  let list=jobs.map(j=>({...j,match:scoreJob(j),market:localMarket(j)}));
  if(!showBlocked) list=list.filter(j=>!j.match.accessibility.blocked);
  if(domain) list=list.filter(j=>j.domain===domain);
  if(access==="no_degree") list=list.filter(j=>j.education===0);
  if(access==="short") list=list.filter(j=>j.training<=6);
  if(access==="training") list=list.filter(j=>j.training>0);
  if(access==="apprenticeship") list=list.filter(j=>j.apprenticeship);
  list=list.filter(j=>j.market.index>=demand && j.match.total>=minScore);

  if(sort==="score") list.sort((a,b)=>b.match.total-a.match.total);
  if(sort==="demand") list.sort((a,b)=>b.market.index-a.market.index || b.match.total-a.match.total);
  if(sort==="training") list.sort((a,b)=>a.training-b.training);
  if(sort==="salary") list.sort((a,b)=>b.salary-a.salary);
  if(sort==="interest") list.sort((a,b)=>b.match.interestBonus-a.match.interestBonus || b.match.total-a.match.total);

  const all=jobs.map(j=>({...j,match:scoreJob(j),market:localMarket(j)}));
  renderMarketContext();
  const eligible=all.filter(j=>!j.match.accessibility.blocked);
  const blockedCount=all.length-eligible.length;
  const avg=eligible.length?Math.round(eligible.reduce((s,j)=>s+j.match.total,0)/eligible.length):0;
  const strong=eligible.filter(j=>j.match.total>=70).length;
  const best=[...eligible].sort((a,b)=>b.match.total-a.match.total)[0];
  document.getElementById("kpis").innerHTML=`
    <div class="box"><div class="num">${strong}</div><div class="lbl">métiers à ≥ 70 %</div></div>
    <div class="box"><div class="num">${avg}%</div><div class="lbl">compatibilité moyenne</div></div>
    <div class="box"><div class="num">${blockedCount}</div><div class="lbl">métiers écartés par limitations déclarées</div></div>
    <div class="box"><div class="num">${best?best.title:"-"}</div><div class="lbl">meilleure piste actuelle</div></div>`;

  const container=document.getElementById("jobList");
  if(!list.length){
    container.innerHTML=`<div class="empty">Aucun métier ne correspond aux filtres actuels.</div>`;
    return;
  }
  container.innerHTML=list.map(j=>{
    const demandLabel=j.market.label;
    const trainingLabel=j.training===0?"Aucune":j.training===1?"Très courte":j.training+" mois";
    return `
      <div class="job-card">
        <div class="job-head">
          <div>
            <div class="job-domain">${j.domain}</div>
            <div class="job-title">${j.title}</div>
            <div class="hint">${j.access}</div>
          </div>
          <div class="score">${j.match.total}%</div>
        </div>
        <div class="job-meta">
          ${j.market.selectedCount>1?recruitmentTooltipHtml(j.market):`<span class="pill good">Recrutement local : ${demandLabel} (${j.market.index}/100) • ${j.market.basin.name}</span>`}
          <span class="pill">${j.apprenticeship?"Alternance possible":"Alternance non renseignée"}</span>
          <span class="pill">Formation : ${trainingLabel}</span>
          <span class="pill">Évolution : ${j.evol}/10</span>
          <span class="pill">Salaire indicatif : ${j.salary} €</span>
          ${j.match.accessibility.status==="blocked"?`<span class="compat-badge compat-block">Écarté : limitation déclarée</span>`:
             j.match.accessibility.status==="check"?`<span class="compat-badge compat-check">Aptitude réglementée à vérifier</span>`:
             j.match.accessibility.status==="adjust"?`<span class="compat-badge compat-adjust">Aménagement à vérifier</span>`:
             `<span class="compat-badge compat-ok">Aucune incompatibilité déclarée</span>`}
          ${j.match.interestBonus?`<span class="pill info">+${j.match.interestBonus} affinité loisirs</span>`:""}
          ${j.match.experienceBonus?`<span class="pill info">+${j.match.experienceBonus} expérience conditions</span>`:""}
          ${j.match.qualityBonus?`<span class="pill good">+${j.match.qualityBonus} qualités</span>`:""}
          ${j.match.defectPenalty?`<span class="pill warn">-${j.match.defectPenalty} défauts à surveiller</span>`:""}
          ${j.match.conflicts?`<span class="pill warn">${j.match.conflicts} contrainte forte à vérifier</span>`:""}
        </div>
        <div class="matchbar"><div style="width:${j.match.total}%"></div></div>
        <div style="margin-top:12px;display:flex;justify-content:flex-end">
          <button class="btn ghost" onclick="toggleDetails(${j.id})">Pourquoi ce score ?</button>
        </div>
        <div class="details" id="details_${j.id}">
          <div class="details-grid">
            <div class="summary-card">
              <strong>Détail de compatibilité</strong>
              <ul class="small-list">
                ${Object.entries(j.match.breakdown).map(([k,v])=>`<li>${k} : <strong>${v}%</strong></li>`).join("")}
                <li>Score principal : <strong>${j.match.base}%</strong></li>
                <li>Bonus loisirs : <strong>+${j.match.interestBonus}</strong></li>
                <li>Bonus expérience de travail : <strong>+${j.match.experienceBonus}</strong></li>
                <li>Bonus qualités : <strong>+${j.match.qualityBonus}</strong></li>
                <li>Impact défauts : <strong>-${j.match.defectPenalty}</strong></li>
                <li>Impact handicap / limitations : <strong>-${j.match.accessibilityPenalty}</strong></li>
              </ul>
              ${j.match.accessibility.hard.length||j.match.accessibility.warnings.length?`<div class="accessibility-note ${j.match.accessibility.blocked?"accessibility-blocked":""}">
                <strong>${j.match.accessibility.label}</strong>
                <ul class="small-list">
                  ${j.match.accessibility.hard.map(x=>`<li>${x}</li>`).join("")}
                  ${j.match.accessibility.warnings.map(x=>`<li>${x}</li>`).join("")}
                </ul>
              </div>`:""}
            </div>
            <div class="summary-card">
              <strong>Compétences déjà présentes</strong>
              <ul class="small-list">
                ${(j.match.matchedSkills.length?j.match.matchedSkills:["Aucune correspondance sélectionnée"]).map(x=>`<li>${x}</li>`).join("")}
              </ul>
            </div>
            <div class="summary-card">
              <strong>À développer</strong>
              <ul class="small-list">
                ${j.skills.filter(s=>!profile.skills.includes(s)).slice(0,6).map(x=>`<li>${x}</li>`).join("") || "<li>Peu d'écarts identifiés</li>"}
              </ul>
            </div>
            <div class="market-card">
              <strong>Marché de l'emploi local</strong>
              <div class="market-index">${j.market.index}/100 • ${j.market.label}</div>
              ${j.market.selectedCount>1?`<div class="hint">Indice retenu : meilleur bassin parmi ${j.market.selectedCount} zones sélectionnées. Moyenne des zones : ${j.market.averageIndex}/100.</div>`:""}
              <div class="market-grid">
                <div><strong>${j.market.basin.projects.toLocaleString("fr-FR")}</strong><span>projets BMO du bassin, tous métiers</span></div>
                <div><strong>${j.market.basin.difficulty.toFixed(0)} %</strong><span>difficulté de recrutement du bassin</span></div>
                <div><strong>${j.market.basin.seasonal.toFixed(0)} %</strong><span>part saisonnière du bassin</span></div>
                <div><strong>${j.market.nonSeasonal.toFixed(0)} %</strong><span>part non saisonnière</span></div>
                <div><strong>${j.market.basin.propensity.toFixed(1)} %</strong><span>propension à recruter</span></div>
                <div><strong>${j.market.basin.change>0?"+":""}${j.market.basin.change.toFixed(1)} %</strong><span>évolution vs 2025</span></div>
              </div>
              ${j.market.selectedCount>1?`<div class="summary-card" style="margin-top:10px"><strong>Détail par bassin sélectionné</strong><ul class="small-list">${j.market.markets.map(m=>`<li>${m.basin.name} : <strong>${m.index}/100</strong> • ${m.label}</li>`).join("")}</ul></div>`:""}
              <div class="market-source">BMO 2026 France Travail : données territoriales réelles des bassins. Dans ce prototype, la couche fine « métier × bassin » de l'indice est encore simulée à partir du profil métier de démonstration. La version connectée utilisera BMO par FAP et Data Emploi / ROME pour les offres récentes.</div>
            </div>
            <div class="summary-card">
              <strong>Évolutions possibles</strong>
              <ul class="small-list">${j.evolution.map(x=>`<li>${x}</li>`).join("")}</ul>
            </div>
            <div class="summary-card">
              <strong>Affinité loisirs</strong>
              <ul class="small-list">${j.match.interestMatches.length?j.match.interestMatches.map(x=>`<li>${hobbyOptions.find(h=>h[0]===x)?.[1]||x}</li>`).join(""):"<li>Aucune affinité détectée. Aucun point n'est retiré.</li>"}</ul>
            </div>
            <div class="summary-card">
              <strong>Expérience des conditions de travail</strong>
              <ul class="small-list">${j.match.experienceMatches.length?j.match.experienceMatches.map(x=>`<li>${experienceOptions.find(h=>h[0]===x)?.[1]||x}</li>`).join(""):"<li>Aucune correspondance déclarée. Aucun point n'est retiré.</li>"}</ul>
            </div>
            <div class="summary-card">
              <strong>Qualités et points de vigilance</strong>
              <ul class="small-list">
                ${j.match.qualityMatches.length?j.match.qualityMatches.map(x=>`<li>Qualité : ${qualityOptions.find(h=>h[0]===x)?.[1]||x}</li>`).join(""):"<li>Aucun bonus qualité spécifique.</li>"}
                ${j.match.defectMatches.length?j.match.defectMatches.map(x=>`<li>À surveiller : ${defectOptions.find(h=>h[0]===x)?.[1]||x}</li>`).join(""):"<li>Aucun défaut en conflit direct détecté.</li>"}
              </ul>
            </div>
          </div>
        </div>
      </div>`;
  }).join("");
}
function toggleDetails(id){
  document.getElementById("details_"+id).classList.toggle("open");
}

function updateAdvisorOptions(){
  const inst=institutions.find(i=>i.id===document.getElementById("institution").value);
  const sel=document.getElementById("advisor");
  sel.innerHTML='<option value="">Aucun / je ne sais pas</option>';
  if(inst) sel.innerHTML += inst.advisors.map(a=>`<option value="${a.id}">${a.firstName} ${a.lastName}</option>`).join("");
}
function getDossiers(){try{return JSON.parse(localStorage.getItem("orientationProDossiers")||"[]")}catch(e){return[]}}
function setDossiers(x){localStorage.setItem("orientationProDossiers",JSON.stringify(x))}
function seedDemoDossiers(){
  if(localStorage.getItem("orientationProSeeded")) return;
  setDossiers([
    {ref:"ORI-7F3K-2PA",date:"2026-09-11T09:20:00",firstName:"Camille",lastName:"Martin",age:31,education:2,disabilitiesSelected:[],functionalLimits:[],disabilityNotes:"",regionId:"normandie",departmentCode:"14",employmentAreaId:"caen",employmentArea:"Caen",institutionId:"enefa-caen",advisorId:"cyril-brunet",skills:["Utiliser des outils numériques","Résoudre des problèmes","Organiser son travail"],soft:["Curiosité","Patience","Autonomie"],hobbiesSelected:["video_games","computing","strategy_games"],weaknesses:"",results:[{title:"Technicien support informatique",score:91},{title:"Médiateur numérique",score:86}]},
    {ref:"ORI-Q9D4-8LM",date:"2026-09-09T14:10:00",firstName:"Sophie",lastName:"Leclerc",age:42,education:2,disabilitiesSelected:[],functionalLimits:[],disabilityNotes:"",regionId:"normandie",departmentCode:"14",employmentAreaId:"caen",employmentArea:"Caen",institutionId:"enefa-caen",advisorId:"cyril-brunet",skills:["Accueillir du public","Conseiller une personne","Rédiger des documents"],soft:["Écoute","Diplomatie","Organisation"],hobbiesSelected:["reading","social","writing"],weaknesses:"",results:[{title:"Conseiller en insertion professionnelle",score:89},{title:"Assistant ressources humaines",score:84}]},
    {ref:"ORI-L2X8-1BC",date:"2026-09-03T10:40:00",firstName:"Julien",lastName:"Morel",age:27,education:1,disabilitiesSelected:[],functionalLimits:[],disabilityNotes:"",regionId:"normandie",departmentCode:"14",employmentAreaId:"caen",employmentArea:"Caen",institutionId:"enefa-caen",advisorId:"alain-langlois",skills:["Réparer / entretenir","Travailler manuellement","Résoudre des problèmes"],soft:["Autonomie","Rigueur","Curiosité"],hobbiesSelected:["mechanics","diy","science"],weaknesses:"",results:[{title:"Mécanicien automobile",score:93},{title:"Agent de maintenance",score:88}]}
  ]); localStorage.setItem("orientationProSeeded","1");
}
function makeRef(){const c="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",p=n=>Array.from({length:n},()=>c[Math.floor(Math.random()*c.length)]).join("");return `ORI-${p(4)}-${p(3)}`}
function buildDossierFromCurrentProfile(){
  readProfile();
  const ranked=jobs.map(j=>({...j,match:scoreJob(j),market:localMarket(j)})).filter(j=>!j.match.accessibility.blocked).sort((a,b)=>b.match.total-a.match.total).slice(0,10);
  return {...profile,ref:makeRef(),date:new Date().toISOString(),results:ranked.map(j=>({title:j.title,score:j.match.total,interestBonus:j.match.interestBonus,experienceBonus:j.match.experienceBonus,qualityBonus:j.match.qualityBonus,defectPenalty:j.match.defectPenalty,marketIndex:j.market.index,marketLabel:j.market.label,marketBasin:j.market.basin.name,marketBasins:j.market.markets.map(m=>({name:m.basin.name,index:m.index,label:m.label}))}))};
}
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function labelsFrom(keys,options){return (keys||[]).map(k=>options.find(o=>o[0]===k)?.[1]||k)}
function preferenceLabel(v){return ({want:"Je préfère",neutral:"Peu importe",avoid:"À éviter",impossible:"Impossible"})[v]||v}
function downloadableDossierHtml(d, heading){
  const inst=institutions.find(i=>i.id===d.institutionId),adv=inst?.advisors.find(a=>a.id===d.advisorId);
  const list=items=>items?.length?`<ul>${items.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:"<p>Non renseigné</p>";
  const prefs=Object.entries(d.prefs||{}).map(([k,v])=>`${preferenceOptions.find(p=>p[0]===k)?.[1]||k} : ${preferenceLabel(v)}`);
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${esc(heading)}</title><style>body{font-family:Arial,sans-serif;max-width:900px;margin:40px auto;padding:0 24px;color:#172033}h1{margin-bottom:4px}h2{margin-top:28px;border-bottom:1px solid #ddd;padding-bottom:7px}p,li{line-height:1.5}.meta{color:#667085}.score{font-weight:700}.box{background:#f6f7f9;border:1px solid #ddd;border-radius:10px;padding:14px;margin:10px 0}@media print{body{margin:0;max-width:none}.box{break-inside:avoid}}</style></head><body>
  <h1>${esc(heading)}</h1><p class="meta">${esc(d.firstName)} ${esc(d.lastName)} • ${esc(d.ref||"")} • ${new Date(d.date||Date.now()).toLocaleString("fr-FR")}</p>
  <h2>Profil</h2><div class="box"><p><strong>Âge :</strong> ${esc(d.age||"Non renseigné")}</p><p><strong>Situation :</strong> ${esc(d.situation||"Non renseignée")}</p><p><strong>Handicap(s) :</strong> ${esc(labelsFrom(d.disabilitiesSelected,disabilityOptions).join(", ")||"Non renseigné")}</p><p><strong>Impacts fonctionnels :</strong> ${esc(labelsFrom(d.functionalLimits,functionalLimitOptions).join(", ")||"Aucun renseigné")}</p><p><strong>Précisions / aménagements :</strong> ${esc(d.disabilityNotes||"Non renseignés")}</p><p><strong>Bassin(s) d'emploi :</strong> ${esc((d.employmentAreas&&d.employmentAreas.length?d.employmentAreas.join(", "):d.employmentArea)||"Non renseigné")}</p><p><strong>Établissement :</strong> ${esc(inst?.name||"Non renseigné")}</p><p><strong>Conseiller :</strong> ${esc(adv?adv.firstName+" "+adv.lastName:"Non renseigné")}</p></div>
  <h2>Aptitudes</h2><h3>Savoir-faire</h3>${list(d.skills)}<h3>Savoir-être</h3>${list(d.soft)}<h3>Qualités</h3>${list(labelsFrom(d.qualitiesSelected,qualityOptions))}<h3>Défauts / points de vigilance</h3>${list(labelsFrom(d.defectsSelected,defectOptions))}
  <h2>Expérience et centres d'intérêt</h2><h3>Loisirs</h3>${list(labelsFrom(d.hobbiesSelected,hobbyOptions))}<h3>Conditions de travail déjà pratiquées</h3>${list(labelsFrom(d.experienceSelected,experienceOptions))}
  <h2>Préférences</h2>${list(prefs)}<p><strong>Salaire minimum souhaité :</strong> ${esc(d.salary||0)} € net mensuel approximatif</p>
  <h2>Résultats</h2>${(d.results||[]).map((r,i)=>`<div class="box"><span class="score">${i+1}. ${esc(r.title)} : ${esc(r.score)} %</span>${r.interestBonus?`<br>Bonus loisirs : +${esc(r.interestBonus)}`:""}${r.experienceBonus?`<br>Bonus expérience : +${esc(r.experienceBonus)}`:""}${r.marketIndex?`<br>Recrutement local (${esc(r.marketBasin||d.employmentArea||"")}) : ${esc(r.marketIndex)}/100 • ${esc(r.marketLabel||"")}`:""}</div>`).join("")||"<p>Aucun résultat.</p>"}
  <p class="meta">Document généré par le prototype Orientation Pro V0.9. Les données métier du prototype sont des données de démonstration.</p></body></html>`;
}
function downloadHtmlFile(filename,html){
  const blob=new Blob([html],{type:"text/html;charset=utf-8"});
  const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),500);
}
function safeFilename(v){return String(v||"resultats").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9_-]+/g,"_").replace(/^_+|_+$/g,"")}
function downloadCurrentResults(){
  const d=buildDossierFromCurrentProfile();
  if(!d.firstName&&!d.lastName){d.firstName="Beneficiaire"}
  downloadHtmlFile(`Orientation_Pro_${safeFilename(d.firstName+"_"+d.lastName)}_${new Date().toISOString().slice(0,10)}.html`,downloadableDossierHtml(d,"Mes résultats Orientation Pro"));
}
function sendResultsToAdvisor(){
  readProfile(); const box=document.getElementById("saveNotice");
  if(!profile.firstName||!profile.lastName){box.innerHTML='<div class="notice">Renseignez au minimum un prénom et un nom avant d\'envoyer les résultats.</div>';return}
  const inst=institutions.find(i=>i.id===profile.institutionId),adv=inst?.advisors.find(a=>a.id===profile.advisorId);
  if(!adv){box.innerHTML='<div class="notice">Aucun conseiller n\'est sélectionné. Revenez au profil pour choisir votre établissement et votre conseiller, ou utilisez « Télécharger mes résultats » pour les conserver.</div>';return}
  if(lastSentDossierRef){box.innerHTML=`<div class="success">Les résultats ont déjà été envoyés à <strong>${esc(adv.firstName)} ${esc(adv.lastName)}</strong>. Référence : <span class="codebox">${esc(lastSentDossierRef)}</span></div>`;return}
  const d=buildDossierFromCurrentProfile();
  const arr=getDossiers();arr.unshift(d);setDossiers(arr);lastSentDossierRef=d.ref;
  box.innerHTML=`<div class="success">Résultats envoyés à <strong>${esc(adv.firstName)} ${esc(adv.lastName)}</strong>, ${esc(inst.name)}.<br><br>Référence : <span class="codebox">${esc(d.ref)}</span></div>`;window.scrollTo({top:0,behavior:"smooth"});
}
function proposeSkillDiscovery(){
  const ok=confirm("Ouvrir le module « Connaître MES compétences » ?\n\nVotre progression actuelle dans le questionnaire sera conservée. Ce module est complémentaire et peut être utilisé indépendamment.");
  if(ok) showSkillDiscovery();
}
function showSkillDiscovery(){
  document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
  document.getElementById("skillDiscoverySection").classList.add("active");
  document.getElementById("beneficiaryMode").classList.remove("active");
  document.getElementById("skillsMode").classList.add("active");
  document.getElementById("advisorMode").classList.remove("active");
  document.querySelectorAll(".step").forEach(s=>s.classList.remove("active","done"));
  document.getElementById("pageTitle").textContent="Connaître MES compétences";
  document.getElementById("pageSubtitle").textContent="Retrouvez les compétences potentiellement acquises grâce à vos expériences professionnelles.";
  renderSelectedPastJobs();
  window.scrollTo({top:0,behavior:"smooth"});
}
function addPastJob(){
  const id=Number(document.getElementById("pastJobSelect").value);
  if(!id || selectedPastJobIds.includes(id)) return;
  selectedPastJobIds.push(id);
  document.getElementById("pastJobSelect").value="";
  renderSelectedPastJobs();
}
function removePastJob(id){
  selectedPastJobIds=selectedPastJobIds.filter(x=>x!==id);
  renderSelectedPastJobs();
  if(!selectedPastJobIds.length) document.getElementById("skillDiscoveryResults").innerHTML='<div class="empty">Ajoutez au moins un métier que vous avez exercé pour commencer.</div>';
}
function renderSelectedPastJobs(){
  const box=document.getElementById("selectedPastJobs");
  if(!box) return;
  box.innerHTML=selectedPastJobIds.length?selectedPastJobIds.map(id=>{const j=jobs.find(x=>x.id===id);return `<span class="selected-job">${j?.title||id}<button title="Retirer" onclick="removePastJob(${id})">×</button></span>`}).join(""):'<span class="hint">Aucun métier ajouté.</span>';
}
function aggregatePotential(itemsKey){
  const map=new Map();
  selectedPastJobIds.forEach(id=>{
    const job=jobs.find(j=>j.id===id); if(!job) return;
    (job[itemsKey]||[]).forEach(item=>{
      if(!map.has(item)) map.set(item,{name:item,count:0,jobs:[]});
      const entry=map.get(item); entry.count++; entry.jobs.push(job.title);
    });
  });
  return [...map.values()].sort((a,b)=>b.count-a.count || a.name.localeCompare(b.name,"fr"));
}
function analyzePastJobs(){
  const out=document.getElementById("skillDiscoveryResults");
  if(!selectedPastJobIds.length){out.innerHTML='<div class="notice">Ajoutez au moins un métier avant de lancer l\'analyse.</div>';return}
  const skills=aggregatePotential("skills"), soft=aggregatePotential("soft");
  const card=(x,type,i)=>`<div class="competency-card"><label><input type="checkbox" name="discovered_${type}" value="${esc(x.name)}" checked><span>${esc(x.name)}</span></label><div class="competency-source">Associé à ${x.count}/${selectedPastJobIds.length} métier(s) sélectionné(s) : ${x.jobs.map(esc).join(", ")}</div></div>`;
  out.innerHTML=`
    <div class="success"><strong>${skills.length}</strong> savoir-faire et <strong>${soft.length}</strong> savoir-être potentiels identifiés. Décochez ceux que vous estimez ne pas avoir réellement pratiqués ou acquis.</div>
    <div class="competency-group"><h3 class="subheading">Savoir-faire potentiellement acquis</h3><div class="competency-list">${skills.map((x,i)=>card(x,"skill",i)).join("")||'<div class="empty">Aucun savoir-faire identifié.</div>'}</div></div>
    <div class="competency-group"><h3 class="subheading">Savoir-être potentiellement mobilisés</h3><div class="competency-list">${soft.map((x,i)=>card(x,"soft",i)).join("")||'<div class="empty">Aucun savoir-être identifié.</div>'}</div></div>
    <div class="actions" style="justify-content:flex-end"><button class="btn secondary" onclick="downloadSkillDiscovery()">Télécharger cette liste</button><button class="btn primary" onclick="applyDiscoveredSkills()">Ajouter les éléments cochés à mon orientation</button></div>`;
}
function applyDiscoveredSkills(){
  const skills=[...document.querySelectorAll('input[name="discovered_skill"]:checked')].map(x=>x.value);
  const soft=[...document.querySelectorAll('input[name="discovered_soft"]:checked')].map(x=>x.value);
  skills.forEach(v=>{const el=[...document.querySelectorAll('input[name="skills"]')].find(x=>x.value===v);if(el)el.checked=true});
  soft.forEach(v=>{const el=[...document.querySelectorAll('input[name="soft"]')].find(x=>x.value===v);if(el)el.checked=true});
  goToStep(1);
  window.scrollTo({top:0,behavior:"smooth"});
}
function downloadSkillDiscovery(){
  const skills=[...document.querySelectorAll('input[name="discovered_skill"]:checked')].map(x=>x.value);
  const soft=[...document.querySelectorAll('input[name="discovered_soft"]:checked')].map(x=>x.value);
  if(!skills.length&&!soft.length){alert("Aucune compétence n'est cochée.");return}
  const oldJobs=selectedPastJobIds.map(id=>jobs.find(j=>j.id===id)?.title).filter(Boolean);
  const list=items=>items.length?`<ul>${items.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:"<p>Aucun élément sélectionné.</p>";
  const html=`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Mes compétences potentielles</title><style>body{font-family:Arial,sans-serif;max-width:850px;margin:40px auto;padding:0 24px;color:#172033}h2{margin-top:28px}li{line-height:1.5}.note{color:#667085}</style></head><body><h1>Mes compétences potentielles</h1><p class="note">Document généré par Orientation Pro V0.8. Ces compétences sont des hypothèses à confirmer à partir des métiers exercés.</p><h2>Métiers exercés</h2>${list(oldJobs)}<h2>Savoir-faire potentiels</h2>${list(skills)}<h2>Savoir-être potentiels</h2>${list(soft)}</body></html>`;
  downloadHtmlFile(`Orientation_Pro_Mes_competences_${new Date().toISOString().slice(0,10)}.html`,html);
}

function showAdvisorLogin(){
  document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));document.getElementById("advisorLoginSection").classList.add("active");
  document.getElementById("beneficiaryMode").classList.remove("active");document.getElementById("skillsMode").classList.remove("active");document.getElementById("advisorMode").classList.add("active");
  document.querySelectorAll(".step").forEach(s=>s.classList.remove("active","done"));
  document.getElementById("pageTitle").textContent="Espace conseiller";document.getElementById("pageSubtitle").textContent="Connexion requise pour consulter les dossiers bénéficiaires.";
}
function advisorLogin(){
  const u=document.getElementById("loginUser").value.trim().toLowerCase(),p=document.getElementById("loginPass").value;let adv=null,inst=null;
  institutions.forEach(i=>i.advisors.forEach(a=>{if(a.login===u){adv=a;inst=i}}));
  if(adv&&p==="demo"){currentAdvisor={...adv,institutionId:inst.id,institutionName:inst.name};document.getElementById("loginError").textContent="";showAdvisorDashboard()}else document.getElementById("loginError").textContent="Identifiant ou mot de passe incorrect.";
}
function advisorLogout(){currentAdvisor=null;showAdvisorLogin()}
function showAdvisorDashboard(){
  document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));document.getElementById("advisorDashboardSection").classList.add("active");
  document.getElementById("pageTitle").textContent=`Bonjour ${currentAdvisor.firstName} ${currentAdvisor.lastName}`;document.getElementById("pageSubtitle").textContent=currentAdvisor.institutionName;renderAdvisorDashboard();
}
function renderAdvisorDashboard(){
  const q=(document.getElementById("dossierSearch")?.value||"").toLowerCase();const all=getDossiers().filter(d=>d.advisorId===currentAdvisor.id);const list=all.filter(d=>(`${d.firstName} ${d.lastName} ${d.ref}`).toLowerCase().includes(q));
  document.getElementById("advisorHeader").innerHTML=`<strong style="font-size:20px">${currentAdvisor.firstName} ${currentAdvisor.lastName}</strong><div class="hint">${currentAdvisor.institutionName} • Conseiller d'insertion</div>`;
  const avg=all.length?Math.round(all.reduce((s,d)=>s+(d.results?.[0]?.score||0),0)/all.length):0;document.getElementById("advisorStats").innerHTML=`<div class="stat"><strong>${all.length}</strong><span class="hint">dossiers rattachés</span></div><div class="stat"><strong>${avg}%</strong><span class="hint">score moyen de la meilleure piste</span></div>`;
  document.getElementById("dossierRows").innerHTML=list.length?list.map(d=>`<tr><td><strong>${d.firstName} ${d.lastName}</strong></td><td>${d.age||"-"}</td><td>${new Date(d.date).toLocaleDateString("fr-FR")}</td><td>${d.ref}</td><td>${d.results?.[0]?.title||"-"} ${d.results?.[0]?.score?`(${d.results[0].score} %)` : ""}</td><td><div class="table-actions"><button class="link-btn" onclick="openDossier('${d.ref}')">Ouvrir</button><button class="link-btn" onclick="downloadDossier('${d.ref}')">Télécharger</button><button class="link-btn danger-link" onclick="deleteDossier('${d.ref}')">Supprimer</button></div></td></tr>`).join(""):'<tr><td colspan="6"><div class="empty">Aucun dossier trouvé.</div></td></tr>';
}
function downloadDossier(ref){
  const d=getDossiers().find(x=>x.ref===ref);if(!d)return;
  downloadHtmlFile(`Dossier_Orientation_Pro_${safeFilename(d.firstName+"_"+d.lastName)}_${safeFilename(d.ref)}.html`,downloadableDossierHtml(d,"Dossier Orientation Pro"));
}
function deleteDossier(ref){
  const d=getDossiers().find(x=>x.ref===ref);if(!d)return;
  const ok=confirm(`Supprimer définitivement le dossier de ${d.firstName} ${d.lastName} (${d.ref}) ?\n\nCette action est irréversible dans ce prototype.`);
  if(!ok)return;
  setDossiers(getDossiers().filter(x=>x.ref!==ref));
  if(document.getElementById("dossierModal").classList.contains("open")) closeModal();
  renderAdvisorDashboard();
}
function openDossier(ref){
  const d=getDossiers().find(x=>x.ref===ref);if(!d)return;const inst=institutions.find(i=>i.id===d.institutionId),adv=inst?.advisors.find(a=>a.id===d.advisorId);
  document.getElementById("modalTitle").textContent=`${d.firstName} ${d.lastName}`;document.getElementById("modalSubtitle").textContent=`${d.ref} • ${new Date(d.date).toLocaleString("fr-FR")}`;
  document.getElementById("modalBody").innerHTML=`<div class="details-grid"><div class="summary-card"><strong>Profil</strong><ul class="small-list"><li>Âge : ${d.age||"-"}</li><li>Handicap(s) : ${esc(labelsFrom(d.disabilitiesSelected,disabilityOptions).join(", ")||"Non renseigné")}</li><li>Impacts fonctionnels : ${esc(labelsFrom(d.functionalLimits,functionalLimitOptions).join(", ")||"Aucun renseigné")}</li><li>Précisions / aménagements : ${esc(d.disabilityNotes||"Non renseignés")}</li><li>Bassin(s) d'emploi : ${(d.employmentAreas&&d.employmentAreas.length?d.employmentAreas.join(", "):d.employmentArea)||"Non renseigné"}</li><li>Établissement : ${inst?.name||"Non renseigné"}</li><li>Conseiller : ${adv?adv.firstName+" "+adv.lastName:"Non renseigné"}</li></ul></div><div class="summary-card"><strong>Savoir-faire</strong><ul class="small-list">${(d.skills||[]).map(x=>`<li>${x}</li>`).join("")||"<li>Aucun</li>"}</ul></div><div class="summary-card"><strong>Savoir-être</strong><ul class="small-list">${(d.soft||[]).map(x=>`<li>${x}</li>`).join("")||"<li>Aucun</li>"}</ul></div><div class="summary-card"><strong>Qualités</strong><ul class="small-list">${(d.qualitiesSelected||[]).map(x=>`<li>${qualityOptions.find(h=>h[0]===x)?.[1]||x}</li>`).join("")||"<li>Aucune</li>"}</ul></div><div class="summary-card"><strong>Défauts</strong><ul class="small-list">${(d.defectsSelected||[]).map(x=>`<li>${defectOptions.find(h=>h[0]===x)?.[1]||x}</li>`).join("")||"<li>Aucun</li>"}</ul></div><div class="summary-card"><strong>Loisirs</strong><ul class="small-list">${(d.hobbiesSelected||[]).map(x=>`<li>${hobbyOptions.find(h=>h[0]===x)?.[1]||x}</li>`).join("")||"<li>Aucun</li>"}</ul></div><div class="summary-card"><strong>Conditions déjà pratiquées</strong><ul class="small-list">${(d.experienceSelected||[]).map(x=>`<li>${experienceOptions.find(h=>h[0]===x)?.[1]||x}</li>`).join("")||"<li>Aucune</li>"}</ul></div><div class="summary-card"><strong>Résultats</strong><ol class="small-list">${(d.results||[]).map(r=>`<li>${r.title} : <strong>${r.score}%</strong>${r.marketIndex?` • recrutement local ${r.marketIndex}/100 (${r.marketLabel||""})`:""}</li>`).join("")}</ol></div></div><div class="actions" style="justify-content:flex-end"><button class="btn secondary" onclick="downloadDossier('${d.ref}')">Télécharger ce dossier</button><button class="btn danger" onclick="deleteDossier('${d.ref}')">Supprimer ce dossier</button></div>`;
  document.getElementById("dossierModal").classList.add("open");
}
function closeModal(){document.getElementById("dossierModal").classList.remove("open")}

init();
