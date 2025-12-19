import { OperationTypeEnum } from "@/constant/operation.enum";
import { useRoles } from "@/hooks/useRoles";
import { RolesRequest } from "@/types/request/roles.request";
import { PermisosResponse } from "@/types/response/permisos.response";
import { RolesResponse } from "@/types/response/roles.response";
import { Toast } from "primereact/toast";
import { RefObject, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputController from "../common/input.controller";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import PermisosForm from "./PermisosForm";

interface RolesFormProps {
  rolId: number | null;
  hideDialog: (updateData?: boolean) => void;
  toast: RefObject<Toast | null>;
  flagAction: number;
}
export default function RolesForm({
  rolId,
  hideDialog,
  toast,
  flagAction,
}: RolesFormProps) {
  const [rol, setRol] = useState<RolesResponse | undefined>();
  const [permisos, setPermisos] = useState<PermisosResponse[] | undefined>([]);
  const [permisosRol, setPermisosRol] = useState<
    PermisosResponse[] | undefined
  >([]);
  const [permisosDrawer, setPermisosDrawer] = useState<boolean>(false);
  const { createRol, getRolById, updateRol, getPermisos } = useRoles();
  const {
    control,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      id: null,
      nombre: "",
      descripcion: "",
    },
  });

  const initForm = async () => {
    const permisosRetrieved = await getPermisos();
    setPermisos(permisosRetrieved);
    if (rolId != null) {
      const rolRetreived = await getRolById(rolId);
      setRol(rolRetreived);
      setPermisosRol(
        permisosRetrieved?.filter((permiso) =>
          rolRetreived?.permisos.includes(permiso.id)
        )
      );
      setValue("nombre", rolRetreived?.nombre ? rolRetreived.nombre : "");
      setValue(
        "descripcion",
        rolRetreived?.descripcion ? rolRetreived.descripcion : ""
      );
    }
  };

  const onSubmit = async () => {
    if (flagAction == OperationTypeEnum.CREATE) {
      const result: RolesRequest = getValues();
      result.permisos = permisosRol?.map(
        (permisosRol: PermisosResponse) => permisosRol.id
      );
      try {
        await createRol(result);
        reset();
        onCloseForm(true);
      } catch (error) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error al crear el rol",
          life: 3000,
        });
      }
    }
    if (flagAction == OperationTypeEnum.UPDATE) {
      const result: RolesRequest = getValues();
      result.permisos = permisosRol?.map(
        (permisosRol: PermisosResponse) => permisosRol.id
      );
      try {
        await updateRol(result, rolId as number);
        reset();
        onCloseForm(true);
      } catch (error) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error al actualizar el rol",
          life: 3000,
        });
      }
    }
  };

  const onCloseForm = async (updateData?: boolean) => {
    hideDialog(updateData ? updateData : false);
  };

  const onCloseDrawer = async (updateData?: boolean) => {
    if (updateData) {
      const permisosRetrieved = await getPermisos();
      setPermisos(permisosRetrieved);
    }
    setPermisosDrawer(false);
  };

  useEffect(() => {
    initForm();
  }, []);

  return (
    <>
      <form className="w-full mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 p-fluid gap-4 mb-4">
          <div>
            <InputController
              control={control}
              name="nombre"
              rules={{ required: "Este campo es requerido" }}
              placeholder="Ingrese el nombre"
            />
          </div>
          <div>
            <InputController
              control={control}
              name="descripcion"
              rules={{ required: "Este campo es requerido" }}
              placeholder="Ingrese la descripcion"
            />
          </div>
          <div>
            <MultiSelect
              value={permisosRol}
              onChange={(e) => setPermisosRol(e.value)}
              options={permisos}
              optionLabel="nombre"
              placeholder="Seleccione permisos para el rol"
              maxSelectedLabels={3}
              className="w-full"
            />
          </div>
          <div>
            <Button
              label="Crear Permiso"
              className="w-full"
              onClick={() => setPermisosDrawer(true)}
            />
          </div>
        </div>
        <div className="flex flex-row justify-end items-end gap-2 md: w-1/2">
          <Button
            label="Cancelar"
            severity="danger"
            className="w-full"
            onClick={() => onCloseForm()}
          />
          <Button
            label="Guardar"
            className="w-full"
            onClick={() => onSubmit()}
          />
        </div>
      </form>
      <Sidebar visible={permisosDrawer} position="right" onHide={() => onCloseDrawer(false)}>
        <h2>Permisos Form</h2>
        <PermisosForm hideDrawer={onCloseDrawer} toast={toast} />
      </Sidebar>
    </>
  );
}
