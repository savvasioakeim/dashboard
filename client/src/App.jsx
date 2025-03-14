import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/dashboard/Pages/Dashboard'
import AuthForm from './pages/form/AuthForm'
import Home from './pages/dashboard/Pages/Home'
import Orders from './pages/dashboard/Pages/Orders'
import Products from './pages/dashboard/Pages/AllProducts'
import NewProduct from './pages/dashboard/Pages/NewProduct'
import ManageUsers from './pages/dashboard/Pages/ManageUsers'
import CreateUser from './pages/dashboard/Pages/CreateUser'
import AccountSettings from './pages/dashboard/Pages/AccountSettings'
import DashboardLayout from './pages/dashboard/DashboardLayout';
import ManageProducts from './pages/dashboard/Pages/ManageProducts';


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
          <Route path='/Home' element={<Home />} />
          <Route path='/login' element={<AuthForm />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />

            <Route path="/dashboard/orders" element={<Orders />} />
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/dashboard/products/new" element={<NewProduct />} />
            <Route path="/dashboard/manage-products" element={<ManageProducts />} />
            <Route path="/dashboard/users" element={<ManageUsers />} />
            <Route path="/dashboard/users/create" element={<CreateUser />} />
            <Route path="/dashboard/account-settings" element={<AccountSettings />} />
          </Route>

        </Routes>

      </Router>
    </>
  )
}

export default App
