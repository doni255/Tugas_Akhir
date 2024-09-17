import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineAnnotation,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
  HiOutlineTruck,
} from "react-icons/hi";

import { useAuth } from "../../App";

export const DASHBOARD_SIDEBAR_LINKS = () => {
  const { role } = useAuth(); // Get the user role from context

  const links = [
    {
      key: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      icon: <HiOutlineViewGrid />,
      roles: ["admin", "supplier"], // Roles allowed to view this link
    },
    {
      key: "products",
      label: "Products",
      path: "/dashboard/products",
      icon: <HiOutlineCube />,
      roles: ["admin"],
    },
    {
      key: "orders",
      label: "Orders",
      path: "/dashboard/orders",
      icon: <HiOutlineShoppingCart />,
      roles: ["admin"],
    },
    {
      key: "konfirmasi_tambah_stock",
      label: "Konfirmasi Stock",
      icon: <HiOutlineShoppingCart />,
      path: "/dashboard/konfirmasi_stock",
      roles: ["admin"],
    },
    {
      key: "customers",
      label: "Data Users",
      path: "/dashboard/DataUsers",
      icon: <HiOutlineUsers />,
      roles: ["admin"],
    },
    {
      key: "report",
      label: "Laporan",
      path: "/dashboard/report",
      icon: <HiOutlineDocumentText />,
      roles: ["admin"],
      subLinks: [
        {
          key: "pendapatan",
          label: "Pendapatan",
          path: "/dashboard/pendapatan",
          roles: ["admin"],
        },
        {
          key: "pengeluaran",
          label: "Pengeluaran",
          path: "/dashboard/pengeluaran",
          roles: ["admin"],
        },
        {
          key: "barang_masuk_admin",
          label: "Barang Masuk Supplier",
          path: "/dashboard/barang_masuk_admin",
          roles: ["admin"],
        },
      ],
    },
    {
      key: "supplier",
      label: "Supplier",
      path: "/dashboard/supplier",
      icon: <HiOutlineTruck />,
      roles: ["supplier"],
      subLinks: [
        {
          key: "products",
          label: "Products",
          path: "/dashboard/products",
          icon: <HiOutlineCube />,
          roles: ["admin"],
        },
        {
          key: "barangmasuk",
          label: "Data Barang Masuk",
          path: "/dashboard/supplier/barangmasuk",
          roles: ["supplier"],
        },
        {
          key: "data_tambah_stock",
          label: "Data Tambah Stock",
          path: "/dashboard/supplier/data_tambah_stock",
          roles: ["supplier"],
        },
      ],
    },
    {
      key: "messages",
      label: "Messages",
      path: "/dashboard/messages",
      icon: <HiOutlineAnnotation />,
      roles: ["admin"],
    },
  ];

  // Ensure the result is always an array
  const filteredLinks = links.filter((link) => link.roles.includes(role)) || [];

  return filteredLinks;
};

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = () => {
  const { role } = useAuth();

  const bottomLinks = [
    {
      key: "settings",
      label: "Settings",
      path: "/settings",
      icon: <HiOutlineCog />,
      roles: ["admin", "supplier"],
    },
    {
      key: "support",
      label: "Help & Support",
      path: "/support",
      icon: <HiOutlineQuestionMarkCircle />,
      roles: ["admin", "supplier"],
    },
  ];

  // Ensure the result is always an array
  const filteredBottomLinks =
    bottomLinks.filter((link) => link.roles.includes(role)) || [];

  return filteredBottomLinks;
};

export const ECOMMERCE_LINKS = () => {

  const links = [
    {
      key: "e-commerce",
      label: "E-commerce",
      path: "/e-commerce",
      roles: ["customer"],
      subLinks: [
        {
          //profile
          key: "profile",
          label: "Profile",
          path: "/e-commerce/profile",
          roles: ["customer"],
        },
      ],
    },
  ];

  return links;
};