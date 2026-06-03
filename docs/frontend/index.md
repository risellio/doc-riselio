---
sidebar_position: 1
---

# Frontend

Le frontend Riselio est un **dashboard React** qui expose les données scrappées sous forme de tableaux, graphiques et alertes.

## Stack

| Lib | Rôle |
|---|---|
| React 18 + Vite | UI + build |
| TanStack Query | Fetching, cache, invalidation |
| Recharts | Graphiques de prix |
| Better Auth client | Gestion de session |

## Structure des dossiers

```
/frontend
  /src
    /components   — composants réutilisables
    /pages        — vues principales (dashboard, recherches, alertes)
    /hooks        — custom hooks TanStack Query
    /lib          — clients API, helpers
    /types        — types TypeScript partagés
  vite.config.ts
```

## Lancer le dev

```bash
cd frontend
npm install
npm run dev
```

Le frontend tourne sur `http://localhost:5173` et proxifie `/api/` vers le backend sur `:3000`.

## Conventions

- Tous les appels API passent par des hooks TanStack Query dans `/hooks`
- Les types des réponses API sont définis dans `/types` et partagés avec le backend
- Pas de state global (Redux/Zustand) — TanStack Query gère le cache serveur
