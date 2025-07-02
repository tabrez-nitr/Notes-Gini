import { useState, useEffect } from 'react';

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is saved in localStorage
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setIsDark(JSON.parse(savedDarkMode));
      document.documentElement.classList.toggle('dark', JSON.parse(savedDarkMode));
    }
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem('darkMode', JSON.stringify(nextDark));
    document.documentElement.classList.toggle('dark', nextDark);
  };

  return [isDark, setIsDark];
}
