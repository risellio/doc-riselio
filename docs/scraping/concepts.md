---
sidebar_position: 2
---

# Les 4 classes : laquelle choisir ?

La lib expose 4 classes. La différence se joue sur deux axes :

```
                    synchrone          asynchrone
                 ┌─────────────────┬──────────────────────┐
  JSON brut      │  VintedWrapper  │  AsyncVintedWrapper  │
  Objets typés   │  VintedScraper  │  AsyncVintedScraper  │
                 └─────────────────┴──────────────────────┘
```

---

## `AsyncVintedWrapper` ✅ — À utiliser chez Riselio

- Async → compatible avec notre stack (Playwright, asyncio)
- Retourne des `dict` Python (JSON brut) → on mappe nous-mêmes vers nos modèles Prisma
- Gère les cookies, les retries et les headers automatiquement
- S'instancie avec une factory method `create()` (obligatoire en async)

```python
from vinted_scraper import AsyncVintedWrapper

wrapper = await AsyncVintedWrapper.create("https://www.vinted.fr")
```

---

## `AsyncVintedScraper` — Alternative si tu veux des objets

Hérite d'`AsyncVintedWrapper`, même interface, mais retourne des `VintedItem` au lieu de dicts.

Utile si tu veux de l'autocomplétion IDE ou un accès par attributs (`item.price`, `item.url`…).

```python
from vinted_scraper import AsyncVintedScraper

scraper = await AsyncVintedScraper.create("https://www.vinted.fr")
items = await scraper.search({"search_text": "jordan 1"})
# items est une List[VintedItem]
print(items[0].price)
```

---

## `VintedWrapper` / `VintedScraper` — À éviter

Versions synchrones. Bloquent le thread → incompatible avec asyncio. Ne pas utiliser dans le scraper Riselio.

---

## Ce que la lib gère automatiquement

- **Cookie de session** : elle va sur `vinted.fr` et récupère le cookie `access_token_web` au démarrage
- **Retry automatique** : si le cookie expire (401), elle en refetch un nouveau et relance la requête
- **Headers** : génère un user-agent réaliste automatiquement
- **Retry sur cookie KO** : 3 tentatives par défaut avant de lever une `RuntimeError`
