import styles from './layout.module.scss';
import Head from 'next/head'
import Navbar from './navbar';
import { Themes, setTheme, Theme } from './../utils/themes';
import { useEffect, Dispatch, SetStateAction } from 'react';

interface IProps {
  children: React.ReactNode;
  title: string;
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  description?: string;
}

export default (props: IProps) => {
  const resetTheme = () => {
    props.setTheme(() => {
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        let osLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        let osDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (osLight)
          return Themes.light;
        else if(osDark)
          return Themes.black;
        return Themes.dark;
      }else{
        if(localStorage.getItem('theme') == Themes.black.title)
          return Themes.black;
        else if(localStorage.getItem('theme') == Themes.light.title)
          return Themes.light;
        return Themes.dark;
      }
    });
  }
  
  const load = () => {
    resetTheme();
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => resetTheme());
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => resetTheme());
  }

  useEffect(() => {
    if(document.readyState === "complete")
      load();
    else
      window.addEventListener('load', () => load());
  }, [])

  useEffect(() => {
    setTheme(props.theme);
    localStorage.setItem('theme', props.theme.title);
  }, [props.theme]);

  return (
    <div className={styles.layout}>
      <Head>
        <title>{props.title}</title>
        <meta name="theme-color" content="#020818" />
        <meta
          name="description"
          content={`${props.description ? props.description + ' | ' : ''}Liam Clegg's Personal Website / Portfolio / CS Blog`}
        />
        <link rel="apple-touch-icon" href="logo192.png" />
        <link rel="manifest" href="manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar setTheme={props.setTheme} theme={props.theme} />

      <div className={styles.content}>
        {props.children}
      </div>
    </div>
  )
};