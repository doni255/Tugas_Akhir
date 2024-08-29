import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import { CartContextProvider } from "./e-commerce/context/cartContext";
// Import Login & Register
import Login from "./Login";
import Register from "./Register";

// Import Dashboard
import Layout from "./dashboard/components/shared/Layout";
import Dashboard from "./dashboard/components/Dashboard";
import Products from "./dashboard/components/Products";
import Orders from "./dashboard/components/Orders";
import Customers from "./dashboard/components/Customers";
import Pendapatan from "./dashboard/components/Pendapatan";
import BarangMasuk from "./dashboard/components/Barang_Masuk";
import Messages from "./dashboard/components/Messages";

// Import Supplier Components
import Supplier from "./dashboard/components/supplier/supplier";
import { InputBarangMasuk } from "./dashboard/components/supplier/InputBarangMasuk";

// Import E-commerce
import Navbar from "./e-commerce/components/Navbar";
import MobNavBar from "./e-commerce/components/MobNavbar";
import Hero from "./e-commerce/components/Hero";
import Category from "./e-commerce/components/Category";
import CategoryCard from "./e-commerce/components/CategoryCard";
import FeatureSectionSaw_SparePart from "./e-commerce/components/FeatureSectionSaw_SparePart";
import FeatureSectionGenerators_SparePart from "./e-commerce/components/FeatureSectionGenerators_SparePart";
import Banner from "./e-commerce/components/Banner";
import BlogSection from "./e-commerce/components/BlogSection";
import NewsLetter from "./e-commerce/components/NewsLetter";
import Feature from "./e-commerce/components/Feature";
import Cart from "./e-commerce/components/Cart";

// Auth Context untuk menyimpan peran pengguna
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [role, setRole] = useState(null); // Simpan peran pengguna

  const [role, setRole] = useState(() => {
    // Ambil peran dari localStorage saat inisialisasi
    return localStorage.getItem("userRole") || null;
  });

  useEffect(() => {
    // Simpan peran ke localStorage setiap kali berubah
    if (role) {
      localStorage.setItem("userRole", role);
    } else {
      localStorage.removeItem("userRole");
    }
  }, [role]);

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

// Komponen ProtectedRoute untuk memeriksa akses berdasarkan peran
const ProtectedRoute = ({ roles, children }) => {
  const { role: userRole } = useAuth();

  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  const [showCart, setShowCart] = useState(false);

  const handleLogin = (setRole) => {
    // Misalnya, lakukan autentikasi dan dapatkan peran pengguna
    const userRole = "admin"; // Ini seharusnya didapatkan dari respon server setelah login berhasil
    setRole(userRole);
    // Lakukan navigasi ke halaman dashboard atau halaman lain setelah login berhasil
  };

  return (
    <Router>
      <AuthProvider>
        <CartContextProvider>
          <Routes>
            {/* Bagian Login & Register */}
            <Route
              path="/"
              element={<Login onLogin={() => handleLogin(useAuth().setRole)} />} // Panggil handleLogin saat login berhasil
            />
            <Route path="/register" element={<Register />} />

            {/* Bagian Dashboard Admin */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
              <Route path="customers" element={<Customers />} />
              <Route path="pendapatan" element={<Pendapatan />} />
              <Route path="barang_masuk" element={<BarangMasuk />} />
              <Route path="messages" element={<Messages />} />
            </Route>

            {/* Bagian Dashboard Supplier */}
            <Route
              path="/dashboard/supplier"
              element={
                <ProtectedRoute role="supplier">
                  <Layout />
                </ProtectedRoute>
              }
            >
              {/* <Route index element={<Supplier />} /> */}
              <Route path="input-barang-masuk" element={<InputBarangMasuk />} />
            </Route>

            {/* Bagian E-commerce */}
            <Route
              path="/e-commerce"
              element={<Navbar setShowCart={setShowCart} />}
            >
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
      </AuthProvider>
    </Router>
  );
}

export default App;
