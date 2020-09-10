import styles from './login.module.scss';
import { useEffect } from 'react';
import { Themes, setTheme } from '../utils/themes';

export default () => {
  useEffect(() => {
    setTheme(Themes.light);
  }, [])
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