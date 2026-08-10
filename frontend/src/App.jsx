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


          <Route path="/admin" element={<AdminRoute><Dashboard/></AdminRoute>}/>

          

        </Routes>
      </BrowserRouter>

    </>
  )
}
export default App ;

