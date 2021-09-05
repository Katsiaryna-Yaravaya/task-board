import React from 'react'
import { useContext, useState } from 'react'
import ThemeContext from './theme-context'

const themes = {
  light: {
    // розово-фиолетовый
    background: 'linear-gradient(to right, #fc5c7d, #6a82fb)'
  },
  dark: {
    //темно-синий
    background:
      'linear-gradient(to left top, #517b49, #006c58, #005966, #004468, #002c59, #06265f, #1b1d62, #2f0c61, #3f0e85, #500faa, #620ed1, #740bfa)'
  },
  neutral: {
    //закат
    background:
      'linear-gradient(#c6e4ee 0%, #c6e4ee 40%, #fed1ae 60%, #faa0b9 70%, #cb7dcb 80%, #757ecb 100%)'
  }
}

const ThemeState = props => {
  const [theme, setTheme] = useState({})

  const change = name => {
    setTheme(themes[name])
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        change
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeState

export const useTheme = () => useContext(ThemeContext)
