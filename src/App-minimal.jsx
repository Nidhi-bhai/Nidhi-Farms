import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('Loading...')
  
  useEffect(() => {
    setMessage('✅ Nidhi Farms Website is Working!')
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'Inter, sans-serif',
      padding: '20px'
    }}>
      <h1 style={{fontSize: '3rem', marginBottom: '20px'}}>{message}</h1>
      <p style={{fontSize: '1.5rem'}}>React + Vite + Vercel Deployment</p>
      <button 
        onClick={() => setMessage('🎉 Button Click Works!')}
        style={{
          marginTop: '30px',
          padding: '15px 30px',
          fontSize: '1.2rem',
          background: 'white',
          color: '#667eea',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Test Button
      </button>
    </div>
  )
}

export default App
