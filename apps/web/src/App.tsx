import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import { ProtectedRoute } from "./components/auth/ProtectedRoute"
import ProductsPage from "./pages/ProductsPage"

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/products" element={<ProductsPage />} />
      </Route>
    </Routes>
  )
}

export default App
