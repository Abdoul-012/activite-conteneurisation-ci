# Activité 3 — Orchestration Fullstack & Validation E2E

## Stack
- Frontend React (Vite) dans `frontend/`
- Backend FastAPI dans `api/`
- Base MySQL dans `mysql/`
- Adminer exposé sur `http://localhost:8080`
- Tests Cypress dans `e2e/`

## Lancement local
1. Créer les fichiers de secrets dans `secrets/` :
   - `mysql_root_password.txt`
   - `mysql_database.txt`
   - `mysql_user.txt`
   - `mysql_password.txt`
2. Lancer la stack :
   ```bash
   docker compose up -d --build
   ```
3. Vérifier :
   - Front : `http://localhost:3000`
   - API : `http://localhost:8000/users`
   - Adminer : `http://localhost:8080`

## Pipeline GitHub Actions
Le workflow :
- démarre toute la stack avec `docker compose`
- attend que tous les services soient `healthy`
- teste les endpoints réels
- lance Cypress contre l'environnement réel
- ne push les images qu'après succès complet des tests E2E

## Secrets GitHub nécessaires
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`
- `MYSQL_ROOT_PASSWORD`
- `MYSQL_DB`
- `MYSQL_USER`
- `MYSQL_PASSWORD`
