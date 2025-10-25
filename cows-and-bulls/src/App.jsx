import InputGrid from "./components/InputGrid"
import ResultGrid from "./components/ResultGrid"

function App() {
  return (
    <div className="body">
      <h1>Bulls and Cows</h1>
      <div className="game">
        <InputGrid />
        <ResultGrid />
      </div>
      <p>Footer</p>
    </div>
  )
}

export default App
