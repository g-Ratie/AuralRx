import styles from './Loading.module.css'

export const Loading = (props: { visible: boolean }) => {
  return props.visible ? (
    <div className={styles.container}>
      <div className={styles.loader} />
    </div>
  ) : null
}
