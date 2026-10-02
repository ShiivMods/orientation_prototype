# Journal des décisions — Orientation Pro / JusteCap

Ce fichier garde la trace du **pourquoi** des choix importants afin d'éviter qu'une future maintenance traite une règle volontaire comme une anomalie.

## Format

### ADR-XXX — Titre
- **Date :**
- **Statut :** proposé / accepté / remplacé / abandonné
- **Contexte :**
- **Décision :**
- **Pourquoi :**
- **Conséquences :**
- **Remplace / remplacé par :**

---

## ADR-001 — Séparer handicap déclaré et impacts fonctionnels
- **Date :** 2026-09
- **Statut :** accepté
- **Contexte :** un diagnostic ou une catégorie de handicap ne permet pas à lui seul de déterminer les conditions réelles d'exercice d'un métier.
- **Décision :** conserver séparément le handicap déclaré et les limitations fonctionnelles utilisées par le moteur de matching.
- **Pourquoi :** éviter de déduire automatiquement une incapacité professionnelle à partir d'un diagnostic ou d'une catégorie générale.
- **Conséquences :** les règles de compatibilité métier doivent se baser prioritairement sur les limitations explicitement renseignées. Les professions soumises à aptitude réglementée doivent être signalées comme à vérifier plutôt que déclarées automatiquement impossibles.

## ADR-002 — Le moteur aide à décider, il ne décide pas seul
- **Date :** 2026-09
- **Statut :** accepté
- **Contexte :** l'outil sert d'appui à l'orientation.
- **Décision :** produire des pistes, scores, explications et alertes plutôt qu'une décision définitive.
- **Pourquoi :** les résultats doivent rester interprétables et discutables avec un professionnel.
- **Conséquences :** toute évolution du scoring doit préserver l'explicabilité des principaux facteurs.

## ADR-003 — Une seule source JavaScript pour le prototype statique
- **Date :** 2026-09-30
- **Statut :** accepté
- **Contexte :** le contenu complet de `app.js` était aussi copié dans un bloc `<script>` de `index.html`.
- **Décision :** `index.html` charge désormais `app.js` comme fichier externe.
- **Pourquoi :** deux copies identiques créent un risque de divergence et compliquent les revues.
- **Conséquences :** toute modification de logique applicative doit être faite dans `app.js` tant que l'architecture statique actuelle est conservée.

## ADR-004 — Traiter le dépôt comme une base pré-production
- **Date :** 2026-09-30
- **Statut :** accepté
- **Contexte :** le prototype doit évoluer vers un véritable produit.
- **Décision :** les changements structurants passent par des branches dédiées et doivent pouvoir être relus avant fusion sur `main`.
- **Pourquoi :** réduire les régressions et distinguer clairement expérimentation et version déployable.
- **Conséquences :** CI, tests, sécurité et documentation deviennent des exigences du projet.

## ADR-005 — Baseline fonctionnelle du dépôt
- **Date :** 2026-10-02
- **Statut :** accepté
- **Contexte :** plusieurs archives historiques du prototype existent.
- **Décision :** le ZIP fourni le 2 octobre, correspondant à `main` au commit `371ece4`, est la source de vérité fonctionnelle.
- **Pourquoi :** c'est la version explicitement désignée comme version actuelle.
- **Conséquences :** les anciennes archives peuvent servir de référence ponctuelle, mais ne sont pas réimportées automatiquement.

## ADR-006 — Cible du 5 octobre : démonstration, pas mise en production
- **Date :** 2026-10-02
- **Statut :** accepté
- **Contexte :** JusteCap et D&D CV doivent être présentés depuis un navigateur sur une machine tierce.
- **Décision :** publier deux sites de démonstration distincts. La version JusteCap montre le fonctionnement sans être présentée comme exploitable professionnellement.
- **Pourquoi :** privilégier une démonstration stable, honnête et accessible plutôt qu'une fausse promesse de production.
- **Conséquences :** les mécanismes de simulation sont autorisés s'ils sont identifiés comme tels et n'utilisent que des données fictives.

## ADR-007 — Identité de démonstration
- **Date :** 2026-10-02
- **Statut :** accepté
- **Décision :** afficher **JusteCap** comme nom principal et conserver **Orientation Pro** comme référence de transition.

## ADR-008 — Sémantique du score
- **Date :** 2026-10-02
- **Statut :** accepté
- **Décision :** les pourcentages sont des **indices internes de compatibilité**.
- **Conséquences :** ils ne doivent pas être présentés comme une probabilité d'embauche, de réussite professionnelle ou une aptitude médicale.

## ADR-009 — Marché de l'emploi et données officielles
- **Date :** 2026-10-02
- **Statut :** accepté
- **Décision :** distinguer explicitement les données BMO officielles des indicateurs calculés par JusteCap.
- **Conséquences :** aucun calcul interne ou facteur de démonstration ne peut être affiché comme une statistique France Travail.

## ADR-010 — Points de vigilance
- **Date :** 2026-10-02
- **Statut :** accepté
- **Décision :** le libellé utilisateur « Défauts » devient « Points de vigilance ».
- **Conséquences :** les anciens identifiants internes peuvent être conservés temporairement pour limiter les régressions avant la démonstration.

## ADR-011 — Deux démonstrations indépendantes
- **Date :** 2026-10-02
- **Statut :** accepté
- **Décision :** JusteCap et D&D CV sont déployés séparément. JusteCap fournit seulement un lien vers D&D CV.
- **Pourquoi :** une panne ou une évolution d'un démonstrateur ne doit pas rendre l'autre indisponible.


## ADR-012 — Séparer données officielles et estimations de démonstration
- **Date :** 2026-10-02
- **Statut :** accepté
- **Contexte :** les premières fiches métiers mélangeaient des données de démonstration et des références publiques sans distinction suffisante.
- **Décision :** afficher explicitement les références ROME/France Travail lorsqu'un rattachement est fiable, et identifier comme « démo » toute estimation interne encore utilisée (durée de formation, salaire de référence, indice local calculé).
- **Pourquoi :** éviter qu'une valeur construite pour montrer le fonctionnement soit interprétée comme une donnée officielle.
- **Conséquences :** les notes artificielles d'évolution /10 et les affirmations génériques d'alternance sont retirées de l'interface. Un intitulé trop générique reste sans code ROME plutôt que d'être rattaché arbitrairement.


## ADR-013 — Couche UX de compétences
- **Date :** 2026-10-02
- **Statut :** accepté
- **Contexte :** le référentiel ROME contient plus de 21 000 savoir-faire. Les afficher directement rendrait le parcours inutilisable.
- **Décision :** JusteCap utilise une couche UX compacte de 15 catégories, 167 macro-compétences sélectionnables et 668 précisions recherchables.
- **Fonctionnement :** l'utilisateur recherche ou sélectionne une macro-compétence ; le moteur distingue correspondance exacte, proximité dans une même famille fonctionnelle et proximité dans une même catégorie.
- **Pourquoi :** conserver la richesse du raisonnement par compétences sans exposer une liste de plusieurs dizaines de milliers d'éléments.
- **Source :** la structure s'inspire du référentiel ROME, mais la taxonomie UX JusteCap n'est pas une reproduction exhaustive ni officielle de l'arborescence France Travail.
- **Conséquences :** toute présentation doit distinguer clairement le volume du référentiel ROME et la couche simplifiée utilisée dans l'interface.
