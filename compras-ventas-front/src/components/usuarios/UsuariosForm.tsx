import { OperationTypeEnum } from "@/constant/operation.enum";
import { RolesResponse } from "@/types/response/roles.response";
import { UsuarioResponse } from "@/types/response/usuarios.response";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { RefObject, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputController from "../common/input.controller";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { useUsuarios } from "@/hooks/useUsuario";
import { useRoles } from "@/hooks/useRoles";

interface UsuarioFormProps {
  usuario: UsuarioResponse | null;
  hideDialog: (updateData?: boolean) => void;
  toast: RefObject<Toast | null>;
  flagAction: number;
}
export default function UsuariosForm({
  usuario,
  hideDialog,
  toast,
  flagAction,
}: UsuarioFormProps) {
  const [roles, setRoles] = useState<RolesResponse[] | undefined>([]);
  const [rolesUsuario, setRolesUsuario] = useState([]);
  const { createUsuario, updateUsuario } = useUsuarios();
  const { getRoles } = useRoles();
  const {
    control,
    formState: { errors },
    reset,
    setValue,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      id: 0,
      nombres: "",
      apellidos: "",
      fechaNacimiento: new Date(),
      telefono: "",
      direccion: "",
      dni: "",
      correo: "",
      username: "",
      roles: [],
    },
  });

  const initForm = async () => {
    const roles = await getRoles();
    setRoles(roles);

    if (usuario != null && flagAction == OperationTypeEnum.UPDATE) {
      setValue("id", usuario.id != null ? usuario.id : 0);
      //ADD set values
    }
  };

  const onSubmit = () => {
    if (flagAction == OperationTypeEnum.CREATE) {
      const result = getValues();
      result.roles = rolesUsuario;
      try {
        createUsuario({
                    ...result,
                    fechaNacimiento: result.fechaNacimiento.toISOString(),
                });
        reset();
      } catch (error) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error al crear el usuario",
          life: 3000,
        });
      }
    }

    if (flagAction == OperationTypeEnum.UPDATE) {
      const result = getValues();
      result.roles = rolesUsuario;
      try {
        updateUsuario({
                    ...result,
                    fechaNacimiento: result.fechaNacimiento.toISOString(),
                }, result.id);
        reset();
      } catch (error) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error al actualizar el usuario",
          life: 3000,
        });
      }
    }
  };

  const closeForm = async (updateData?: boolean) => {
    hideDialog(updateData ? updateData : false);
  };

  useEffect(() => {
    initForm();
  }, []);
  return (
    <>
      <form className="w-full mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Controller
              control={control}
              name="nombres"
              render={({
                field,
                fieldState,
              }) => (
                <>
                  <InputText
                      id={field.name}
                      {...field}
                      placeholder="Ingrese el correo"

                  />
                  {fieldState.error && (<small>{fieldState.error.message}</small>)}
                </>
              )}
            />
          </div>
          <div>
            <InputController
              control={control}
              name="apellidos"
              rules={{required: 'Este campo es requerido'}}
              placeholder="Ingrese los apellidos"
            />
          </div>
          <div>
            <InputController
              control={control}
              name="telefono"
              rules={{required: 'Este campo es requerido', pattern: {value: /^[0-9]+$/, message: 'Solo se permiten numeros'}}}
              placeholder="Ingrese el telefono"
            />
          </div>
          <div>
            <InputController
              control={control}
              name="correo"
              rules={{required: 'Este campo es requerido'}}
              placeholder="Ingrese el correo"
            />
          </div>
          <div>
            <InputController
              control={control}
              name="dni"
              rules={{
                required: 'Este campo es requerido',
                pattern: {
                  value: /^\d{6,10}(?:-[A-Za-z]{3})?$/,
                  message: 'El DNI debe tener 6-10 dígitos; opcionalmente seguido de un guion y 3 letras',
                },
              }}
              placeholder="Ingrese el numero de identificacion"
            />
          </div>
          <div>
            <InputController
              control={control}
              name="username"
              rules={{required: 'Este campo es requerido'}}
              placeholder="Ingrese el username"
            />
          </div>
          <div>
            <Controller
              control={control}
              name="direccion"
              render={({
                field,
                fieldState,
              }) => (
                <>
                  <InputTextarea
                      id={field.name}
                      {...field}
                      placeholder="Ingrese el correo"

                  />
                  {fieldState.error && (<small>{fieldState.error.message}</small>)}
                </>
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="fechaNacimiento"
              render={({
                field,
                fieldState,
              }) => (
                <>
                  <Calendar 
                      id={field.name}
                      {...field}
                      showIcon 
                      dateFormat="dd/mm/yy"
                  />
                  {fieldState.error && (<small>{fieldState.error.message}</small>)}
                </>
              )}
            />
          </div>
          <div>
            <MultiSelect
              value={rolesUsuario}
              onChange={(e) => setRolesUsuario(e.value)}
              options={roles}
              optionLabel="nombre"
              placeholder="Seleccione roles para el usuario"
              maxSelectedLabels={3}
              optionValue="id"
              className="w-full"
            />
            
          </div>
        </div>
        <div className="flex flex-row justify-end items-end gap-2 md: w-1/2">
          <Button label="Cancelar" severity="danger" className="w-full" onClick={() => closeForm()}/>
          <Button label="Guardar" className="w-full" onClick={() => onSubmit()}/>
        </div>
      </form>
    </>
  );
}
