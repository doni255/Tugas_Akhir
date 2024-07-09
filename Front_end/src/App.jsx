import "./App.css";
import Layout from "./components/shared/Layout";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Switch } from "@headlessui/react";

import Login from "./Login";
import Register from "./Register";
import Orders from "./components/Orders";
import Customers from "./components/Customers";
import Report from "./components/Report";
import Messages from "./components/Messages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route path="/dashboard_admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="report" element={<Report />} />
          <Route path="messages" element={<Messages />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
