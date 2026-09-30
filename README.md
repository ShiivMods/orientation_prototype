# Orientation Pro / JusteCap

Prototype fonctionnel d'un outil d'aide à l'orientation professionnelle destiné à rapprocher un profil bénéficiaire de pistes métiers et à faciliter le travail du conseiller.

> **Statut actuel : prototype pré-production.**
> Ce dépôt ne doit pas encore être utilisé avec de vraies données bénéficiaires.

## État actuel

Le prototype fonctionne côté navigateur et couvre notamment :

- saisie du profil, des aptitudes, expériences et préférences ;
- prise en compte structurée des limitations fonctionnelles ;
- matching avec des métiers de démonstration ;
- contexte local du marché du travail ;
- découverte de compétences depuis des métiers déjà exercés ;
- espace conseiller de démonstration ;
- export de dossiers.

Le stockage, l'authentification et plusieurs jeux de données sont encore simulés localement.

## Lancer le prototype

Aucune compilation n'est nécessaire à ce stade.

Ouvrir `index.html` depuis un serveur HTTP local, par exemple avec une extension de serveur statique ou un outil équivalent.

Le JavaScript applicatif est chargé depuis `app.js`.

## Règles de développement

- `main` représente la version destinée au déploiement.
- Les changements doivent être développés sur une branche dédiée puis relus avant fusion.
- Aucun secret, mot de passe réel ou donnée personnelle réelle ne doit être commité.
- Les données sensibles ne doivent pas être conservées dans `localStorage` en production.
- Les changements de logique métier importants doivent être documentés dans `DECISIONS.md`.
- Une fonctionnalité n'est pas considérée prête pour la production simplement parce qu'elle fonctionne dans le prototype.

## Documentation

- [SECURITY.md](SECURITY.md) — règles de sécurité et limites actuelles.
- [DECISIONS.md](DECISIONS.md) — décisions d'architecture et de produit.
- [docs/PRODUCTION_READINESS.md](docs/PRODUCTION_READINESS.md) — trajectoire vers une version exploitable en production.

## Déploiement

Le dépôt dispose actuellement d'un workflow GitHub Pages déclenché depuis `main`.

GitHub Pages reste adapté à la démonstration statique actuelle. Une vraie version multi-utilisateur nécessitera un backend, une base de données, une authentification robuste et une politique de traitement des données adaptée.
