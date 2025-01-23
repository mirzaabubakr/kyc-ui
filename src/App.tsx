import { Routes, Route, Navigate } from "react-router";
import AuthPage from "./pages/auth/AuthPage";
import ProtectedRoute from "./components/private-routes/ProtectedRoutes";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminPanel from "./pages/admin-panel/AdminPanel";

const Unauthorized = () => (
  <div className="flex items-center justify-center min-h-screen">
    <h1 className="font-extrabold">Unauthorized</h1>
  </div>
);

const App = () => {
  return (
    <Routes>
      <Route index element={<AuthPage />} />
      <Route path="unauthorized" element={<Unauthorized />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute roles={["user"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/unauthorized" replace />} />
    </Routes>
  );
};

export default App;
