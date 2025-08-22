import { useEffect, useMemo, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AdminSessionContext } from "./AdminContext";

function AdminRoute() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checked, setChecked] = useState(false); 
  const [session, setSession] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const sessionRes = await fetch(`/api/auth/session`, {
          credentials: "include",
        });

        if (!sessionRes.ok) {
          setChecked(true);
          return;
        }

        const sessionData = await sessionRes.json();

        setSession({
          admin: !!sessionData.data?.admin,
          manager: !!sessionData.data?.manager,
        });

        if (sessionData.data?.admin || sessionData.data?.manager) {
          setIsAuthorized(true);
        }
        setChecked(true);
      } catch {
        setChecked(true);
      }
    };

    checkAdmin();
  }, []);

  const value = useMemo(() => {
    const isAuthorized = !!(session?.admin || session?.manager);
    return { session, isAuthorized };
  }, [session]);

  if (!checked) return <div>관리자 권한 확인 중...</div>;
  if (!isAuthorized) return <Navigate to="/home" />;

  return (
    <AdminSessionContext.Provider value={value}>
      <Outlet />
    </AdminSessionContext.Provider>
  );
}

export default AdminRoute;