import React, { useState, useEffect } from 'react';
import WordForm from './components/WordForm';
import Quiz from './components/Quiz';
import AccuracyChart from './components/AccuracyChart';
import './App.css';

function App() {
  const [words, setWords] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch('/api/words')
      .then(res => res.json())
      .then(data => setWords(data));
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  const handleAddWord = (wordObj) => {
    fetch('/api/words', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(wordObj),
    }).then(() => setWords([...words, wordObj]));
  };

  const handleMark = (word, isCorrect) => {
    fetch('/api/mark', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word: word.word, correct: isCorrect })
    }).then(() => {
      // 更新用に再取得
      fetch('/api/stats')
        .then(res => res.json())
        .then(data => setStats(data));
    });
  };

  return (
    <div className="min-h-screen bg-blue-50 text-blue-900 p-6">
      <h1 className="text-3xl font-bold mb-4">英単語学習アプリ</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WordForm onAddWord={handleAddWord} />
        <Quiz words={words} onMark={handleMark} />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">正答率</h2>
        <AccuracyChart data={stats} />
      </div>
    </div>
  );
}

export default App;
