# Guide MySQL

> Référence pratique pour créer, administrer et interroger des bases de données MySQL — depuis la connexion jusqu'à la gestion des droits.

---

## Contenu

| Fichier | Description | Commandes clés |
|--------|-------------|----------------|
| [`mysql_user_guide.md`](mysql_user_guide.md) | Créer un utilisateur sécurisé pour Python | `CREATE USER`, `GRANT`, `FLUSH PRIVILEGES` |
| [`mysql_admin_guide.md`](mysql_admin_guide.md) | Droits et administration | `GRANT`, `REVOKE`, `DROP USER`, `SHOW GRANTS` |
| [`mysql_guide.md`](mysql_guide.md) | Utilisation basique | `SHOW`, `USE`, `SELECT`, `DESCRIBE` |
| [`mysql_full_guide.md`](mysql_full_guide.md) | Guide complet | `CREATE`, `INSERT`, `UPDATE`, `DELETE`, `DROP` |

---

## Commandes essentielles

| Commande | Action |
|----------|--------|
| `SHOW DATABASES` | Lister toutes les bases |
| `USE nom_base` | Sélectionner une base |
| `SHOW TABLES` | Lister les tables |
| `DESCRIBE table` | Voir la structure d'une table |
| `SELECT` | Lire des données |
| `INSERT INTO` | Ajouter des données |
| `UPDATE` | Modifier des données |
| `DELETE` | Supprimer des données |
| `GRANT` | Donner des droits |
| `REVOKE` | Retirer des droits |
| `FLUSH PRIVILEGES` | Appliquer les changements de droits |

---

## Règles à retenir

- Toujours terminer une commande SQL par `;`
- Utiliser `USE nom_base` avant d'interagir avec une base
- Ne jamais utiliser `root` pour les applications
- Créer un utilisateur dédié par projet
- Donner uniquement les droits nécessaires

---

*4 guides · 14+ commandes · Format .md*
