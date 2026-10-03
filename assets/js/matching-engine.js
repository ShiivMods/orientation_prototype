/**
 * JusteCap / Orientation Pro - matching engine
 * Compatibility and local-market calculations.
 * This file deliberately contains no DOM manipulation.
 */

function preferenceScore(job){
  let total=0,conflicts=0,activeCount=0;
  const hardConflicts=[];
  Object.keys(job.prefs).forEach(k=>{
    const u=profile.prefs[k]||"neutral";
    const j=job.prefs[k];
    if(u==="neutral") return;
    activeCount++;

    if(u==="want"){
      total += j===1?100:j===0?55:10;
    }else if(u==="avoid"){
      total += j===-1?100:j===0?65:5;
      if(j===1) conflicts++;
    }else if(u==="impossible"){
      total += j===-1?100:j===0?45:0;
      if(j===1){conflicts++;hardConflicts.push(k)}
    }
  });
  return {score:activeCount?Math.round(total/activeCount):null,conflicts,hardConflicts,activeCount};
}

function interestBonus(job){
  const selected=profile.hobbiesSelected||[];
  const interests=jobInterestMap[job.title]||[];
  const matches=interests.filter(x=>selected.includes(x));
  return {bonus:Math.min(5,matches.length*2),matches};
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
  return {bonus:Math.min(6,Math.round(matched.length*1.5)),matches:matched};
}

function traitAdjustment(job){
  const qualities=profile.qualitiesSelected||[];
  const defects=profile.defectsSelected||[];
  const qualityMatches=[];
  qualities.forEach(q=>{
    const mapped=qualityToSoft[q]||[];
    if(mapped.some(s=>job.soft.includes(s))) qualityMatches.push(q);
  });
  const qualityBonus=Math.min(3,qualityMatches.length);
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

function primaryMacroForBase(base){
  return (skillTaxonomyByBase.get(base)||[])[0]||null;
}

function stableHash(str){
  return stableSkillHash(str);
}

function stableSkillHash(str){
  let h=2166136261;
  for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}
  return Math.abs(h>>>0);
}

function jobMacroRequirements(job){
  if(Array.isArray(job.skillMacroIds) && job.skillMacroIds.length) return job.skillMacroIds;
  if(job._macroReq) return job._macroReq;
  const out=[];
  (job.skills||[]).forEach(base=>{
    const candidates=skillTaxonomyByBase.get(base)||[];
    if(!candidates.length) return;
    const idx=stableSkillHash(job.title+"|"+base)%candidates.length;
    out.push(candidates[idx].id);
    if(candidates.length>=6 && stableSkillHash(base+"|"+job.title)%3===0){
      const offset=1+(stableSkillHash(job.domain)%Math.max(1,candidates.length-1));
      out.push(candidates[(idx+offset)%candidates.length].id);
    }
  });
  job._macroReq=[...new Set(out)];
  return job._macroReq;
}

function macroSkillCoverage(job,selectedMacroIds){
  const genericSkills=profile.genericSkills||[];
  if(!selectedMacroIds?.length && !genericSkills.length) return null;
  const required=jobMacroRequirements(job);
  if(!required.length) return null;
  const selected=new Set(selectedMacroIds||[]);
  const generic=new Set(genericSkills);
  let total=0;

  required.forEach(reqId=>{
    if(selected.has(reqId)){total+=1;return}
    const req=skillById.get(reqId);
    if(!req) return;

    const sameBase=(selectedMacroIds||[]).some(id=>skillById.get(id)?.base===req.base);
    if(sameBase){total+=0.62;return}

    if(generic.has(req.base)){total+=0.45;return}

    const sameCategory=(selectedMacroIds||[]).some(id=>skillById.get(id)?.category===req.category);
    if(sameCategory) total+=0.18;
  });

  return Math.round(Math.pow(total/required.length,1.08)*100);
}

function buildSpecificityIndex(key){
  const counts=new Map();
  jobs.forEach(job=>[...new Set(job[key]||[])].forEach(item=>counts.set(item,(counts.get(item)||0)+1)));
  const n=Math.max(1,jobs.length),weights=new Map();
  counts.forEach((freq,item)=>weights.set(item,1+Math.log((n+1)/(freq+1))));
  return weights;
}
const softSpecificity=buildSpecificityIndex("soft");

function weightedCoverage(required,selected,specificity){
  if(!selected?.length) return null;
  if(!required?.length) return 50;
  const selectedSet=new Set(selected);
  let totalWeight=0,matchedWeight=0;
  required.forEach(item=>{
    const w=specificity.get(item)||1;
    totalWeight+=w;
    if(selectedSet.has(item)) matchedWeight+=w;
  });
  if(!totalWeight) return 0;
  return Math.round(Math.pow(matchedWeight/totalWeight,1.12)*100);
}

function qualityCompatibility(job){
  const selected=profile.qualitiesSelected||[];
  if(!selected.length) return null;
  let matched=0;
  selected.forEach(q=>{
    const mapped=qualityToSoft[q]||[];
    if(mapped.some(x=>job.soft.includes(x))) matched++;
  });
  return Math.round((matched/selected.length)*100);
}

function profileEvidenceConfidence(pref){
  const skillUnits=(profile.skillMacros||[]).length+(profile.genericSkills||[]).length*.65;
  const softUnits=(profile.soft||[]).length;
  const qualityUnits=(profile.qualitiesSelected||[]).length*.8;
  const prefUnits=(pref?.activeCount||0)*.7;
  const experienceUnits=(profile.experienceSelected||[]).length*.35;
  const total=Math.min(14,skillUnits+softUnits+qualityUnits+prefUnits+experienceUnits);
  return Math.round(45+(total/14)*55);
}

