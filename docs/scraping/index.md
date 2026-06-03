---
sidebar_position: 1
---

# Scraping

Le scraper Riselio est un module **Python** qui scrape Vinted via la lib `vinted_scraper`. Il tourne de manière autonome, pagine les recherches suivies par les utilisateurs, normalise les données et les insère en base MySQL.

## Stack

| Lib | Rôle |
|---|---|
| `vinted_scraper` | Wrapper API Vinted (cookie, retry, pagination) |
| `asyncio` | Concurrence — recherches parallèles |
| `Playwright` | Fallback si le cookie ne peut pas être récupéré via HTTP |
| `httpx` | Client HTTP sous-jacent (via la lib) |

## Classe utilisée : `AsyncVintedWrapper`

```
                    synchrone          asynchrone
                 ┌─────────────────┬──────────────────────┐
  JSON brut      │  VintedWrapper  │  AsyncVintedWrapper  │  ← Riselio
  Objets typés   │  VintedScraper  │  AsyncVintedScraper  │
                 └─────────────────┴──────────────────────┘
```

`AsyncVintedWrapper` est le choix de Riselio : async, retourne des dicts Python, gère cookie et retry automatiquement.

## Pages de cette section

- **[Concepts](./concepts)** — les 4 classes, ce que la lib gère
- **[Démarrage rapide](./quickstart)** — installation et première recherche
- **[Paramètres search()](./search)** — tous les filtres disponibles
- **[Détail article item()](./item)** — récupérer les données complètes d'un article
- **[Appels custom curl()](./curl)** — accéder à n'importe quel endpoint Vinted
- **[Gestion des cookies](./cookies)** — sessions, refresh, proxy
- **[Patterns Riselio](./patterns)** — exemples prêts à l'emploi
- **[Erreurs](./erreurs)** — gestion des erreurs et anti-ban
