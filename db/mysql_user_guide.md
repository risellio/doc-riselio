# Guide MySQL — Créer un utilisateur

## Objectif

Créer un compte MySQL sécurisé pour se connecter depuis Python.

## Étapes

### 1. Se connecter à MySQL

```bash
sudo mysql
```

### 2. Créer un utilisateur

```sql
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
```

**Exemple :**

```sql
CREATE USER 'python_user'@'localhost' IDENTIFIED BY 'password123';
```

### 3. Donner des permissions

```sql
GRANT ALL PRIVILEGES ON nom_de_la_base.* TO 'username'@'localhost';
```

**Exemple :**

```sql
GRANT ALL PRIVILEGES ON trend_db.* TO 'python_user'@'localhost';
```

### 4. Appliquer les changements

```sql
FLUSH PRIVILEGES;
```

### 5. Quitter

```sql
exit;
```

## Conseil

> Toujours créer un utilisateur dédié au projet.
