import { lazy } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UsersIcon from "@mui/icons-material/People";

const Dashboard = lazy(() =>
  import("../../features/admin/dashboard/Dashboard")
);
const Customer = lazy(() => import("../../features/admin/customer/Customer"));

export default [
  {
    label: "Dashboard",
    path: "",
    showInMenu: true,
    component: <Dashboard />,
    icon: <DashboardIcon />,
    roles: ["admin", "users"],
    hasSubRoutes: false,
  },
  {
    label: "Customer",
    path: "customer",
    showInMenu: true,
    component: <Customer />,
    icon: <UsersIcon />,
    roles: ["admin"],
    hasSubRoutes: false,
  },
];
