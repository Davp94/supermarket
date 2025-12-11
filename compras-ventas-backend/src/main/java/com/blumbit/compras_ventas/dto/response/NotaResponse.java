package com.blumbit.compras_ventas.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.blumbit.compras_ventas.entity.Nota;

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
public class NotaResponse {
    private Integer id;
    private LocalDateTime fechaRegistro;
    private String observacion;
    private String tipoNota;
    private BigDecimal totalCalculado;
    private BigDecimal descuento;

    public static NotaResponse fromEntity(Nota nota){
        return NotaResponse.builder()
        .id(nota.getId())
        .fechaRegistro(nota.getFechaRegistro())
        .observacion(nota.getObservacion())
        .tipoNota(nota.getTipoNota())
        .descuento(nota.getDescuento())
        .totalCalculado(nota.getTotalCalculado())
        .build();
    }
}
