---
sidebar_position: 3
---

# Base de données

Riselio utilise **MySQL** avec **Prisma** comme ORM.

## Schéma principal

```prisma
model User {
  id          String    @id @default(cuid())
  email       String    @unique
  searches    Search[]
  subscription Subscription?
  createdAt   DateTime  @default(now())
}

model Search {
  id          String    @id @default(cuid())
  userId      String
  user        User      @relation(fields: [userId], references: [id])
  name        String
  query       String
  priceMax    Float?
  priceMin    Float?
  brandIds    String?
  active      Boolean   @default(true)
  items       Item[]
  alerts      Alert[]
  createdAt   DateTime  @default(now())
  lastScrapedAt DateTime?
}

model Item {
  id          String    @id @default(cuid())
  searchId    String
  search      Search    @relation(fields: [searchId], references: [id])
  vintedId    String    @unique
  title       String
  price       Float
  totalPrice  Float
  url         String
  imageUrl    String?
  brand       String?
  size        String?
  condition   String?
  sellerId    String?
  sellerLogin String?
  aiScore     Float?
  aiSummary   String?
  scrapedAt   DateTime  @default(now())
  createdAt   DateTime
}

model Alert {
  id          String    @id @default(cuid())
  searchId    String
  search      Search    @relation(fields: [searchId], references: [id])
  itemId      String
  item        Item      @relation(fields: [itemId], references: [id])
  read        Boolean   @default(false)
  createdAt   DateTime  @default(now())
}

model Subscription {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  stripeCustomerId String?
  stripeSubId     String?
  status          String   // active | canceled | past_due
  currentPeriodEnd DateTime?
}
```

## Migrations

```bash
# Créer une migration après modification du schéma
npx prisma migrate dev --name nom_de_la_migration

# Appliquer en production
npx prisma migrate deploy
```

## Client singleton

```ts
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ log: ['error'] });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```
