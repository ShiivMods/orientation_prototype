# Préflight avant Release Candidate — 7 octobre 2026

## Objectif

Avant de commencer le plan journalier menant à la démonstration du 7 octobre 2026, le projet doit disposer :

1. d'une source de vérité technique unique et à jour ;
2. d'un code suffisamment propre pour être maintenu sans régression ;
3. d'un registre clair des décisions déjà prises ;
4. d'une liste explicite des décisions encore ouvertes.

La pré-étape n'est terminée que lorsque ces quatre conditions sont remplies.

---

## 1. Constat de source de vérité

Le dépôt GitHub actuel a été créé le 15 septembre 2026 avec une version antérieure du prototype.

Il contient actuellement :

- un prototype V0.9 ;
- environ 21 métiers codés directement dans `app.js` ;
- aucune taxonomie détaillée de compétences ;
- aucune base métier étendue externe.

Une version ultérieure **V0.16** existe dans les fichiers de travail du projet et doit être considérée comme la référence fonctionnelle la plus récente connue.

Cette V0.16 inclut notamment :

- plusieurs centaines de métiers via `jobs_large.js` ;
- une taxonomie de 15 catégories ;
- 167 compétences principales ;
- 668 sous-compétences ;
- recherche dans les compétences ;
- module « Connaître MES compétences » amélioré ;
- recherche de métiers ;
- filtre permettant de masquer les métiers déjà pratiqués ;
- impression des dossiers côté conseiller ;
- indicateur de complétude du profil ;
- scoring recalibré pour ne pas donner artificiellement des points aux dimensions non renseignées.

### Décision

**Le dépôt GitHub ne doit pas être refactorisé à partir de la V0.9 comme si elle était la dernière version du produit.**

La V0.16 doit être restaurée/importée comme baseline fonctionnelle avant la réécriture structurelle.

---

## 2. Décisions fonctionnelles déjà prises

### Positionnement

- L'outil aide à explorer des pistes professionnelles.
- Il ne décide pas à la place du bénéficiaire ou du conseiller.
- Les résultats doivent rester explicables.
- La valeur produit repose sur la transformation des données, la taxonomie, les correspondances, les pondérations, les règles métier et l'expérience utilisateur.

### Bénéficiaire

- Le parcours bénéficiaire ne nécessite pas de compte dans la V1.
- Nom et prénom sont obligatoires avant transmission d'un dossier.
- Au moins une aptitude doit être renseignée pour poursuivre le parcours.
- Le bénéficiaire peut choisir un établissement et un conseiller.
- Les loisirs apportent uniquement un signal positif ; leur absence ne pénalise pas un métier.
- Les expériences et conditions de travail déjà pratiquées peuvent renforcer une correspondance.
- Plusieurs bassins d'emploi peuvent être sélectionnés.

### Conseiller

- Le conseiller dispose d'un espace authentifié.
- Un dossier transmis est rattaché au conseiller sélectionné.
- Le conseiller consulte les dossiers qui lui sont rattachés.
- Le conseiller peut rechercher, ouvrir, télécharger et imprimer un dossier.

### Handicap et accessibilité

- Le handicap déclaré et ses impacts fonctionnels sont deux notions distinctes.
- Le moteur s'appuie principalement sur les impacts fonctionnels explicitement déclarés.
- Il n'existe pas de hiérarchie automatique de « gravité » des handicaps.
- Certaines incompatibilités fonctionnelles explicites peuvent écarter un métier.
- Une compatibilité incertaine peut produire une alerte ou une demande de vérification.
- Pour une aptitude médicale réglementée, l'application doit signaler une vérification nécessaire et ne pas prononcer seule une inaptitude.
- L'outil ne remplace ni un avis médical ni une étude de poste.

### Données métier

- Les référentiels publics, notamment France Travail / ROME / BMO, restent des sources tierces à documenter et attribuer.
- Les données brutes tierces ne constituent pas la propriété intellectuelle principale du produit.
- Le référentiel complet ROME et les couches métier × territoire doivent remplacer progressivement les données de démonstration.
- Les sources, licences et dates de snapshot doivent être documentées.

### Modules différés

Ne font pas partie des bloquants de la Release Candidate du 7 octobre :

- LLM conversationnel ;
- D&D CV / ATS ;
- analytique avancée ;
- comptes bénéficiaires sophistiqués ;
- module complet d'évolution professionnelle.

---

## 3. Décisions techniques déjà prises

