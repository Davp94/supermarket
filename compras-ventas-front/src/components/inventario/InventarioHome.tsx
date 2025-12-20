import { OperationTypeEnum } from "@/constant/operation.enum";
import { AlmacenResponse } from "@/types/response/almacen.response";
import { ProductosResponse } from "@/types/response/ProductosResponse";
import { SucursalResponse } from "@/types/response/sucursal.response";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTablePageEvent, DataTableSortEvent } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React from "react";
import { useEffect, useRef, useState } from "react";

export default function InventarioHome() {
  const [productos, setProductos] = useState<ProductosResponse[]>();
  const [sucursales, setSucursales] = useState<SucursalResponse[]>();
  const [almacenes, setAlmacenes] = useState<AlmacenResponse[]>();
  const [productoDialog, setProductoDialog] = useState<boolean>(false);

  const [selectedSucursal, setSelectedSucursal] =
    useState<SucursalResponse | null>(null);
  const [selectedAlmacen, setSelectedAlmacen] =
    useState<AlmacenResponse | null>(null);

  const router = useRouter();
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [flagAction, setFlagAction] = useState<number>(0);
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<any[]>>(null);

  const [lazyState, setLazyState] = useState({
    pageNumber: 1,
    pageSize: 10,
    sortField: "",
    sortOrder: "ASC" as "ASC" | "DESC",
  });

  //TODO add inventario services

  const initComponent = async () => {
    try {
      const sucursalesRetrieved = await [];
      setSucursales(sucursalesRetrieved);
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Error al obtener sucursales",
        life: 3000,
      });
    }
  };

  useEffect(() => {
    initComponent();
  }, []);

  const getAlmacenes = async () => {
    if (selectedSucursal?.id) {
      try {
        const almacenesRetrieved = await [];
        setAlmacenes(almacenesRetrieved);
      } catch (error) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error al obtener almacenes",
          life: 3000,
        });
      }
    }
  };

  useEffect(() => {
    getAlmacenes();
  }, [selectedSucursal]);

  useEffect(() => {
    const getProductos = async () => {
      if (selectedAlmacen?.id) {
        try {
          // const productosRetrieved = await getProductosPaginacion({
          //   ...lazyState,
          //   filterValue: globalFilter || null,
          //   almacenId: selectedAlmacen.id,
          // });
          //setProductos(productosRetrieved.content);
        } catch (error) {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: "Error al obtener productos",
            life: 3000,
          });
        }
      }
    };
    getProductos();
  }, [selectedAlmacen, lazyState, globalFilter]);

  const onPageChange = (event: DataTablePageEvent) => {
    setLazyState({
      ...lazyState,
      pageNumber: event.page ? event.page + 1 : 1,
      pageSize: event.rows,
    });
  };

  const onSort = (event: DataTableSortEvent) => {
    setLazyState({
      ...lazyState,
      sortField: event.sortField,
      sortOrder: event.sortOrder === 1 ? 'ASC' : 'DESC'
    });
  }

  const openNew = () => {
    setFlagAction(OperationTypeEnum.CREATE);
    setProductoDialog(true);
  }

  const hideDialog = (updateData?: boolean) => {
    if(updateData){
        initComponent();
    }
    setProductoDialog(false);
  }

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
          <Button
            label="Stock"
            icon="pi pi-plus"
            severity="info"
            onClick={() => router.push(`nueva-nota?tipo=COMPRA&almacenId=${selectedAlmacen?.id}`)}
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
    
      const actionBodyTemplate = (rowData: ProductosResponse) => {
        return (
          <React.Fragment>
            <Button
              icon="pi pi-pencil"
              rounded
              outlined
              className="mr-2"
              onClick={() => console.log("")}
            />
            <Button
              icon="pi pi-eye"
              rounded
              outlined
              className="mr-2"
              onClick={() => console.log("")}
            />
            <Button
              icon="pi pi-trash"
              rounded
              outlined
              severity="danger"
              onClick={() => console.log("")}
            />
          </React.Fragment>
        );
      };
  const header = (
    <div className="flex flex-wrap gap-2 items-center justify-between">
      <h4 className="m-0">Manage INventario</h4>
      <Dropdown
        value={selectedSucursal}
        onChange={(e)=>setSelectedSucursal(e.value)}
        options={sucursales}
        optionLabel="nombre"
        placeholder="Seleccine la sucursal"
      />
      <Dropdown
        value={selectedAlmacen}
        onChange={(e)=>setSelectedAlmacen(e.value)}
        options={almacenes}
        optionLabel="nombre"
        placeholder="Seleccine un almacen"
      />
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

  return (<>
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
            value={productos}
            dataKey="id"
            paginator
            rows={lazyState.pageSize}
            rowsPerPageOptions={[10, 20, 50]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            globalFilter={globalFilter}
            header={header}
            lazy
            totalRecords={0}
            onPage={onPageChange}
            onSort={onSort}
            sortField={lazyState.sortField}
            sortOrder={lazyState.sortOrder === 'ASC' ? 1 : -1}
          >
            <Column
              field="nombre"
              header="NOmbre"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="codigoBarra"
              header="Codigo de barras"
              sortable
              style={{ minWidth: "20rem" }}
            ></Column>
            <Column
              field="marca"
              header="Marca"
              sortable
              style={{ minWidth: "20rem" }}
            ></Column>
            <Column
              field="nombreCategoria"
              header="Categoria"
              sortable
              style={{ minWidth: "20rem" }}
            ></Column>
            <Column
              field="precio"
              header="Precio"
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
          visible={productoDialog}
          style={{ width: "32rem" }}
          header="Producos Almacen Form"
          modal
          className="p-fluid"
          onHide={hideDialog}
        >
          {/* TODO add Productos form */}
        </Dialog>
      </div>
  </>)
}
