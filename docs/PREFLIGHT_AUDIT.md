# Pré-étape — remise à plat avant démonstration

## Cible

La présentation est prévue **lundi 5 octobre 2026**.

La cible n'est pas une application déclarée prête à être utilisée professionnellement. La cible est une **version de démonstration publique, stable et techniquement propre**, permettant de montrer :

- le parcours bénéficiaire ;
- le fonctionnement du moteur de compatibilité ;
- les règles d'accessibilité ;
- le contexte du marché de l'emploi ;
- le module de découverte des compétences ;
- la simulation de transmission et de consultation côté conseiller ;
- la manière dont le produit pourrait évoluer vers une vraie version professionnelle.

Aucune vraie donnée bénéficiaire ne doit être utilisée dans cette démonstration.

---

## Source de vérité

Le ZIP fourni le 2 octobre 2026 correspond au dépôt GitHub `ShiivMods/orientation_prototype`, branche `main`, commit `371ece4`.

**Cette version est la baseline fonctionnelle retenue.**

Une ancienne V0.16 présente dans les archives du projet n'est pas la source de vérité actuelle et ne doit pas être réimportée automatiquement.

---

## Décisions figées pour la démonstration

### Identité
- Nom principal affiché : **JusteCap**.
- Référence de transition : **Orientation Pro**.
- Formulation recommandée : **JusteCap — Orientation Pro**.

### Statut du produit
- L'interface affiche clairement **Version de démonstration**.
- La présentation explique le fonctionnement et les choix de conception.
- Aucune affirmation selon laquelle la version présentée est déjà exploitable professionnellement.
- Les mécanismes simulés doivent être identifiables comme tels.

### Données
- Données de démonstration uniquement.
- Pas de vraie donnée médicale, de handicap ou de dossier bénéficiaire.
- `localStorage` est acceptable pour la démo uniquement.
- La future version professionnelle utilisera une persistance serveur et des contrôles d'accès.

### Conseiller
- L'espace conseiller présenté lundi est une **simulation fonctionnelle**.
- Le faux login peut rester pour la démonstration s'il est clairement identifié comme compte de démonstration.
- Dans le produit réel, un conseiller ne voit que les dossiers auxquels il est autorisé à accéder.
- Un dossier transmis dans le futur produit est conçu comme un snapshot daté.

### Score
- Le pourcentage affiché est un **indice interne de compatibilité**.
- Il ne représente ni une probabilité de réussite, ni une aptitude médicale, ni une probabilité d'embauche.
- Les principaux facteurs doivent rester explicables.

### Handicap et accessibilité
- Handicap déclaré et impacts fonctionnels restent deux notions distinctes.
- Les impacts fonctionnels influencent le moteur.
- L'outil ne prononce pas seul une inaptitude médicale réglementaire.
- Les situations réglementées sont signalées comme à vérifier.
- Les informations sensibles ne doivent pas être présentées comme obligatoires.

### Marché de l'emploi
- Les données BMO territoriales réelles peuvent être présentées avec leur source.
- Aucun indice calculé ou simulé ne doit être présenté comme une statistique officielle France Travail.
- Toute couche métier × bassin non officielle doit être nommée comme indice interne/de démonstration ou retirée.

### Vocabulaire
- Le libellé utilisateur **« Défauts »** est remplacé par **« Points de vigilance »**.

### D&D CV
- JusteCap et D&D CV seront deux démonstrations distinctes.
- JusteCap comportera un accès vers la démonstration D&D CV.
- Le lien ne doit pas rendre les deux produits techniquement dépendants.

---

## Architecture de démonstration retenue

```text
index.html
assets/
  css/
    app.css
  js/
    catalog.js
    matching-engine.js
    app.js
tests/
  matching-engine.test.js
```

### Responsabilités

- `catalog.js` : options, référentiels et données de démonstration.
- `matching-engine.js` : calcul des compatibilités et indicateurs.
- `app.js` : interface, navigation, exports et mécanismes spécifiques à la démo.
- `app.css` : présentation.
- `tests/` : règles métier critiques vérifiables sans navigateur.

---

## État de la pré-étape

- [x] Source de vérité confirmée avec le ZIP fourni.
- [x] JavaScript retiré de `index.html`.
- [x] CSS séparé du HTML.
- [x] Catalogue et données séparés de l'interface.
- [x] Moteur de compatibilité isolé de la manipulation du DOM.
- [x] Ancien `app.js` monolithique supprimé.
- [x] Tests automatiques ajoutés pour des règles métier critiques.
- [x] CI adaptée à la nouvelle structure.
- [x] Vocabulaire « Points de vigilance » adopté dans l'interface.
- [x] Statut « Version de démonstration » adopté.
- [x] Corriger la présentation de l'indice local afin qu'aucun calcul interne ne ressemble à une statistique officielle.
- [x] Vérifier les champs sensibles et retirer les informations libres inutiles.
- [x] Auditer les sorties HTML alimentées par des saisies utilisateur.
- [x] Exécuter les contrôles de structure, de syntaxe et les tests métier sur la branche refactorisée.
- [x] Mettre à jour le README avec la structure actuelle et le mode de démonstration.

## Validation

**Pré-étape terminée le 2 octobre 2026.**

La CI GitHub valide :
- syntaxe JavaScript ;
- tests du moteur de compatibilité ;
- structure des fichiers statiques ;
- présence de la documentation requise.

Le test visuel et le parcours complet dans un navigateur public sont volontairement rattachés au **Jour 1 — présentabilité de JusteCap**, après déploiement ou mise à disposition d'une URL de prévisualisation.


## Question terrain à poser à un conseiller

- **Diplôme : faut-il distinguer « Non renseigné » et « Sans diplôme » dans le traitement ?**
  - Hypothèse actuelle pour la démonstration : les deux sont traités de la même manière par le moteur, faute d'information prouvant un niveau supérieur.
  - Point à valider avec un professionnel : cette distinction apporte-t-elle une valeur dans l'accompagnement ou le calcul, au-delà de la différence sémantique ?
