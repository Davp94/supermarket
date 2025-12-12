"use client";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { ProductService } from "@/services/product.service";
import { UsuarioResponse } from "@/types/response/usuarios.response";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { OperationTypeEnum } from "@/constant/operation.enum";
import UsuariosView from "./UsuariosView";
import FullPageLayout from "@/app/(full-page)/layout";
import UsuariosForm from "./UsuariosForm";

export default function UsuariosHome() {
  const [usuarios, setUsuarios] = useState<UsuarioResponse[]>([]);
  const [usuarioDialog, setUsuarioDialog] = useState<boolean>(false);
  const [usuario, setUsuario] = useState<UsuarioResponse | null>(null);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [flagAction, setFlagAction] = useState<number>(0);
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<UsuarioResponse[]>>(null);

  //TODO add hook usuarios

  const initComponent = async () => {
    //TODO call getusuarios();
    const usuarios = await [
      {
        id: 1,
        nombres: "María",
        apellidos: "González López",
        fechaNacimiento: "1990-05-15",
        telefono: "+51 987 654 321",
        direccion: "Av. Principal 123, Lima",
        dni: "12345678",
        correo: "maria.gonzalez@email.com",
        username: "mariagonzalez",
        roles: [1, 2], // Ejemplo: 1=Admin, 2=Usuario
      },
      {
        id: 2,
        nombres: "Carlos",
        apellidos: "Rodríguez Pérez",
        fechaNacimiento: "1985-08-22",
        telefono: "+51 987 123 456",
        direccion: "Calle Las Flores 456, Arequipa",
        dni: "87654321",
        correo: "carlos.rodriguez@email.com",
        username: "carlosrp",
        roles: [2], // Solo rol de Usuario
      },
      {
        id: 3,
        nombres: "Ana",
        apellidos: "Martínez",
        fechaNacimiento: "1995-11-30",
        telefono: "+51 955 444 333",
        direccion: "Jr. Union 789, Trujillo",
        dni: "55555555",
        correo: "ana.martinez@email.com",
        username: "anamartinez",
        roles: [3], // Ejemplo: 3=Invitado
      },
    ];
    setUsuarios(usuarios);
  };

  useEffect(() => {
    initComponent();
  }, []);

  const openNew = () => {
    setFlagAction(OperationTypeEnum.CREATE);
    setUsuarioDialog(true);
  };

  const hideDialog = (updateData?: boolean) => {
    if (updateData) {
      initComponent();
    }
    setUsuario(null);
    setUsuarioDialog(false);
  };

  const editUsuario = (usuario: UsuarioResponse) => {
    setFlagAction(OperationTypeEnum.UPDATE);
    setUsuario({ ...usuario });
    setUsuarioDialog(true);
  };

  const viewUsuario = (usuario: UsuarioResponse) => {
    setFlagAction(OperationTypeEnum.READ);
    setUsuario({ ...usuario });
    setUsuarioDialog(true);
  };

  const confirmDeleteProduct = (usuario: UsuarioResponse) => {
    confirmDialog({
      message: "¿Esta seguro de eliminar el usuario?",
      header: "CONFIRMACION",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: () => deleteUsuario(usuario),
      reject: () =>
        toast.current?.show({
          severity: "info",
          summary: "Operacion cancelada",
          detail: "Usuario no eliminado",
          life: 3000,
        }),
    });
  };

  const deleteUsuario = (usuario: UsuarioResponse) => {
    //TODO add deleteUsuario hook
    toast.current?.show({
      severity: "success",
      summary: "Exitoso",
      detail: "Usuario Eliminado",
      life: 3000,
    });
    initComponent();
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Export"
        icon="pi pi-upload"
        className="p-button-help"
        onClick={exportCSV}
      />
    );
  };

  const actionBodyTemplate = (rowData: UsuarioResponse) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editUsuario(rowData)}
        />
        <Button
          icon="pi pi-eye"
          rounded
          outlined
          className="mr-2"
          onClick={() => viewUsuario(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 items-center justify-between">
      <h4 className="m-0">Manage Usuarios</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          placeholder="Search..."
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            setGlobalFilter(target.value);
          }}
        />
      </IconField>
    </div>
  );

  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="card">
        <Toolbar
          className="mb-4"
          start={leftToolbarTemplate}
          end={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={usuarios}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
        >
          <Column
            field="nombres"
            header="Nombres"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="apellidos"
            header="Apellidos"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="correo"
            header="Correo"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="telefono"
            header="Telefono"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="dni"
            header="Documento Identidad"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={usuarioDialog}
        style={{ width: "32rem" }}
        header="Usuarios Dialog"
        modal
        className="p-fluid"
        onHide={hideDialog}
      >
        {flagAction == OperationTypeEnum.READ && (
          <UsuariosView usuario={usuario} hideDialog={hideDialog} />
        )}
        {[OperationTypeEnum.CREATE, OperationTypeEnum.UPDATE].includes(
          flagAction
        ) && (
          <UsuariosForm
            usuario={usuario}
            hideDialog={hideDialog}
            flagAction={flagAction}
            toast={toast}
          />
        )}
      </Dialog>
    </div>
  );
}
