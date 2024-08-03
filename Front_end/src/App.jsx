import "./App.css";
import Layout from "./dashboard/components/shared/Layout";
import Dashboard from "./dashboard/components/Dashboard";
import Products from "./dashboard/components/Products";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

import Orders from "./dashboard/components/Orders";
import Customers from "./dashboard/components/Customers";
import Messages from "./dashboard/components/Messages";
import BarangMasuk from "./dashboard/components/Barang_Masuk";
import Pendapatan from "./dashboard/components/Pendapatan";

import MobNavBar from "./e-commerce/components/MobNavbar";
import Navbar from "./e-commerce/components/Navbar";
import Hero from "./e-commerce/components/Hero";
import Category from "./e-commerce/components/Category";
import CategoryCard from "./e-commerce/components/CategoryCard";
import FeatureSectionSaw_SparePart from "./e-commerce/components/FeatureSectionSaw_SparePart";
import FeatureSectionGenerators_SparePart from "./e-commerce/components/FeatureSectionGenerators_SparePart";
import Banner from "./e-commerce/components/Banner";
import BlogSection from "./e-commerce/components/BlogSection";
import NewsLetter from "./e-commerce/components/NewsLetter";
import Feature from "./e-commerce/components/Feature";
import { CartContextProvider } from "./e-commerce/context/cartContext";
import { useState } from "react";
import Cart from "./e-commerce/components/Cart";

function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <Router>
      <CartContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard_admin" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="pendapatan" element={<Pendapatan />} />
            <Route path="barang_masuk" element={<BarangMasuk />} />
            <Route path="messages" element={<Messages />} />
          </Route>

          <Route path="/e-commerce" element={<Navbar setShowCart={setShowCart} />}>
            <Route
              index
              element={
                <>
                  <MobNavBar setShowCart={setShowCart} />
                  <Hero />
                  <Category />
                  <CategoryCard />
                  <FeatureSectionSaw_SparePart />
                  <FeatureSectionGenerators_SparePart />
                  <Banner />
                  <BlogSection />
                  <NewsLetter />
                  <Feature />
                  {showCart && <Cart setShowCart={setShowCart} />}
                </>
              }
            />
          </Route>
        </Routes>
      </CartContextProvider>
    </Router>
  );
}

export default App;
