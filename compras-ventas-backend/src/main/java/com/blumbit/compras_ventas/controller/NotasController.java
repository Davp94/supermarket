package com.blumbit.compras_ventas.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blumbit.compras_ventas.dto.request.NotaRequest;
import com.blumbit.compras_ventas.dto.response.ClienteResponse;
import com.blumbit.compras_ventas.dto.response.NotaResponse;
import com.blumbit.compras_ventas.service.NotaService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/nota")
@RequiredArgsConstructor
public class NotasController {

    private final NotaService notaService;

    @GetMapping
    public ResponseEntity<List<NotaResponse>> findAllNotas() {
        return ResponseEntity.ok().body(notaService.findAllNotas());
    }

    @GetMapping("/cliente")
    public ResponseEntity<List<ClienteResponse>> findAllClientes() {
        return ResponseEntity.ok().body(notaService.findAllClientes());
    }

    @PostMapping
    public ResponseEntity<NotaResponse> createNota(@RequestBody NotaRequest notaRequest) {
        return ResponseEntity.ok().body(notaService.createNota(notaRequest));
    }
    

    

}
