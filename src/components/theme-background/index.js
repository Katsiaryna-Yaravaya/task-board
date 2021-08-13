import { useState } from 'react'

import { useTheme } from '../../context/theme/theme-state'
import ThemeButton from '../theme-button'

import './index.scss'

const ThemeBackground = ({ openModal }) => {
  const [isOpenButton, setIsOpenButton] = useState(false)

  const isTheme = useTheme()

  const handleThemeButton = (e) => {
    isTheme.change(e.currentTarget.value)
    openModal()
  }

  const handleClickButton = () => {
    setIsOpenButton(change => !change)
  }

  return (
    <div className='dropdown' onClick={handleClickButton}>
      <button className='dropdown__button'>Theme</button>
      {isOpenButton && (
        <ThemeButton themeButton={handleThemeButton}/>
      )}
    </div>
  )
}

export default ThemeBackground