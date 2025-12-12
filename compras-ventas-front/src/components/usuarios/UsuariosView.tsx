import { UsuarioResponse } from "@/types/response/usuarios.response";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

interface UsuariosViewProps {
  usuario: UsuarioResponse | null;
  hideDialog: () => void;
}
export default function UsuariosView({usuario, hideDialog}: UsuariosViewProps) {
  return (
       <>
          <Card title="Usuarios View" subTitle="Detalle de datos de Usuario">
            <p>{JSON.stringify(usuario)}</p>
            <Button label="Cerrar" onClick={hideDialog}/>   
          </Card>
       </>
  );
}
