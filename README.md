# Activité Conteneurisation & Intégration Continue

## Contenu
- API FastAPI dans `api/`
- Base MySQL dans `mysql/`
- Pipeline GitHub Actions dans `.github/workflows/ci.yml`

## Secrets GitHub à créer
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`
- `MYSQL_ROOT_PASSWORD`
- `MYSQL_DB`
- `MYSQL_USER`
- `MYSQL_PASSWORD`

## Remarque importante
Dans le workflow, le job utilise :

```yaml
needs: npm-publish
```

## Push GitHub
Dézippe le projet puis pousse son contenu à la racine de ton dépôt GitHub.
