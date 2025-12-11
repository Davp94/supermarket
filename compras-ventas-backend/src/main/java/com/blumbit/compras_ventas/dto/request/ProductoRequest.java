package com.blumbit.compras_ventas.dto.request;

import java.math.BigDecimal;

import org.springframework.web.multipart.MultipartFile;

import com.blumbit.compras_ventas.entity.Producto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductoRequest {
    private String nombre;
    private String descripcion;
    private String marca;
    private BigDecimal precioVenta;
    private MultipartFile file;
    private Integer categoriaId;

    public static Producto toEntity(ProductoRequest productoRequest){
        return Producto.builder()
        .nombre(productoRequest.getNombre())
        .descripcion(productoRequest.getDescripcion())
        .marca(productoRequest.getMarca())
        .precioVenta(productoRequest.getPrecioVenta())
        .build();
    }
}
