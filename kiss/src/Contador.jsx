import React, { useState, useEffect } from 'react';
import './Contador.css';

const emojis = ['💋', '😘', '❤️', '💞', '💖', '💕'];

export default function Contador() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('kissCount');
    return saved ? parseInt(saved) : 0;
  });

  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    localStorage.setItem('kissCount', count);
  }, [count]);

  const handleIncrement = () => {
    setCount(prev => prev + 1);
    createHeart();
  };

  const createHeart = () => {
    const id = Date.now();
    const left = Math.random() * 100;
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    setHearts(prev => [...prev, { id, left, emoji }]);
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== id));
    }, 3000);
  };

  const handleReset = () => {
    if (window.confirm('¿Reiniciar el contador de besos? 🥺')) {
      setCount(0);
      localStorage.removeItem('kissCount');
    }
  };

  return (
    <div className="container">
      <h1>💖 Contador de Besos 💖</h1>
      <div className="counter">{count}</div>

      <button className="button" onClick={handleIncrement}>
        Dame un beso 😘
      </button>

      <button className="reset" onClick={handleReset}>
        Reiniciar 💔
      </button>

      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart"
          style={{ left: `${heart.left}%` }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
}
