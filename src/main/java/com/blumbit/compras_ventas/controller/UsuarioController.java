package com.blumbit.compras_ventas.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blumbit.compras_ventas.dto.request.UsuarioRequest;
import com.blumbit.compras_ventas.dto.response.UsuarioResponse;
import com.blumbit.compras_ventas.service.UsuarioService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequiredArgsConstructor
@RequestMapping("/usuario")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping()
    public ResponseEntity<List<UsuarioResponse>> findAllUsuarios() {
        return ResponseEntity.ok(usuarioService.findAllUsuarios());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> getMethodName(@PathVariable Integer id) {
        return ResponseEntity.ok(usuarioService.findUsuarioById(id));
    }

    @PostMapping()
    public ResponseEntity<UsuarioResponse> createUsuario(@Valid @RequestBody UsuarioRequest usuarioRequest) {
        
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.createUsuario(usuarioRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponse> updateUsuario(@PathVariable Integer id, @RequestBody UsuarioRequest usuarioRequest) {
        return ResponseEntity.ok(usuarioService.updateUsuario(id, usuarioRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Integer id){
        usuarioService.deleteUsuarioById(id);
        return ResponseEntity.noContent().build();
    }


    
    
    

    

}
