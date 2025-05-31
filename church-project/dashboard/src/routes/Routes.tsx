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
const Activity = lazy(() => import("@/pages/managment/Activity"));
const SermonsPage = lazy(() => import("@/pages/PublicContent/Sermons"));
const EventsPage = lazy(() => import("@/pages/PublicContent/Events"));
const PrayerRequest = lazy(() => import("@/pages/PublicContent/PrayerRequest"));
const PrayerType = lazy(() => import("@/pages/PublicContent/PrayerType"));
const GetConnected = lazy(() => import("@/pages/PublicContent/GetConnected"));
const Projects = lazy(() => import("@/pages/PublicContent/Projects"));
const DonationType = lazy(() => import("@/pages/donation/type/Index"));
const DonationReports = lazy(() => import("@/pages/donation/reports/Index"));
const DonationTransaction = lazy(
  () => import("@/pages/donation/transaction/Index")
);
const Notifications = lazy(() => import("@/pages/notifications/Index"));
const Profile = lazy(() => import("@/pages/profile/Index"));

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
          path="/public/prayer_type"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <PrayerType />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/public/get_connected"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <GetConnected />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/public/projects"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Projects />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/donation/type"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <DonationType />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/donation/reports"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <DonationReports />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/donation/transaction-history"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <DonationTransaction />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Notifications />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/profile/view"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Profile />
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
