import { apiClient } from "@/config/service.config";
import { PaginationResponse } from "@/types/common/pagination.request";
import { PermisosRequest } from "@/types/request/permisos.request";
import { RolesRequest } from "@/types/request/roles.request";
import { AlmacenResponse } from "@/types/response/almacen.response";
import { PermisosResponse } from "@/types/response/permisos.response";
import { ProductosResponse } from "@/types/response/ProductosResponse";
import { RolesResponse } from "@/types/response/roles.response";
import { SucursalResponse } from "@/types/response/sucursal.response";

export class InventarioService {
  public static async getProductos(params: {
    pageNumber?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: 'ASC' | 'DESC';
    filterValue?: string;
    nombre?: string;
    descripcion?: string;
    codigoBarra?: string;
    marca?: string;
    nombreCategoria?: string;

  }): Promise<PaginationResponse<ProductosResponse[]>> {
    try {
    const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value])=>value !== undefined && value !== null && value !== '')
    );
      const response = await apiClient.get<PaginationResponse<ProductosResponse[]>>("/producto/paginacion", {params: cleanParams});
      return response.data;
    } catch (error) {
      throw new Error("Error recuperando los productos");
    }
  }

  public static async getProductosAlmacen(almacenId: number): Promise<AlmacenResponse[]> {
    try {
      const response = await apiClient.get<AlmacenResponse[]>(`/producto/almacen/${almacenId}`);
      return response.data;
    } catch (error) {
      throw new Error("Error recuperando los productos");
    }
  }

   public static async getSucursales(): Promise<SucursalResponse[]> {
    try {
      const response = await apiClient.get<SucursalResponse[]>(`/sucursal`);
      return response.data;
    } catch (error) {
      throw new Error("Error recuperando los sucursales");
    }
  }

   public static async getAlmacenes(sucursalId: number): Promise<AlmacenResponse[]> {
    try {
      const response = await apiClient.get<AlmacenResponse[]>(`/sucursal/almacen/${sucursalId}`);
      return response.data;
    } catch (error) {
      throw new Error("Error recuperando los almacenes");
    }
  }
}