- Le 7 octobre vise une **Release Candidate de démonstration techniquement vendable**, pas une mise en exploitation nationale.
- Les données de la démonstration doivent être fictives.
- La version présentée ne doit plus reposer sur une authentification simulée en clair.
- Les dossiers réels ne doivent pas être stockés dans `localStorage`.
- L'autorisation d'accès doit être contrôlée côté backend.
- Le moteur de matching doit être séparé de l'interface et testable.
- Le dépôt utilise des branches et une revue avant fusion vers `main`.
- Les décisions importantes sont consignées dans `DECISIONS.md`.
- Développement, préproduction et production devront être séparés.

---

## 4. Décisions encore ouvertes avant réécriture

Les sujets suivants doivent être figés avant que l'architecture puisse être considérée stable.

### O-001 — Nom présenté le 7 octobre
Choisir le nom affiché dans la Release Candidate :
- Orientation Pro ;
- JusteCap ;
- transition « JusteCap — Orientation Pro ».

### O-002 — Visibilité des données de handicap
Décider précisément ce qui est transmis au conseiller :
- handicap déclaré ;
- impacts fonctionnels uniquement ;
- les deux, lorsque le bénéficiaire choisit explicitement de les transmettre.

### O-003 — Cycle de vie d'un dossier
Définir :
- si un dossier transmis est un snapshot immuable ou reste modifiable ;
- qui peut le supprimer ;
- s'il peut être réaffecté ;
- la durée de conservation cible ;
- le comportement en cas de nouvel envoi du même bénéficiaire.

### O-004 — Portée des droits conseiller
Définir si un conseiller voit :
- uniquement ses propres dossiers ;
- les dossiers de son établissement ;
- ses dossiers, avec un rôle responsable permettant un accès plus large.

Pour la Release Candidate, le comportement actuel « uniquement les dossiers rattachés » est le plus restrictif et le plus simple.

### O-005 — Rôle administrateur
Décider si la V1 nécessite déjà un rôle permettant :
- création/désactivation de conseillers ;
- gestion des établissements ;
- réaffectation de dossiers.

Ce rôle peut être absent de la démonstration si l'administration est réalisée directement en base pour la RC.

### O-006 — Statut de l'indice local métier × bassin
Les chiffres BMO territoriaux sont réels, mais l'indice fin actuel « métier × bassin » est encore simulé.

Avant la présentation, il faut choisir entre :
- remplacer cette couche par des données réellement reliées au métier ;
- conserver un indicateur interne clairement présenté comme un indice calculé ;
- retirer cet indice de la RC et ne montrer que les données officielles disponibles.

Aucun facteur pseudo-aléatoire ne doit être présenté comme une donnée de marché réelle.

### O-007 — Sémantique des scores
Le score doit être officiellement défini comme un **indice interne de compatibilité**, et non comme :
- une probabilité de réussite ;
- une aptitude médicale ;
- une promesse d'embauche ;
- une recommandation définitive.

Les pondérations utilisées par la RC doivent être versionnées.

### O-008 — Terminologie « défauts »
Décider si le terme utilisateur « Défauts » est conservé ou remplacé par une formulation plus professionnelle telle que « Points de vigilance ».

### O-009 — Consentement et information
Définir le minimum de l'écran d'information avant transmission :
- finalité de la transmission ;
- destinataire ;
- données transmises ;
- caractère facultatif des données sensibles ;
- action explicite d'envoi.

La conformité juridique complète n'est pas déclarée achevée par ce seul écran.

---

## 5. Remise au propre — critères de sortie

Avant le Jour 1 du plan :

- [ ] La V0.16 est restaurée dans Git comme baseline.
- [ ] Les fichiers de données ne sont plus dupliqués dans le code d'interface.
- [ ] Le CSS est séparé du HTML.
- [ ] La logique métier est séparée du rendu DOM.
- [ ] Le moteur de matching est isolé dans un module sans dépendance au DOM.
- [ ] Les référentiels et données de démonstration sont dans des fichiers dédiés.
- [ ] Les accès aux données passent par une couche repository/service remplaçable.
- [ ] Les constantes et versions du scoring sont centralisées.
- [ ] Les fonctions globales et gestionnaires inline sont progressivement supprimés ou confinés.
- [ ] Les usages de `innerHTML` alimentés par des données utilisateur sont sécurisés.
- [ ] Les principales règles métier disposent de tests.
- [ ] Les décisions ouvertes ci-dessus sont fermées ou explicitement différées avec un comportement RC défini.
- [ ] La CI vérifie au minimum syntaxe, tests et cohérence de la structure.
- [ ] Aucun changement de comportement fonctionnel n'est introduit sans décision documentée.

Lorsque toutes ces cases sont remplies, la pré-étape est considérée terminée et le **Jour 1** peut commencer.
