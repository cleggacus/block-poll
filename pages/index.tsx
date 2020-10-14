import Layout from '../components/layout';
import styles from './index.module.scss';
import { Themes } from '../utils/themes';
import { useState, useEffect } from 'react';
import PinnedPoll from '../components/pinnedPoll';
import MyPoll from '../components/myPoll'; 
import Poll from '../interfaces/poll'; 
import Peer from '../utils/peer';
import data from './testGraphData.json';
// import Message from '../interfaces/message';

const testPolls: Poll[] = data;

export default () => {
  const [themeState, setThemeState] = useState(Themes.dark);
  const [ppState] = useState<Poll[]>(testPolls); // pinned polls

  useEffect(() => {
    const peer = new Peer();
    peer.joinNetwork();
  }, [])

  return(
    <Layout theme={themeState} setTheme={setThemeState} title="Home">
      <div className={styles.home}>
        <h1>Dash</h1>
        
        <div>
          <div className={styles.section}>
            <h2>Pinned Polls</h2>
            { ppState.map((poll) => <PinnedPoll poll={poll}></PinnedPoll>) }
          </div>

          <div className={styles.seperator}></div>

          <div className={styles.section}>
            <h2>My Polls</h2>
            <MyPoll theme={themeState} poll={ppState[0]} />
          </div>
        </div>
      </div>
    </Layout>
  )
}