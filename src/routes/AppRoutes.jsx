import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import UsersPage from "../pages/Users/UsersPage";
import GamingRoomsPage from "../pages/GamingRooms/GamingRoomsPage";
import PCSetupsPage from "../pages/PCSetups/PCSetupsPage";
import BookingsPage from "../pages/Bookings/BookingsPage";
import PaymentsPage from "../pages/Payments/PaymentsPage";
import MainLayout from "../layouts/MainLayout";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="gaming-rooms" element={<GamingRoomsPage />} />
        <Route path="pc-setups" element={<PCSetupsPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="payments" element={<PaymentsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
