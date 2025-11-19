package com.blumbit.compras_ventas.util;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.blumbit.compras_ventas.entity.Almacen;
import com.blumbit.compras_ventas.entity.AlmacenProducto;
import com.blumbit.compras_ventas.entity.Categoria;
import com.blumbit.compras_ventas.entity.Cliente;
import com.blumbit.compras_ventas.entity.Permiso;
import com.blumbit.compras_ventas.entity.Producto;
import com.blumbit.compras_ventas.entity.Rol;
import com.blumbit.compras_ventas.entity.Sucursal;
import com.blumbit.compras_ventas.entity.Usuario;
import com.blumbit.compras_ventas.repository.AlmacenProductoRepository;
import com.blumbit.compras_ventas.repository.AlmacenRepository;
import com.blumbit.compras_ventas.repository.CategoriaRepository;
import com.blumbit.compras_ventas.repository.ClienteRepository;
import com.blumbit.compras_ventas.repository.PermisoRepository;
import com.blumbit.compras_ventas.repository.ProductoRepository;
import com.blumbit.compras_ventas.repository.RolRepository;
import com.blumbit.compras_ventas.repository.SucursalRepository;
import com.blumbit.compras_ventas.repository.UsuarioRepository;
import com.github.javafaker.Faker;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataSeeder implements ApplicationRunner {

    private final UsuarioRepository usuarioRepository;
    private final PermisoRepository permisoRepository;
    private final CategoriaRepository categoriaRepository;
    private final RolRepository rolRepository;
    private final SucursalRepository sucursalRepository;
    private final ProductoRepository productoRepository;
    private final AlmacenRepository almacenRepository;
    private final AlmacenProductoRepository almacenProductoRepository;
    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Faker faker = new Faker();
        Random random = new Random();
        List<String> generos = List.of("MASCULINO", "FEMENINO", "OTRO", "PREFIERO_NO_DECIR");
        List<String> tipos = List.of("DNI", "PASAPORTE", "CEDULA", "CARNET_EXTRANJERIA", "RUC");
        List<String> paises = List.of(
                "Peruana", "Boliviana", "Argentina", "Chilena", "Colombiana",
                "Ecuatoriana", "Brasileña", "Venezolana", "Mexicana", "Española");
        // CREATE DATA SEEDING
        // Step 1: Create Permissions
        List<Permiso> allPermisos = new ArrayList<>();
        if (permisoRepository.count() == 0) {
            List<String> resources = List.of("usuarios", "roles", "permisos", "productos", "clientes",
                    "ventas",
                    "reportes");
            List<String> actions = List.of("create", "read", "update", "delete", "list");

            for (String resource : resources) {
                for (String action : actions) {
                    Permiso permiso = Permiso.builder()
                            .nombre(action.toUpperCase() + "_" + resource.toUpperCase())
                            .recurso(resource)
                            .accion(action)
                            .descripcion("Permiso para " + action + " en " + resource)
                            .build();
                    allPermisos.add(permisoRepository.save(permiso));
                }
            }
            System.out.println("✓ Permisos creados: " + allPermisos.size());
        }

        if (usuarioRepository.count() == 0) {
            usuarioRepository.save(Usuario.builder()
                    .nombres(faker.name().firstName())
                    .apellidos(faker.name().lastName())
                    .correo(faker.internet().emailAddress())
                    .direccion(faker.address().fullAddress())
                    .estado("ACTIVO")
                    .fechaNacimiento(LocalDate.now())
                    .dni(faker.number().digits(11))
                    .username(faker.name().fullName())
                    .telefono(faker.phoneNumber().cellPhone())
                    .password(passwordEncoder.encode("123456"))
                    .build());
        }
        if (categoriaRepository.count() == 0) {
            List<Categoria> categorias = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                Categoria categoriaSaved = categoriaRepository.save(Categoria.builder()
                        .descripcion(faker.lorem().sentence(10))
                        .nombre(faker.commerce().department())
                        .build());
                categorias.add(categoriaSaved);
            }

            for (int i = 0; i < 1000; i++) {
                Categoria categoria = categorias.get(random.nextInt(categorias.size()));
                productoRepository.save(Producto.builder()
                        .estado(true)
                        .codigoBarra(faker.code().ean13())
                        .descripcion(faker.commerce().productName() + " - "
                                + faker.lorem().sentence(5))
                        .imagen("image-product-example.png")
                        .marca(faker.company().name())
                        .nombre(faker.commerce().productName())
                        .precioVenta(BigDecimal
                                .valueOf(faker.number().randomDouble(2, 1, 1000)))
                        .categoria(categoria)
                        .build());
            }
        }
        if (sucursalRepository.count() == 0 && almacenRepository.count() == 0) {
            // CREATE SUCURSALES
            List<Sucursal> sucursales = new ArrayList<>();
            String[] ciudades = { "Santa Cruz", "La Paz", "Cochabamba", "Tarija", "Potosí" };

            for (int i = 0; i < 5; i++) {
                Sucursal sucursal = Sucursal.builder()
                        .nombre("Sucursal " + faker.company().name())
                        .direccion(faker.address().fullAddress())
                        .telefono(faker.phoneNumber().cellPhone())
                        .build();

                Sucursal sucursalSaved = sucursalRepository.save(sucursal);
                sucursales.add(sucursalSaved);
            }
            // Create 10 Almacenes (2 per sucursal)
            List<Almacen> almacenes = new ArrayList<>();
            String[] tiposAlmacen = { "Principal", "Secundario", "Temporal", "Especial", "General" };

            for (int i = 0; i < 10; i++) {
                // Distribute almacenes evenly among sucursales (2 per sucursal)
                Sucursal sucursal = sucursales.get(i / 2);

                String codigo = "ALM-" + String.format("%03d", i + 1);
                String tipoAlmacen = tiposAlmacen[random.nextInt(tiposAlmacen.length)];

                Almacen almacen = Almacen.builder()
                        .nombre("Almacén " + tipoAlmacen + " " + sucursal.getNombre())
                        .codigo(codigo)
                        .descripcion(faker.lorem().sentence(6) + " ubicado en "
                                + sucursal.getNombre())
                        .sucursal(sucursal)
                        .build();

                Almacen almacenSaved = almacenRepository.save(almacen);
                almacenes.add(almacenSaved);
            }
            // Create AlmacenProducto relations
            // Get all existing products
            List<Producto> productos = productoRepository.findAll();
            if (!productos.isEmpty()) {
                for (Almacen almacen : almacenes) {
                    for (int i = 0; i < 200; i++) {
                        Producto producto = productos.get(random.nextInt(productos.size()));

                        // Create AlmacenProducto relation
                        AlmacenProducto almacenProducto = AlmacenProducto.builder()
                                .stock(faker.number().numberBetween(0, 500))
                                .fechaActualizacion(LocalDateTime.now().minusDays(
                                        faker.number().numberBetween(0, 90)))
                                .almacen(almacen)
                                .producto(producto)
                                .build();

                        almacenProductoRepository.save(almacenProducto);
                    }
                }
            }
        }

        if (clienteRepository.count() <= 0) {
            String[] tiposComerciales = {
                    "EMPRESA", "COOPERATIVA", "FUNDACION", "ONG",
                    "ASOCIACION", "CORPORACION", "SOCIEDAD", "MICROEMPRESA"
            };
            for (int i = 0; i < 10; i++) {

                Cliente cliente = Cliente.builder()
                        .razonSocial(faker.company().name() + " " +
                                faker.options().option("S.A.", "S.R.L.", "LTDA", "CIA"))
                        .estado(true)
                        .telefono(generatePhoneNumber(faker))
                        .direccion(faker.address().streetAddress() + ", " +
                                faker.address().city())
                        .correo(faker.internet().emailAddress())
                        .build();

                clienteRepository.save(cliente);
            }
        }

        // ADD CATEGORIAS
        // ADD PRODUCTOS
        // ADD ALMACEN & SUCURSAL
        // ADD ALMACEN PRODUCTO
        // ...
    }

    private String generatePhoneNumber(Faker faker) {
        String[] formats = {
                faker.phoneNumber().cellPhone(),
                faker.phoneNumber().phoneNumber(),
                "+591 " + faker.number().digits(8), // Bolivia format
                faker.number().digits(7) + "-" + faker.number().digits(4)
        };

        Random random = new Random();
        return formats[random.nextInt(formats.length)];
    }
}
