import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Documentation from './components/Documentation'
import Calculator from './components/Calculator'

function App() {
  return (
    <div className="overflow-x-hidden bg-cloud-bg text-cloud-ink">
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
