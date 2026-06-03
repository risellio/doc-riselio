---
sidebar_position: 3
---

# Auth côté client

Riselio utilise **Better Auth** pour la gestion des sessions. Le client est initialisé une fois et exposé via un hook.

## Setup Better Auth client

```ts
// lib/auth-client.ts
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
});
```

## Hook de session

```tsx
import { authClient } from '@/lib/auth-client';

function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <Spinner />;
  if (!session) return <Redirect to="/login" />;

  return <div>Bonjour {session.user.email}</div>;
}
```

## Routes protégées

Toutes les routes du dashboard sont wrappées dans un composant `ProtectedRoute` qui redirige vers `/login` si la session est absente.

```tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  if (isPending) return <Spinner />;
  if (!session) return <Navigate to="/login" />;
  return <>{children}</>;
}
```

## Abonnement Stripe

Après connexion, le frontend vérifie si l'utilisateur a un abonnement actif via `/api/subscription/status`. Si absent, il est redirigé vers la page de paiement Stripe.
