package com.blumbit.compras_ventas.util;

import java.time.LocalDate;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.blumbit.compras_ventas.entity.Usuario;
import com.blumbit.compras_ventas.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataSeeder implements ApplicationRunner{

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        //CREATE DATA SEEDING
        if(usuarioRepository.count() == 0){
            usuarioRepository.save(Usuario.builder()
            .nombres("Usuario Prueba")
            .apellidos("Ap1prueba Ap2prueba")
            .correo("test@test.com")
            .direccion("test direccion")
            .estado("ACTIVO")
            .fechaNacimiento(LocalDate.now())
            .dni("12345678")
            .username("usuario1")
            .telefono("7654322")
            .password(passwordEncoder.encode("123456"))
            .build());
        }
    }

}
