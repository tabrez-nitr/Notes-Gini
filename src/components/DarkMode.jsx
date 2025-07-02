import React from 'react'
import useDarkMode from '../hooks/useDarkMode'

function DarkMode() {
    const [isDark, setIsDark] = useDarkMode();

    const toggleDarkMode = () => {
        setIsDark(!isDark);
    }
  return (
    <button
    className='text-xl rounded-full flex  items-center justify-center p-2 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200'
    onClick={toggleDarkMode}>
       {isDark ? (<i className="px-1 ri-moon-fill"></i>):(<i className="px-1 ri-sun-line"></i>)}
    </button>
  )
}

export default DarkMode