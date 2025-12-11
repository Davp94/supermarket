package com.blumbit.compras_ventas.dto.request;

import java.math.BigDecimal;

import com.blumbit.compras_ventas.entity.Movimiento;

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
public class MovimientoRequest {
    private Integer cantidad;
    private BigDecimal precioUnitario;
    private String observacion;
    private String tipoMovimiento;
    private Integer notaId;
    private Integer productoId;
    private Integer almacenId;

    public static Movimiento toEntity(MovimientoRequest movimientoRequest){
        return Movimiento.builder()
        .cantidad(movimientoRequest.getCantidad())
        .tipoMovimiento(movimientoRequest.getTipoMovimiento())
        .observacion(movimientoRequest.getObservacion())
        .precioUnitario(movimientoRequest.getPrecioUnitario())
        .build();
    }
}
