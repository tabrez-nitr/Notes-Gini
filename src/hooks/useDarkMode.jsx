import { useState, useEffect, useCallback } from 'react';

function getInitialDark() {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem('darkMode');
  if (saved !== null) return JSON.parse(saved);
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function useDarkMode() {
  const [isDark, setIsDarkState] = useState(getInitialDark);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('darkMode', JSON.stringify(isDark));
  }, [isDark]);

  const setIsDark = useCallback((value) => {
    setIsDarkState((prev) => (typeof value === 'function' ? value(prev) : value));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkState((prev) => !prev);
  }, []);

  return [isDark, setIsDark, toggleDarkMode];
}
