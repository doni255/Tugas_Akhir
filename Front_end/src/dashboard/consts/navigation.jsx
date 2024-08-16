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

export const DASHBOARD_SIDEBAR_LINKS = [
  

  {
    key: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "products",
    label: "Products",
    path: "/dashboard/products",
    icon: <HiOutlineCube />,
  },
  {
    key: "orders",
    label: "Orders",
    path: "/dashboard/orders",
    icon: <HiOutlineShoppingCart />,
  },
  {
    key: "customers",
    label: "Data Users",
    path: "/dashboard/customers",
    icon: <HiOutlineUsers />,
  },
  {
    key: "report",
    label: "Laporan",
    path: "/dashboard/report",
    icon: <HiOutlineDocumentText />,
    subLinks: [
      {
        key: "pendapatan",
        label: "Pendapatan",
        path: "/dashboard/pendapatan",
      },
      {
        key: "barang_masuk",
        label: "Barang Masuk",
        path: "/dashboard/barang_masuk",
      },
    ],
  },
  {
    key: "supplier",
    label: "Supplier",
    path: "/dashboard/supplier",
    icon: <HiOutlineTruck />,
    subLinks: [
      {
        key: "input_barang_masuk",
        label: "Input Data Barang Masuk",
        path: "/dashboard/supplier/input-barang-masuk",
      },
    ],
  },
  {
    key: "messages",
    label: "Messages",
    path: "/dashboard/messages",
    icon: <HiOutlineAnnotation />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
