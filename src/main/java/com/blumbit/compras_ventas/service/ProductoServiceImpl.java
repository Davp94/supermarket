package com.blumbit.compras_ventas.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.blumbit.compras_ventas.common.dto.PageableRequest;
import com.blumbit.compras_ventas.common.dto.PageableResponse;
import com.blumbit.compras_ventas.dto.request.ProductoAlmacenRequest;
import com.blumbit.compras_ventas.dto.request.ProductoRequest;
import com.blumbit.compras_ventas.dto.response.ProductoFilterCriteria;
import com.blumbit.compras_ventas.dto.response.ProductoResponse;
import com.blumbit.compras_ventas.entity.Producto;
import com.blumbit.compras_ventas.repository.AlmacenProductoRepository;
import com.blumbit.compras_ventas.repository.ProductoRepository;
import com.blumbit.compras_ventas.repository.specification.ProductoSpecification;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductoServiceImpl implements ProductoService{

    private final ProductoRepository productoRepository;

    private final AlmacenProductoRepository almacenProductoRepository;

    private final EntityManager entityManager;

    @Override
    public PageableResponse<ProductoResponse> getProductsPagination(
            PageableRequest<ProductoFilterCriteria> pageableRequest) {
        Sort sort = pageableRequest.getSortOrder().equalsIgnoreCase("desc")
            ? Sort.by(pageableRequest.getSortField()).descending()
            : Sort.by(pageableRequest.getSortField()).ascending();
        Pageable pageable = PageRequest.of(pageableRequest.getPageNumber(), pageableRequest.getPageSize(), sort);
        Specification<Producto> spec = Specification.where(null);
        if(pageableRequest.getCriterials() != null){
            spec = ProductoSpecification.createSpecification(pageableRequest.getCriterials());
        }
        Page<Producto> productoPage = productoRepository.findAll(spec, pageable);
        return PageableResponse.<ProductoResponse>builder()
        .pageNumber(productoPage.getNumber())
        .totalElements(productoPage.getTotalElements())
        .pageSize(productoPage.getSize())
        .totalPages(productoPage.getTotalPages())
        .content(productoPage.getContent().stream().map(ProductoResponse::fromEntity)
        .collect(Collectors.toList()))
        .build();    
    }

    @Override
    public ProductoResponse createProducto(ProductoRequest productoRequest) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createProducto'");
    }

    @Override
    public ProductoResponse createProductoAlmacen(ProductoAlmacenRequest productoAlmacenRequest) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createProductoAlmacen'");
    }

    @Override
    public List<ProductoResponse> getAllProductosByAlmacen(Integer almacenId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllProductosByAlmacen'");
    }

}
