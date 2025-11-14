package com.blumbit.compras_ventas.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blumbit.compras_ventas.dto.request.RolRequest;
import com.blumbit.compras_ventas.dto.response.RolResponse;
import com.blumbit.compras_ventas.entity.Permiso;
import com.blumbit.compras_ventas.entity.Rol;
import com.blumbit.compras_ventas.entity.RolPermiso;
import com.blumbit.compras_ventas.repository.PermisoRepository;
import com.blumbit.compras_ventas.repository.RolPermisoRepository;
import com.blumbit.compras_ventas.repository.RolRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RolService {

    private final RolRepository rolRepository;

    private final RolPermisoRepository rolPermisoRepository;

    private final PermisoRepository permisoRepository;

    public List<Rol> findAllRoles() {
        return rolRepository.findAll();
    }

    public RolResponse findRolById(Integer rolId) {
        try {
            Rol rolRetrieved = rolRepository.findById(rolId).orElseThrow(
                    () -> new RuntimeException("Rol no encontrado"));
            return RolResponse.fromEntity(rolRetrieved,
                    rolPermisoRepository.findByRol(rolRetrieved).stream()
                            .map(rolPermiso -> rolPermiso.getPermiso().getId()).collect(Collectors.toList()));
        } catch (Exception e) {
            throw e;
        }

    }

    @Transactional
    public Rol createRol(RolRequest rol) {
        try {
            Rol rolCreated = rolRepository.save(RolRequest.toEntity(rol));
            rol.getPermisos().stream().map(permisoId -> {
                Permiso permiso = permisoRepository.findById(permisoId)
                        .orElseThrow(() -> new RuntimeException("Permiso no encontrado"));
                rolPermisoRepository.save(RolPermiso.builder()
                        .permiso(permiso)
                        .rol(rolCreated)
                        .build());
                return permiso;
            });
            return rolCreated;
        } catch (Exception e) {
            throw e;
        }

    }

    @Transactional
    public Rol updateRol(Integer id, RolRequest rol) {
        try {
            Rol rolRetrieved = rolRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("Rol no encontrado"));
            rolRetrieved.setNombre(rol.getNombre());
            rolRetrieved.setDescripcion(rol.getDescripcion());
            rolPermisoRepository.deleteAll();
            rol.getPermisos().stream().map(permisoId -> {
                Permiso permiso = permisoRepository.findById(permisoId)
                        .orElseThrow(() -> new RuntimeException("Permiso no encontrado"));
                rolPermisoRepository.save(RolPermiso.builder()
                        .permiso(permiso)
                        .rol(rolRetrieved)
                        .build());
                return permiso;
            });
            return rolRetrieved;
        } catch (Exception e) {
            throw e;
        }
    }

    public void deleteRolById(Integer rolId) {
        rolRepository.deleteById(rolId);
    }
}
