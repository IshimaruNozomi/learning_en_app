import React, { useState } from 'react';

const WordForm = ({ onAddWord }) => {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddWord({ word, meaning });
    setWord('');
    setMeaning('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow">
      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="英単語"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="意味"
        value={meaning}
        onChange={(e) => setMeaning(e.target.value)}
      />
      <button className="bg-blue-200 px-4 py-2 rounded hover:bg-blue-300">登録</button>
    </form>
  );
};

export default WordForm;