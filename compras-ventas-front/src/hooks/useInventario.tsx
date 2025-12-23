import { InventarioService } from "@/services/inventario.service";
import { UsuariosService } from "@/services/usuarios.service"
import { UsuarioRequest } from "@/types/request/usuarios.request";
import { useState } from "react";

export const useInventario = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getProductos = async (params: any) => {
        setLoading(true);
        setError('');
        try {
            const response  = await InventarioService.getProductos(params);
            return response;
        } catch (error) {
            if(error instanceof Error){
                setError(error.message)
                throw error;
            }
        } finally {
            setLoading(false);
        }
    }

    const getProductosAlmacen = async (almacenId: number) => {
        setLoading(true);
        setError('');
        try {
            const response  = await InventarioService.getProductosAlmacen(almacenId);
            return response;
        } catch (error) {
            if(error instanceof Error){
                setError(error.message)
                throw error;
            }
        } finally {
            setLoading(false);
        }
    }

    const getSucursales = async () => {
        setLoading(true);
        setError('');
        try {
            const response  = await InventarioService.getSucursales();
            return response;
        } catch (error) {
            if(error instanceof Error){
                setError(error.message)
                throw error;
            }
        } finally {
            setLoading(false);
        }
    }

    const getAlmacenes = async (sucursalId: number) => {
        setLoading(true);
        setError('');
        try {
            const response  = await InventarioService.getAlmacenes(sucursalId);
            return response;
        } catch (error) {
            if(error instanceof Error){
                setError(error.message)
                throw error;
            }
        } finally {
            setLoading(false);
        }
    }

    return {
        getProductos,
        getProductosAlmacen,
        getAlmacenes,
        getSucursales,
        loading,
        error
    }
    
}