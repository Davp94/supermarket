package com.blumbit.compras_ventas.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.blumbit.compras_ventas.dto.request.PermisoRequest;
import com.blumbit.compras_ventas.dto.response.PermisoResponse;
import com.blumbit.compras_ventas.entity.Permiso;
import com.blumbit.compras_ventas.repository.PermisoRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PermisoServiceImpl implements PermisoService {

    private final PermisoRepository permisoRepository;

    @Override
    public List<PermisoResponse> findAllPermiso() {
        List<Permiso> permisosRetrieved = permisoRepository.findAll();
        List<PermisoResponse> permisosResponse = new ArrayList<>();
        for (Permiso permiso : permisosRetrieved) {
            PermisoResponse permisoResponse = new PermisoResponse();
            permisoResponse.setId(permiso.getId());
            permisoResponse.setDescripcion(permiso.getDescripcion());
            permisoResponse.setNombre(permiso.getNombre());
            permisoResponse.setAccion(permiso.getAccion());
            permisoResponse.setRecurso(permiso.getRecurso());
            permisosResponse.add(permisoResponse);
        }
        return permisosResponse;
    }

    @Override
    public PermisoResponse findPermisoById(Integer id) {
        Permiso permisoRetrieved = permisoRepository.findById(id).get();
        PermisoResponse permisoResponse = new PermisoResponse();
        permisoResponse.setId(permisoRetrieved.getId());
        permisoResponse.setDescripcion(permisoRetrieved.getDescripcion());
        permisoResponse.setNombre(permisoRetrieved.getNombre());
        permisoResponse.setAccion(permisoRetrieved.getAccion());
        permisoResponse.setRecurso(permisoRetrieved.getRecurso());
        return permisoResponse;
    }

    @Override
    public PermisoResponse createPermiso(PermisoRequest permisoRequest) {
        Permiso permisoToCreate = new Permiso();
        permisoToCreate.setNombre(permisoRequest.getNombre());
        permisoToCreate.setDescripcion(permisoRequest.getDescripcion());
        permisoToCreate.setAccion(permisoRequest.getAccion());
        permisoToCreate.setRecurso(permisoRequest.getRecurso());
        permisoToCreate.setFechaCreacion(LocalDateTime.now());
        permisoToCreate.setUsuarioCreacion(1);
        Permiso permisoSaved = permisoRepository.save(permisoToCreate);
        PermisoResponse permisoResponse = new PermisoResponse();
        permisoResponse.setId(permisoSaved.getId());
        permisoResponse.setDescripcion(permisoSaved.getDescripcion());
        permisoResponse.setNombre(permisoSaved.getNombre());
        permisoResponse.setAccion(permisoSaved.getAccion());
        permisoResponse.setRecurso(permisoSaved.getRecurso());
        return permisoResponse;
    }
       

    @Override
    public PermisoResponse updatePermiso(Integer id, PermisoRequest permisoRequest) {
        Permiso permisoRetrieved = permisoRepository.findById(id).get();
        permisoRetrieved.setNombre(permisoRequest.getNombre());
        permisoRetrieved.setDescripcion(permisoRequest.getDescripcion());
        permisoRetrieved.setAccion(permisoRequest.getAccion());
        permisoRetrieved.setRecurso(permisoRequest.getRecurso());
        permisoRetrieved.setFechaModificacion(LocalDateTime.now());
        permisoRetrieved.setUsuarioModificacion(1);
        Permiso permisoUpdated = permisoRepository.save(permisoRetrieved);
        PermisoResponse permisoResponse = new PermisoResponse();
        permisoResponse.setId(permisoUpdated.getId());
        permisoResponse.setDescripcion(permisoUpdated.getDescripcion());
        permisoResponse.setNombre(permisoUpdated.getNombre());
        permisoResponse.setAccion(permisoUpdated.getAccion());
        permisoResponse.setRecurso(permisoUpdated.getRecurso());
        return permisoResponse;
    }

    @Override
    public void deletePermisoById(Integer id) {
        permisoRepository.deleteById(id);
    }
}
