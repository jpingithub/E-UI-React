import React from 'react'
import '../src/App.css'
import '../src/Admin.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/home'
import SingleProduct from './components/SingleProduct'
import AllDynamicItems from './components/AllItems'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import Table from './components/ProductsTable'
import Users from './components/Users'
import Sales from './components/Sales'
import Cart from './components/Cart'
import Info from './pages/showinfo'
import UserProfile from './components/UserProfile'
import Buy from './components/Buy'
import AddProduct from './components/AddProduct'
import PasswordReset from './components/PasswordReset'
import Orders from './components/Orders'
import TopProducts from './components/TopItems'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />}>
            <Route path="" element={<TopProducts/>}/>
            <Route path=":category/" element={<AllDynamicItems />}/>
            <Route path=":type/:id" element={<SingleProduct />}/>
            <Route path=":id/buy/:quantity" element={<Buy/>}/>
          </Route>
          <Route path='/admin/' element={<Admin />}>
            <Route path="products" element={<Table />} />
            <Route path="customers" element={<Users />} />
            <Route path="sales" element={<Sales />} />
            <Route path="add-product" element={<AddProduct />} />
          </Route>
          <Route path='/info/' element={<Info/>}>
            <Route path='orders' element={<Orders/>} />
            <Route path='cart' element={<Cart/>}/>
            <Route path='profile' element={<UserProfile/>}/>
            <Route path='password-reset' element={<PasswordReset/>}/>
          </Route>
          
        </Routes>
    </BrowserRouter>
    <ToastContainer />
    </>
    
  )
}

export default App