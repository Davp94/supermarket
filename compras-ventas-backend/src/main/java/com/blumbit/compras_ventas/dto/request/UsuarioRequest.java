package com.blumbit.compras_ventas.dto.request;

import java.time.LocalDate;

import com.blumbit.compras_ventas.entity.Usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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
public class UsuarioRequest {

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "Los nombres deben tener maximo 50 caracteres")
    private String nombres;

    @NotBlank(message = "El apellidos es obligatorio")
    @Size(max = 100, message = "Los apellidos deben tener maximo 50 caracteres")
    private String apellidos;

    @NotBlank(message = "La fecha es obligatorio")
    @Pattern(
        regexp = "^(?:(?:0[1-9]|[12][0-9]|3[01])/(?:0[1-9]|1[0-2])/(?:19|20)\\d{2})$",
        message = "La fecha de nacimiento debe tener el formato dd/mm/yyyy y ser una fecha válida (ej. 15/03/1990)"
    )
    private String fechaNacimiento;

    @Size(max = 100, message = "El telefono debe tener maximo 50 caracteres")
    private String telefono;

    @NotBlank(message = "La direccion es obligatorio")
    private String direccion;

    @NotBlank(message = "El DNI es obligatorio")
    @Size(max = 20, message = "El telefono debe tener maximo 20 caracteres")
    private String dni;

    @NotBlank(message = "El correo es obligatorio")
    @Size(max = 100, message = "El correo debe tener maximo 100 caracteres")
    @Email(message = "El correo debe tener un formato valido")  //bluimbit@edtics.com
    private String correo;

    public static Usuario toEntity(UsuarioRequest usuarioRequest){
        return Usuario.builder()
        .nombres(usuarioRequest.getNombres())
        .apellidos(usuarioRequest.getApellidos())
        .fechaNacimiento(LocalDate.parse(usuarioRequest.getFechaNacimiento()))
        .telefono(usuarioRequest.getTelefono())
        .direccion(usuarioRequest.getDireccion())
        .dni(usuarioRequest.getDni())
        .correo(usuarioRequest.getCorreo())
        .build();
    }

}
