package com.blumbit.compras_ventas.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blumbit.compras_ventas.dto.response.AlmacenResponse;
import com.blumbit.compras_ventas.entity.Sucursal;
import com.blumbit.compras_ventas.service.SucursalService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/sucursal")
@RequiredArgsConstructor
public class SucursalController {

    private final SucursalService sucursalService;

    @GetMapping
    public ResponseEntity<List<Sucursal>> findAllSucursal() {
        return ResponseEntity.ok().body(sucursalService.findAllSucursal());
    }

    @GetMapping("/almacen/{id}")
    public ResponseEntity<List<AlmacenResponse>> findAllAlmacenBySucursal(@PathVariable Integer id) {
        return ResponseEntity.ok().body(sucursalService.findAlmacenesBySucursal(id));
    }
    
}
