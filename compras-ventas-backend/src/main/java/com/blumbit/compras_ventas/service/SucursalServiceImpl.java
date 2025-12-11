package com.blumbit.compras_ventas.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.blumbit.compras_ventas.dto.response.AlmacenResponse;
import com.blumbit.compras_ventas.entity.Sucursal;
import com.blumbit.compras_ventas.repository.AlmacenRepository;
import com.blumbit.compras_ventas.repository.SucursalRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SucursalServiceImpl implements SucursalService {

    private final SucursalRepository sucursalRepository;

    private final AlmacenRepository almacenRepository;

    @Override
    public List<Sucursal> findAllSucursal() {
        return sucursalRepository.findAll();
    }

    @Override
    public List<AlmacenResponse> findAlmacenesBySucursal(Integer sucursalId) {
       return almacenRepository.findBySucursal_Id(sucursalId).stream()
       .map(AlmacenResponse::fromEntity).collect(Collectors.toList());
    }
}
