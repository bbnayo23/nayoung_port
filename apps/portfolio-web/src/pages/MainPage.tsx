import { Nav } from '../components/Nav'
import { Hero } from '../sections/Hero'
import { Career } from '../sections/Career'
import { Projects } from '../sections/Projects'
import { Architecture } from '../sections/Architecture'
import { Playground } from '../sections/Playground'
import { Contact } from '../sections/Contact'
import { main } from './MainPage.css'

export default function MainPage() {
  return (
    <>
      <Nav />
      <main className={main}>
        <Hero />
        <Career />
        <Projects />
        <Architecture />
        <Playground />
        <Contact />
      </main>
    </>
  )
}
