import styles from './pinnedPoll.module.scss';
import Poll from '../interfaces/poll';

interface IProps {
  poll: Poll;
}

export default (props: IProps) => {
  const getPollPercent = (): [ number[], number ] => {
    let total = 0;
    let largest = 0;
    let percents: number[] = [];

    for(let i = 0; i < props.poll.options.length; i++){
      if(props.poll.options[i].votes > props.poll.options[largest].votes)
        largest = i;

      total += props.poll.options[i].votes;
    }

    const sf = 100 / (props.poll.options[largest].votes / total * 100);

    for(let i = 0; i < props.poll.options.length; i++)
      percents.push(props.poll.options[i].votes / total * 100);

    return [ percents, sf ];
  }

  return (
    <div className={styles.pinnedPoll}>
      <h1>{props.poll.title}</h1>
      <h2>{props.poll.username}</h2>
      {
        props.poll.options.map((option, i) => {
          const [ percents, sf ] = getPollPercent();

          return(
            <div className={styles.pollGraphic} style={{width: `${percents[i] * sf}%`}}>
              <h1 className={styles.optionName}>{option.name}</h1>
              <h1 className={styles.optionPercent}>{`${percents[i].toPrecision(3)}%`}</h1>
            </div>
          )
        })
      }
    </div>
  )
};