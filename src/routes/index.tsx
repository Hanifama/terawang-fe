import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ActivateAccount from "../pages/Activate";
import ForgotPassword from "../pages/ForgotPassword";
import DashboardPage from "../pages/DashboardPage";

import ProtectedRoute from "./protectedRoute";
import ManagementUserPage from "../pages/ManagemenUsers";
import AddUser from "../components/managementUser/AddUser";
import DetailUser from "../components/managementUser/detailUser";
import RiwayatPage from "../pages/RiwayatPage";
import DetailRiwayatPage from "../pages/DetailRiwayatPage";
import ProfilePage from "../pages/Profile";
import UpdateProfile from "../components/profile/UpdateProfile";
import UpdatePassword from "../components/profile/UpdatePassword";

export interface RouteConfig {
  path: string;
  component: React.FC;
}


const routes: RouteConfig[] = [
  { path: "/", component: Login },
  { path: "/register", component: Register },
  { path: "/activate", component: ActivateAccount },
  { path: "/forgot-password", component: ForgotPassword },

  { path: "/dashboard", component: () => <ProtectedRoute component={DashboardPage} /> },

  { path: "/riwayat", component: () => <ProtectedRoute component={RiwayatPage} /> },
  { path: "/riwayat-detail/:idDevice", component: () => <ProtectedRoute component={DetailRiwayatPage} /> },

  { path: "/management-user", component: () => <ProtectedRoute component={ManagementUserPage} /> },
  { path: "/user/add", component: () => <ProtectedRoute component={AddUser} /> },
  { path: "/user/detail/:guid", component: () => <ProtectedRoute component={DetailUser} /> },

  { path: "/profile", component: () => <ProtectedRoute component={ProfilePage} /> },
  { path: "/update-profile", component: () => <ProtectedRoute component={UpdateProfile} /> },
  { path: "/update-password", component: () => <ProtectedRoute component={UpdatePassword} /> },

];

export default routes;
