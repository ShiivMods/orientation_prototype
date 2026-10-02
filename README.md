# JusteCap — Orientation Pro

Démonstrateur d'aide à l'orientation professionnelle.

> **Statut : version de démonstration.**
> Cette version sert à présenter le fonctionnement et les choix de conception. Elle n'est pas présentée comme prête à être utilisée professionnellement et ne doit contenir que des données fictives.

## Ce que montre la démo

- parcours bénéficiaire en plusieurs étapes ;
- aptitudes, expériences, préférences et contraintes ;
- indice interne de compatibilité avec des métiers de démonstration ;
- règles d'accessibilité et cas réglementés ;
- contexte territorial à partir d'indicateurs BMO ;
- module « Connaître MES compétences » ;
- simulation d'envoi à un conseiller et d'espace conseiller.

## Structure

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

- `catalog.js` contient les référentiels et données de démonstration.
- `matching-engine.js` contient le moteur de compatibilité et les calculs d'indicateurs.
- `app.js` contient l'interface, les exports et les mécanismes spécifiques à la démo.
- `app.css` contient la présentation.

## Lancer localement

Servir le dossier avec un serveur HTTP statique, par exemple :

```bash
python -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## Vérifications

```bash
node --check assets/js/catalog.js
node --check assets/js/matching-engine.js
node --check assets/js/app.js
node --test tests/matching-engine.test.js
```

Les mêmes contrôles sont exécutés par GitHub Actions.

## Données et sécurité

- Utiliser uniquement des données fictives dans la démonstration publique.
- L'authentification conseiller et le stockage navigateur sont des simulations de démonstration.
- Les chiffres BMO affichés comme tels sont des données territoriales de source France Travail.
- L'indice local /100 est un calcul interne de démonstration et non une statistique France Travail.
- Une future version professionnelle nécessitera persistance serveur, authentification réelle, autorisations, politique de conservation et cadrage RGPD.

Voir également :

- [SECURITY.md](SECURITY.md)
- [DECISIONS.md](DECISIONS.md)
- [docs/PREFLIGHT_AUDIT.md](docs/PREFLIGHT_AUDIT.md)
- [docs/PRODUCTION_READINESS.md](docs/PRODUCTION_READINESS.md)
