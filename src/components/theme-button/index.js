import { THEME_DARK, THEME_LIGHT, THEME_NEUTRAL } from '../../constants/theme'
import './index.scss'

const ThemeButton = ({themeButton}) => {
  return (
    <div className='theme-choose'>
      <button className='button-theme-light theme__button' value={THEME_LIGHT} onClick={themeButton}>Light
      </button>
      <button className='button-theme-dark theme__button' value={THEME_DARK} onClick={themeButton}>Dark</button>
      <button className='button-theme-neutral theme__button' value={THEME_NEUTRAL} onClick={themeButton}>Neutral
      </button>
    </div>
  )
}

export default ThemeButton