# MySQL — Guide Général : Créer et Gérer des Bases de Données

## Objectif

Apprendre les commandes essentielles pour créer et gérer une base de données avec MySQL.

---

## Commandes

### 1. Se connecter à MySQL

```bash
sudo mysql
```

### 2. Voir toutes les bases de données

```sql
SHOW DATABASES;
```

### 3. Créer une base de données

```sql
CREATE DATABASE nom_de_la_base;
```

**Exemple :**

```sql
CREATE DATABASE test_db;
```

### 4. Utiliser une base de données

```sql
USE nom_de_la_base;
```

**Exemple :**

```sql
USE test_db;
```

### 5. Créer une table

```sql
CREATE TABLE nom_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    age INT
);
```

### 6. Voir les tables

```sql
SHOW TABLES;
```

### 7. Voir la structure d'une table

```sql
DESCRIBE nom_table;
```

### 8. Ajouter des données

```sql
INSERT INTO nom_table (nom, age)
VALUES ('Alice', 25);
```

### 9. Lire les données

```sql
SELECT * FROM nom_table;
```

### 10. Modifier des données

```sql
UPDATE nom_table
SET age = 26
WHERE nom = 'Alice';
```

### 11. Supprimer des données

```sql
DELETE FROM nom_table
WHERE nom = 'Alice';
```

### 12. Supprimer une table

```sql
DROP TABLE nom_table;
```

### 13. Supprimer une base de données

```sql
DROP DATABASE nom_de_la_base;
```

### 14. Quitter MySQL

```sql
exit;
```

---

## Conseils importants

| Commande | Action |
|----------|--------|
| `SELECT` | Lire les données |
| `INSERT` | Ajouter des données |
| `UPDATE` | Modifier des données |
| `DELETE` | Supprimer des données |

- Toujours terminer une commande par `;`
- Utiliser `USE` avant d'interagir avec une base
