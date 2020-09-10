import Layout from '../components/layout';
import { Themes } from '../utils/themes';
import { useState } from 'react';

export default () => {
  const [themeState, setThemeState] = useState(Themes.dark);
  return(
    <Layout theme={themeState} setTheme={setThemeState} title="Add">
      
    </Layout>
  )
}