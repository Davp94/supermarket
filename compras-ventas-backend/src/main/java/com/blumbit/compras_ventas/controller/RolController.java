package com.blumbit.compras_ventas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blumbit.compras_ventas.dto.request.RolRequest;
import com.blumbit.compras_ventas.dto.response.RolResponse;
import com.blumbit.compras_ventas.entity.Rol;
import com.blumbit.compras_ventas.service.RolService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/rol")
public class RolController {

    // listar roles GET /rol
    // Obtener rol por id GET /rol/{x}
    //crear rol POST /rol

    @Autowired
    private RolService rolService;

    @GetMapping
    public List<Rol> findAllRoles(){
        return rolService.findAllRoles();
    }

    //   /rol/{id} -> /rol/1    Path Variable
    @GetMapping("/{id}")
    public RolResponse findRolById(@PathVariable Integer id){
        return rolService.findRolById(id);
    }

    @PostMapping()
    public Rol createROl(@RequestBody RolRequest rolRequest) {
        return rolService.createRol(rolRequest);
    }

    @PutMapping("/{id}")
    public Rol updateRol(@PathVariable Integer id, @RequestBody RolRequest rol) {
        return rolService.updateRol(id, rol);
    }

    @DeleteMapping("/{id}")
    public void deleteRol(@PathVariable Integer id){
        rolService.deleteRolById(id);
    }
    

}
