import Layout from '../components/layout';
import styles from './index.module.scss';
import { Themes } from '../utils/themes';
import { useState, useEffect } from 'react';
import PinnedPoll from '../components/pinnedPoll';
import MyPoll from '../components/myPoll'; 
import Poll from '../interfaces/poll'; 


const testPolls: Poll[] = [
  {
    title: 'Test Title 1',
    username: 'username1',
    options: [
      [
        { name: 'option 1', votes: 13, date: Date.now() },
        { name: 'option 2', votes: 7, date: Date.now() },
        { name: 'option 3', votes: 10, date: Date.now() },
      ],
      [
        { name: 'option 1', votes: 10, date: Date.now() - (1000 * 60 * 60) },
        { name: 'option 2', votes: 6, date: Date.now() - (1000 * 60 * 60) },
        { name: 'option 3', votes: 3, date: Date.now() - (1000 * 60 * 60) },
      ],
      [
        { name: 'option 1', votes: 6, date: Date.now() - (1000 * 60 * 60 * 2) },
        { name: 'option 2', votes: 3, date: Date.now() - (1000 * 60 * 60 * 2) },
        { name: 'option 3', votes: 1, date: Date.now() - (1000 * 60 * 60 * 2) },
      ],
      [
        { name: 'option 1', votes: 0, date: Date.now() - (1000 * 60 * 60 * 3) },
        { name: 'option 2', votes: 0, date: Date.now() - (1000 * 60 * 60 * 3) },
        { name: 'option 3', votes: 0, date: Date.now() - (1000 * 60 * 60 * 3) },
      ]
    ]
  },
  {
    title: 'Test Title 2',
    username: 'username2',
    options: [[
      { name: 'option 1', votes: 10, date: Date.now() },
      { name: 'option 2', votes: 10, date: Date.now() },
      { name: 'option 3', votes: 15, date: Date.now() },
    ]]
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
            <MyPoll theme={themeState} poll={ppState[0]} />
          </div>
        </div>
      </div>
    </Layout>
  )
}