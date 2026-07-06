# DESIGN.md — Système visuel du portfolio

## Intention visuelle

Le portfolio doit donner une impression de sérieux, de confiance et de maîtrise. Il doit évoquer la rénovation énergétique, la performance, la pédagogie et le pilotage de projet sans tomber dans un style trop technique ou trop institutionnel.

Direction : premium sobre, clair, structuré, orienté recruteur.

## Mots-clés de design

- Confiance
- Expertise
- Clarté
- Sobriété
- Énergie
- Bâtiment
- Copropriété
- Décision
- Coordination

## Palette de couleurs

### Couleurs principales

- Vert sauge : `#3D6B52` (`--sage`), survol `#2E5440` (`--sage-hover`), clair `#6B9E81` (`--sage-light`)
  - Utilisation : boutons principaux, icônes, accents, chiffres clés (KPI).
- Fond sauge pâle : `#EAF2EC` (`--sage-pale`)
  - Utilisation : badges, fonds d'icônes, zones de focus.
- Noir encre : `#1A1F1C` (`--ink`), texte secondaire `#4A5249` (`--ink-soft`)
  - Utilisation : hero, nav, footer, blocs de mise en avant (fond sombre premium).
- Or discret : `#C8973A` (`--gold`), fond pâle `#FBF3E4` (`--gold-pale`)
  - Utilisation : accent unique sur fond sombre (mot-clé en italique dans le H1, badges "actuel"/priorité, focus ring). À ne jamais généraliser à d'autres éléments — un seul accent chaud, dosé.

### Couleurs neutres

- Blanc : `#FFFFFF`
- Fond clair : `#EDF6F0` (`--warm-off`)
- Bordure : `#D8D4CC` (`--divider`)

## Typographie

Deux familles, un contraste assumé :

- Titres (H1–H3, chiffres clés, labels de section) : `DM Serif Display` (repli `Georgia, serif`) — porte l'identité "premium éditorial".
- Corps de texte, boutons, UI : `Aptos` / `Avenir Next` / `system-ui` sans-serif — garde la lisibilité et la sobriété fonctionnelle.

La hiérarchie doit être nette :

- H1 très visible, impactant, orienté identité.
- H2 clair, structurant les sections.
- H3 court et concret.
- Paragraphes courts, lisibles, sans surcharge.
- Badges et labels en capitales ou semi-bold pour guider la lecture.

## Layout

La page doit fonctionner comme une landing page recruteur :

1. Hero avec identité, titre professionnel, promesse claire, boutons d'action.
2. Audit ou message de positionnement rapide.
3. Compétences clés en cartes.
4. Focus copropriétés.
5. Méthode projet.
6. Projets de mise en pratique.
7. Outils.
8. Documents et contact.

## Composants

### Boutons

- Bouton principal : fond vert ou blanc selon contexte.
- Bouton secondaire : contour visible.
- Effet hover léger uniquement : translation douce, pas d'effet agressif.

### Cartes

- Fond blanc.
- Bordure fine.
- Rayon arrondi modéré.
- Ombre légère.
- Contenu aéré.

### Badges

- Fond vert doux.
- Texte vert profond.
- Sert à signaler : projet prioritaire, financement, chantier, qualité, audit, veille.

## Animation

Animations autorisées :

- Apparition douce des sections.
- Légère remontée au hover sur les cartes.
- Transition fluide des boutons.

Animations à éviter :

- Effets trop rapides.
- Animations continues.
- Mouvements distrayants.
- Effets gadget ou trop startup.

## Accessibilité

- Contraste suffisant entre texte et fond.
- Boutons visibles.
- Navigation simple.
- Responsive mobile obligatoire.
- Prévoir `prefers-reduced-motion` pour limiter les animations.

## Règles anti-slop

- Pas de gradients excessifs.
- Pas de surcharges de couleurs.
- Pas de cartes trop nombreuses sans hiérarchie.
- Pas d'ombres trop fortes.
- Pas de texte dense sans respiration.
- Pas de phrases génériques sans preuve projet.

## Objectif final

Le recruteur doit comprendre en moins de 30 secondes :

- qui est le candidat ;
- quel poste il vise ;
- ce qu'il sait faire ;
- pourquoi son profil est pertinent pour la rénovation énergétique en copropriété ;
- comment le contacter ou télécharger son CV.
