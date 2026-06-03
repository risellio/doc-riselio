---
sidebar_position: 2
---

# Dashboard

Le dashboard est la vue principale de l'app. Il agrège les données des recherches suivies et expose les métriques clés.

## Vues principales

### `/dashboard`
Vue d'accueil — résumé des alertes récentes, volume de nouveaux articles dans les dernières 24h, graphique de prix moyen par recherche.

### `/searches`
Liste des recherches suivies par l'utilisateur. Chaque recherche a un nom, des paramètres Vinted (mots-clés, filtres prix, marque) et une fréquence de scraping.

### `/alerts`
Fil d'alertes en temps réel — articles détectés correspondant aux seuils de prix configurés.

### `/item/:id`
Détail d'un article : photos, historique de prix, évaluation IA, lien vers Vinted.

## Graphiques Recharts

```tsx
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

// Graphique prix moyen sur 30 jours
<LineChart data={priceHistory}>
  <Line type="monotone" dataKey="avgPrice" stroke="#6366f1" />
  <XAxis dataKey="date" />
  <YAxis />
  <Tooltip />
</LineChart>
```

## Polling des alertes

Les alertes sont rafraîchies toutes les 30 secondes via TanStack Query :

```ts
const { data: alerts } = useQuery({
  queryKey: ['alerts'],
  queryFn: () => api.get('/api/alerts'),
  refetchInterval: 30_000,
});
```
