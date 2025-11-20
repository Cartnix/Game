from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import sqlite3

app = FastAPI()

origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    
)


class UserClass(BaseModel):
    username: str
    password: str

@app.get("/users")
def get_users():
    connect = sqlite3.connect("user.db")
    cursor = connect.cursor()
    cursor.execute("SELECT id, username, password FROM users")
    rows = cursor.fetchall()
    cursor.close()
    connect.close()
    
    users = [{"id": row[0], "username": row[1], "password": row[2]} for row in rows]
    return {"users": users}

@app.post("/registration")
def registration_user(user: UserClass):
    connect = sqlite3.connect("user.db")
    cursor = connect.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
    """)

    cursor.execute("SELECT id FROM users WHERE LOWER(username) = LOWER(?)", (user.username, ))
    unique_user = cursor.fetchone()
    if unique_user:
        raise HTTPException(status_code=400, detail="This username is already exists")
    cursor.execute("INSERT INTO users(username, password) VALUES (?, ?)", (user.username, user.password))
    connect.commit()
    connect.close()
    return {"message": f"user {user.username} added"}
