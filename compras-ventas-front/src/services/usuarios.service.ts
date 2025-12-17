import { apiClient } from "@/config/service.config";
import { UsuarioRequest } from "@/types/request/usuarios.request";
import { UsuarioResponse } from "@/types/response/usuarios.response";

export class UsuariosService {
    public static async getUsuarios(): Promise<UsuarioResponse[]> {
        try {
          const response = await apiClient.get<UsuarioResponse[]>("/usuario")  
          return response.data;
        } catch (error) {
           throw new Error("Error recuperando los usuarios") 
        }
    }

    public static async getUsuarioById(id: number): Promise<UsuarioResponse> {
        try {
          const response = await apiClient.get<UsuarioResponse>(`/usuario/${id}`)  
          return response.data;
        } catch (error) {
           throw new Error("Error recuperando el usuario") 
        }
    }

    public static async createUsuario(usuarioRequest: UsuarioRequest): Promise<UsuarioResponse>{
        try {
            const response = await apiClient.post<UsuarioResponse>("/usuario", usuarioRequest);
            return response.data;
        } catch (error) {
            throw new Error("Error guardando el usuario") 
        }
    }

    public static async updateUsuario(usuarioRequest: UsuarioRequest, id: number): Promise<UsuarioResponse>{
        try {
            const response = await apiClient.put<UsuarioResponse>(`/usuario/${id}`, usuarioRequest);
            return response.data;
        } catch (error) {
            throw new Error("Error actualizando el usuario") 
        }
    }

    public static async deleteUsuario(id: number): Promise<void> {
        try {
            const response = await apiClient.delete<void>(`/usuario/${id}`);
            return response.data;
        } catch (error) {
            throw new Error("Error eliminando el usuario") 
        }
    }
}