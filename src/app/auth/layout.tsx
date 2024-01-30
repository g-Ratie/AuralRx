import { ReactNode } from 'react'
import { Stepper } from './_components/Stepper'
import styles from './layout.module.css'

export default async function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      {children}
      <Stepper
        step={4}
        currentStep={3} // TODO: ここをSession等から取得する
        labels={['Google連携', 'Fitデータ取得', 'Spotify連携', '完了']}
      />
    </div>
  )
}
