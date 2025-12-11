package com.blumbit.compras_ventas.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PermisoResponse {

    private Integer id;

    private String nombre;

    private String descripcion;

    private String recurso;

    private String accion;

}
