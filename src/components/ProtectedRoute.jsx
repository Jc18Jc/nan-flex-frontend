import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
 const [redirectPath, setRedirectPath] = useState(null);
 const [isProfile, setIsProfile] = useState(false);

  useEffect(() => {
    const checkAuthAndProfile = async () => {
      try {
        const sessionRes = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/session`, {
          credentials: "include",
        });
        if (!sessionRes.ok) {
          setRedirectPath("/login");
          return;
        }

        const profileRes = await fetch(`${import.meta.env.VITE_BASE_URL}/profile`, {
          credentials: "include",
        });

        const profileData = await profileRes.json();
        if (profileData.apiHeader?.code === 404) {

          setRedirectPath("/create-profile");
        } else {
          setIsProfile(true);
        }
      } catch {
        setRedirectPath("/login");
      }
    };

    checkAuthAndProfile();
  }, []);

  if (!redirectPath && !isProfile) return <div>세션 확인 중...</div>;
  if (isProfile) return <Outlet/>;
  return <Navigate to={redirectPath} />;
}

export default ProtectedRoute;