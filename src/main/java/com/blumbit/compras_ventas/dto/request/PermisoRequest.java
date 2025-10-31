package com.blumbit.compras_ventas.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PermisoRequest {

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 50, message = "Los nombres deben tener maximo 50 caracteres")
    private String nombre;

    @NotBlank   
    @Size(max = 100, message = "La descripcion deben tener maximo 100 caracteres")
    private String descripcion;

    @NotBlank   
    @Size(max = 100, message = "El recurso deben tener maximo 100 caracteres")
    private String recurso;

    @NotBlank   
    @Size(max = 100, message = "La accion debe tener maximo 100 caracteres")
    private String accion;
}
