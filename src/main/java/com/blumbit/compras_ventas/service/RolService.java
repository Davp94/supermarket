package com.blumbit.compras_ventas.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.blumbit.compras_ventas.entity.Rol;
import com.blumbit.compras_ventas.repository.RolRepository;

@Service
public class RolService {

    private final RolRepository rolRepository;

    public RolService(RolRepository repository) {
        this.rolRepository = repository;
    }

    public List<Rol> findAllRoles(){
        return rolRepository.findAll();
    }
    
}
