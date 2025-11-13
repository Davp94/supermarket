package com.blumbit.compras_ventas.repository;

import org.springframework.data.repository.ListCrudRepository;

import com.blumbit.compras_ventas.entity.AlmacenProducto;
import java.util.List;


public interface AlmacenProductoRepository extends ListCrudRepository<AlmacenProducto, Integer>{
    List<AlmacenProducto> findByAlmacen_Id(Integer almacenId);
}
