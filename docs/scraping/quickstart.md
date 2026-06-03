---
sidebar_position: 3
---

# Démarrage rapide

## Installation

```bash
pip install vinted-scraper
```

---

## Première recherche (15 lignes)

```python
import asyncio
from vinted_scraper import AsyncVintedWrapper

async def main():
    # 1. Créer le wrapper (récupère le cookie automatiquement)
    wrapper = await AsyncVintedWrapper.create("https://www.vinted.fr")

    # 2. Lancer une recherche
    result = await wrapper.search({
        "search_text": "nike air max 90",
        "per_page": 20,
        "order": "newest_first",
    })

    # 3. Parcourir les résultats
    for item in result["items"]:
        print(item["id"], item["title"], item["price"])

asyncio.run(main())
```

---

## Structure du `result` retourné par `search()`

```python
result = {
    "items": [
        {
            "id": "123456789",
            "title": "Nike Air Max 90",
            "price": "45.0",
            "currency": "EUR",
            "url": "https://www.vinted.fr/items/123456789",
            "photo": { "url": "https://..." },
            "user": {
                "id": 987,
                "login": "vendeur123",
                "profile_url": "https://www.vinted.fr/member/987"
            },
            "brand_title": "Nike",
            "size_title": "42",
            "status": "Very Good",
        },
        # ...
    ],
    "pagination": {
        "current_page": 1,
        "total_pages": 12,
        "total_entries": 234,
        "per_page": 20,
    }
}
```

---

## Utiliser le context manager

Recommandé pour fermer proprement le client HTTP en fin de script :

```python
async def main():
    async with await AsyncVintedWrapper.create("https://www.vinted.fr") as wrapper:
        result = await wrapper.search({"search_text": "adidas"})
        # le client HTTP se ferme automatiquement en sortant du `with`
```

---

## Changer de pays

```python
wrapper_fr = await AsyncVintedWrapper.create("https://www.vinted.fr")
wrapper_be = await AsyncVintedWrapper.create("https://www.vinted.be")
wrapper_de = await AsyncVintedWrapper.create("https://www.vinted.de")
wrapper_uk = await AsyncVintedWrapper.create("https://www.vinted.co.uk")
```

Pour comparer les prix entre pays, instancier un wrapper par pays (voir [Patterns](./patterns#pattern-3--comparer-les-prix-entre-pays)).
