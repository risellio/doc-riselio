# Guide MySQL — Droits et Administration

## Objectif

Comprendre et gérer les permissions MySQL.

## Commandes

### 1. Voir les utilisateurs

```sql
SELECT User, Host FROM mysql.user;
```

### 2. Voir les permissions d'un utilisateur

```sql
SHOW GRANTS FOR 'username'@'localhost';
```

### 3. Donner des droits complets

```sql
GRANT ALL PRIVILEGES ON nom_base.* TO 'username'@'localhost';
```

### 4. Donner des droits limités

```sql
GRANT SELECT, INSERT ON nom_base.* TO 'username'@'localhost';
```

### 5. Retirer des droits

```sql
REVOKE ALL PRIVILEGES ON nom_base.* FROM 'username'@'localhost';
```

### 6. Supprimer un utilisateur

```sql
DROP USER 'username'@'localhost';
```

### 7. Actualiser les droits

```sql
FLUSH PRIVILEGES;
```

## Conseils

- Ne pas utiliser `root` pour les apps
- Donner seulement les droits nécessaires
- Séparer les utilisateurs par projet
