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

## ADR-005 — La V0.16 est la baseline fonctionnelle à restaurer
- **Date :** 2026-09-30
- **Statut :** accepté
- **Contexte :** le dépôt GitHub a été initialisé avec une version V0.9 alors qu'une V0.16 plus avancée existe dans les fichiers de travail.
- **Décision :** ne pas refactoriser la V0.9 comme source fonctionnelle finale. Restaurer la V0.16 dans Git avant la réécriture structurelle.
- **Pourquoi :** la V0.16 contient des évolutions déjà validées : taxonomie de compétences, base métier étendue, recherche, filtres, impression conseiller et scoring recalibré.
- **Conséquences :** toute refonte doit préserver les comportements validés de la V0.16 ou documenter explicitement leur remplacement.

## ADR-006 — Cible du 7 octobre 2026
- **Date :** 2026-09-30
- **Statut :** accepté
- **Contexte :** le projet doit être présenté le 7 octobre 2026.
- **Décision :** viser une Release Candidate de démonstration fonctionnelle et techniquement vendable, sans prétendre à une mise en exploitation complète.
- **Pourquoi :** concentrer le temps disponible sur la stabilité, la crédibilité technique, la sécurité de base, l'explicabilité et la démonstration.
- **Conséquences :** aucune fonctionnalité majeure hors périmètre ne doit mettre en danger la RC. Le passage d'une étape journalière à la suivante est signalé explicitement avant de poursuivre.

