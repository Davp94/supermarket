package com.blumbit.compras_ventas.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blumbit.compras_ventas.service.StatusService;

@RestController
public class StatusController {

    //public -> Accesible desde cualquier lugar
    //private -> Accesible solo dentro de la misma clase
    //protected -> Accesible dentro del mismo paquete y subclases

    private final StatusService statusService;

    public StatusController(StatusService statusService) {
        this.statusService = statusService;
    }

    @GetMapping("/status")
    protected String statusApp() {
       return statusService.statusMessage();
    }
}
