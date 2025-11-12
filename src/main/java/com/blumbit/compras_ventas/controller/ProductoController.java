package com.blumbit.compras_ventas.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blumbit.compras_ventas.common.dto.PageableResponse;
import com.blumbit.compras_ventas.dto.response.ProductoResponse;
import com.blumbit.compras_ventas.service.ProductoService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/producto")
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoService productoService;

    // @GetMapping("/paginacion")
    // public PageableResponse<ProductoResponse> getProductosPagination(
    //     @RequestParam(defaultValue = "10") Integer pageSize,
    //     @RequestParam(defaultValue = "0") Integer pageNumbInteger,
    //     @RequestParam(defaultValue = "id") String sortField,
    //     @RequestParam(defaultValue = "asc") Integer sortOrder) {
    //     return productoService.getProductsPagination(request);
    // }
    
}
