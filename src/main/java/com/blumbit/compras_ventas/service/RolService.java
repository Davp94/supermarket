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

    public Rol findRolById(Integer rolId) {
        return rolRepository.findById(rolId).get();
    }

    public Rol createRol(Rol rol) {
        //Usar paradigma reactivo
        return rolRepository.save(rol);
    }

    public Rol updateRol(Rol rol) {
        Rol rolRetrieved = findRolById(rol.getId());
        rolRetrieved.setNombre(rol.getNombre());
        rolRetrieved.setDescripcion(rol.getDescripcion());
        return rolRepository.save(rolRetrieved);
    }
    
    public void deleteRolById(Integer rolId) {
        rolRepository.deleteById(rolId);
    }
}
