/**
 * JusteCap / Orientation Pro - matching engine
 * Compatibility and local-market calculations.
 * This file deliberately contains no DOM manipulation.
 */

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
