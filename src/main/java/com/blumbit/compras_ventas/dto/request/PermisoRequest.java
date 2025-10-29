package com.blumbit.compras_ventas.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PermisoRequest {

    private String nombre;

    private String descripcion;

    private String recurso;

    private String accion;
}
