---
sidebar_position: 4
---

# Paramètres de recherche `search()`

## Signature

```python
await wrapper.search(params: dict | None = None) -> dict
```

---

## Tous les paramètres disponibles

| Paramètre | Type | Description | Exemple |
|---|---|---|---|
| `search_text` | `str` | Mots-clés | `"nike air max"` |
| `page` | `int` | Numéro de page (commence à 1) | `2` |
| `per_page` | `int` | Résultats par page (max ~96) | `50` |
| `price_from` | `float` | Prix minimum (€) | `10.0` |
| `price_to` | `float` | Prix maximum (€) | `80.0` |
| `order` | `str` | Tri des résultats | `"newest_first"` |
| `catalog_ids` | `str` | IDs de catégories séparés par virgule | `"1206"` |
| `brand_ids` | `str` | IDs de marques séparés par virgule | `"53"` |
| `size_ids` | `str` | IDs de tailles séparés par virgule | `"207"` |

---

## Valeurs de `order`

| Valeur | Description |
|---|---|
| `newest_first` | Les plus récents en premier |
| `price_low_to_high` | Prix croissant |
| `price_high_to_low` | Prix décroissant |
| `relevance` | Pertinence (défaut Vinted) |

---

## Exemples

```python
# Recherche simple
result = await wrapper.search({
    "search_text": "jordan 1 retro high",
    "per_page": 50,
    "order": "newest_first",
})

# Filtrée par prix
result = await wrapper.search({
    "search_text": "iphone 15 pro",
    "price_from": 500,
    "price_to": 900,
    "order": "price_low_to_high",
})

# Par catégorie + marque (sneakers Nike)
result = await wrapper.search({
    "catalog_ids": "1206",
    "brand_ids": "53",
    "per_page": 96,
    "order": "newest_first",
})

# Page 2
result = await wrapper.search({
    "search_text": "vintage levi's",
    "page": 2,
    "per_page": 20,
})
```

---

## Trouver les IDs de catégories et marques

1. **Via l'URL Vinted** — faire une recherche sur vinted.fr avec les filtres voulus, inspecter l'URL (`catalog_ids=1206&brand_ids=53`).
2. **Via l'API** — utiliser `curl()` sur `/api/v2/catalogs` ou `/api/v2/brands` (voir [Appels custom](./curl)).

---

## Champs utiles dans `result["items"][n]`

```python
item = result["items"][0]

item["id"]               # str — identifiant unique de l'article
item["title"]            # str — titre de l'annonce
item["price"]            # str — prix affiché
item["currency"]         # str — "EUR"
item["url"]              # str — lien vers l'annonce
item["total_item_price"] # str — prix total avec frais
item["brand_title"]      # str — marque
item["size_title"]       # str — taille
item["status"]           # str — état (Very Good, Good, etc.)
item["photo"]["url"]     # str — URL de la photo principale
item["user"]["login"]    # str — pseudo du vendeur
item["user"]["id"]       # int — ID du vendeur
item["created_at_ts"]    # int — timestamp de création
```
