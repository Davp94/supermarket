import { RolesService } from "@/services/roles.service";
import { PermisosRequest } from "@/types/request/permisos.request";
import { RolesRequest } from "@/types/request/roles.request";
import { useState } from "react";

export const useRoles = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getRoles = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await RolesService.getRoles();
      return response;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  const getRolById = async (id: number) => {
    setLoading(true);
    setError("");
    try {
      const response = await RolesService.getRolById(id);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  const createRol = async (rolesRequest: RolesRequest) => {
    setLoading(true);
    setError("");
    try {
      const response = await RolesService.createRoles(rolesRequest);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  const updateRol = async (rolesRequest: RolesRequest, id: number) => {
    setLoading(true);
    setError("");
    try {
      const response = await RolesService.updateRoles(rolesRequest, id);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteRol = async (id: number) => {
    setLoading(true);
    setError("");
    try {
      const response = await RolesService.deleteRoles(id);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };
  //-------------------PERMISOS --------------------
  const getPermisos = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await RolesService.getPermisos();
      return response;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  const createPermiso = async (permisoRequest: PermisosRequest) => {
    setLoading(true);
    setError("");
    try {
      const response = await RolesService.createPermisos(permisoRequest);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };
  return {
    getRoles,
    getRolById,
    createRol,
    updateRol,
    deleteRol,
    getPermisos,
    createPermiso,
    loading,
    error,
  };
};
