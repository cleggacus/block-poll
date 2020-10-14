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
    // Assigns the canvas element to a variable
    const graph: HTMLCanvasElement | null = document.querySelector(`.${styles.graph}`);

    if(graph){
      const ctx = graph.getContext('2d');

      const opts = props.poll.options;
      const winner = getWinner();
      const largest = opts[winner][0].votes;

      // Sets ctx resolution based on canvas size
      graph.width = graph.clientWidth;
      graph.height = graph.clientHeight;

      if(ctx){
        ctx.lineWidth = 3;

        for(let i = 0; i < opts[0].length; i++){
          // color of line with '9f' opacity in hex
          ctx.strokeStyle = colors[i] + '9f';
          ctx?.beginPath();

          // calculates the position of each point on the graph
          const start = opts[opts.length-1][i].date;
          const end = opts[0][i].date;
          const delta = end - start;

          for(let j = 0; j < opts.length; j++){
            const x = graph.width * ((opts[j][i].date - start) /  delta);
            const y = graph.height - ((graph.height / largest) * opts[j][i].votes);
            
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