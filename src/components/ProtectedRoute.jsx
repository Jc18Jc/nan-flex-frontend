import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/auth/session`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => setIsAuthenticated(res.ok))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) return <div>세션 확인 중...</div>;
  return isAuthenticated ? <Outlet/> : <Navigate to="/login" />;
}

export default ProtectedRoute;