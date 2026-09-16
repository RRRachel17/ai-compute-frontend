import axios, { AxiosError, type AxiosRequestConfig } from "axios";

const API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8080";

export const request = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

request.interceptors.request.use((config) => {
  return config;
});

request.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message =
      error.response?.statusText || error.message || "Request failed";

    return Promise.reject(new Error(message));
  },
);

export async function get<T>(url: string, config?: AxiosRequestConfig) {
  const response = await request.get<T>(url, config);
  return response.data;
}
