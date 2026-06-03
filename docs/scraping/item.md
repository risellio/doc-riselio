---
sidebar_position: 5
---

# Détail d'un article `item()`

## Signature

```python
await wrapper.item(item_id: str, params: dict | None = None) -> dict
```

---

## Usage basique

```python
# L'item_id est le champ "id" récupéré dans les résultats de search()
detail = await wrapper.item("123456789")

item = detail["item"]
print(item["title"])
print(item["description"])
print(item["price"])
print(item["user"]["login"])
```

---

## Différence avec `search()`

`search()` retourne une liste d'articles avec des infos minimales (photo principale, prix, titre, vendeur basique).

`item()` retourne un seul article avec **beaucoup plus de détails** :

- Description complète
- Toutes les photos
- Infos vendeur détaillées (note, nb de ventes, localisation)
- Conditions de vente
- Tags / labels

---

## Structure de `detail["item"]`

```python
item = detail["item"]

# Infos article
item["id"]
item["title"]
item["description"]          # description complète
item["price"]
item["total_item_price"]     # prix + frais de port
item["currency"]
item["url"]
item["status"]               # état de l'article
item["brand_title"]
item["size_title"]
item["created_at_ts"]

# Photos
item["photos"]               # liste de toutes les photos
item["photos"][0]["url"]     # URL de la première photo

# Vendeur (plus détaillé qu'en search)
item["user"]["id"]
item["user"]["login"]
item["user"]["profile_url"]
item["user"]["feedback_reputation"]   # note du vendeur (0-5)
item["user"]["positive_feedback_count"]
item["user"]["item_count"]            # nb d'articles vendus
item["user"]["city"]
item["user"]["country_title"]
```

---

## ⚠️ Attention : erreur 403 en rafale

`item()` retourne une **erreur 403** après quelques appels consécutifs rapides. C'est une limitation connue de l'API Vinted.

Stratégie recommandée pour Riselio :

```python
import asyncio

items_ids = ["111", "222", "333"]

for item_id in items_ids:
    detail = await wrapper.item(item_id)
    # traitement...
    await asyncio.sleep(2)  # attendre 2s entre chaque appel
```

Quand les données de `search()` sont suffisantes, préférer `search()` qui est plus stable en volume.

---

## Exemple — enrichir un article depuis search()

```python
async def enrich_item(wrapper, item_from_search: dict) -> dict:
    item_id = item_from_search["id"]
    try:
        detail = await wrapper.item(item_id)
        return {
            **item_from_search,
            "description": detail["item"]["description"],
            "all_photos": [p["url"] for p in detail["item"]["photos"]],
            "seller_rating": detail["item"]["user"]["feedback_reputation"],
            "seller_sales": detail["item"]["user"]["item_count"],
        }
    except RuntimeError as e:
        print(f"Erreur sur item {item_id}: {e}")
        return item_from_search  # fallback sur les données de search
```
