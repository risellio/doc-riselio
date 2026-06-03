---
sidebar_position: 6
---

# Appels custom `curl()`

## Signature

```python
await wrapper.curl(endpoint: str, params: dict | None = None) -> dict
```

Permet d'appeler **n'importe quel endpoint de l'API Vinted** directement, pas seulement `search` et `item`. La méthode gère les cookies, headers et retries automatiquement.

---

## Cas d'usage Riselio

- Récupérer la liste des catégories ou des marques (pour alimenter les filtres du dashboard)
- Explorer un endpoint non couvert par les méthodes de base
- Récupérer les articles d'un vendeur spécifique

---

## Exemples

```python
# Liste des marques disponibles
result = await wrapper.curl("/api/v2/brands", params={"per_page": 100})
for brand in result.get("brands", []):
    print(brand["id"], brand["title"])

# Liste des catégories
result = await wrapper.curl("/api/v2/catalogs")

# Profil d'un vendeur
result = await wrapper.curl("/api/v2/users/username")
user = result["user"]
print(user["id"], user["login"], user["feedback_reputation"])

# Articles d'un vendeur
user_id = "987654"
result = await wrapper.curl(f"/api/v2/users/{user_id}/items", params={
    "per_page": 50,
    "page": 1,
})
for item in result["items"]:
    print(item["title"], item["price"])
```

---

## Comment trouver les endpoints Vinted

Les endpoints ne sont pas documentés officiellement.

1. **DevTools réseau** — ouvrir vinted.fr dans Chrome, onglet Network, filtrer sur `/api/v2/` et observer les requêtes lors de la navigation.
2. **Repos open-source** — des projets communautaires documentent certains endpoints.
