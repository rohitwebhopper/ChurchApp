import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Loader from "@/components/ui/Loader/Loader";

// Lazy-loaded pages
const LoginPage = lazy(() => import("../pages/LoginPage"));
const DashboardLayout = lazy(
  () => import("../components/layout/DashboardLayout")
);
const DashboardPage = lazy(
  () => import("@/components/views/pages/dashboard/Index")
);
const ChurchManagment = lazy(() => import("@/pages/managment/Church"));
const UserManagment = lazy(() => import("@/pages/managment/User"));

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div>
          <Loader />
        </div>
      }
    >
      <Routes>
        {/* Public route */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* Private route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/management/church"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <ChurchManagment />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/management/user"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <UserManagment />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
