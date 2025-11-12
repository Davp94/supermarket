package com.blumbit.compras_ventas.service;

import java.util.List;

import com.blumbit.compras_ventas.common.dto.PageableRequest;
import com.blumbit.compras_ventas.common.dto.PageableResponse;
import com.blumbit.compras_ventas.dto.request.ProductoAlmacenRequest;
import com.blumbit.compras_ventas.dto.request.ProductoRequest;
import com.blumbit.compras_ventas.dto.response.ProductoFilterCriteria;
import com.blumbit.compras_ventas.dto.response.ProductoResponse;

public interface ProductoService {

    PageableResponse<ProductoResponse> getProductsPagination(PageableRequest<ProductoFilterCriteria> pageableRequest);

    ProductoResponse createProducto(ProductoRequest productoRequest);

    ProductoResponse createProductoAlmacen(ProductoAlmacenRequest productoAlmacenRequest);

    List<ProductoResponse> getAllProductosByAlmacen(Integer almacenId);
}
