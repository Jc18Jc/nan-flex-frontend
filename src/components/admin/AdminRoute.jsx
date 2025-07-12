import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checked, setChecked] = useState(false); 

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const sessionRes = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/session`, {
          credentials: "include",
        });

        if (!sessionRes.ok) {
          setChecked(true);
          return;
        }

        const sessionData = await sessionRes.json();
        if (sessionData.data?.admin === true) {
          setIsAuthorized(true);
        }

        setChecked(true);
      } catch {
        setChecked(true);
      }
    };

    checkAdmin();
  }, []);

  if (!checked) return <div>관리자 권한 확인 중...</div>;
  if (isAuthorized) return <Outlet />;
  return <Navigate to="/home" />;
}

export default AdminRoute;