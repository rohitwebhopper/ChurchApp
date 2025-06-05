import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ApiContextType {
  loading: boolean;
  error: string | null;
  get: <T>(url: string) => Promise<T | null>;
  post: <T>(url: string, data: any) => Promise<T | null>;
  put: <T>(url: string, data: any) => Promise<T | null>;
  del: <T>(url: string) => Promise<T | null>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleResponse = async <T,>(response: Response): Promise<T | null> => {
    const json = await response.json();

    if (!response.ok || json.success === false) {
      const errorMsg = json.message || "Something went wrong";
      setError(errorMsg);
      return null;
    }

    setError(null);
    return json.data as T;
  };

  const get = async <T,>(url: string): Promise<T | null> => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}${url}`);
      return await handleResponse<T>(res);
    } catch (e: any) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const post = async <T,>(url: string, data: any): Promise<T | null> => {
    setLoading(true);
    try {
      const isFormData = data instanceof FormData;

      const res = await fetch(`${BASE_URL}${url}`, {
        method: "POST",
        headers: isFormData ? {} : { "Content-Type": "application/json" },
        body: isFormData ? data : JSON.stringify(data),
      });

      return await handleResponse<T>(res);
    } catch (e: any) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const put = async <T,>(url: string, data: any): Promise<T | null> => {
    setLoading(true);
    try {
      const isFormData = data instanceof FormData;

      const res = await fetch(`${BASE_URL}${url}`, {
        method: "PUT",
        headers: isFormData ? {} : { "Content-Type": "application/json" },
        body: isFormData ? data : JSON.stringify(data),
      });

      return await handleResponse<T>(res);
    } catch (e: any) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const del = async <T,>(url: string): Promise<T | null> => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}${url}`, { method: "DELETE" });
      return await handleResponse<T>(res);
    } catch (e: any) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ApiContext.Provider value={{ loading, error, get, post, put, del }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
