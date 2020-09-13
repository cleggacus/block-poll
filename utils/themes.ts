export interface Theme{
  title: string;
  theme: {
    bgPrimary: string;
    bgSecondary: string;
    bgTertiary: string;
    fgPrimary: string;
    fgSecondary: string;
    fgTertiary: string;
    accentPrimary: string;

    bgNavbar: string;
    fgNavbar: string;
    bgContent: string;
    fgContent: string;
    bgContentUI: string;

    bgDialog: string;
    fgDialog: string,
    bgDialogUI: string,

    boxShadow: string;
    borderWidth: string;
    borderColor: string;
  }
}

const Themes = {
  dark: {
    title: 'dark',
    theme: {
      bgPrimary: '#050d20',
      bgSecondary: '#020818',
      bgTertiary: '#2e8f95',
      fgPrimary: '#ffffff',
      fgSecondary: '#ffffff',
      fgTertiary: '#ffffff',
      accentPrimary: '#2e8f95',

      bgNavbar: 'var(--bg-secondary)',
      fgNavbar: 'var(--fg-secondary)',

      bgContent: 'var(--bg-primary)',
      fgContent: 'var(--fg-primary)',
      bgContentUI: 'var(--bg-secondary)',

      bgDialog: '#070f24',
      fgDialog: 'var(--fg-primary)',
      bgDialogUI: 'var(--bg-primary)',

      boxShadow: '#0003',
      borderWidth: '0px',
      borderColor: '#0a0a0a'
    }
  },
  light: {
    title: 'light',
    theme: {
      bgPrimary: '#ffffff',
      bgSecondary: '#ededf4',
      bgTertiary: '#387c7d',
      fgPrimary: '#000000',
      fgSecondary: '#000000',
      fgTertiary: '#ffffff',
      accentPrimary: '#387c7d',

      bgNavbar: 'var(--bg-primary)',
      fgNavbar: 'var(--fg-primary)',

      bgContent: 'var(--bg-secondary)',
      fgContent: 'var(--fg-primary)',
      bgContentUI: 'var(--bg-primary)',

      bgDialog: 'var(--bg-primary)',
      fgDialog: 'var(--fg-secondary)',
      bgDialogUI: 'var(--bg-secondary)',

      boxShadow: '#0003',
      borderWidth: '0px',
      borderColor: '#ffffff'
    }
  },
  black: {
    title: 'black',
    theme: {
      bgPrimary: '#000000',
      bgSecondary: '#000000',
      bgTertiary: '#111111',
      fgPrimary: '#ffffff',
      fgSecondary: '#ffffff',
      fgTertiary: '#ffffff',
      accentPrimary: '#3dbfc1',

      bgNavbar: 'var(--bg-primary)',
      fgNavbar: 'var(--fg-primary)',

      bgContent: 'var(--bg-primary)',
      fgContent: 'var(--fg-primary)',
      bgContentUI: 'var(--bg-secondary)',

      bgDialog: 'var(--bg-primary)',
      fgDialog: 'var(--fg-secondary)',
      bgDialogUI: 'var(--bg-secondary)',

      boxShadow: '#00000000',
      borderWidth: '1px',
      borderColor: '#222222'
    }
  }
}

const setTheme = (t: Theme) => {
  const theme = t.theme;

  document.documentElement.style.setProperty('--bg-primary', theme.bgPrimary);
  document.documentElement.style.setProperty('--bg-secondary', theme.bgSecondary);
  document.documentElement.style.setProperty('--bg-tertiary', theme.bgTertiary);
  document.documentElement.style.setProperty('--fg-primary', theme.fgPrimary);
  document.documentElement.style.setProperty('--fg-secondary', theme.fgSecondary);
  document.documentElement.style.setProperty('--fg-tertiary', theme.fgTertiary);
  document.documentElement.style.setProperty('--accent-primary', theme.accentPrimary);

  document.documentElement.style.setProperty('--bg-navbar', theme.bgNavbar);
  document.documentElement.style.setProperty('--fg-navbar', theme.fgNavbar);
  
  document.documentElement.style.setProperty('--bg-content', theme.bgContent);
  document.documentElement.style.setProperty('--bg-content-ui', theme.bgContentUI);
  document.documentElement.style.setProperty('--fg-content', theme.fgContent);
  
  document.documentElement.style.setProperty('--bg-dialog', theme.bgDialog);
  document.documentElement.style.setProperty('--bg-dialog-ui', theme.bgDialogUI);
  document.documentElement.style.setProperty('--fg-dialog', theme.fgDialog);

  document.documentElement.style.setProperty('--box-shadow', theme.boxShadow);
  document.documentElement.style.setProperty('--border-width', theme.borderWidth);
  document.documentElement.style.setProperty('--border-color', theme.borderColor);
}

export {Themes, setTheme};