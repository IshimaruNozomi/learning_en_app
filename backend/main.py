from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

conn = sqlite3.connect("words.db", check_same_thread=False)
cur = conn.cursor()
cur.execute("CREATE TABLE IF NOT EXISTS words (word TEXT PRIMARY KEY, meaning TEXT)")
cur.execute("CREATE TABLE IF NOT EXISTS stats (word TEXT PRIMARY KEY, correct INTEGER DEFAULT 0, total INTEGER DEFAULT 0)")
conn.commit()

class Word(BaseModel):
    word: str
    meaning: str

class Mark(BaseModel):
    word: str
    correct: bool

@app.get("/api/words")
def get_words():
    cur.execute("SELECT word, meaning FROM words")
    return [{"word": row[0], "meaning": row[1]} for row in cur.fetchall()]

@app.post("/api/words")
def add_word(w: Word):
    cur.execute("INSERT OR IGNORE INTO words (word, meaning) VALUES (?, ?)", (w.word, w.meaning))
    cur.execute("INSERT OR IGNORE INTO stats (word, correct, total) VALUES (?, 0, 0)", (w.word,))
    conn.commit()
    return {"status": "ok"}

@app.post("/api/mark")
def mark_word(m: Mark):
    cur.execute("SELECT correct, total FROM stats WHERE word = ?", (m.word,))
    row = cur.fetchone()
    if row:
        correct, total = row
        if m.correct:
            correct += 1
        total += 1
        cur.execute("UPDATE stats SET correct = ?, total = ? WHERE word = ?", (correct, total, m.word))
    else:
        cur.execute("INSERT INTO stats (word, correct, total) VALUES (?, ?, ?)", (m.word, int(m.correct), 1))
    conn.commit()
    return {"status": "updated"}

@app.get("/api/stats")
def get_stats():
    cur.execute("SELECT word, correct, total FROM stats")
    return [
        {"word": row[0], "accuracy": round(row[1] / row[2] * 100, 1) if row[2] > 0 else 0}
        for row in cur.fetchall()
    ]
