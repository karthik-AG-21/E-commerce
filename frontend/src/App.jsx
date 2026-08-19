import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"





import Products from "./Pages/Products"
import ProductDetails from "./Pages/ProductDetails"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import Cart from "./Pages/Cart"
import Wishlist from "./Pages/Wishlist"
import ProtectedRoute from "./routes/ProtectRoute"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify"
import CheckOut from "./Pages/CheckOutPage"
import OrderComplete from "./Pages/OrdersSuccess"
import Orders from "./Pages/Order"
import Dashboard from "./Pages/Admin/Dashboard"
import AdminRoute from "./routes/AdminRoute"
import Users from "./Pages/Admin/Users"
import AdminUsers from "./Pages/Admin/Users"
import AdminOrders from "./Pages/Admin/Orders"
import AdminProducts from "./Pages/Admin/Products"





function App() {


  return (
    <>
      <BrowserRouter>

       <ToastContainer position="top-right" autoClose={2500} theme="dark" newestOnTop />
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          


          <Route path="/cart" element={<ProtectedRoute> <Cart /> </ProtectedRoute> }/>
          

          <Route path="/wishlist" element={ <ProtectedRoute> <Wishlist /> </ProtectedRoute>}/>
          <Route path="/Checkout"  element={<ProtectedRoute> <CheckOut/> </ProtectedRoute> }/>
          <Route path="/orderSuccess"  element={<ProtectedRoute> <OrderComplete/> </ProtectedRoute> }/>
          <Route path="/orders"  element={<ProtectedRoute> <Orders/> </ProtectedRoute> }/>


          <Route path="/Dashboard" element={<AdminRoute><Dashboard/></AdminRoute>}/>
          <Route path="/Dashboard/Admin-users" element={<AdminRoute><AdminUsers /></AdminRoute>}/>
          <Route path="/Dashboard/Admin-orders" element={<AdminRoute><AdminOrders /></AdminRoute>}/>
          <Route path="/Dashboard/Admin-products" element={<AdminRoute><AdminProducts/></AdminRoute>}/>

          

        </Routes>
      </BrowserRouter>


    </>
  )
}
export default App ;

