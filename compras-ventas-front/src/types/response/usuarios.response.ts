export interface UsuarioResponse {
  id: number | null;
  nombres: string | null;
  apellidos: string | null;
  fechaNacimiento: string | null;
  telefono: string | null;
  direccion: string | null;
  dni: string | null;
  correo: string | null;
  username: string | null;
  roles: number[];
}
