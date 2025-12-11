package com.blumbit.compras_ventas.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blumbit.compras_ventas.common.dto.PageableRequest;
import com.blumbit.compras_ventas.common.dto.PageableResponse;
import com.blumbit.compras_ventas.dto.request.ProductoAlmacenRequest;
import com.blumbit.compras_ventas.dto.request.ProductoRequest;
import com.blumbit.compras_ventas.dto.response.ProductoFilterCriteria;
import com.blumbit.compras_ventas.dto.response.ProductoResponse;
import com.blumbit.compras_ventas.service.ProductoService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("/producto")
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoService productoService;

    @GetMapping("/paginacion")
    public PageableResponse<ProductoResponse> getProductosPagination(
        @RequestParam(defaultValue = "10") Integer pageSize,
        @RequestParam(defaultValue = "0") Integer pageNumber,
        @RequestParam(defaultValue = "id") String sortField,
        @RequestParam(defaultValue = "asc") String sortOrder,
        @RequestParam(required = false) String filtervalue,
        @RequestParam(required = false) String nombre,
        @RequestParam(required = false) String descripcion,
        @RequestParam(required = false) String codigoBarra,
        @RequestParam(required = false) String marca,
        @RequestParam(required = false) String nombreCategoria) {
        
            ProductoFilterCriteria criteria = ProductoFilterCriteria.builder()
            .nombre(nombre)
            .descripcion(descripcion)
            .marca(marca)
            .codigoBarra(codigoBarra)
            .nombreCategoria(nombreCategoria)
            .build();
            PageableRequest<ProductoFilterCriteria> request = PageableRequest.<ProductoFilterCriteria>builder()
            .criterials(criteria)
            .filterValue(filtervalue)
            .pageNumber(pageNumber)
            .pageSize(pageSize)
            .sortField(sortField)
            .sortOrder(sortOrder)
            .build();
        return productoService.getProductsPagination(request);
    }

    @PostMapping
    public ResponseEntity<ProductoResponse> createFile(@ModelAttribute ProductoRequest productoRequest) { 
        return ResponseEntity.<ProductoResponse>ok(productoService.createProducto(productoRequest));
    }

    @GetMapping("/almacen/{id}")
    public ResponseEntity<List<ProductoResponse>> getProductosByAlmacen(@PathVariable Integer id) {
        return ResponseEntity.ok(productoService.getAllProductosByAlmacen(id));
    }

    @PostMapping("/almacen")
    public ResponseEntity<ProductoResponse> createProductoAlmacen(@RequestBody ProductoAlmacenRequest req) {
        
        return ResponseEntity.ok(productoService.createProductoAlmacen(req));
    }    
    
}
