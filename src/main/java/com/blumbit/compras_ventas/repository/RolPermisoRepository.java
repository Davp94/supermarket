package com.blumbit.compras_ventas.repository;

import java.util.List;

import org.springframework.data.repository.ListCrudRepository;

import com.blumbit.compras_ventas.entity.Rol;
import com.blumbit.compras_ventas.entity.RolPermiso;

public interface RolPermisoRepository extends ListCrudRepository<RolPermiso, Integer>{
    // List<RolPermiso> findByRol_Id(Integer id);
    List<RolPermiso> findByRol(Rol rol);

}
