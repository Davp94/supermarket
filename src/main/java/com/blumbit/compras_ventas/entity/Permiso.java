package com.blumbit.compras_ventas.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class Permiso {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    @Column(name = "per_nombre", nullable = false, length = 50)
    private String nombre;

    @Column(name = "per_descripcion", length = 100)
    private String descripcion;

    @Column(name = "per_recurso", length = 100)
    private String recurso;

    @Column(name = "per_accion", length = 100)
    private String accion;

    //Datos auditoria
    private LocalDateTime fechaCreacion;

    private LocalDateTime fechaModificacion;

    private Integer usuarioCreacion;

    private Integer usuarioModificacion;
    
}
