import styles from './dialog.module.scss';

interface IProps {
  children: React.ReactNode;
}

export default (props: IProps) => {
  return(
    <div className={styles.dialog}>
      <div>
        {props.children}
      </div>
    </div>
  )
}