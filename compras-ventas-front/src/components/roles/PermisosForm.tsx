import { useRoles } from "@/hooks/useRoles";
import { Toast } from "primereact/toast";
import { RefObject, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputController from "../common/input.controller";
import { PermisosRequest } from "@/types/request/permisos.request";
import { Button } from "primereact/button";

interface PermisosFormProps {
  hideDrawer: (updateData?: boolean) => void;
  toast: RefObject<Toast | null>;
}
export default function PermisosForm({ hideDrawer, toast }: PermisosFormProps) {
  const { createPermiso } = useRoles();
  const {
    control,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      nombre: "",
      descripcion: "",
      recurso: "",
      accion: "",
    },
  });

  const onSubmit = async () => {
    const result: PermisosRequest = getValues();
    try {
      await createPermiso(result);
      toast.current?.show({
        severity: "success",
        summary: "Permiso Creado",
        detail: "Permiso Creado exitosamente",
        life: 3000,
      });
      reset();
      onCloseForm(true);
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Error al crear el permiso",
        life: 3000,
      });
    }
  };

  const onCloseForm = async (updateData?: boolean) => {
    hideDrawer(updateData ? updateData : false);
  };

  useEffect(() => {}, []);

  return (
    <>
      <form className="w-full mt-6">
        <div className="grid grid-cols-1 p-fluid gap-4 mb-4>">
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
            <InputController
              control={control}
              name="recurso"
              rules={{ required: "Este campo es requerido" }}
              placeholder="Ingrese el recurso"
            />
          </div>
          <div>
            <InputController
              control={control}
              name="accion"
              rules={{ required: "Este campo es requerido" }}
              placeholder="Ingrese la accion"
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
    </>
  );
}
