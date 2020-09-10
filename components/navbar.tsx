import styles from './navbar.module.scss';
import Link from 'next/link'
import {Moon, Circle, Sun, Grid, Search, Plus} from 'react-feather';
import { Theme, Themes } from '../utils/themes';
import {useRouter} from 'next/router';

interface IProps {
  theme: Theme;
  setTheme: Function;
}

export default (props: IProps) => {
  const router = useRouter();
  const toggleTheme = () => {
    const theme = props.theme === Themes.dark ? Themes.black : props.theme === Themes.light ? Themes.dark : Themes.light;
    props.setTheme(theme);
  }

  return (
    <ul className={styles.navbar}>
      <Link href='/'>
        <li className={router.pathname == '/' ? styles.activeRoute : ''}>
          <Grid/>
          <span>Home</span>
        </li>
      </Link>
    
      <Link href='/search'>
        <li className={router.pathname == '/search' ? styles.activeRoute : ''}>
          <Search/>
          <span>Seach</span>
        </li>
      </Link>

      <Link href='/add'>
        <li className={router.pathname == '/add' ? styles.activeRoute : ''}>
          <Plus/>
          <span>Add</span>
        </li>
      </Link>

      <div className={styles.spacer}></div>

      <li onClick={toggleTheme} className={styles.themeChange}>
        <div className={props.theme.title==='dark' ? styles.activeTheme : ""} ><Moon/></div>
        <div className={props.theme.title==='black' ? styles.activeTheme : ""} ><Circle/></div>
        <div className={props.theme.title==='light' ? styles.activeTheme : ""} ><Sun/></div>
        <span>Theme</span>
      </li>
    </ul>
  )
}