import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineAnnotation,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
} from "react-icons/hi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/dashboard_admin",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "products",
    label: "Products",
    path: "/dashboard_admin/products",
    icon: <HiOutlineCube />,
  },
  {
    key: "orders",
    label: "Orders",
    path: "/dashboard_admin/orders",
    icon: <HiOutlineShoppingCart />,
  },
  {
    key: "customers",
    label: "Data Users",
    path: "/dashboard_admin/customers",
    icon: <HiOutlineUsers />,
  },
  {
    key: "report",
    label: "Laporan",
    path: "/dashboard_admin/report",
    icon: <HiOutlineDocumentText />,
    subLinks: [
      {
        key: "pendapatan",
        label: "Pendapatan",
        path: "/dashboard_admin/pendapatan",
      },
      {
        key: "barang_masuk",
        label: "Barang Masuk",
        path: "/dashboard_admin/barang_masuk",
      },
    ],
  },
  {
    key: "messages",
    label: "Messages",
    path: "/dashboard_admin/messages",
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
