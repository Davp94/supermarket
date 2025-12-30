"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { NotasResponse } from "@/types/response/notas.response";


export default function NotasHome() {
  const [notas, setNotas] = useState<NotasResponse[]>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<NotasResponse[]>>(null);
  const router = useRouter();

  // TODO: Reemplazar con tu hook personalizado useNotas
  // const { getNotas } = useNotas();

  const initComponent = async () => {
    // TODO: Implementar la llamada real a tu API
    // const notasResponse = await getNotas();
    // setNotas(notasResponse);
    
    // Datos de ejemplo (eliminar cuando implementes la API real)
    const notasEjemplo: NotasResponse[] = [
      {
        id: 1,
        fechaRegistro: "2024-01-15",
        observacion: "Nota de prueba 1",
        tipoNota: "Compra",
        totalCalculado: 150.50,
        descuento: 10.00
      },
      {
        id: 2,
        fechaRegistro: "2024-01-16",
        observacion: "Nota de prueba 2",
        tipoNota: "Venta",
        totalCalculado: 200.00,
        descuento: 5.00
      }
    ];
    setNotas(notasEjemplo);
  };

  useEffect(() => {
    initComponent();
  }, []);

  const openNew = () => {
    router.push("/nueva-nota");
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

  const formatCurrency = (value: number) => {
    return value.toLocaleString("es-BO", {
      style: "currency",
      currency: "BOB"
    });
  };

  const totalCalculadoBodyTemplate = (rowData: NotasResponse) => {
    return formatCurrency(rowData.totalCalculado);
  };

  const descuentoBodyTemplate = (rowData: NotasResponse) => {
    return formatCurrency(rowData.descuento);
  };

  const header = (
    <div className="flex flex-wrap gap-2 items-center justify-between">
      <h4 className="m-0">Gestión de Notas</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          placeholder="Buscar..."
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
      <div className="card">
        <Toolbar
          className="mb-4"
          start={leftToolbarTemplate}
          end={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={notas}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} notas"
          globalFilter={globalFilter}
          header={header}
        >
          <Column
            field="id"
            header="ID"
            sortable
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            field="fechaRegistro"
            header="Fecha Registro"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="tipoNota"
            header="Tipo Nota"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="observacion"
            header="Observación"
            sortable
            style={{ minWidth: "20rem" }}
          ></Column>
          <Column
            field="totalCalculado"
            header="Total Calculado"
            body={totalCalculadoBodyTemplate}
            sortable
            style={{ minWidth: "14rem" }}
          ></Column>
          <Column
            field="descuento"
            header="Descuento"
            body={descuentoBodyTemplate}
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}