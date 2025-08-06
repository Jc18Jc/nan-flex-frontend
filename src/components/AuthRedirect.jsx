import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function AuthRedirect() {
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    fetch(`/api/auth/session`, {
      credentials: "include",
    })
      .then((res) => {
        setRedirectPath(res.ok ? "/home" : "/login");
      })
      .catch(() => setRedirectPath("/login"));
  }, []);

  if (!redirectPath) return <div>세션 확인 중...</div>;
  return <Navigate to={redirectPath} />;
}

export default AuthRedirect;