import React, { useState } from 'react';

const Quiz = ({ words, onMark }) => {
  const [index, setIndex] = useState(0);
  const shuffled = [...words].sort(() => 0.5 - Math.random());
  const word = shuffled[index % shuffled.length];

  const next = () => setIndex(index + 1);

  return word ? (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="mb-4">意味: {word.meaning}</div>
      <div className="mb-4">この単語は？</div>
      <div className="flex gap-2">
        <button onClick={() => { onMark(word, true); next(); }} className="bg-green-200 px-4 py-2 rounded">正解</button>
        <button onClick={() => { onMark(word, false); next(); }} className="bg-red-200 px-4 py-2 rounded">不正解</button>
      </div>
    </div>
  ) : (
    <div className="bg-white p-4 rounded-xl shadow">単語がありません。</div>
  );
};

export default Quiz;