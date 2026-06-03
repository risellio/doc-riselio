---
slug: riselio-kickoff
title: "Riselio - Lancement du projet"
authors:
  - name: Luca Hallet
    title: Co-fondateur
    url: https://lucahallet.com
    image_url: https://github.com/lucahallet.png
  - name: Vincent
    title: Co-fondateur
tags: [projet, lancement, vinted, resell]
date: 2025-01-15
---

Riselio est lance. Le but : construire la plateforme de resell intelligente qu'on aurait voulu avoir quand on a commence a revendre sur Vinted.

On a tous les deux passe trop de temps a scruter manuellement Vinted pour trouver des bonnes affaires. Les outils existants sont soit trop chers, soit trop limites, soit pas adaptes au marche francais.

Riselio c'est un dashboard qui automatise tout ca :
- scraping en continu des recherches qu'on suit
- alertes des qu'un article passe sous un seuil de prix
- analyse IA de l'etat reel des articles pour eviter les mauvaises surprises

## Stack choisie

On a choisi des technos qu'on maitrise pour aller vite :
- **Hono** cote backend -- plus leger qu'Express, TypeScript natif
- **React + TanStack Query** cote frontend -- gestion du cache serveur sans Redux
- **Python + vinted_scraper** pour le scraping -- la lib gere les cookies et les retries automatiquement

## Ce qu'on build en premier

1. Le scraper Python avec pagination et normalisation des donnees
2. L'API backend + schema Prisma
3. Le dashboard avec la liste des articles et les alertes
4. L'integration Anthropic pour le score IA

On documente au fur et a mesure. Cette doc est l'endroit ou on centralise les decisions techniques et les patterns qu'on utilise.
