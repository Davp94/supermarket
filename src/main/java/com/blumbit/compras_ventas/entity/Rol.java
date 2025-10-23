package com.blumbit.compras_ventas.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Rol {
    //atributos
    @Id
    private Integer identifier;

    @Column(nullable = false, unique = true)
    private String nombre;

    @Column()
    private String description;

    //constructor
    public Rol(String nombre, String description, Integer identifier){
        this.identifier = identifier;
        this.nombre = nombre;
        this.description = description;
    }

    //Getters / Setters
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre){
        this.nombre = nombre;
    }

    public int getIdentifier() {
        return identifier;
    }

    public void setIdentifier(int identifier) {
        this.identifier = identifier;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    
}
