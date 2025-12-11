package com.blumbit.compras_ventas.service;

import java.util.List;

import com.blumbit.compras_ventas.dto.response.AlmacenResponse;
import com.blumbit.compras_ventas.entity.Sucursal;

public interface SucursalService {

    List<Sucursal> findAllSucursal();

    List<AlmacenResponse> findAlmacenesBySucursal(Integer sucursalId);
}
