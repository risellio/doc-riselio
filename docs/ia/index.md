---
sidebar_position: 1
---

# IA — Analyse des articles

Riselio utilise l'**API Anthropic** (Claude) pour analyser visuellement les articles Vinted. L'objectif est d'enrichir les données scrappées avec un score de qualité et un résumé généré automatiquement.

## Ce que fait l'IA

- **Évaluation visuelle** — analyser la photo principale d'un article et estimer son état réel (au-delà du label vendeur)
- **Score de revente** — estimer la probabilité que l'article soit rentable à la revente
- **Résumé automatique** — générer une courte description structurée pour le dashboard

## Modèle utilisé

Claude Haiku (rapide et économique pour l'analyse en volume) avec vision activée.

## Pipeline

```
Item scrappé → Photo URL → Anthropic API (vision) → Score + Résumé → Stocké en base
```

Les champs `aiScore` et `aiSummary` sur le modèle `Item` sont alimentés par ce pipeline.

## Pages de cette section

- **[Analyse visuelle](./analyse-visuelle)** — implémentation du pipeline Anthropic
