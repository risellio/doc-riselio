---
sidebar_position: 9
---

# Erreurs courantes

## Vue d'ensemble

| Erreur | Cause | Solution |
|---|---|---|
| `RuntimeError` au démarrage | Cookie non récupérable | Vérifier la connectivité, changer d'IP |
| `RuntimeError` 401 | Cookie expiré, retry épuisé | Forcer `refresh_cookie()` |
| `RuntimeError` 403 sur `item()` | Rate limit sur les détails | Ajouter des délais entre appels |
| `RuntimeError` 429 | Trop de requêtes | Ralentir, ajouter des sleeps |
| `RuntimeError` parsing JSON | Réponse inattendue de Vinted | Log la réponse brute pour debug |

---

## Erreur au démarrage — cookie introuvable

```python
try:
    wrapper = await AsyncVintedWrapper.create("https://www.vinted.fr")
except RuntimeError as e:
    print(f"Échec de connexion : {e}")
    # → Vérifier la connexion internet
    # → Vinted est peut-être down
    # → Changer d'IP (proxy, VPN)
```

---

## Erreur 403 sur `item()` — rate limit

```python
import asyncio

async def safe_item_fetch(wrapper, item_id: str, delay: float = 2.0) -> dict | None:
    try:
        return await wrapper.item(item_id)
    except RuntimeError as e:
        if "403" in str(e):
            print(f"Rate limit 403 sur item {item_id}, on attend {delay}s...")
            await asyncio.sleep(delay)
            return None  # skipper et reprendre plus tard
        raise
```

---

## Retry avec backoff exponentiel

```python
async def search_with_retry(wrapper, params: dict, max_retries: int = 3) -> dict | None:
    for attempt in range(max_retries):
        try:
            return await wrapper.search(params)
        except RuntimeError as e:
            wait = 2 ** attempt  # 1s, 2s, 4s
            print(f"Erreur tentative {attempt + 1}/{max_retries}: {e}. Retry dans {wait}s")
            await asyncio.sleep(wait)
    return None
```

---

## Session longue — refresh préventif du cookie

```python
async def long_scrape_session():
    wrapper = await AsyncVintedWrapper.create("https://www.vinted.fr")

    for i, query in enumerate(QUERIES_LIST):
        if i > 0 and i % 100 == 0:
            print("Rafraîchissement préventif du cookie...")
            wrapper.session_cookie = await wrapper.refresh_cookie()

        result = await wrapper.search({"search_text": query})
        await asyncio.sleep(0.5)
```

---

## Logging pour le debug

```python
import logging

logging.basicConfig(level=logging.DEBUG)

# Ou uniquement pour vinted_scraper
logger = logging.getLogger("vinted_scraper")
logger.setLevel(logging.DEBUG)
```

---

## Bonnes pratiques anti-ban

- Toujours ajouter un délai entre les requêtes (`asyncio.sleep(0.5)` minimum)
- Max 3–5 requêtes simultanées en parallèle
- Rotation d'IP en volume (proxy résidentiel ou ProtonVPN)
- User-agent : la lib en génère un automatiquement — ne pas forcer un UA générique
- Éviter `item()` en masse : préférer les données de `search()` quand c'est suffisant
