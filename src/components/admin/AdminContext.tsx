import { createContext, useContext } from "react";

export interface AdminSession {
  admin: boolean;
  manager: boolean;
}

export interface AdminSessionContextValue {
  session: AdminSession | null;
  isAuthorized: boolean;
}

export const AdminSessionContext = createContext<AdminSessionContextValue | null>(null);

export function useAdminSession() {
  const ctx = useContext(AdminSessionContext);
  if (!ctx) throw new Error("useAdminSession must be used inside <AdminSessionProvider>");
  return ctx;
}