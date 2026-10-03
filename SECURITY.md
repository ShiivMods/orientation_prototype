# Sécurité — Orientation Pro / JusteCap

## Statut

Le projet est actuellement un **prototype pré-production**.

Il ne doit pas être utilisé pour collecter ou conserver de vraies données personnelles ou médicales tant que les mécanismes de sécurité et de conformité prévus pour la production ne sont pas implémentés.

## Données particulièrement sensibles

Le prototype peut manipuler des informations telles que :

- identité et âge ;
- parcours professionnel ;
- compétences et préférences ;
- handicap déclaré ;
- limitations fonctionnelles et besoins d'aménagement ;
- rattachement à une structure ou à un conseiller.

Certaines de ces données peuvent relever de catégories particulièrement sensibles. Elles exigent une protection supérieure à celle d'un simple formulaire public.

## Limites connues du prototype

À la date de ce document :

- les dossiers de démonstration sont conservés dans `localStorage` ;
- l'authentification conseiller est simulée côté client ;
- le mot de passe de démonstration est présent dans le code source ;
- les identités et structures de démonstration sont embarquées dans le JavaScript ;
- aucune autorisation serveur ne protège les dossiers ;
- aucune base de données sécurisée n'est branchée ;
- aucun mécanisme de journalisation de sécurité ou d'audit n'est encore en place ;
- plusieurs rendus utilisent du HTML dynamique et devront être audités contre les injections/XSS avant production.

Ces comportements sont acceptables uniquement pour une démonstration utilisant des données fictives.

## Exigences minimales avant traitement de données réelles

1. Authentification serveur via un fournisseur ou mécanisme éprouvé.
2. Autorisation contrôlée côté serveur pour chaque ressource.
3. Base de données protégée avec séparation des structures et utilisateurs.
4. Chiffrement en transit via HTTPS et protection des secrets hors du dépôt.
5. Validation systématique des entrées côté serveur.
6. Audit des sorties HTML et suppression des insertions non échappées.
7. Politique de conservation et suppression des données.
8. Sauvegardes et procédure de restauration adaptées.
9. Journalisation des événements importants sans exposer de données sensibles.
10. Revue RGPD avant mise en service réelle.
11. Tests automatisés des contrôles d'accès et des principaux parcours.
12. Environnements séparés pour développement, préproduction et production.

## Secrets

Ne jamais commiter :

- clés API ;
- mots de passe ;
- tokens ;
- clés privées ;
- chaînes de connexion contenant des identifiants ;
- secrets de session ;
- credentials de fournisseurs.

Les secrets de production devront être injectés par le fournisseur d'hébergement ou un gestionnaire de secrets.

Tout secret ayant été commité, même brièvement, doit être considéré compromis et remplacé.

## Signalement

En cas de faille ou de suspicion de fuite, ne pas publier les détails dans une issue publique. Utiliser un canal privé avec le responsable du projet jusqu'à correction.
