import { useSession } from "next-auth/react";

export default function useAuth(requireAdmin = false) {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  if (isLoading) {
    return { isLoading: true, isAuthenticated: false, isAdmin: false };
  }

  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user?.role === "ADMIN";

  if (requireAdmin && !isAdmin) {
    return {
      isLoading: false,
      isAuthenticated,
      isAdmin,
      accessDenied: true,
    };
  }

  return {
    isLoading: false,
    isAuthenticated,
    isAdmin,
    accessDenied: false,
    user: session?.user,
  };
}
