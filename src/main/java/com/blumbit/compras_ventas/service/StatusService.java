package com.blumbit.compras_ventas.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.blumbit.compras_ventas.entity.Rol;

@Service
public class StatusService {

    public String statusMessage() {
        String statusMessage = "Application Running";
        return statusMessage;
    }

    //TIPOS DE DATOS EN JAVA
    public void dataTypes() {
        //PRIMITIVOS
        int edad = 30;
        double precio = 20.50;
        boolean activo = true;
        char vowel = 'A';
        //DATO OBJETO (propio java)
        String nombre = "David";
        Integer edad2Integer = 30;
        //LISTAS
        List<String> productos = new ArrayList<>();
        productos.add("Producto1");
        productos.add("Producto2");
        productos.clear();
        //DATO OBJETO (logica de negocio)
        Rol rolAdmin = new Rol("ADMIN", "Rol administrador", 1);
        Rol rolGerente = new Rol("GERENTE", "Rol gerente", 2);
        rolAdmin.getNombre(); //ADMIN
        rolAdmin.setNombre("Admin"); //Admin
    }
}
