package com.blumbit.compras_ventas.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.blumbit.compras_ventas.auth.dto.AuthRequest;
import com.blumbit.compras_ventas.auth.dto.AuthResponse;
import com.blumbit.compras_ventas.entity.Usuario;
import com.blumbit.compras_ventas.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    @Value("${application.security.jwt.expiration}")
    private Long expiration;

    private final JwtService jwtService;

    private final UsuarioRepository usuarioRepository;

    private final AuthenticationManager authenticationManager;

    public AuthResponse authentication(AuthRequest authRequest){
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword(), null)
            );
            Usuario usuario = usuarioRepository.findByUsername(authRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            if (usuario.getEstado() == "INACTIVO") {
                throw new RuntimeException("Usuario inactivo");
            }
            String accessToken = jwtService.generateToken(usuario);
            String refreshToken = jwtService.generateRefreshToken(usuario);
            return AuthResponse.builder()
                    .token(accessToken)
                    .refreshToken(refreshToken)
                    .identifier(usuario.getId())
                    .expiration(expiration)
                    .build();    
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

        public AuthResponse refreshToken(String authentication){
        try {
            if(authentication == null || !authentication.startsWith("Bearer ")){
                throw new RuntimeException("Auth header invalido");
            }
            
            String refreshToken = authentication.substring(7);
            String username = jwtService.extractUsername(refreshToken);
            Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            if (usuario.getEstado() == "INACTIVO") {
                throw new RuntimeException("Usuario inactivo");
            }
            if(!jwtService.isTokenValid(refreshToken, usuario)){
                throw new RuntimeException("Token Invalido");
            }
            String accessToken = jwtService.generateToken(usuario);
            return AuthResponse.builder()
                    .token(accessToken)
                    .identifier(usuario.getId())
                    .expiration(expiration)
                    .build();    
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    } 
}
