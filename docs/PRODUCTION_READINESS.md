# Passage du prototype à la production

## Niveau actuel

Orientation Pro / JusteCap est un prototype fonctionnel riche, mais son architecture actuelle reste celle d'une démonstration navigateur.

Le passage en production ne consiste donc pas seulement à ajouter quelques écrans : il implique de déplacer les responsabilités sensibles hors du client.

## P0 — Bloquants avant toute vraie donnée

- [ ] Remplacer l'authentification conseiller de démonstration par une authentification serveur.
- [ ] Remplacer `localStorage` par une persistance serveur protégée.
- [ ] Définir les rôles et droits : bénéficiaire, conseiller, structure, administration.
- [ ] Vérifier côté serveur l'accès à chaque dossier.
- [ ] Retirer les données et identités de démonstration du chemin de production.
- [ ] Auditer tous les usages de `innerHTML` et les données insérées dans le DOM.
- [ ] Définir le modèle de données et les règles de suppression/conservation.
- [ ] Établir les exigences RGPD et la base juridique du traitement.
- [ ] Séparer développement, préproduction et production.

## P1 — Fiabilité logicielle

- [ ] Découper le fichier applicatif monolithique en modules.
- [ ] Isoler le moteur de scoring de l'interface.
- [ ] Isoler les référentiels métiers, compétences et territoires.
- [ ] Ajouter des tests unitaires du scoring.
- [ ] Ajouter des tests des règles d'accessibilité et limitations.
- [ ] Ajouter des tests de parcours utilisateur.
- [ ] Ajouter lint / format / vérification de syntaxe en CI.
- [ ] Documenter les changements de règles dans `DECISIONS.md`.

## P1 — Données métier

- [ ] Définir les sources officielles et leurs licences/conditions de réutilisation.
- [ ] Versionner les imports ROME / compétences / savoir-faire.
- [ ] Tracer la date et la source de chaque snapshot.
- [ ] Éviter de charger des dizaines de milliers d'items directement dans l'interface.
- [ ] Concevoir une recherche adaptée.
- [ ] Ajouter des tests de cohérence des relations entre métiers et compétences.

## P1 — Explicabilité

Chaque score présenté à un bénéficiaire ou un conseiller doit pouvoir être décomposé en facteurs compréhensibles :

- compétences ;
- savoir-être ;
- expériences ;
- préférences ;
- contraintes ;
- accessibilité ;
- contexte du marché du travail.

Une évolution algorithmique ne doit pas rendre impossible l'explication d'un résultat.

## P2 — Exploitation

- [ ] Journalisation structurée.
- [ ] Monitoring et alertes.
- [ ] Sauvegarde/restauration.
- [ ] Procédure de migration de base.
- [ ] Politique de version.
- [ ] Procédure de rollback.
- [ ] Tests de charge adaptés au volume cible.
- [ ] Documentation de transfert technique.

## Architecture cible — principe

Le navigateur doit devenir un **client** et non l'autorité de confiance.

```text
Navigateur
   |
   | HTTPS
   v
Application / API
   |---- Authentification & autorisation
   |---- Validation
   |---- Moteur d'orientation
   |---- Services métier
   |
   +---- Base de données
   +---- Référentiels métiers
   +---- Journalisation / monitoring
```

Le choix exact de la stack sera décidé séparément. La priorité est de définir les frontières de responsabilité avant de migrer le prototype.
