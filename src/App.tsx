import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { FundingProvider } from './context/FundingContext';
import AdminRoute from './components/auth/AdminRoute';
import PrivateRoute from './components/auth/PrivateRoute';
import Layout from './components/layout/Layout';
import GlobalStyles from './styles/GlobalStyles';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Unauthorized from './pages/Unauthorized';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardOverview from './components/dashboard/DashboardOverview';
import ContentManagement from './components/dashboard/ContentManagement';
import ContentEditor from './components/dashboard/ContentEditor';
import UserManagement from './components/dashboard/UserManagement';
import Profile from './pages/Profile';
import Grants from './pages/Grants';
import ManageFunding from './pages/admin/ManageFunding';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <FundingProvider>
            <Router>
              <GlobalStyles />
              <Layout>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  
                  {/* Protected Routes */}
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    }
                  />
                  
                  {/* Funding Routes */}
                  <Route path="/grants" element={<Grants type="grant" />} />
                  <Route path="/scholarships" element={<Grants type="scholarship" />} />
                  <Route path="/resources" element={<Grants type="resource" />} />
                  
                  {/* Admin Dashboard Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <AdminRoute>
                        <DashboardLayout />
                      </AdminRoute>
                    }
                  >
                    <Route index element={<DashboardOverview />} />
                    <Route path="content" element={<ContentManagement />} />
                    <Route path="create" element={<ContentEditor />} />
                    <Route path="edit/:id" element={<ContentEditor />} />
                    <Route path="users" element={<UserManagement />} />
                  </Route>

                  {/* Legacy Admin Routes - To be migrated */}
                  <Route
                    path="/admin/manage-funding"
                    element={
                      <AdminRoute>
                        <ManageFunding />
                      </AdminRoute>
                    }
                  />
                </Routes>
                <Toaster 
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: 'var(--background)',
                      color: 'var(--text)',
                      boxShadow: 'var(--box-shadow)',
                      borderRadius: 'var(--border-radius)',
                    },
                  }}
                />
              </Layout>
            </Router>
          </FundingProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
