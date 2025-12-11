export interface UsuarioRequest {
  nombres: string | null;
  apellidos: string | null;
  fechaNacimiento: string | null;
  telefono: string | null;
  direccion: string | null;
  dni: string | null;
  correo: string | null;
  roles: number[];
}
