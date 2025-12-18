import { apiClient } from "@/config/service.config";
import { AuthRequest } from "@/types/request/auth.request";
import { AuthResponse } from "@/types/response/auth.response";
import Cookies from "js-cookie";

export class AuthService {
  public static async login(authRequest: AuthRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        "/login",
        authRequest
      );
      Cookies.set("token", response.data.token);
      Cookies.set("refresh-token", response.data.refreshToken);
      Cookies.set("identifier", response.data.identifier + "");
      Cookies.set("expiration", response.data.expiration + "");
      return response.data;
    } catch (error) {
      throw new Error("Error de autenticacion");
    }
  }

  public static async logout(): Promise<void> {
    try {
      Cookies.remove("token");
      Cookies.remove("refresh-token");
      Cookies.remove("identifier");
      Cookies.remove("expiration");
    } catch (error) {
      console.log("ERROR LOGOUT", error);
      throw new Error("Error logout");
    }
  }

  public static async refreshToken(): Promise<AuthResponse> {
    try {
      const response = await apiClient.put<AuthResponse>(
        `/refresh-token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("refresh-token")}`,
          },
        }
      );
      Cookies.set("token", response.data.token);

      return response.data;
    } catch (error) {
      throw new Error("Error refresh token");
    }
  }

  public static isTokenExpired() {
    const expiration = Cookies.get("expiration");
    if (!expiration) return true;
    const expirationDate = new Date(expiration);
    return expirationDate < new Date();
  }
}
