import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import UsersList from "./features/users/UsersList";
import ProjectsList from "./features/projects/ProjectsList";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors dark:bg-gray-900 dark:text-gray-100">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route
              path="/"
              element={
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                      <h3 className="text-gray-500 dark:text-gray-400 text-sm">
                        Total Projects
                      </h3>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                        12
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                      <h3 className="text-gray-500 dark:text-gray-400 text-sm">
                        Active Users
                      </h3>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                        24
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                      <h3 className="text-gray-500 dark:text-gray-400 text-sm">
                        Pending Invites
                      </h3>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                        5
                      </p>
                    </div>
                  </div>
                </div>
              }
            />

            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/users" element={<UsersList />} />
            </Route>

            <Route path="/projects" element={<ProjectsList />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
