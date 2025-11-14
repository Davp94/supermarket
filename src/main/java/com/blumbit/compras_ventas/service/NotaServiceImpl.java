package com.blumbit.compras_ventas.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.blumbit.compras_ventas.dto.request.NotaRequest;
import com.blumbit.compras_ventas.dto.response.ClienteResponse;
import com.blumbit.compras_ventas.dto.response.NotaResponse;
import com.blumbit.compras_ventas.repository.AlmacenProductoRepository;
import com.blumbit.compras_ventas.repository.ClienteRepository;
import com.blumbit.compras_ventas.repository.MovimientoRepository;
import com.blumbit.compras_ventas.repository.NotaRepository;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotaServiceImpl implements NotaService{
    
    private final NotaRepository NotaRepository;
    private final MovimientoRepository movimientoRepository;
    private final AlmacenProductoRepository AlmacenProductoRepository;
    private final ClienteRepository clienteRepository;
    private final EntityManager entityManager;
    
    @Override
    public List<NotaResponse> findAllNotas() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAllNotas'");
    }

    @Override
    public NotaResponse createNota(NotaRequest notaRequest) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createNota'");
    }

    @Override
    public List<ClienteResponse> findAllClientes() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAllClientes'");
    }

}
