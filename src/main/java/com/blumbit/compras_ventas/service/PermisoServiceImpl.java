package com.blumbit.compras_ventas.service;

import org.springframework.stereotype.Service;

import com.blumbit.compras_ventas.repository.PermisoRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PermisoServiceImpl implements PermisoService {

    private final PermisoRepository permisoRepository;

    @Override
    public List<PermisoResponse> findAllPermiso() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAllPermiso'");
    }

    @Override
    public PermisoResponse findPermisoById(Integer id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findPermisoById'");
    }

    @Override
    public PermisoResponse createPermiso(PermisoRequest permisoRequest) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createPermiso'");
    }

    @Override
    public PermisoResponse updatePermiso(Integer id, PermisoRequest permisoRequest) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updatePermiso'");
    }

    @Override
    public void deletePermisoById(Integer id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deletePermisoById'");
    }

}
