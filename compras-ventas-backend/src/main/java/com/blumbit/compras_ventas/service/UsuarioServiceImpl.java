package com.blumbit.compras_ventas.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.blumbit.compras_ventas.dto.request.UsuarioRequest;
import com.blumbit.compras_ventas.dto.response.UsuarioResponse;
import com.blumbit.compras_ventas.entity.Usuario;
import com.blumbit.compras_ventas.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public List<UsuarioResponse> findAllUsuarios() {
        try {
            return usuarioRepository.findAll().stream()
                    .map(usuario -> UsuarioResponse.fromEntity(usuario)).collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public UsuarioResponse findUsuarioById(Integer id) {
        try {
            Usuario usuarioRetrieved = usuarioRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            return UsuarioResponse.fromEntity(usuarioRetrieved);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public UsuarioResponse createUsuario(UsuarioRequest usuarioRequest) {
        try {
            Usuario usuarioToSave = UsuarioRequest.toEntity(usuarioRequest);
            usuarioToSave.setPassword("123456");
            usuarioToSave.setUsername("dsadasd");
            return UsuarioResponse.fromEntity(usuarioRepository.save(usuarioToSave));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public UsuarioResponse updateUsuario(Integer id, UsuarioRequest usuarioRequest) {
        try {
            Usuario usuarioRetrieved = usuarioRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            usuarioRetrieved.setNombres(usuarioRequest.getNombres());
            usuarioRetrieved.setApellidos(usuarioRequest.getApellidos());
            usuarioRetrieved.setCorreo(usuarioRequest.getCorreo());
            usuarioRetrieved.setTelefono(usuarioRequest.getTelefono());
            usuarioRetrieved.setFechaNacimiento(LocalDate.parse(usuarioRequest.getFechaNacimiento()));
            usuarioRetrieved.setDni(usuarioRequest.getDni());       
            return UsuarioResponse.fromEntity(usuarioRetrieved);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteUsuarioById(Integer id) {
        usuarioRepository.deleteById(id);
    }

}
