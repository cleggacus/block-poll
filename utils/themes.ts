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
  document.documentElement.style.setProperty('--bg-primary', t.theme.bgPrimary);
  document.documentElement.style.setProperty('--bg-secondary', t.theme.bgSecondary);
  document.documentElement.style.setProperty('--bg-tertiary', t.theme.bgTertiary);
  document.documentElement.style.setProperty('--fg-primary', t.theme.fgPrimary);
  document.documentElement.style.setProperty('--fg-secondary', t.theme.fgSecondary);
  document.documentElement.style.setProperty('--fg-tertiary', t.theme.fgTertiary);
  document.documentElement.style.setProperty('--accent-primary', t.theme.accentPrimary);

  document.documentElement.style.setProperty('--bg-navbar', t.theme.bgNavbar);
  document.documentElement.style.setProperty('--fg-navbar', t.theme.fgNavbar);
  
  document.documentElement.style.setProperty('--bg-content', t.theme.bgContent);
  document.documentElement.style.setProperty('--bg-content-ui', t.theme.bgContentUI);
  document.documentElement.style.setProperty('--fg-content', t.theme.fgContent);
  
  document.documentElement.style.setProperty('--bg-dialog', t.theme.bgDialog);
  document.documentElement.style.setProperty('--bg-dialog-ui', t.theme.bgDialogUI);
  document.documentElement.style.setProperty('--fg-dialog', t.theme.fgDialog);

  document.documentElement.style.setProperty('--box-shadow', t.theme.boxShadow);
  document.documentElement.style.setProperty('--border-width', t.theme.borderWidth);
  document.documentElement.style.setProperty('--border-color', t.theme.borderColor);
}

export {Themes, setTheme};