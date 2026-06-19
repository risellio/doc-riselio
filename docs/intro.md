---
sidebar_position: 1
slug: /
---

# Riselio — Vue d'ensemble

Riselio est une plateforme de **revente intelligente multi-sources**. Elle scrape Vinted pour détecter des opportunités de revente : articles sous-côtés, tendances de prix, alertes en temps réel sur des recherches suivies.

## Ce que fait Riselio

- **Scraping Vinted** — détection automatique d'articles sous-côtés
- **Analyse de prix** — historique et tendances par recherche
- **Alertes temps réel** — notification dès qu'un article correspond à une recherche suivie
- **Dashboard** — pilotage de l'activité de resell depuis une interface unifiée
- **Analyse IA** — évaluation visuelle des articles via Anthropic Claude

## Stack technique

| Couche | Techno |
|---|---|
| Scraper | Python + `vinted_scraper` (AsyncVintedWrapper), Playwright |
| Backend | Node.js + Hono |
| Frontend | React + Vite + TanStack Query + Recharts |
| Base de données | MySQL + Prisma |
| Auth | Better Auth |
| IA | API Anthropic |
| Paiement | Stripe (20€/mois + 10% commission) |

## Organisation du code

```
/scraper    — scripts Python de scraping Vinted
/backend    — API Hono (routes, webhooks Stripe, logique métier)
/frontend   — dashboard React
/prisma     — schéma et migrations
```

## Sections de la doc

- **[Frontend](./frontend/)** — Dashboard React, composants, state management
- **[Backend](./backend/)** — API Hono, auth, Stripe, base de données
- **[Scraping](./scraping/)** — Lib vinted_scraper, patterns, gestion des erreurs
- **[IA](./ia/)** — Analyse visuelle Anthropic, pipeline d'évaluation
- **[DB](./db/)** — Tutoriel pour mysql
