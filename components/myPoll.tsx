import PinnedPoll from './pinnedPoll';
import Poll from '../interfaces/poll';
import styles from './myPoll.module.scss';
import { useEffect } from 'react';
import { Theme } from '../utils/themes';

interface IProps {
  poll: Poll;
  theme: Theme;
  children?: React.ReactNode;
}

const colors = [
  '#d83d7e',
  '#7471e6',
  '#63cc1b',
  '#fb9a4b',
  '#4383f3',
]

export default (props: IProps) => {
  const getWinner = () => {
    const options = props.poll.options[0];
    let winner = 0;
  
    for(let i = 0; i < options.length; i++){
      if(options[i].votes > options[winner].votes)
        winner = i;
    }
    
    return winner;
  }

  useEffect(() => {
    const graph: HTMLCanvasElement | null = document.querySelector(`.${styles.graph}`);

    if(graph){
      const ctx = graph.getContext('2d');
      const winner = getWinner();
      const largest = props.poll.options[winner][0].votes;
      graph.width = graph.clientWidth;
      graph.height = graph.clientHeight;

      if(ctx){
        ctx.lineWidth = 3;

        for(let i = 0; i < props.poll.options[0].length; i++){
          ctx.strokeStyle = colors[i] + '9f';
          ctx?.beginPath();
  
          for(let j = 0; j < props.poll.options.length; j++){
            const x = graph.width - (j * (graph.width / (props.poll.options.length - 1)));
            const y = graph.height - ((graph.height / largest) * props.poll.options[j][i].votes);
            
            if(!j)
              ctx?.moveTo(x, y);
            else
              ctx?.lineTo(x, y);
          }

          ctx.stroke();
          ctx?.closePath();
        }
      }
    }
  }, [props.theme]);

  return(
    <PinnedPoll poll={props.poll}>
      <canvas className={styles.graph}></canvas>
      <div className={styles.graphColors}>
        {props.poll.options[0].map((option, i) => {
          return(
            <div>
            <div style={{backgroundColor: colors[i]}}></div>
              <h4>{option.name}</h4>
            </div>
          )
        })}
      </div>
    </PinnedPoll>
  )
}