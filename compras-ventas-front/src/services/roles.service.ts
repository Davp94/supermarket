import { apiClient } from "@/config/service.config";
import { RolesRequest } from "@/types/request/roles.request";
import { RolesResponse } from "@/types/response/roles.response";

export class RolesService {
    public static async getRoles(): Promise<RolesResponse[]> {
        try {
          const response = await apiClient.get<RolesResponse[]>("/rol")  
          return response.data;
        } catch (error) {
           throw new Error("Error recuperando los roles") 
        }
    }

    public static async createRoles(rolRequest: RolesRequest): Promise<RolesResponse>{
        try {
            const response = await apiClient.post<RolesResponse>("/rol", rolRequest);
            return response.data;
        } catch (error) {
            throw new Error("Error guardando el rol") 
        }
    }

    public static async updateRoles(rolRequest: RolesRequest, id: number): Promise<RolesResponse>{
        try {
            const response = await apiClient.put<RolesResponse>(`/rol/${id}`, rolRequest);
            return response.data;
        } catch (error) {
            throw new Error("Error actualizando el rol") 
        }
    }

    public static async deleteRoles(id: number): Promise<void> {
        try {
            const response = await apiClient.delete<void>(`/rol/${id}`);
            return response.data;
        } catch (error) {
            throw new Error("Error eliminando el rol") 
        }
    }
}