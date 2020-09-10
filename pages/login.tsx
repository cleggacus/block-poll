import styles from './login.module.scss';
import { useEffect } from 'react';
import { Themes, setTheme } from '../utils/themes';

export default () => {
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
    <div className={styles.login}>
      <div className={styles.bg}>
        <img src='/login-graphic.jpg'></img>
      </div>

      <div className={styles.fg}>
        <div>
          <h1>Welcome back</h1>
          <input placeholder="Username"></input>
          <input type="password" placeholder="Password"></input>
          <input type="button" value="Login"></input>
          <span>Need an account? <a>Register</a></span>
        </div>
      </div>
    </div>
  )
}