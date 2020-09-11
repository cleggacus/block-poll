import styles from './entry.module.scss';
import { useEffect } from 'react';
import { Themes, setTheme } from '../utils/themes';

interface IProps {
  children: React.ReactNode;
}

export default (props: IProps) => {
  const updateTheme = () => {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      let osLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      if (osLight)
        setTheme(Themes.light);
      else
        setTheme(Themes.black);
    }else{
      setTheme(Themes.light);
    }
  }

  useEffect(() => {
    updateTheme();

    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => updateTheme());
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => updateTheme());
  }, []);

  return(
    <div className={styles.entry}>
      <div className={styles.bg}>
        <img src='/login-graphic.jpg'></img>
      </div>

      <div className={styles.fg}>
        <div>
          {props.children}
        </div>
      </div>
    </div>
  )
}