function accessPenalty(job){
  let penalty=0;
  const reasons=[];
  const educationGap=Math.max(0,job.education-(profile.education||0));
  if(educationGap){
    const p=Math.min(15,educationGap*5);
    penalty+=p;
    reasons.push(`Niveau d'accès supérieur au niveau déclaré (-${p})`);
  }
  const trainingGap=Math.max(0,job.training-(profile.maxTraining||0));
  if(trainingGap){
    const p=Math.min(28,8+Math.round(trainingGap*.9));
    penalty+=p;
    reasons.push(`Formation estimée plus longue que la durée acceptée (-${p})`);
  }
  const salaryGap=Math.max(0,(profile.salary||0)-job.salary);
  if(salaryGap){
    const p=Math.min(18,Math.max(3,Math.round(salaryGap/100)*2));
    penalty+=p;
    reasons.push(`Salaire de référence démo inférieur au minimum souhaité (-${p})`);
  }
  return {penalty:Math.min(45,penalty),reasons};
}

function scoreJob(job){
  const selectedMacros=profile.skillMacros||[];
  const selectedSoft=profile.soft||[];
  const requiredMacros=jobMacroRequirements(job);
  const selectedMacroSet=new Set(selectedMacros);

  const genericSkills=profile.genericSkills||[];
  const matchedSkills=[...new Set([
    ...requiredMacros
      .filter(id=>selectedMacroSet.has(id)||selectedMacros.some(sel=>skillById.get(sel)?.base===skillById.get(id)?.base))
      .map(id=>skillById.get(id)?.label)
      .filter(Boolean),
    ...genericSkills.filter(base=>requiredMacros.some(id=>skillById.get(id)?.base===base))
  ])];
  const matchedSoft=job.soft.filter(x=>selectedSoft.includes(x));

  const skillScore=macroSkillCoverage(job,selectedMacros);
  const softScore=weightedCoverage(job.soft,selectedSoft,softSpecificity);
  const qualityScore=qualityCompatibility(job);
  const pref=preferenceScore(job);

  const dimensions=[];
  if(skillScore!==null) dimensions.push({name:"Savoir-faire",score:skillScore,weight:50});
  if(softScore!==null) dimensions.push({name:"Savoir-être",score:softScore,weight:25});
  if(qualityScore!==null) dimensions.push({name:"Qualités",score:qualityScore,weight:15});
  if(pref.score!==null) dimensions.push({name:"Préférences",score:pref.score,weight:25});

  let weighted=0,totalWeight=0;
  dimensions.forEach(d=>{weighted+=d.score*d.weight;totalWeight+=d.weight});
  let base=totalWeight?weighted/totalWeight:0;

  const confidence=profileEvidenceConfidence(pref);
  if(totalWeight){
    const confidenceCap=30+confidence*.70;
    base=Math.min(base,confidenceCap);
  }

  const interest=interestBonus(job);
  const experience=experienceBonus(job);
  const traits=traitAdjustment(job);
  const access=accessPenalty(job);
  const accessibility=accessibilityAssessment(job);

  const impossiblePenalty=Math.min(45,pref.hardConflicts.length*35);
  const ordinaryPreferencePenalty=Math.min(15,Math.max(0,pref.conflicts-pref.hardConflicts.length)*7);

  let total=base
    +interest.bonus
    +experience.bonus
    +traits.qualityBonus
    -traits.defectPenalty
    -access.penalty
    -accessibility.penalty
    -impossiblePenalty
    -ordinaryPreferencePenalty;

  if(accessibility.blocked) total=0;
  total=Math.max(0,Math.min(96,Math.round(total)));

  const breakdown={
    "Savoir-faire":skillScore===null?"Non renseigné":skillScore,
    "Savoir-être":softScore===null?"Non renseigné":softScore,
    "Qualités":qualityScore===null?"Non renseigné":qualityScore,
    "Préférences":pref.score===null?"Non renseigné":pref.score,
    "Confiance du profil":confidence
  };

  return {
    total,base:Math.round(base),confidence,
    interestBonus:interest.bonus,interestMatches:interest.matches,
    experienceBonus:experience.bonus,experienceMatches:experience.matches,
    qualityBonus:traits.qualityBonus,qualityMatches:traits.qualityMatches,
    defectPenalty:traits.defectPenalty,defectMatches:traits.defectMatches,
    accessibilityPenalty:accessibility.penalty,accessibility,
    accessPenalty:access.penalty,accessReasons:access.reasons,
    impossiblePenalty,ordinaryPreferencePenalty,
    requiredMacros,matchedSkills,matchedSoft,breakdown,
    conflicts:pref.conflicts,hardPreferenceConflicts:pref.hardConflicts
  };
}

function clamp(v,min,max){return Math.max(min,Math.min(max,v))}
function marketLabel(index){if(index>=80)return "Très fort";if(index>=65)return "Fort";if(index>=50)return "Moyen";if(index>=35)return "Faible";return "Très faible"}
function localMarketForBasin(job,basin){
  const maxProjects=16006;
  const volume=Math.log1p(basin.projects)/Math.log1p(maxProjects);
  const difficulty=basin.difficulty/66;
  const nonSeasonal=1-basin.seasonal/100;
  const trend=clamp((basin.change+25.7)/(13+25.7),0,1);
  const baseDemand=clamp(job.demand/10,0,1);
  // Indice interne de démonstration : il combine un niveau de demande métier fictif
  // avec des indicateurs territoriaux BMO réels. Il ne s'agit pas d'une statistique France Travail.
  const raw=baseDemand*55 + volume*20 + difficulty*12 + nonSeasonal*8 + trend*5;
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
