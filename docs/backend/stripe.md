---
sidebar_position: 4
---

# Stripe — Paiement

Riselio monétise via un abonnement mensuel à **20€/mois** avec une **commission de 10%** sur les ventes réalisées via la plateforme.

## Flux d'abonnement

```
Utilisateur → POST /api/subscription/checkout
  → Stripe Checkout Session créée
  → Redirect vers Stripe
  → Paiement réussi → webhook `checkout.session.completed`
  → Subscription activée en base
```

## Créer une Checkout Session

```ts
// services/stripe.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(userId: string, email: string) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: email,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID, // prix 20€/mois créé dans le dashboard Stripe
        quantity: 1,
      },
    ],
    success_url: `${process.env.FRONTEND_URL}/dashboard?sub=success`,
    cancel_url: `${process.env.FRONTEND_URL}/pricing`,
    metadata: { userId },
  });

  return session.url;
}
```

## Webhook Stripe

```ts
// routes/webhooks.ts
app.post('/stripe', async (c) => {
  const sig = c.req.header('stripe-signature')!;
  const body = await c.req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return c.text('Invalid signature', 400);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    if (userId) {
      await prisma.subscription.upsert({
        where: { userId },
        create: {
          userId,
          stripeCustomerId: session.customer as string,
          stripeSubId: session.subscription as string,
          status: 'active',
        },
        update: {
          status: 'active',
          stripeSubId: session.subscription as string,
        },
      });
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription;
    await prisma.subscription.updateMany({
      where: { stripeSubId: sub.id },
      data: { status: 'canceled' },
    });
  }

  return c.text('OK');
});
```

## Variables d'environnement

```env
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...
```
