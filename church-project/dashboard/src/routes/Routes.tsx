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
const CreateRolesPage = lazy(() => import("@/pages/managment/CreateRole"));
const RolesPage = lazy(() => import("@/pages/managment/Roles"));
const Activity = lazy(() => import("@/pages/managment/Activity"));
const SermonsPage = lazy(() => import("@/pages/PublicContent/Sermons"));
const EventsPage = lazy(() => import("@/pages/PublicContent/Events"));
const PrayerRequest = lazy(() => import("@/pages/PublicContent/PrayerRequest"));
const GetConnected = lazy(() => import("@/pages/PublicContent/GetConnected"));
const Projects = lazy(() => import("@/pages/PublicContent/Projects"));

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
        <Route
          path="/management/roles"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <RolesPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
          <Route
          path="/management/roles/create"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <CreateRolesPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

            <Route
          path="/management/roles/create/:id"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <CreateRolesPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

              <Route
          path="/management/activity"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Activity />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

                  <Route
          path="/public/sermons"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <SermonsPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        
                  <Route
          path="/public/events"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <EventsPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />


                     <Route
          path="/public/prayer_requests"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <PrayerRequest />
              </DashboardLayout>
            </PrivateRoute>
          }
        />


        
                     <Route
          path="/public/get_connected"
          element={
            <PrivateRoute>
              <DashboardLayout>
            <GetConnected/>
              </DashboardLayout>
            </PrivateRoute>
          }
        />

                          <Route
          path="/public/projects"
          element={
            <PrivateRoute>
              <DashboardLayout>
            <Projects/>
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
