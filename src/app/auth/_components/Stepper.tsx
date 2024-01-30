import styles from './Stepper.module.css'

type Props = {
  step: number
  currentStep: number
  labels?: string[]
}

export const Stepper = ({ step, currentStep, labels }: Props) => {
  return (
    <div className={styles.container}>
      {[...Array(step)].map((_, index) => (
        <>
          <div
            className={`${styles.step} ${
              index < currentStep - 1
                ? styles.completed
                : index === currentStep - 1
                  ? styles.current
                  : styles.incompleted
            }`}
          >
            <div className={styles.circle}>{index + 1}</div>
            {labels && <p className={styles.label}>{labels[index]}</p>}
          </div>
          {index !== step - 1 && (
            <div
              className={`${styles.line} ${
                index < currentStep - 2
                  ? styles.completed
                  : index === currentStep - 2
                    ? styles.current
                    : styles.incompleted
              }`}
            />
          )}
        </>
      ))}
    </div>
  )
}
