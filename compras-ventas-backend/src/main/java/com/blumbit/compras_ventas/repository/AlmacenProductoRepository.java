package com.blumbit.compras_ventas.repository;

import org.springframework.data.repository.ListCrudRepository;

import com.blumbit.compras_ventas.entity.AlmacenProducto;
import java.util.List;
import java.util.Optional;


public interface AlmacenProductoRepository extends ListCrudRepository<AlmacenProducto, Integer>{
    List<AlmacenProducto> findByAlmacen_Id(Integer almacenId);
    Optional<AlmacenProducto> findByAlmacen_IdAndProducto_Id(Integer almacenId, Integer productoId);
}
