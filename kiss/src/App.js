import React, { useState, useEffect } from 'react';
import styles from './App.module.css';

const emojis = ['💋', '😘', '❤️', '💞', '💖', '💕'];

function App() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('kissCount');
    return saved ? parseInt(saved) : 0;
  });

  const [hearts, setHearts] = useState([]);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('kissCount', count);
  }, [count]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleIncrement = () => {
    setCount(prev => prev + 1);
    createHeart();
    vibrate();
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

  const vibrate = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  };

  const handleReset = () => {
    if (window.confirm('¿Reiniciar el contador de besos? 🥺')) {
      setCount(0);
      localStorage.removeItem('kissCount');
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <div className={styles.background}></div>

      <h1 className={styles.title}>💖 Contador de Besos 💖</h1>

      <div className={`${styles.counter} ${styles.pop}`}>
        {count}
      </div>

      <button className={styles.button} onClick={handleIncrement}>
        Dame un beso 😘
      </button>

      <button className={styles.reset} onClick={handleReset}>
        Reiniciar 💔
      </button>

      <button className={styles.themeToggle} onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Modo noche' : '☀️ Modo día'}
      </button>

      {hearts.map(heart => (
        <div
          key={heart.id}
          className={styles.heart}
          style={{ left: `${heart.left}%` }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
}

export default App;
