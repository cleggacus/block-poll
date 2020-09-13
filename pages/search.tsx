import Layout from '../components/layout';
import { Themes } from '../utils/themes';
import { useState } from 'react';
import styles from "./search.module.scss";
import SearchResult from "../components/searchResult";

export default () => {
  const [themeState, setThemeState] = useState(Themes.dark);
  const [queryState, setQueryState] = useState("test query");

  return(
    <Layout theme={themeState} setTheme={setThemeState} title="Search">
      <div className={styles.searchBar}>
        <input placeholder="Search"></input>
      <span>Showing results for "{queryState}"</span>
        <SearchResult></SearchResult>
        <SearchResult></SearchResult>
        <SearchResult></SearchResult>
      </div>
    </Layout>
  )
}