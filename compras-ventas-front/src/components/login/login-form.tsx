'use client'
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import InputController from "../common/input.controller";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter();
  const { login } = useAuth();
  const toast = useRef<Toast>(null);

  const onSubmit = async () => {
    try {
      const authRequest = getValues();
      await login(authRequest);
      router.push("/");
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Error de login",
        life: 3000,
      });
    }
  };
  return (
    <>
      <Toast ref={toast} />
      <div className="flex items-center justify-center w-[500px] p-4">
        <Card
          className="w-full"
          title={
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">INGRESO APP</h2>
            </div>
          }
          subTitle="Ingrese sus datos de acceso"
        >
          <div className="flex flex-col gap-4 p-fluid">
            <div className="field">
              <InputController
                control={control}
                name="username"
                rules={{ required: "El campo es requerido" }}
                placeholder="ingrese nombre de usuario"
              />
            </div>
            <div className="field">
              <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => (
                  <>
                    <Password
                      id={field.name}
                      {...field}
                      placeholder="Ingrese la contraseña"
                      toggleMask
                    />
                    {fieldState.error && (
                      <small>{fieldState.error.message}</small>
                    )}
                  </>
                )}
              />
            </div>
            <Button label="Iniciar Sesion" icon="pi pi-sign-in" className="w-full" onClick={() => onSubmit()}/>
          </div>
        </Card>
      </div>
    </>
  );
}
