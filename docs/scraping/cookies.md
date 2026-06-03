---
sidebar_position: 7
---

# Gestion des cookies

## Comment ça marche

Vinted requiert un cookie de session (`access_token_web`) pour accéder à son API. La lib s'en occupe automatiquement.

Au démarrage via `create()`, elle fait un GET sur `/` pour récupérer ce cookie. Si une requête retourne 401 (cookie expiré), elle en refetch un nouveau automatiquement et relance la requête.

---

## Instanciation normale (recommandée)

```python
wrapper = await AsyncVintedWrapper.create("https://www.vinted.fr")
```

---

## Rafraîchir le cookie manuellement

```python
# Forcer un refresh (utile si tu détectes des erreurs 401 hors flux normal)
wrapper.session_cookie = await wrapper.refresh_cookie()

# Avec plus de tentatives (défaut = 3)
wrapper.session_cookie = await wrapper.refresh_cookie(retries=5)
```

---

## Passer son propre cookie (cas avancé)

Si tu as déjà un cookie valide stocké en base :

```python
wrapper = AsyncVintedWrapper(
    baseurl="https://www.vinted.fr",
    session_cookie={"access_token_web": "ton_token_ici"}
)
```

---

## Personnaliser les cookies extraits

```python
wrapper = await AsyncVintedWrapper.create(
    "https://www.vinted.fr",
    cookie_names=["access_token_web", "anon_id"]
)
```

---

## Proxy et configuration httpx

Utile pour router via un proxy résidentiel ou ProtonVPN pour éviter les bans en volume :

```python
wrapper = await AsyncVintedWrapper.create(
    "https://www.vinted.fr",
    config={
        "timeout": 30,
        "proxies": {"https://": "http://mon-proxy:8080"},
    }
)
```

---

## Instanciation sans récupération automatique

```python
# Rare — pour des cas avancés uniquement
wrapper = AsyncVintedWrapper("https://www.vinted.fr")
wrapper.session_cookie = await wrapper.refresh_cookie()
```

---

## User-agent custom

```python
wrapper = await AsyncVintedWrapper.create(
    "https://www.vinted.fr",
    user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
)
```

Si non fourni, la lib en génère un automatiquement.
