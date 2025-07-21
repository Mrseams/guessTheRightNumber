interface User {
  id: string;
  username: string;
  role: string;
}

interface AuthData {
  token: string;
  user: User;
}

export const authUtils = {
  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  },

  getUser: (): User | null => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },

  isAuthenticated: (): boolean => {
    const token = authUtils.getToken();
    const user = authUtils.getUser();
    return !!(token && user);
  },
  // Logout user
  logout: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/auth/login";
    }
  },

  // Get authorization header for API calls
  getAuthHeader: (): Record<string, string> => {
    const token = authUtils.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  // Decode JWT token (basic decode without verification)
  decodeToken: (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  },

  // Check if token is expired
  isTokenExpired: (token: string): boolean => {
    const decoded = authUtils.decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  },

  // Validate current session
  validateSession: (): boolean => {
    const token = authUtils.getToken();
    if (!token) return false;

    return !authUtils.isTokenExpired(token);
  },
};
