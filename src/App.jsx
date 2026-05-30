import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Documentation from './components/Documentation'
import Calculator from './components/Calculator'

function App() {
  return (
    <div className="bg-warm-white text-warm-ink overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Documentation />
        <Calculator />
      </main>
    </div>
  )
}

export default App
