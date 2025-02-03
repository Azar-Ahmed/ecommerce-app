import { Route, Routes } from 'react-router-dom'
import CheckAuth from './components/common/CheckAuth'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AdminFeatures from './pages/admin/AdminFeatures'
import Home from './pages/shop/Home'
import Listing from './pages/shop/Listing'
import Checkout from './pages/shop/Checkout'
import Account from './pages/shop/Account'
import UnauthPage from './pages/unauth-page/Index'
import NotFound from './pages/not-found/Index'
import AuthLayout from './components/auth/AuthLayout'
import Layout from './components/shop/Layout'

function App() {
  const isAuth = true
  const user = {
    "role" : "user"
  }

  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white">
        <Routes>
          <Route path="/" element={<CheckAuth isAuth={isAuth} user={user}></CheckAuth>} />
          
          {/* Auth Routes*/}
          <Route
            path="/auth"
            element={
              <CheckAuth isAuth={isAuth} user={user}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
         
          {/* Admin Routes*/}
          <Route
            path="/admin"
            element={
              <CheckAuth isAuth={isAuth} user={user}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>
          
          {/* Shop Routes */}
          <Route
            path="/shop"
            element={
              <CheckAuth isAuth={isAuth} user={user}>
                <Layout />
              </CheckAuth>
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="listing" element={<Listing />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="account" element={<Account />} />
          </Route>
          <Route path="/unauth-page" element={<UnauthPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App
