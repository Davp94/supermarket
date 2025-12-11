package com.blumbit.compras_ventas.service;

import java.util.List;

import com.blumbit.compras_ventas.dto.request.UsuarioRequest;
import com.blumbit.compras_ventas.dto.response.UsuarioResponse;

public interface UsuarioService {

    List<UsuarioResponse> findAllUsuarios();

    UsuarioResponse findUsuarioById(Integer id);

    UsuarioResponse createUsuario(UsuarioRequest usuarioRequest);

    UsuarioResponse updateUsuario(Integer id, UsuarioRequest usuarioRequest);

    void deleteUsuarioById(Integer id);
    
}
