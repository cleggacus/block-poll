import styles from './pinnedPoll.module.scss';
import Poll from '../interfaces/poll';

interface IProps {
  poll: Poll;
  children?: React.ReactNode;
}

export default (props: IProps) => {
  const getPollPercent = (): [ number[], number, number ] => {
    const options = props.poll.options[0];
    let total = 0;
    let winner = 0;
    let percents: number[] = [];
  
    for(let i = 0; i < options.length; i++){
      if(options[i].votes > options[winner].votes)
        winner = i;

      total += options[i].votes;
    }

    const sf = 100 / (options[winner].votes / total * 100);

    for(let i = 0; i < options.length; i++)
      percents.push(options[i].votes / total * 100);

    return [ percents, winner, sf ];
  }

  return (
    <div className={styles.pinnedPoll}>
      <h1>{props.poll.title}</h1>
      <h2>Posted by {props.poll.username}</h2>
      {
        props.poll.options[0].map((option, i) => {
          const [ percents, winner, sf ] = getPollPercent();

          return(
            <div className={`${styles.pollGraphic} ${winner == i ? styles.winner : ''}`} style={{width: `${percents[i] * sf}%`}}>
              <h1 className={styles.optionName}>{option.name}</h1>
              <h1 className={styles.optionPercent}>{`${percents[i].toPrecision(3)}%`}</h1>
            </div>
          )
        })
      }

      {props.children}
    </div>
  )
};