---
sidebar_position: 2
---

# Analyse visuelle

Le service d'analyse visuelle envoie la photo principale d'un article à Claude et retourne un score + un résumé structuré.

## Setup

```bash
npm install @anthropic-ai/sdk
```

```env
ANTHROPIC_API_KEY=sk-ant-...
```

## Service d'analyse

```ts
// backend/services/ai-analysis.ts
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface ItemAnalysis {
  score: number;      // 0-10 — score de revente estimé
  condition: string;  // évaluation de l'état réel
  summary: string;    // résumé court pour le dashboard
}

export async function analyzeItem(
  title: string,
  price: number,
  imageUrl: string
): Promise<ItemAnalysis> {
  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 300,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'url', url: imageUrl },
          },
          {
            type: 'text',
            text: `Article Vinted : "${title}" — Prix : ${price}€

Analyse cette photo et retourne un JSON avec exactement ces 3 champs :
- score (number 0-10) : probabilité de revente rentable, basée sur l'état visible et le prix
- condition (string) : évaluation de l'état réel en 1 phrase
- summary (string) : résumé en 1 phrase pour un acheteur potentiel

Réponds uniquement avec le JSON, sans markdown.`,
          },
        ],
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '{}';

  try {
    return JSON.parse(text) as ItemAnalysis;
  } catch {
    return { score: 0, condition: 'Analyse indisponible', summary: '' };
  }
}
```

## Intégration dans le scraper

Après insertion d'un article en base, on lance l'analyse en arrière-plan :

```ts
// backend/services/scraping.ts
import { analyzeItem } from './ai-analysis';
import { prisma } from '../lib/prisma';

async function processNewItem(item: NormalizedItem) {
  const created = await prisma.item.create({ data: item });

  if (item.imageUrl) {
    analyzeItem(item.title, item.price, item.imageUrl)
      .then((analysis) =>
        prisma.item.update({
          where: { id: created.id },
          data: {
            aiScore: analysis.score,
            aiSummary: analysis.summary,
          },
        })
      )
      .catch((err) => console.error(`AI analysis failed for ${created.id}:`, err));
  }

  return created;
}
```

## Affichage dans le dashboard

Le score IA est affiché sur la card de chaque article. Un score ≥ 7 déclenche un badge "Bonne affaire".

```tsx
function ItemCard({ item }: { item: Item }) {
  return (
    <div className="item-card">
      <img src={item.imageUrl} alt={item.title} />
      <h3>{item.title}</h3>
      <p>{item.price}€</p>
      {item.aiScore !== null && (
        <span className={item.aiScore >= 7 ? 'badge-deal' : 'badge-normal'}>
          Score IA : {item.aiScore}/10
        </span>
      )}
      {item.aiSummary && <p className="ai-summary">{item.aiSummary}</p>}
    </div>
  );
}
```

## Coûts et optimisation

- Modèle : `claude-haiku-4-5-20251001` — le moins cher pour de la vision en volume
- Ne pas analyser tous les articles — seulement ceux dont le prix est sous le seuil d'alerte configuré par l'utilisateur
- Mettre en cache les analyses (ne pas réanalyser un item déjà scoré)
