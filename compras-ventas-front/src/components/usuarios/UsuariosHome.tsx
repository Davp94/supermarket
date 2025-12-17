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
import { UsuarioResponse } from "@/types/response/usuarios.response";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { OperationTypeEnum } from "@/constant/operation.enum";
import UsuariosView from "./UsuariosView";
import FullPageLayout from "@/app/(full-page)/layout";
import UsuariosForm from "./UsuariosForm";
import { useUsuarios } from "@/hooks/useUsuario";

export default function UsuariosHome() {
  const [usuarios, setUsuarios] = useState<UsuarioResponse[] | undefined>([]);
  const [usuarioDialog, setUsuarioDialog] = useState<boolean>(false);
  const [usuario, setUsuario] = useState<UsuarioResponse | null>(null);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [flagAction, setFlagAction] = useState<number>(0);
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<UsuarioResponse[]>>(null);


  const {getUsuarios, deleteUsuario} = useUsuarios();
  const initComponent = async () => {
    const usuariosResponse = await getUsuarios();
    setUsuarios(usuariosResponse);
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
      accept: () => deleteUser(usuario),
      reject: () =>
        toast.current?.show({
          severity: "info",
          summary: "Operacion cancelada",
          detail: "Usuario no eliminado",
          life: 3000,
        }),
    });
  };

  const deleteUser = (usuario: UsuarioResponse) => {
    deleteUsuario(usuario.id != null ? usuario.id : 0);
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
