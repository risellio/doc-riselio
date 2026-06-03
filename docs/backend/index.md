---
sidebar_position: 1
---

# Backend

Le backend Riselio est une **API Hono** en Node.js/TypeScript. Elle expose les routes consommées par le frontend, gère l'auth, les webhooks Stripe et orchestre les jobs de scraping.

## Stack

| Lib | Rôle |
|---|---|
| Hono | Framework HTTP léger |
| Prisma | ORM + migrations MySQL |
| Better Auth | Auth (sessions, JWT) |
| Stripe SDK | Abonnements + webhooks |
| Zod | Validation des inputs |

## Structure des dossiers

```
/backend
  /src
    /routes       — endpoints API groupés par domaine
    /middleware   — auth guard, rate limit, error handler
    /services     — logique métier (scraping, alertes, IA)
    /jobs         — tâches planifiées (cron scraping)
    /lib          — clients Prisma, Stripe, Anthropic
  index.ts        — point d'entrée Hono
```

## Lancer le dev

```bash
cd backend
npm install
npm run dev
```

L'API tourne sur `http://localhost:3000`. Toutes les routes sont préfixées `/api/`.

## Conventions

- Chaque route valide ses inputs avec Zod avant d'accéder à la base
- Les erreurs sont normalisées via un middleware global : `{ error: string, code: string }`
- Prisma Client est un singleton importé depuis `/lib/prisma.ts`
