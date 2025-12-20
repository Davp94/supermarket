package com.blumbit.compras_ventas.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(nullable = false, length = 150)
    private String nombre;

    private String descripcion;

    @Column(length = 100)
    private String codigoBarra;

    @Column(length = 100)
    private String marca;
    
    @Column(nullable = false)
    private BigDecimal precioVenta;


    private String imagen;

    @Column(nullable = false)
    private Boolean estado;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

}
