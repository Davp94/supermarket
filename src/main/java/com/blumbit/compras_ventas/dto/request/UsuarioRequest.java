package com.blumbit.compras_ventas.dto.request;

import java.time.LocalDate;

import com.blumbit.compras_ventas.entity.Usuario;

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

    private String nombres;

    private String apellidos;

    private String fechaNacimiento;

    private String telefono;

    private String direccion;

    private String dni;

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
