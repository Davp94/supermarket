import { RolesResponse } from "@/types/response/roles.response";
import { Button } from "primereact/button";

interface RolesViewProps {
  rol: RolesResponse | null;
  hideDialog: () => void;
}
export default function RolesView ({rol, hideDialog}: RolesViewProps) {
    return (
        <>
            <p>{JSON.stringify(rol)}</p>
            <Button label="Cerrar" onClick={hideDialog}/>  
        </>
    )
}