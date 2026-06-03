---
sidebar_position: 2
---

# Routes API

Toutes les routes sont prefixées `/api/`. L'auth est vérifiée via middleware sur toutes les routes protégées (`🔒`).

## Recherches

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/api/searches` | 🔒 Liste les recherches de l'utilisateur |
| `POST` | `/api/searches` | 🔒 Crée une nouvelle recherche |
| `PATCH` | `/api/searches/:id` | 🔒 Met à jour une recherche |
| `DELETE` | `/api/searches/:id` | 🔒 Supprime une recherche |

## Articles

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/api/items` | 🔒 Articles scrappés (filtrable par `searchId`) |
| `GET` | `/api/items/:id` | 🔒 Détail d'un article |

## Alertes

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/api/alerts` | 🔒 Alertes récentes de l'utilisateur |
| `PATCH` | `/api/alerts/:id/read` | 🔒 Marque une alerte comme lue |

## Abonnement

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/api/subscription/status` | 🔒 Statut abonnement actif |
| `POST` | `/api/subscription/checkout` | 🔒 Crée une session Stripe Checkout |
| `POST` | `/api/webhooks/stripe` | Webhook Stripe (signature vérifiée) |

## Auth

Les routes `/api/auth/*` sont gérées par Better Auth directement (pas de code custom).

## Exemple de route Hono

```ts
// routes/searches.ts
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';

const app = new Hono();

const createSearchSchema = z.object({
  name: z.string().min(1),
  query: z.string().min(1),
  priceMax: z.number().optional(),
});

app.post('/', requireAuth, zValidator('json', createSearchSchema), async (c) => {
  const user = c.get('user');
  const body = c.req.valid('json');

  const search = await prisma.search.create({
    data: { ...body, userId: user.id },
  });

  return c.json(search, 201);
});

export default app;
```
