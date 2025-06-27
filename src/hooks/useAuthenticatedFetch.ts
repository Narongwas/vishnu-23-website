import { useAuth } from "@/contexts/AuthContext";
import { useCallback } from "react";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const useAuthenticatedFetch = () => {
  const { token, refreshToken } = useAuth();

  const authenticatedFetch = useCallback(
    async (url: string, options: FetchOptions = {}) => {
      if (!token) {
        await refreshToken();
      }

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...options.headers,
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (response.status === 401 && token) {
        await refreshToken();
        const retryHeaders: Record<string, string> = {
          ...headers,
          Authorization: `Bearer ${token}`,
        };

        return fetch(url, {
          ...options,
          headers: retryHeaders,
        });
      }

      return response;
    },
    [token, refreshToken]
  );

  return authenticatedFetch;
};
