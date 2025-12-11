package com.blumbit.compras_ventas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;

import com.blumbit.compras_ventas.entity.Rol;

public interface RolRepository extends ListCrudRepository<Rol, Integer>{

    //Query Methods
    List<Rol> findByNombre(String nombre);

    //SQL NATIVO
    @Query(value="select * from rol", nativeQuery = true)
    List<Rol> findAllRoles();

    @Query(value="select * from rol where nombre like '?1'", nativeQuery = true)
    List<Rol> getRolByNombre(String nombre);

    //JPQL
    @Query(value="select Rol from Rol")
    List<Rol> findAllRolesJpql();
}
