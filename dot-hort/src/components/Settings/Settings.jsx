import React, { useState, useEffect } from 'react';
import styles from './Settings.module.css';

const Settings = () => {
  // Состояние для темы (true — тёмная, false — светлая)
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  // Время до конца распродажи в секундах (например, 3600 сек = 1 час)
  const [timeLeft, setTimeLeft] = useState(3600);

  // Переключение темы
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // Таймер обратного отсчёта
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Форматирование времени: преобразуем секунды в минуты и секунды
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Применяем тему к body
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
