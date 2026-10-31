// import { lazy, Suspense } from "react";

// const Dashboard = lazy(() => import("./Pages/Admin/Dashboard"));
// const AdminUsers = lazy(() => import("./Pages/Admin/Users"));
// const AdminOrders = lazy(() => import("./Pages/Admin/Orders"));
// const AdminProducts = lazy(() => import("./Pages/Admin/Products"));
// const AdminTrash = lazy(() => import("./Pages/Admin/Trash"));

// import { BrowserRouter, Route, Routes } from "react-router-dom"
// import Home from "./Pages/Home"
// import Products from "./Pages/Products"
// import ProductDetails from "./Pages/ProductDetails"
// import Register from "./Pages/Register"
// import Login from "./Pages/Login"
// import Cart from "./Pages/Cart"
// import Wishlist from "./Pages/Wishlist"
// import ProtectedRoute from "./routes/ProtectRoute"
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify"
// import CheckOut from "./Pages/CheckOutPage"
// import OrderComplete from "./Pages/OrdersSuccess"
// import Orders from "./Pages/Order"

// import AdminRoute from "./routes/AdminRoute"



// import Profile from "./Pages/Profile"
// import ChangePassword from "./Pages/ChangePassword"






// function App() {


//   return (
//     <>
//       <BrowserRouter>

//        <ToastContainer position="top-right" autoClose={2500} theme="dark" newestOnTop />
//         <Routes >
//           <Route path="/" element={<Home />} />
//           <Route path="/products" element={<Products />} />
//           <Route path="/products/:category" element={<Products />} />
//           <Route path="/products/:category/:id" element={<ProductDetails />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />



//           <Route path="/cart" element={<ProtectedRoute> <Cart /> </ProtectedRoute> }/>
//           <Route path="/profile" element={<ProtectedRoute> <Profile/> </ProtectedRoute> }/>
//           <Route path="/change-password" element={<ProtectedRoute> <ChangePassword/> </ProtectedRoute> }/>


//           <Route path="/wishlist" element={ <ProtectedRoute> <Wishlist /> </ProtectedRoute>}/>
//           <Route path="/Checkout"  element={<ProtectedRoute> <CheckOut/> </ProtectedRoute> }/>
//           <Route path="/orderSuccess"  element={<ProtectedRoute> <OrderComplete/> </ProtectedRoute> }/>
//           <Route path="/orders"  element={<ProtectedRoute> <Orders/> </ProtectedRoute> }/>


//           <Route path="/Dashboard" element={<AdminRoute><Dashboard/></AdminRoute>}/>
//           <Route path="/Dashboard/Admin-users" element={<AdminRoute><AdminUsers /></AdminRoute>}/>
//           <Route path="/Dashboard/Admin-orders" element={<AdminRoute><AdminOrders /></AdminRoute>}/>
//           <Route path="/Dashboard/Admin-trash" element={<AdminRoute><AdminTrash /></AdminRoute>}/>
//           <Route path="/Dashboard/Admin-products" element={<AdminRoute><AdminProducts/></AdminRoute>}/>



//         </Routes>
//       </BrowserRouter>


//     </>
//   )
// }
// export default App ;

import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import CheckOut from "./Pages/CheckOutPage";
import OrderComplete from "./Pages/OrdersSuccess";
import Orders from "./Pages/Order";
import Profile from "./Pages/Profile";
import ChangePassword from "./Pages/ChangePassword";

import ProtectedRoute from "./routes/ProtectRoute";
import AdminRoute from "./routes/AdminRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy-loaded admin pages
const Dashboard = lazy(() => import("./Pages/Admin/Dashboard"));
const AdminUsers = lazy(() => import("./Pages/Admin/Users"));
const AdminOrders = lazy(() => import("./Pages/Admin/Orders"));
const AdminProducts = lazy(() => import("./Pages/Admin/Products"));
const AdminTrash = lazy(() => import("./Pages/Admin/Trash"));

function App() {
  return (
  <BrowserRouter> <ToastContainer
    position="top-right"
    autoClose={2500}
    theme="dark"
    newestOnTop
  />

    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:category" element={<Products />} />
        <Route
          path="/products/:category/:id"
          element={<ProductDetails />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected customer routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Checkout"
          element={
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orderSuccess"
          element={
            <ProtectedRoute>
              <OrderComplete />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/Dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/Dashboard/Admin-users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />

        <Route
          path="/Dashboard/Admin-orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />

        <Route
          path="/Dashboard/Admin-trash"
          element={
            <AdminRoute>
              <AdminTrash />
            </AdminRoute>
          }
        />

        <Route
          path="/Dashboard/Admin-products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />
      </Routes>
    </Suspense>
  </BrowserRouter>
  );

}

export default App;
