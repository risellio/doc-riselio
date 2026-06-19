# MySQL — Guide Basique d'Utilisation

## Commandes essentielles

### 1. Voir tes bases de données

```sql
SHOW DATABASES;
```

### 2. Utiliser ta base

```sql
USE trend_db;
```

### 3. Voir les tables

```sql
SHOW TABLES;
```

### 4. Voir les données dans une table

```sql
SELECT * FROM insights;
```

### 5. Voir la structure d'une table

```sql
DESCRIBE insights;
```

### 6. Quitter MySQL

```sql
exit;
```

## Conseils

- Toujours faire `USE trend_db` avant de travailler
- Les `;` sont obligatoires à la fin des commandes
- `SELECT` = lire les données
- `INSERT` = ajouter des données
