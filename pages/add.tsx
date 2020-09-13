import Layout from '../components/layout';
import { Themes } from '../utils/themes';
import { useState } from 'react';
import Dialog from '../components/dialog';

export default () => {
  const [themeState, setThemeState] = useState(Themes.dark);
  return(
    <Layout theme={themeState} setTheme={setThemeState} title="Add">
      <Dialog>
        <h1>Create A Poll</h1>
        <input placeholder="Poll Name"></input>
        <input type="button" value="Create"></input>
      </Dialog>
    </Layout>
  )
}