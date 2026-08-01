import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return true // Default to dark theme on first visit
  })
  
  const [colorTheme, setColorTheme] = useState(() => {
    return localStorage.getItem('colorTheme') || 'green'
  })

  useEffect(() => {
    const root = document.documentElement
    
    // Handle light/dark
    if (isDark) {
      root.classList.remove('light')
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
      localStorage.setItem('theme', 'light')
    }
    
    // Handle color theme
    root.classList.remove('theme-green', 'theme-blue', 'theme-amber')
    if (colorTheme === 'blue') {
      root.classList.add('theme-blue')
    } else if (colorTheme === 'amber') {
      root.classList.add('theme-amber')
    } else {
      root.classList.add('theme-green')
    }
    
    localStorage.setItem('colorTheme', colorTheme)
  }, [isDark, colorTheme])

  const toggleTheme = () => setIsDark(prev => !prev)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
