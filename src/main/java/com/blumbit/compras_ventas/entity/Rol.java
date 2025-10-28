package com.blumbit.compras_ventas.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Rol {
    //atributos
    @Id
    private Integer id;

    @Column(nullable = false, length = 50)
    private String nombre;

    @Column()
    private String descripcion;

    //constructor
    public Rol(Integer id, String nombre, String descripcion){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    public Rol(){
        
    }

    //Getters / Setters
    
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
