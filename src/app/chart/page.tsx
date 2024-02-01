import { Suspense } from 'react'
import ChartDemo from './_components/ChartDemo'

export default function Home() {
  return (
    <main>
      <p>Hello, Mock</p>

      <Suspense fallback={<div>Loading...</div>}>
        <ChartDemo />
      </Suspense>
    </main>
  )
}
