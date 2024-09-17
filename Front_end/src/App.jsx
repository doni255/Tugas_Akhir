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
import DataUsers from "./dashboard/components/DataUsers";
import Pendapatan from "./dashboard/components/Pendapatan";
import BarangMasuk from "./dashboard/components/supplier/BarangMasuk";
import Messages from "./dashboard/components/Messages";

// Import Supplier Components
import Supplier from "./dashboard/components/supplier/supplier";

// Import E-commerce

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
import BarangMasukAdmin from "./dashboard/components/BarangMasukAdmin";
import KonfirmasiStock from "./dashboard/components/KonfirmasiStock";
import DataTambahStock from "./dashboard/components/supplier/DataTambahStock";
import FeatureWaterPump_Sparepart from "./e-commerce/components/FeatureWaterPump_SparePart";
import FeatureSpeedBoat_SparePart from "./e-commerce/components/FeatureSpeedBoat_SparePart";
import Pengeluaran from "./dashboard/components/Pengeluaran";

// e-commerce
import LayoutEcommerce from "./dashboard/components/shared/LayoutEcommerce";
import Navbar from "./e-commerce/components/Navbar";
import NavbarEcommerce from "./e-commerce/components/NavbarEcommerce";
import ProfilePage from "./e-commerce/components/ProfilePage";

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
              <Route path="konfirmasi_stock" element={<KonfirmasiStock />} />
              <Route path="DataUsers" element={<DataUsers />} />
              <Route path="pendapatan" element={<Pendapatan />} />
              <Route path="pengeluaran" element={<Pengeluaran />} />
              <Route path="barang_masuk" element={<BarangMasuk />} />
              <Route path="barang_masuk_admin" element={<BarangMasukAdmin />} />
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
              <Route path="data_tambah_stock" element={<DataTambahStock />} />
              <Route path="barangmasuk" element={<BarangMasuk />} />
            </Route>

            {/* Bagian E-commerce */}

            <Route
              path="/e-commerce"
              element={
                <ProtectedRoute role="admin">
                  <LayoutEcommerce />
                </ProtectedRoute>
              }
            >
              <Route
                path="products"
                element={<Navbar setShowCart={setShowCart} />}
              >
                <Route
                  index
                  element={
                    <>
                      <MobNavBar setShowCart={setShowCart} />

                      {showCart && <Cart setShowCart={setShowCart} />}
                    </>
                  }
                />
              </Route>
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            {/* <Route path="e-commerce/profile" element={<ProfilePage />} /> */}
          </Routes>
        </CartContextProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
