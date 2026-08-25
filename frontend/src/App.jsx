import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { CartProvider } from "./CartContext";


// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";



// Pages
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";


function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Products />
    </>
  );
}


function App() {
  return (
    <CartProvider>

      <BrowserRouter>

        {/* Amazon-style Navbar */}
        <Navbar />

        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Product Details */}
          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          {/* Cart */}
          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* Login */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* Register */}
          <Route
            path="/register"
            element={<Register />}
          />

          <Route path="/checkout" element={<Checkout />} />

          <Route
  path="/orders"
  element={<Orders />}
/>

        </Routes>

      </BrowserRouter>

    </CartProvider>
  );
}


export default App;