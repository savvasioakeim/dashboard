import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/dashboard.png'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard'
import AuthForm from './pages/form/AuthForm'

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

          <Route path='/login' element={<AuthForm />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>

      </Router>
    </>
  )
}

export default App
