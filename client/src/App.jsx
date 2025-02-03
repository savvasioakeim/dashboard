import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/dashboard.png'
import './App.css'
import Form from './pages/form/Form'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard'

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.body.classList.add('bg-gradient-to-r', 'from-stone-800', 'via-zinc-500', 'to-slate-700', 'min-h-screen');
    return () => {
      document.body.classList.remove('bg-gradient-to-r', 'from-stone-800', 'via-zinc-500', 'to-slate-700', 'min-h-screen');
    };
  }, []);

  return (
    <>
      <Router>

        <Routes>

          <Route path='/login' element={<Form />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>

      </Router>
    </>
  )
}

export default App
