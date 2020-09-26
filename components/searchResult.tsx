import styles from "./searchResult.module.scss";

export default () => {
  return(
    <div className={styles.searchResult}>
      <div className={styles.title}>
        <h1>Title</h1>
        <h3>Created by username1</h3>
      </div>

      <p>some description some description some description some description some description some description some description some description some description some description some description some description some descriptionsome description some descriptionsome description some description some description some description some description some descriptionsome descriptionsome description some</p>

      <div className={styles.bottomContainer}>
        <div className={styles.buttonContainer}>
          <input type="button" value="Vote" />
          <input type="button" value="Pin to dash" />
        </div>
        
        <h3>expires in 200h</h3>
      </div>
    </div>
  )
}