import Layout from '../components/layout';
import styles from './index.module.scss';
import { Themes } from '../utils/themes';
import { useState, useEffect } from 'react';
import PinnedPoll from '../components/pinnedPoll';
import Poll from '../interfaces/poll'; 

const testPolls: Poll[] = [
  {
    title: 'Test Title 1',
    username: 'username1',
    options: [
      {
        name: 'option 1',
        votes: 10
      },
      {
        name: 'option 2',
        votes: 15
      },
      {
        name: 'option 3',
        votes: 5
      }
    ]
  },
  {
    title: 'Test Title 2',
    username: 'username2',
    options: [
      {
        name: 'option 1',
        votes: 10
      },
      {
        name: 'option 2',
        votes: 10
      },
      {
        name: 'option 3',
        votes: 15
      }
    ]
  }
]

export default () => {
  const [themeState, setThemeState] = useState(Themes.dark);
  const [ppState, setPpState] = useState<Poll[]>(testPolls); // pinned polls

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
          </div>
        </div>
      </div>
    </Layout>
  )
}