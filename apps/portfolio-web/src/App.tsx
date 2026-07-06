import { Analytics } from '@vercel/analytics/react'
import MainPage from './pages/MainPage'

export default function App() {
  return (
    <>
      <MainPage />
      <Analytics />
    </>
  )
}
