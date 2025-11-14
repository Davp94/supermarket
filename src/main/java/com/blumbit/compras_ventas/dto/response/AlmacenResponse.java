package com.blumbit.compras_ventas.dto.response;

import com.blumbit.compras_ventas.entity.Almacen;

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
public class AlmacenResponse {
    private Integer id;
    
    private String nombre;

    private String descripcion;

    private String codigo;

    public static AlmacenResponse fromEntity(Almacen almacen){
        return AlmacenResponse.builder()
        .id(almacen.getId())
        .nombre(almacen.getNombre())
        .descripcion(almacen.getDescripcion())
        .codigo(almacen.getCodigo())
        .build();
    }
}
