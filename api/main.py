import os
from contextlib import closing

import mysql.connector
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Activité 3 API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def read_secret(env_name: str, default: str | None = None) -> str | None:
    file_value = os.getenv(f"{env_name}_FILE")
    if file_value and os.path.exists(file_value):
        with open(file_value, "r", encoding="utf-8") as secret_file:
            return secret_file.read().strip()
    return os.getenv(env_name, default)


def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("MYSQL_HOST", "db"),
        port=int(os.getenv("MYSQL_PORT", "3306")),
        database=read_secret("MYSQL_DB"),
        user=read_secret("MYSQL_USER"),
        password=read_secret("MYSQL_PASSWORD"),
    )


@app.get("/")
def root():
    return {"message": "API FastAPI opérationnelle"}


@app.get("/health")
def healthcheck():
    with closing(get_db_connection()) as conn, closing(conn.cursor()) as cursor:
        cursor.execute("SELECT 1")
        cursor.fetchone()
    return {"status": "ok", "database": "up"}


@app.get("/users")
def get_users():
    with closing(get_db_connection()) as conn, closing(conn.cursor(dictionary=True)) as cursor:
        cursor.execute("SELECT id, nom, email FROM utilisateur ORDER BY id ASC")
        records = cursor.fetchall()
    return {"utilisateurs": records}
