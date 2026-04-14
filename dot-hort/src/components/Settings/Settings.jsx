import React, { useState, useEffect } from 'react';
import styles from './Settings.module.css';

const Settings = () => {
  
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  
  const [timeLeft, setTimeLeft] = useState(3600);

  
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  
  document.body.className = isDarkTheme ? styles.darkTheme : styles.lightTheme;

  return (
    <div className={styles.settingsPanel}>
      <h3 className={styles.title}>Настройки витрины</h3>
      <button
        className={styles.themeButton}
        onClick={toggleTheme}
      >
        {isDarkTheme ? 'Светлая тема' : 'Сменить тему'}
      </button>
      <div className={styles.timer}>
        Акция закончится через: {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default Settings;
