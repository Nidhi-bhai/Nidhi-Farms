import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{padding: '50px', textAlign: 'center'}}>
      <h1>Nidhi Farms Test</h1>
      <p>If you can see this, React is working!</p>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  )
}

export default App
