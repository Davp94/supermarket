package com.blumbit.compras_ventas.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;

import com.blumbit.compras_ventas.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private Long expiration;

    private final JwtService jwtService;

    private final UsuarioRepository usuarioRepository;

    private final AuthenticationManager authenticationManager;
}
