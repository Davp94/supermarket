package com.blumbit.compras_ventas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.blumbit.compras_ventas.entity.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Integer>, JpaSpecificationExecutor<Producto>{
 //where nombre like '%?value%' and descripcion like '%valueDesc%' 
}
