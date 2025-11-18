package com.blumbit.compras_ventas.util;

import java.time.LocalDate;
import java.util.Random;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.blumbit.compras_ventas.entity.Usuario;
import com.blumbit.compras_ventas.repository.UsuarioRepository;
import com.github.javafaker.Faker;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataSeeder implements ApplicationRunner{

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Faker faker = new Faker();
        Random random = new Random();
        //CREATE DATA SEEDING
        if(usuarioRepository.count() == 0){
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

        //ADD CATEGORIAS
        //ADD PRODUCTOS
        //ADD ALMACEN & SUCURSAL
        //ADD ALMACEN PRODUCTO
        //...
    }

}
