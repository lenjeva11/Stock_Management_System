import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Navigation from './components/Navigation.jsx'
import TopNavbar from './components/TopNavbar.jsx'
import Products from './components/Products.jsx'
import StockIn from './components/StockIn.jsx'
import StockOut from './components/StockOut.jsx'
import Dashboard from './components/Dashboard.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Settings from './components/Settings.jsx'

function AuthLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Navigation />
      <div className="flex-1 flex flex-col">
        <TopNavbar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}

function RequireAuth({ children }) {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes without sidebar and top navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes with sidebar and top navbar */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <AuthLayout>
                <Products />
              </AuthLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/stock-in"
          element={
            <RequireAuth>
              <AuthLayout>
                <StockIn />
              </AuthLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/stock-out"
          element={
            <RequireAuth>
              <AuthLayout>
                <StockOut />
              </AuthLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <AuthLayout>
                <Dashboard />
              </AuthLayout>
            </RequireAuth>
          }
        />

<Route
          path="/Products"
          element={
            <RequireAuth>
              <AuthLayout>
                <Products/>
              </AuthLayout>
            </RequireAuth>
          }
        />

<Route
          path="/Settings"
          element={
            <RequireAuth>
              <AuthLayout>
                <Settings/>
              </AuthLayout>
            </RequireAuth>
          }
        />

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
