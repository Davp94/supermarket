"use client";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { OperationTypeEnum } from "@/constant/operation.enum";
import { RolesResponse } from "@/types/response/roles.response";
import { useRoles } from "@/hooks/useRoles";
import RolesView from "./RolesView";
import RolesForm from "./RolesForm";

export default function RolesHome() {
  const [roles, setRoles] = useState<RolesResponse[] | undefined>([]);
  const [rolesDialog, setRolesDialog] = useState<boolean>(false);
  const [rol, setRol] = useState<RolesResponse | null>(null);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [flagAction, setFlagAction] = useState<number>(0);
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<RolesResponse[]>>(null);


  const {getRoles, deleteRol: deleteRolHook} = useRoles();


  const initComponent = async () => {
    const rolesResponse = await getRoles();
    setRoles(rolesResponse);
  };

  useEffect(() => {
    initComponent();
  }, []);

  const openNew = () => {
    setFlagAction(OperationTypeEnum.CREATE);
    setRolesDialog(true);
  };

  const hideDialog = (updateData?: boolean) => {
    if (updateData) {
      initComponent();
    }
    setRol(null);
    setRolesDialog(false);
  };

  const editRol = (rol: RolesResponse) => {
    setFlagAction(OperationTypeEnum.UPDATE);
    setRol({ ...rol });
    setRolesDialog(true);
  };

  const viewRol = (rol: RolesResponse) => {
    setFlagAction(OperationTypeEnum.READ);
    setRol({ ...rol });
    setRolesDialog(true);
  };

  const confirmDeleteRol = (rol: RolesResponse) => {
    confirmDialog({
      message: "¿Esta seguro de eliminar el rol?",
      header: "CONFIRMACION",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: () => deleteRol(rol),
      reject: () =>
        toast.current?.show({
          severity: "info",
          summary: "Operacion cancelada",
          detail: "Rol no eliminado",
          life: 3000,
        }),
    });
  };

  const deleteRol = (rol: RolesResponse) => {
    deleteRolHook(rol.id != null ? rol.id : 0);
    toast.current?.show({
      severity: "success",
      summary: "Exitoso",
      detail: "ROl Eliminado",
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

  const actionBodyTemplate = (rowData: RolesResponse) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editRol(rowData)}
        />
        <Button
          icon="pi pi-eye"
          rounded
          outlined
          className="mr-2"
          onClick={() => viewRol(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteRol(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 items-center justify-between">
      <h4 className="m-0">Manage Roles</h4>
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
          value={roles}
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
            field="nombre"
            header="NOmbre"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="descripcion"
            header="Descripcion"
            sortable
            style={{ minWidth: "20rem" }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={rolesDialog}
        style={{ width: "32rem" }}
        header="Roles Dialog"
        modal
        className="p-fluid"
        onHide={hideDialog}
      >
        {flagAction == OperationTypeEnum.READ && (
          <RolesView rol={rol} hideDialog={hideDialog} />
        )}
        {[OperationTypeEnum.CREATE, OperationTypeEnum.UPDATE].includes(
          flagAction
        ) && (
          <RolesForm
            rolId={rol ? rol.id : null}
            hideDialog={hideDialog}
            flagAction={flagAction}
            toast={toast}
          />
        )}
      </Dialog>
    </div>
  );
}
