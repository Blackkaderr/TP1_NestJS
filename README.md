# TP1 NestJS

Implémentation du TP1 avec les notions de `Rt4 NestJs.pdf`.

## Installation

Node.js 22.12 ou supérieur et une base PostgreSQL.

```sh
npm ci
cp .env.example .env
```

Renseigner `DATABASE_URL` dans `.env` avec l’URL PostgreSQL fournie par
l’hébergeur. Le paramètre `sslmode=require` active TLS pour la connexion.
Le fichier `.env` reste local et n’est pas versionné.

```sh
npm run start:dev
```

Pour compiler et lancer le code compilé :

```sh
npm run build
npm run start:prod
```

`PORT` vaut 3000 par défaut. TypeORM crée les tables avec `synchronize: true`,
comme dans les exemples du cours. PostgreSQL et son driver `pg` remplacent
MySQL à la demande de l’équipe ; les repositories TypeORM restent identiques.

## Notions utilisées

| Notion | Pages du cours | Fichiers |
| --- | --- | --- |
| Modules, contrôleurs et services | 27 à 44, 72 à 80 | `src/todo/` |
| Module global | 35 | `src/common/common.module.ts` |
| Provider UUID avec `useValue` et `@Inject` | 87 à 94 | `src/common/providers/uuid.provider.ts` |
| ValidationPipe et DTO | 101 à 123 | `src/main.ts`, `src/todo/dto/` |
| PartialType | 124 | `src/todo/dto/update-todo.dto.ts` |
| Transformation des paramètres | 127 | `src/todo/dto/query-todo.dto.ts` |
| ConfigModule et ConfigService | 182 à 186 | `src/app.module.ts` |
| TypeORM avec useFactory | 192 à 196 | `src/app.module.ts` |
| Entité et colonnes de dates | 197 à 211 | `src/todo/entities/`, `src/common/entities/` |
| URI versioning | 219 à 224 | `src/main.ts`, contrôleurs Todo |
| preload, save, delete, softDelete, restore | 215 à 234 | `src/todo/todo.service.ts` |
| QueryBuilder, paramètres et Brackets | 256 à 263 | `src/todo/todo.service.ts` |
| Pagination réutilisable | 266 à 267 | `src/common/paginate.ts` |
| Statistiques avec GROUP BY | 268 à 270 | `src/todo/todo.service.ts` |

Le TP demande un ID entier auto-incrémenté et un nom de 3 à 10 caractères.
Ces contraintes du TP sont conservées même si certains exemples du cours
utilisent un UUID ou une limite de 15 caractères.

## Routes

| Méthode | Route | Action |
| --- | --- | --- |
| GET | `/example/uuid` | Tester l'injection du provider UUID |
| POST | `/v1/todo` | Ajouter un Todo en mémoire |
| GET | `/v1/todo` | Lire les Todos en mémoire |
| POST | `/v2/todo` | Ajouter un Todo dans PostgreSQL |
| GET | `/v2/todo` | Rechercher, filtrer et paginer les Todos |
| GET | `/v2/todo/stats` | Compter les Todos pour chaque statut |
| GET | `/v2/todo/:id` | Lire un Todo par ID |
| PATCH | `/v2/todo/:id` | Modifier un Todo |
| DELETE | `/v2/todo/:id` | Supprimer définitivement un Todo |
| DELETE | `/v2/todo/:id/soft` | Supprimer logiquement un Todo |
| PATCH | `/v2/todo/:id/restore` | Restaurer un Todo |

La version mémoire utilise le provider UUID et perd ses données à l'arrêt.
La version PostgreSQL utilise un ID entier auto-incrémenté. Les deux stockages
sont indépendants.

## Exemples

```sh
curl -X POST http://localhost:3000/v2/todo \
  -H 'Content-Type: application/json' \
  -d '{"name":"Courses","description":"Acheter du pain frais"}'

curl -X PATCH http://localhost:3000/v2/todo/1 \
  -H 'Content-Type: application/json' \
  -d '{"status":"Finalisé"}'

curl -G http://localhost:3000/v2/todo \
  --data-urlencode 'search=pain' \
  --data-urlencode 'status=Finalisé' \
  --data-urlencode 'page=1' \
  --data-urlencode 'limit=10'

curl -X DELETE http://localhost:3000/v2/todo/1/soft
curl -X PATCH http://localhost:3000/v2/todo/1/restore
curl http://localhost:3000/v2/todo/stats
```

`name` et `description` sont obligatoires à la création. Le nom contient de 3 à
10 caractères et la description au moins 10. Pour la modification, les champs
sont optionnels grâce à `PartialType`. Les statuts du cours sont `En attente`,
`En cours` et `Finalisé`. Le statut initial est `En attente`.

Les messages de validation sont centralisés dans `validation-messages.ts`.
`ValidationPipe` transforme les paramètres et retire les propriétés absentes
des DTO avec `whitelist`. Les dates sont gérées par TypeORM. `createdAt` possède
l'option `update: false`.

`search` cherche dans le nom ou la description avec `LIKE`. `status` filtre
les résultats. Les deux sont optionnels. `page` commence à 1 et `limit` vaut
10 par défaut, avec un maximum de 100. La liste renvoyée est un tableau trié
par ID croissant. Une page sans résultat renvoie `[]`.

Les Todos supprimés logiquement sont exclus des lectures et des statistiques.
Les IDs absents renvoient 404 et les données invalides renvoient 400.
Les statistiques exécutent une seule requête avec `GROUP BY` :

```json
{"En attente": 0, "En cours": 0, "Finalisé": 0}
```
