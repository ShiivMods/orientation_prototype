/**
 * JusteCap / Orientation Pro - demo application
 * Browser UI, navigation, exports and demo-only local persistence.
 */

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


let currentStep=0;
let currentAdvisor=null;
let profile={};
let lastSentDossierRef=null;
let selectedPastJobIds=[];
let selectedSkillMacroState=new Set();
let skillDiscoveryReturnStep=1;

function escAttr(value){
  return String(value??"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
function normalizeSearchText(value){
  return String(value??"")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .toLocaleLowerCase("fr")
    .replace(/[’']/g," ")
    .replace(/[^a-z0-9+\-/. ]+/g," ")
    .replace(/\s+/g," ")
    .trim();
}
function skillSearchHaystack(skill){
  return normalizeSearchText([skill.label,skill.base,skill.categoryLabel,...(skill.details||[])].join(" "));
}
function renderSkillRow(skill){
  const checked=selectedSkillMacroState.has(skill.id)?" checked":"";
  return `<div class="skill-row">
    <div class="skill-main">
      <input type="checkbox" id="macro_${escAttr(skill.id)}" value="${escAttr(skill.id)}" name="skillMacros"${checked} onchange="toggleSkillMacroState('${escAttr(skill.id)}',this.checked)">
      <label for="macro_${escAttr(skill.id)}">${esc(skill.label)}</label>
    </div>
    <div class="skill-detail-list">${(skill.details||[]).map(detail=>`• ${esc(detail)}`).join("<br>")}</div>
  </div>`;
}
function renderSkillBrowser(){
  const host=document.getElementById("skillsBrowser");
  if(!host) return;
  const input=document.getElementById("skillSearch");
  const query=normalizeSearchText(input?.value||"");
  const terms=query.split(" ").filter(Boolean);
  const status=document.getElementById("skillSearchStatus");

  if(query){
    const hits=skillTaxonomy.filter(skill=>{
      const haystack=skillSearchHaystack(skill);
      return terms.every(term=>haystack.includes(term));
    });
    const groups=[...new Map(hits.map(skill=>[skill.category,skill.categoryLabel])).entries()];
    host.innerHTML=hits.length
      ? `<div class="skill-search-results">${groups.map(([category,label])=>{
          const items=hits.filter(skill=>skill.category===category);
          return `<div class="skill-search-group-title">${esc(label)} • ${items.length} résultat${items.length>1?"s":""}</div>${items.map(renderSkillRow).join("")}`;
        }).join("")}</div>`
      : `<div class="empty">Aucune compétence trouvée pour « ${esc(input?.value||"")} ».</div>`;
    if(status) status.innerHTML=hits.length
      ? `<strong>${hits.length}</strong> compétence${hits.length>1?"s":""} trouvée${hits.length>1?"s":""}. La recherche porte aussi sur les 668 précisions.`
      : "Aucun résultat. Essayez un terme plus général ou un outil, par exemple Excel, accueil, conduite, soudage ou JavaScript.";
  }else{
    const categories=[...new Map(skillTaxonomy.map(skill=>[skill.category,skill.categoryLabel])).entries()];
    host.innerHTML=categories.map(([category,label])=>{
      const items=skillTaxonomy.filter(skill=>skill.category===category);
      return `<details class="skill-category"><summary><span>${esc(label)}</span><span class="hint">${items.length} compétences</span></summary><div class="skill-category-body">${items.map(renderSkillRow).join("")}</div></details>`;
    }).join("");
    if(status) status.textContent="Recherchez un terme précis ou ouvrez une catégorie. Les catégories restent repliées pour éviter de surcharger l'écran.";
  }

  host.classList.toggle("show-skill-details",document.getElementById("showSkillDetails")?.checked||false);
  updateSkillSelectionCount();
}
function filterSkillBrowser(){renderSkillBrowser()}
function clearSkillSearch(){
  const input=document.getElementById("skillSearch");
  if(input) input.value="";
  renderSkillBrowser();
}
function toggleSkillMacroState(id,checked){
  if(checked) selectedSkillMacroState.add(id); else selectedSkillMacroState.delete(id);
  updateSkillSelectionCount();
}
function toggleSkillDetails(){
  document.getElementById("skillsBrowser")?.classList.toggle("show-skill-details",document.getElementById("showSkillDetails")?.checked||false);
}
function updateSkillSelectionCount(){
  const el=document.getElementById("skillSelectionCount");
  if(el) el.textContent=`${selectedSkillMacroState.size} sélectionnée${selectedSkillMacroState.size>1?"s":""}`;
}
function selectedSkillMacroIds(){return [...selectedSkillMacroState]}
function selectedSkillBases(){
  return [...new Set([...selectedSkillMacroState].map(id=>skillById.get(id)?.base).filter(Boolean))];
}

function init(){
  document.documentElement.dataset.jobCount=String(jobs.length);
  restorePastJobs();
  document.getElementById("steps").innerHTML = steps.map((s,i)=>`
    <div class="step ${i===0?'active':''}" data-stepnav="${i}">
      <div class="step-num">${i+1}</div><div><strong>${s[0]}</strong><br><span style="font-size:11px">${s[1]}</span></div>
    </div>`).join("");

  renderSkillBrowser();
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
  document.getElementById("pastJobList").innerHTML = jobs.slice().sort((a,b)=>a.title.localeCompare(b.title,"fr")).map(j=>`<option value="${escAttr(j.title)}"></option>`).join("");
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
    const aptitudeCount=selectedSkillMacroState.size+document.querySelectorAll(
      'input[name="soft"]:checked, input[name="qualitiesSelected"]:checked, input[name="defectsSelected"]:checked'
    ).length;
    if(aptitudeCount<1){
      const box=document.getElementById("aptitudeValidation");
      box.textContent="Sélectionnez au moins une aptitude, parmi les savoir-faire, savoir-être, qualités ou points de vigilance, avant de continuer.";
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
    skillMacros:selectedSkillMacroIds(),
    skillBases:selectedSkillBases(),
    skills:selectedSkillMacroIds().map(id=>skillById.get(id)?.label).filter(Boolean),
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


function renderMarketContext(){
  let ids=(profile.employmentAreaIds&&profile.employmentAreaIds.length?profile.employmentAreaIds:[profile.employmentAreaId||"caen"]);
  const basins=[...new Set(ids)].map(getBasinById).filter(Boolean);
  if(!basins.length) basins.push(getBasinById("caen"));
  const totalProjects=basins.reduce((s,b)=>s+b.projects,0);
  const weighted=field=>totalProjects?basins.reduce((s,b)=>s+b[field]*b.projects,0)/totalProjects:0;
  const difficulty=weighted("difficulty"),seasonal=weighted("seasonal"),change=weighted("change");
  const title=basins.length===1?basins[0].name:`${basins.length} bassins sélectionnés`;
  const subtitle=basins.length===1?`${basins[0].departmentName} • ${basins[0].regionName}`:`${[...new Set(basins.map(b=>b.departmentName))].join(", ")} • ${[...new Set(basins.map(b=>b.regionName))].join(", ")}`;
  const chips=basins.map(b=>`<span class="territory-chip">${esc(b.name)}</span>`).join("");
  const changeTxt=(change>0?"+":"")+change.toFixed(1)+" %";
  document.getElementById("marketContext").innerHTML=`<div class="market-context"><div class="market-context-head"><div><strong>Marché de l'emploi : ${esc(title)}</strong><div class="hint">${esc(subtitle)} • BMO 2026 France Travail</div><div class="territory-summary">${chips}</div></div><span class="pill info">Le tri retient le meilleur indice parmi les bassins sélectionnés</span></div><div class="market-context-grid"><div><strong>${totalProjects.toLocaleString("fr-FR")}</strong><span>projets BMO cumulés, tous métiers</span></div><div><strong>${difficulty.toFixed(0)} %</strong><span>difficulté moyenne pondérée</span></div><div><strong>${seasonal.toFixed(0)} %</strong><span>saisonnalité moyenne pondérée</span></div><div><strong>${changeTxt}</strong><span>évolution moyenne pondérée vs 2025</span></div></div></div>`;
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
    <span class="pill good">Indice local de démonstration : ${esc(market.label)} (${market.index}/100) • meilleur bassin : ${esc(market.basin.name)} (${market.selectedCount} zones) ⓘ</span>
    <span class="market-tooltip-content"><span class="market-tooltip-title">Indice interne par bassin</span>${rows}</span>
  </span>`;
}

function profileCompleteness(){
  const activePrefs=preferenceOptions.filter(([key])=>(profile.prefs?.[key]||"neutral")!=="neutral").length;
  const core=(profile.skillMacros||[]).length+(profile.soft||[]).length+(profile.qualitiesSelected||[]).length+activePrefs;
  const supporting=(profile.experienceSelected||[]).length+Math.min(4,(profile.hobbiesSelected||[]).length);
  const evidence=core+supporting*.45;
  if(evidence>=12) return {level:"Bonne",className:"good",message:"Le profil contient assez d'éléments pour obtenir un classement relativement stable."};
  if(evidence>=6) return {level:"Moyenne",className:"info",message:"Le classement est déjà exploitable, mais quelques informations supplémentaires peuvent encore modifier l'ordre des pistes."};
  return {level:"Faible",className:"warn",message:"Peu d'éléments sont renseignés. Les premières pistes sont indicatives et peuvent beaucoup évoluer si vous complétez le profil."};
}

function renderJobs(){
  readProfile();
  updatePastJobsFilterState();
  const domain=document.getElementById("domainFilter").value;
  const query=normalizeSearchText(document.getElementById("jobSearch")?.value||"");
  const access=document.getElementById("accessFilter").value;
  const demand=Number(document.getElementById("demandFilter").value);
  const minScore=Number(document.getElementById("scoreFilter").value);
  const sort=document.getElementById("sortFilter").value;
  const showBlocked=document.getElementById("showBlockedJobs")?.checked||false;
  const hidePast=document.getElementById("hidePastJobs")?.checked||false;
  const selectedPastTitles=new Set(selectedPastJobIds.map(id=>jobs.find(j=>j.id===id)?.title).filter(Boolean).map(normalizeSearchText));

  let list=jobs.map(j=>({...j,match:scoreJob(j),market:localMarket(j)}));
  if(!showBlocked) list=list.filter(j=>!j.match.accessibility.blocked);
  if(hidePast&&selectedPastTitles.size) list=list.filter(j=>!selectedPastTitles.has(normalizeSearchText(j.title)));
  if(query) list=list.filter(j=>normalizeSearchText([j.title,j.domain,j.officialTitle||""].join(" ")).includes(query));
  if(domain) list=list.filter(j=>j.domain===domain);
  if(access==="no_degree") list=list.filter(j=>j.education===0);
  if(access==="short") list=list.filter(j=>j.training<=6);
  if(access==="training") list=list.filter(j=>j.training>0);
  list=list.filter(j=>j.market.index>=demand && (j.match.accessibility.blocked?showBlocked:j.match.total>=minScore));

  if(sort==="score") list.sort((a,b)=>b.match.total-a.match.total || b.market.index-a.market.index || a.training-b.training);
  if(sort==="demand") list.sort((a,b)=>b.market.index-a.market.index || b.match.total-a.match.total);
  if(sort==="training") list.sort((a,b)=>a.training-b.training);
  if(sort==="salary") list.sort((a,b)=>b.salary-a.salary);
  if(sort==="interest") list.sort((a,b)=>b.match.interestBonus-a.match.interestBonus || b.match.total-a.match.total);

  const all=jobs.map(j=>({...j,match:scoreJob(j),market:localMarket(j)}));
  renderMarketContext();
  const completeness=profileCompleteness();
  const reliabilityTarget=document.getElementById("profileReliability");
  if(reliabilityTarget){
    const cls=completeness.className==="good"?"success":"notice";
    reliabilityTarget.innerHTML=`<div class="${cls}" style="margin-bottom:14px"><strong>Précision du profil : ${completeness.level}</strong><br>${completeness.message}</div>`;
  }

  const eligible=all.filter(j=>!j.match.accessibility.blocked);
  const blockedCount=all.length-eligible.length;
  const blockedToggle=document.getElementById("showBlockedJobs");
  const blockedHelp=document.getElementById("blockedJobsFilterHelp");
  if(blockedToggle&&blockedHelp){
    blockedToggle.disabled=blockedCount===0;
    if(blockedCount===0){
      blockedToggle.checked=false;
      blockedHelp.className="filter-help";
      blockedHelp.textContent="Aucun métier n'est actuellement écarté par vos limitations déclarées.";
    }else{
      blockedHelp.className="filter-help warn";
      blockedHelp.textContent=`${blockedCount} métier${blockedCount>1?"s":""} incompatible${blockedCount>1?"s":""} masqué${blockedCount>1?"s":""} par défaut. Cochez la case pour les afficher malgré leur score de 0 %.`;
    }
  }

  const good=eligible.filter(j=>j.match.total>=55).length;
  const strong=eligible.filter(j=>j.match.total>=70).length;
  const best=[...eligible].sort((a,b)=>b.match.total-a.match.total)[0];
  document.getElementById("kpis").innerHTML=`
    <div class="box"><div class="num">${good}</div><div class="lbl">bonnes correspondances (≥ 55 %)</div></div>
    <div class="box"><div class="num">${strong}</div><div class="lbl">très bonnes correspondances (≥ 70 %)</div></div>
    <div class="box"><div class="num">${blockedCount}</div><div class="lbl">métiers écartés par limitations déclarées</div></div>
    <div class="box"><div class="num">${best?best.title:"-"}</div><div class="lbl">meilleure piste actuelle</div></div>`;

  const container=document.getElementById("jobList");
  const resultCount=document.getElementById("resultCount");
  if(resultCount){
    const parts=[`${list.length.toLocaleString("fr-FR")} métier${list.length>1?"s":""} affiché${list.length>1?"s":""} sur ${jobs.length.toLocaleString("fr-FR")}`];
    if(hidePast&&selectedPastTitles.size) parts.push("métiers déjà pratiqués masqués");
    if(showBlocked&&blockedCount) parts.push(`${blockedCount} métier${blockedCount>1?"s":""} incompatible${blockedCount>1?"s":""} inclus`);
    resultCount.textContent=parts.join(" • ");
  }
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
            <div class="hint">${j.officialAccess
              ? `<strong>Accès • France Travail :</strong> ${esc(j.officialAccess)}`
              : j.demoSecondary
                ? `<strong>Accès • catalogue de démonstration :</strong> ${esc(j.access)}`
                : `<strong>Accès • synthèse de démonstration :</strong> ${esc(j.access)}`}</div>
          </div>
          <div class="score">${j.match.total}%</div>
        </div>
        <div class="job-meta">
          ${j.market.selectedCount>1?recruitmentTooltipHtml(j.market):`<span class="pill good">Indice local de démonstration : ${demandLabel} (${j.market.index}/100) • ${j.market.basin.name}</span>`}
          ${j.rome
            ? `<a class="pill source-pill" href="${esc(j.romeUrl)}" target="_blank" rel="noopener noreferrer">ROME ${esc(j.rome)} • France Travail ↗</a>`
            : j.demoSecondary
              ? `<span class="pill info">Catalogue large de démonstration</span>`
              : `<span class="pill warn">Rattachement ROME à préciser</span>`}
          <span class="pill">Formation estimée (démo) : ${trainingLabel}</span>
          <span class="pill">Salaire de référence (démo) : ${j.salary} €</span>
          ${j.match.accessibility.status==="blocked"?`<span class="compat-badge compat-block">Écarté : limitation déclarée</span>`:
             j.match.accessibility.status==="check"?`<span class="compat-badge compat-check">Aptitude réglementée à vérifier</span>`:
             j.match.accessibility.status==="adjust"?`<span class="compat-badge compat-adjust">Aménagement à vérifier</span>`:
             `<span class="compat-badge compat-ok">Aucune incompatibilité déclarée</span>`}
          ${j.match.interestBonus?`<span class="pill info">+${j.match.interestBonus} affinité loisirs</span>`:""}
          ${j.match.experienceBonus?`<span class="pill info">+${j.match.experienceBonus} expérience conditions</span>`:""}
          ${j.match.qualityBonus?`<span class="pill good">+${j.match.qualityBonus} qualités</span>`:""}
          ${j.match.defectPenalty?`<span class="pill warn">-${j.match.defectPenalty} points de vigilance</span>`:""}
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
                ${Object.entries(j.match.breakdown).map(([k,v])=>`<li>${k} : <strong>${typeof v==="number"?v+"%":esc(v)}</strong></li>`).join("")}
                <li>Indice principal : <strong>${j.match.base}%</strong></li>
                <li>Bonus loisirs : <strong>+${j.match.interestBonus}</strong></li>
                <li>Bonus expérience de travail : <strong>+${j.match.experienceBonus}</strong></li>
                <li>Bonus qualités : <strong>+${j.match.qualityBonus}</strong></li>
                <li>Impact points de vigilance : <strong>-${j.match.defectPenalty}</strong></li>
                ${j.match.ordinaryPreferencePenalty?`<li>Préférences en conflit : <strong>-${j.match.ordinaryPreferencePenalty}</strong></li>`:""}
                ${j.match.impossiblePenalty?`<li>Préférence marquée « Impossible » : <strong>-${j.match.impossiblePenalty}</strong></li>`:""}
                ${j.match.accessPenalty?`<li>Contraintes d\'accès : <strong>-${j.match.accessPenalty}</strong></li>`:""}
                <li>Impact handicap / limitations : <strong>-${j.match.accessibilityPenalty}</strong></li>
                ${j.match.accessReasons?.length?j.match.accessReasons.map(x=>`<li>${esc(x)}</li>`).join(""):""}
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
                ${(j.match.requiredMacros||[]).filter(id=>!(profile.skillMacros||[]).includes(id)).slice(0,6).map(id=>`<li>${esc(skillById.get(id)?.label||id)}</li>`).join("") || "<li>Peu d'écarts identifiés</li>"}
              </ul>
            </div>
            <div class="market-card">
              <strong>Contexte local et indice de démonstration</strong>
              <div class="market-index">${j.market.index}/100 • ${j.market.label}</div>
              ${j.market.selectedCount>1?`<div class="hint">Indice interne retenu : meilleur bassin parmi ${j.market.selectedCount} zones sélectionnées. Moyenne des zones : ${j.market.averageIndex}/100.</div>`:""}
              <div class="market-grid">
                <div><strong>${j.market.basin.projects.toLocaleString("fr-FR")}</strong><span>projets BMO du bassin, tous métiers</span></div>
                <div><strong>${j.market.basin.difficulty.toFixed(0)} %</strong><span>difficulté de recrutement du bassin</span></div>
                <div><strong>${j.market.basin.seasonal.toFixed(0)} %</strong><span>part saisonnière du bassin</span></div>
                <div><strong>${j.market.nonSeasonal.toFixed(0)} %</strong><span>part non saisonnière</span></div>

                <div><strong>${j.market.basin.change>0?"+":""}${j.market.basin.change.toFixed(1)} %</strong><span>évolution vs 2025</span></div>
              </div>
              ${j.market.selectedCount>1?`<div class="summary-card" style="margin-top:10px"><strong>Détail par bassin sélectionné</strong><ul class="small-list">${j.market.markets.map(m=>`<li>${m.basin.name} : <strong>${m.index}/100</strong> • ${m.label}</li>`).join("")}</ul></div>`:""}
              <div class="market-source">Données territoriales : BMO 2026 France Travail. L'indice /100 affiché au-dessus est un calcul interne de démonstration de JusteCap, pas une statistique France Travail. Une version professionnelle devra utiliser une source métier × territoire documentée.</div>
            </div>
            <div class="summary-card">
              <strong>Référentiel métier</strong>
              ${j.rome
                ? `<p class="hint"><strong>ROME ${esc(j.rome)}</strong><br>${esc(j.officialTitle||j.title)}</p>
                   <a class="source-link" href="${esc(j.romeUrl)}" target="_blank" rel="noopener noreferrer">Voir France Travail pour ce ROME ↗</a>
                   ${j.sourceNote?`<p class="hint" style="margin-top:8px">${esc(j.sourceNote)}</p>`:""}`
                : j.demoSecondary
                  ? `<p class="hint"><strong>Fiche secondaire de démonstration.</strong><br>${esc(j.sourceNote||"Le rattachement ROME et les données détaillées restent à enrichir.")}</p>`
                  : `<p class="hint">${esc(j.sourceNote||"Le rattachement ROME de cet intitulé de démonstration doit encore être précisé.")}</p>`}
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
                ${j.match.defectMatches.length?j.match.defectMatches.map(x=>`<li>À surveiller : ${defectOptions.find(h=>h[0]===x)?.[1]||x}</li>`).join(""):"<li>Aucun point de vigilance en conflit direct détecté.</li>"}
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
const DEMO_STATE_VERSION="2026-10-02-r2";
const DEMO_DOSSIERS=[
  {ref:"ORI-7F3K-2PA",date:"2026-10-01T09:20:00",firstName:"Camille",lastName:"Numérique",age:31,education:2,disabilitiesSelected:[],functionalLimits:[],regionId:"normandie",departmentCode:"14",employmentAreaId:"caen",employmentArea:"Caen",institutionId:"enefa-herouville",advisorId:"demo-advisor",skills:["Utiliser des outils numériques","Résoudre des problèmes","Organiser son travail"],soft:["Curiosité","Patience","Autonomie"],hobbiesSelected:["video_games","computing","strategy_games"],results:[{title:"Technicien support informatique",score:78},{title:"Médiateur numérique",score:72}]},
  {ref:"ORI-Q9D4-8LM",date:"2026-09-30T14:10:00",firstName:"Sophie",lastName:"Accompagnement",age:42,education:2,disabilitiesSelected:[],functionalLimits:[],regionId:"normandie",departmentCode:"14",employmentAreaId:"caen",employmentArea:"Caen",institutionId:"enefa-herouville",advisorId:"demo-advisor",skills:["Accueillir du public","Conseiller une personne","Rédiger des documents"],soft:["Écoute","Diplomatie","Organisation"],hobbiesSelected:["reading","social","writing"],results:[{title:"Conseiller en insertion professionnelle",score:76},{title:"Assistant ressources humaines",score:69}]},
  {ref:"ORI-L2X8-1BC",date:"2026-09-29T10:40:00",firstName:"Julien",lastName:"Technique",age:27,education:1,disabilitiesSelected:[],functionalLimits:[],regionId:"normandie",departmentCode:"14",employmentAreaId:"caen",employmentArea:"Caen",institutionId:"enefa-herouville",advisorId:"demo-advisor",skills:["Réparer / entretenir","Travailler manuellement","Résoudre des problèmes"],soft:["Autonomie","Rigueur","Curiosité"],hobbiesSelected:["mechanics","diy","science"],results:[{title:"Mécanicien automobile",score:82},{title:"Agent de maintenance",score:75}]}
];
function getDossiers(){try{return JSON.parse(localStorage.getItem("justecapDemoDossiers")||"[]")}catch(e){return[]}}
function setDossiers(x){localStorage.setItem("justecapDemoDossiers",JSON.stringify(x))}
function seedDemoDossiers(){
  if(localStorage.getItem("justecapDemoStateVersion")===DEMO_STATE_VERSION && getDossiers().length) return;
  setDossiers(DEMO_DOSSIERS);
  localStorage.setItem("justecapDemoStateVersion",DEMO_STATE_VERSION);
}
function resetDemoState(){
  if(!confirm("Réinitialiser la démonstration et restaurer les dossiers fictifs d’origine ?")) return;
  localStorage.removeItem("justecapDemoDossiers");
  localStorage.removeItem("justecapDemoStateVersion");
  localStorage.removeItem("orientationProDossiers");
  localStorage.removeItem("orientationProSeeded");
  localStorage.removeItem("justecapPastJobIds");
  localStorage.removeItem("orientationProPastJobIds");
  location.reload();
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
  <h2>Profil</h2><div class="box"><p><strong>Âge :</strong> ${esc(d.age||"Non renseigné")}</p><p><strong>Situation :</strong> ${esc(d.situation||"Non renseignée")}</p><p><strong>Handicap(s) :</strong> ${esc(labelsFrom(d.disabilitiesSelected,disabilityOptions).join(", ")||"Non renseigné")}</p><p><strong>Impacts fonctionnels :</strong> ${esc(labelsFrom(d.functionalLimits,functionalLimitOptions).join(", ")||"Aucun renseigné")}</p><p><strong>Bassin(s) d'emploi :</strong> ${esc((d.employmentAreas&&d.employmentAreas.length?d.employmentAreas.join(", "):d.employmentArea)||"Non renseigné")}</p><p><strong>Établissement :</strong> ${esc(inst?.name||"Non renseigné")}</p><p><strong>Conseiller :</strong> ${esc(adv?adv.firstName+" "+adv.lastName:"Non renseigné")}</p></div>
  <h2>Aptitudes</h2><h3>Savoir-faire</h3>${list(d.skills)}<h3>Savoir-être</h3>${list(d.soft)}<h3>Qualités</h3>${list(labelsFrom(d.qualitiesSelected,qualityOptions))}<h3>Points de vigilance</h3>${list(labelsFrom(d.defectsSelected,defectOptions))}
  <h2>Expérience et centres d'intérêt</h2><h3>Loisirs</h3>${list(labelsFrom(d.hobbiesSelected,hobbyOptions))}<h3>Conditions de travail déjà pratiquées</h3>${list(labelsFrom(d.experienceSelected,experienceOptions))}
  <h2>Préférences</h2>${list(prefs)}<p><strong>Salaire minimum souhaité :</strong> ${esc(d.salary||0)} € net mensuel approximatif</p>
  <h2>Résultats</h2>${(d.results||[]).map((r,i)=>`<div class="box"><span class="score">${i+1}. ${esc(r.title)} : ${esc(r.score)} %</span>${r.interestBonus?`<br>Bonus loisirs : +${esc(r.interestBonus)}`:""}${r.experienceBonus?`<br>Bonus expérience : +${esc(r.experienceBonus)}`:""}${r.marketIndex?`<br>Indice local de démonstration (${esc(r.marketBasin||d.employmentArea||"")}) : ${esc(r.marketIndex)}/100 • ${esc(r.marketLabel||"")}`:""}</div>`).join("")||"<p>Aucun résultat.</p>"}
  <p class="meta">Document généré par la version de démonstration JusteCap. Les données métier du prototype sont des données de démonstration.</p></body></html>`;
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
  if(lastSentDossierRef){box.innerHTML=`<div class="success">Ce dossier est déjà présent dans l’espace conseiller de démonstration. Référence : <span class="codebox">${esc(lastSentDossierRef)}</span></div>`;return}
  const d=buildDossierFromCurrentProfile();
  const arr=getDossiers();arr.unshift(d);setDossiers(arr);lastSentDossierRef=d.ref;
  box.innerHTML=`<div class="success"><strong>Dossier ajouté à l’espace conseiller de démonstration.</strong><br>Il est maintenant visible pour <strong>${esc(adv.firstName)} ${esc(adv.lastName)}</strong>, ${esc(inst.name)}.<br><span class="hint">Dans une version connectée, cette action transmettrait le dossier au compte du conseiller sélectionné.</span><br><br>Référence : <span class="codebox">${esc(d.ref)}</span></div>`;window.scrollTo({top:0,behavior:"smooth"});
}
function savePastJobs(){
  try{localStorage.setItem("justecapPastJobIds",JSON.stringify(selectedPastJobIds))}catch(e){}
  updatePastJobsFilterState();
}
function restorePastJobs(){
  try{
    const raw=localStorage.getItem("justecapPastJobIds")||localStorage.getItem("orientationProPastJobIds")||"[]";
    const stored=JSON.parse(raw);
    selectedPastJobIds=(Array.isArray(stored)?stored:[]).map(Number).filter(id=>jobs.some(j=>j.id===id));
  }catch(e){selectedPastJobIds=[]}
}
function updatePastJobsFilterState(){
  const checkbox=document.getElementById("hidePastJobs");
  const help=document.getElementById("pastJobsFilterHelp");
  if(!checkbox||!help) return;
  const n=selectedPastJobIds.length;
  checkbox.disabled=n===0;
  if(!n){
    checkbox.checked=false;
    help.className="filter-help";
    help.textContent="Pour utiliser ce filtre, ouvrez « Connaître MES compétences » et renseignez au moins un métier déjà exercé.";
  }else{
    help.className="filter-help good";
    help.textContent=`${n} métier${n>1?"s":""} déjà pratiqué${n>1?"s":""} renseigné${n>1?"s":""} dans « Connaître MES compétences ».`;
  }
}
function openSkillDiscoveryFromAptitudes(){
  skillDiscoveryReturnStep=currentStep;
  showSkillDiscovery();
}
function returnFromSkillDiscovery(){
  goToStep(skillDiscoveryReturnStep??1);
}
function proposeSkillDiscovery(){
  const ok=confirm("Ouvrir le module « Connaître MES compétences » ?\n\nVotre progression actuelle dans le questionnaire sera conservée. Ce module est complémentaire et peut être utilisé indépendamment.");
  if(ok) openSkillDiscoveryFromAptitudes();
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
  updatePastJobsFilterState();
  window.scrollTo({top:0,behavior:"smooth"});
}
function addPastJob(){
  const input=document.getElementById("pastJobSearch");
  const error=document.getElementById("pastJobError");
  const raw=(input?.value||"").trim();
  const normalized=normalizeSearchText(raw);
  if(!normalized){if(error)error.textContent="Indiquez un métier.";return}

  let job=jobs.find(j=>normalizeSearchText(j.title)===normalized);
  if(!job){
    const partial=jobs.filter(j=>normalizeSearchText(j.title).includes(normalized));
    if(partial.length===1) job=partial[0];
  }
  if(!job){if(error)error.textContent="Métier introuvable. Commencez à taper son nom puis choisissez une proposition de la liste.";return}
  if(selectedPastJobIds.includes(job.id)){if(error)error.textContent="Ce métier est déjà ajouté.";return}

  selectedPastJobIds.push(job.id);
  savePastJobs();
  if(input)input.value="";
  if(error)error.textContent="";
  renderSelectedPastJobs();
}
function removePastJob(id){
  selectedPastJobIds=selectedPastJobIds.filter(x=>x!==id);
  savePastJobs();
  renderSelectedPastJobs();
  if(!selectedPastJobIds.length) document.getElementById("skillDiscoveryResults").innerHTML='<div class="empty">Ajoutez au moins un métier que vous avez exercé pour commencer.</div>';
}
function renderSelectedPastJobs(){
  const box=document.getElementById("selectedPastJobs");
  if(!box) return;
  box.innerHTML=selectedPastJobIds.length?selectedPastJobIds.map(id=>{const j=jobs.find(x=>x.id===id);return `<span class="selected-job">${esc(j?.title||id)}<button title="Retirer" onclick="removePastJob(${id})">×</button></span>`}).join(""):'<span class="hint">Aucun métier ajouté.</span>';
}
function aggregatePotential(itemsKey){
  const map=new Map();
  selectedPastJobIds.forEach(id=>{
    const job=jobs.find(j=>j.id===id);
    if(!job) return;

    if(itemsKey==="skillMacros"){
      jobMacroRequirements(job).forEach(macroId=>{
        const macro=skillById.get(macroId);
        if(!macro) return;
        if(!map.has(macroId)) map.set(macroId,{id:macroId,name:macro.label,category:macro.categoryLabel,details:macro.details||[],count:0,jobs:[]});
        const entry=map.get(macroId); entry.count++; entry.jobs.push(job.title);
      });
      return;
    }

    (job[itemsKey]||[]).forEach(item=>{
      if(!map.has(item)) map.set(item,{id:item,name:item,count:0,jobs:[]});
      const entry=map.get(item); entry.count++; entry.jobs.push(job.title);
    });
  });
  return [...map.values()].sort((a,b)=>b.count-a.count || a.name.localeCompare(b.name,"fr"));
}
function analyzePastJobs(){
  const out=document.getElementById("skillDiscoveryResults");
  if(!selectedPastJobIds.length){out.innerHTML='<div class="notice">Ajoutez au moins un métier avant de lancer l\'analyse.</div>';return}
  const skills=aggregatePotential("skillMacros"), soft=aggregatePotential("soft");
  const skillCard=x=>`<div class="competency-card"><label><input type="checkbox" name="discovered_skill_macro" value="${escAttr(x.id)}" checked><span>${esc(x.name)}</span></label><div class="competency-source"><strong>${esc(x.category)}</strong><br>Potentiellement liée à ${x.count}/${selectedPastJobIds.length} métier(s) : ${x.jobs.map(esc).join(", ")}${x.details?.length?`<div style="margin-top:6px"><strong>Précisions :</strong> ${x.details.slice(0,4).map(esc).join(" • ")}</div>`:""}</div></div>`;
  const softCard=x=>`<div class="competency-card"><label><input type="checkbox" name="discovered_soft" value="${escAttr(x.name)}" checked><span>${esc(x.name)}</span></label><div class="competency-source">Potentiellement mobilisé dans ${x.count}/${selectedPastJobIds.length} métier(s) : ${x.jobs.map(esc).join(", ")}</div></div>`;
  out.innerHTML=`
    <div class="success"><strong>${skills.length}</strong> savoir-faire détaillés et <strong>${soft.length}</strong> savoir-être potentiels identifiés. Décochez ce que vous n'avez pas réellement pratiqué ou acquis.</div>
    <div class="competency-group"><h3 class="subheading">Savoir-faire potentiellement acquis</h3><div class="hint" style="margin-bottom:10px">Les propositions utilisent la même taxonomie détaillée que le questionnaire.</div><div class="competency-list">${skills.map(skillCard).join("")||'<div class="empty">Aucun savoir-faire identifié.</div>'}</div></div>
    <div class="competency-group"><h3 class="subheading">Savoir-être potentiellement mobilisés</h3><div class="competency-list">${soft.map(softCard).join("")||'<div class="empty">Aucun savoir-être identifié.</div>'}</div></div>
    <div class="actions" style="justify-content:flex-end"><button class="btn secondary" onclick="downloadSkillDiscovery()">Télécharger cette liste</button><button class="btn primary" onclick="applyDiscoveredSkills()">Ajouter les éléments cochés à mon orientation</button></div>`;
}
function applyDiscoveredSkills(){
  const macroIds=[...document.querySelectorAll('input[name="discovered_skill_macro"]:checked')].map(x=>x.value);
  const soft=[...document.querySelectorAll('input[name="discovered_soft"]:checked')].map(x=>x.value);
  macroIds.forEach(id=>selectedSkillMacroState.add(id));
  renderSkillBrowser();
  soft.forEach(value=>{const el=[...document.querySelectorAll('input[name="soft"]')].find(x=>x.value===value);if(el)el.checked=true});
  goToStep(1);
  window.scrollTo({top:0,behavior:"smooth"});
}
function downloadSkillDiscovery(){
  const macroIds=[...document.querySelectorAll('input[name="discovered_skill_macro"]:checked')].map(x=>x.value);
  const skills=macroIds.map(id=>skillById.get(id)?.label).filter(Boolean);
  const soft=[...document.querySelectorAll('input[name="discovered_soft"]:checked')].map(x=>x.value);
  if(!skills.length&&!soft.length){alert("Aucune compétence n'est cochée.");return}
  const oldJobs=selectedPastJobIds.map(id=>jobs.find(j=>j.id===id)?.title).filter(Boolean);
  const list=items=>items.length?`<ul>${items.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:"<p>Aucun élément sélectionné.</p>";
  const html=`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Mes compétences potentielles</title><style>body{font-family:Arial,sans-serif;max-width:850px;margin:40px auto;padding:0 24px;color:#172033}h2{margin-top:28px}li{line-height:1.5}.note{color:#667085}</style></head><body><h1>Mes compétences potentielles</h1><p class="note">Document généré par la version de démonstration JusteCap. Ces compétences sont des hypothèses à confirmer à partir des métiers exercés.</p><h2>Métiers exercés</h2>${list(oldJobs)}<h2>Savoir-faire potentiels</h2>${list(skills)}<h2>Savoir-être potentiels</h2>${list(soft)}</body></html>`;
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
  document.getElementById("dossierRows").innerHTML=list.length?list.map(d=>`<tr><td><strong>${esc(d.firstName)} ${esc(d.lastName)}</strong></td><td>${esc(d.age||"-")}</td><td>${esc(new Date(d.date).toLocaleDateString("fr-FR"))}</td><td>${esc(d.ref)}</td><td>${esc(d.results?.[0]?.title||"-")} ${d.results?.[0]?.score?`(${esc(d.results[0].score)} %)` : ""}</td><td><div class="table-actions"><button class="link-btn" onclick="openDossier(\'${esc(d.ref)}\')">Ouvrir</button><button class="link-btn" onclick="downloadDossier(\'${esc(d.ref)}\')">Télécharger</button><button class="link-btn danger-link" onclick="deleteDossier(\'${esc(d.ref)}\')">Supprimer</button></div></td></tr>`).join(""):'<tr><td colspan="6"><div class="empty">Aucun dossier trouvé.</div></td></tr>';
}
function downloadDossier(ref){
  const d=getDossiers().find(x=>x.ref===ref);if(!d)return;
  downloadHtmlFile(`Dossier_Orientation_Pro_${safeFilename(d.firstName+"_"+d.lastName)}_${safeFilename(d.ref)}.html`,downloadableDossierHtml(d,"Dossier Orientation Pro"));
}
function printDossier(ref){
  const d=getDossiers().find(x=>x.ref===ref);
  if(!d)return;
  const w=window.open("","_blank");
  if(!w){
    alert("Le navigateur a bloqué la fenêtre d'impression. Autorisez les fenêtres contextuelles pour imprimer le dossier.");
    return;
  }
  w.document.open();
  w.document.write(downloadableDossierHtml(d,"Dossier JusteCap"));
  w.document.close();
  w.focus();
  setTimeout(()=>w.print(),250);
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
  document.getElementById("modalBody").innerHTML=`<div class="details-grid"><div class="summary-card"><strong>Profil</strong><ul class="small-list"><li>Âge : ${d.age||"-"}</li><li>Handicap(s) : ${esc(labelsFrom(d.disabilitiesSelected,disabilityOptions).join(", ")||"Non renseigné")}</li><li>Impacts fonctionnels : ${esc(labelsFrom(d.functionalLimits,functionalLimitOptions).join(", ")||"Aucun renseigné")}</li><li>Bassin(s) d'emploi : ${esc((d.employmentAreas&&d.employmentAreas.length?d.employmentAreas.join(", "):d.employmentArea)||"Non renseigné")}</li><li>Établissement : ${esc(inst?.name||"Non renseigné")}</li><li>Conseiller : ${esc(adv?adv.firstName+" "+adv.lastName:"Non renseigné")}</li></ul></div><div class="summary-card"><strong>Savoir-faire</strong><ul class="small-list">${(d.skills||[]).map(x=>`<li>${esc(x)}</li>`).join("")||"<li>Aucun</li>"}</ul></div><div class="summary-card"><strong>Savoir-être</strong><ul class="small-list">${(d.soft||[]).map(x=>`<li>${esc(x)}</li>`).join("")||"<li>Aucun</li>"}</ul></div><div class="summary-card"><strong>Qualités</strong><ul class="small-list">${(d.qualitiesSelected||[]).map(x=>`<li>${qualityOptions.find(h=>h[0]===x)?.[1]||x}</li>`).join("")||"<li>Aucune</li>"}</ul></div><div class="summary-card"><strong>Points de vigilance</strong><ul class="small-list">${(d.defectsSelected||[]).map(x=>`<li>${defectOptions.find(h=>h[0]===x)?.[1]||x}</li>`).join("")||"<li>Aucun</li>"}</ul></div><div class="summary-card"><strong>Loisirs</strong><ul class="small-list">${(d.hobbiesSelected||[]).map(x=>`<li>${hobbyOptions.find(h=>h[0]===x)?.[1]||x}</li>`).join("")||"<li>Aucun</li>"}</ul></div><div class="summary-card"><strong>Conditions déjà pratiquées</strong><ul class="small-list">${(d.experienceSelected||[]).map(x=>`<li>${experienceOptions.find(h=>h[0]===x)?.[1]||x}</li>`).join("")||"<li>Aucune</li>"}</ul></div><div class="summary-card"><strong>Résultats</strong><ol class="small-list">${(d.results||[]).map(r=>`<li>${esc(r.title)} : <strong>${esc(r.score)}%</strong>${r.marketIndex?` • indice local démo ${esc(r.marketIndex)}/100 (${esc(r.marketLabel||"")})`:""}</li>`).join("")}</ol></div></div><div class="actions" style="justify-content:flex-end"><button class="btn secondary" onclick="downloadDossier('${d.ref}')">Télécharger ce dossier</button><button class="btn secondary" onclick="printDossier('${d.ref}')">Imprimer ce dossier</button><button class="btn danger" onclick="deleteDossier('${d.ref}')">Supprimer ce dossier</button></div>`;
  document.getElementById("dossierModal").classList.add("open");
}
function closeModal(){document.getElementById("dossierModal").classList.remove("open")}

init();
