---
sidebar_position: 8
---

# Patterns concrets pour Riselio

Exemples prêts à l'emploi pour les cas d'usage du scraper Riselio.

---

## Pattern 1 — Pagination complète

Récupérer tous les résultats d'une recherche, page par page.

```python
import asyncio
from vinted_scraper import AsyncVintedWrapper

async def fetch_all_pages(query: str, max_pages: int = 10) -> list:
    wrapper = await AsyncVintedWrapper.create("https://www.vinted.fr")
    all_items = []

    for page in range(1, max_pages + 1):
        result = await wrapper.search({
            "search_text": query,
            "per_page": 96,
            "page": page,
            "order": "newest_first",
        })

        items = result.get("items", [])
        if not items:
            break

        all_items.extend(items)

        total_pages = result.get("pagination", {}).get("total_pages", 1)
        if page >= total_pages:
            break

        await asyncio.sleep(1)

    return all_items
```

---

## Pattern 2 — Multi-recherches en parallèle

```python
import asyncio
from vinted_scraper import AsyncVintedWrapper

async def multi_search(queries: list[str]) -> dict:
    wrapper = await AsyncVintedWrapper.create("https://www.vinted.fr")

    async def search_one(query):
        result = await wrapper.search({
            "search_text": query,
            "per_page": 50,
            "order": "newest_first",
        })
        return query, result.get("items", [])

    results = await asyncio.gather(*[search_one(q) for q in queries])
    return dict(results)

# Usage
results = await multi_search(["jordan 1", "nike dunk low", "adidas samba"])
for query, items in results.items():
    print(f"{query}: {len(items)} résultats")
```

---

## Pattern 3 — Comparer les prix entre pays

```python
import asyncio
from vinted_scraper import AsyncVintedWrapper

COUNTRIES = {
    "fr": "https://www.vinted.fr",
    "be": "https://www.vinted.be",
    "de": "https://www.vinted.de",
}

async def compare_prices(query: str) -> dict:
    async def fetch_for_country(country_code, base_url):
        wrapper = await AsyncVintedWrapper.create(base_url)
        result = await wrapper.search({
            "search_text": query,
            "per_page": 20,
            "order": "price_low_to_high",
        })
        items = result.get("items", [])
        if not items:
            return country_code, None
        cheapest = items[0]
        return country_code, {
            "price": cheapest["price"],
            "url": cheapest["url"],
            "title": cheapest["title"],
        }

    tasks = [fetch_for_country(code, url) for code, url in COUNTRIES.items()]
    results = await asyncio.gather(*tasks)
    return dict(results)
```

---

## Pattern 4 — Normaliser pour Prisma

```python
from datetime import datetime

def normalize_item(raw_item: dict) -> dict:
    return {
        "vinted_id": str(raw_item["id"]),
        "title": raw_item.get("title", ""),
        "price": float(raw_item.get("price", 0)),
        "total_price": float(raw_item.get("total_item_price", 0)),
        "currency": raw_item.get("currency", "EUR"),
        "url": raw_item.get("url", ""),
        "image_url": raw_item.get("photo", {}).get("url", ""),
        "brand": raw_item.get("brand_title", ""),
        "size": raw_item.get("size_title", ""),
        "condition": raw_item.get("status", ""),
        "seller_id": str(raw_item.get("user", {}).get("id", "")),
        "seller_login": raw_item.get("user", {}).get("login", ""),
        "created_at": datetime.fromtimestamp(raw_item.get("created_at_ts", 0)),
        "scraped_at": datetime.now(),
    }

result = await wrapper.search({"search_text": "jordan 1"})
normalized = [normalize_item(item) for item in result["items"]]
```

---

## Pattern 5 — Polling (nouvelles annonces)

```python
import asyncio
from vinted_scraper import AsyncVintedWrapper

async def watch_search(query: str, interval_seconds: int = 60):
    wrapper = await AsyncVintedWrapper.create("https://www.vinted.fr")
    seen_ids = set()

    while True:
        result = await wrapper.search({
            "search_text": query,
            "per_page": 50,
            "order": "newest_first",
        })

        items = result.get("items", [])
        new_items = [item for item in items if str(item["id"]) not in seen_ids]

        for item in new_items:
            seen_ids.add(str(item["id"]))
            print(f"[NEW] {item['title']} — {item['price']}€ — {item['url']}")

        await asyncio.sleep(interval_seconds)
```

---

## Pattern 6 — Wrapper singleton

Évite de recréer le wrapper à chaque appel dans le scraper Riselio.

```python
# scraper/vinted_client.py
from vinted_scraper import AsyncVintedWrapper

_wrapper: AsyncVintedWrapper | None = None

async def get_vinted_wrapper(base_url: str = "https://www.vinted.fr") -> AsyncVintedWrapper:
    global _wrapper
    if _wrapper is None:
        _wrapper = await AsyncVintedWrapper.create(base_url)
    return _wrapper
```

```python
# Dans le scraper
from scraper.vinted_client import get_vinted_wrapper

async def scrape_query(query: str):
    wrapper = await get_vinted_wrapper()
    result = await wrapper.search({"search_text": query, "per_page": 50})
    return result["items"]
```
