import { useInventario } from "@/hooks/useInventario";
import { ProductosResponse } from "@/types/response/ProductosResponse";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Card } from "primereact/card";
import InputController from "../common/input.controller";

export default function NotasForm() {
  const [tipo, setTipo] = useState<string[]>(["COMPRA", "VENTA"]);
  const [productos, setProductos] = useState<ProductosResponse[] | undefined>(
    []
  );
  const [filteredProductos, setFilteredProductos] = useState<
    ProductosResponse[] | undefined
  >([]);
  const [clientes, setClientes] = useState([]);
  const router = useRouter();
  const toast = useRef<Toast>(null);
  //TODO add useNota hook
  const { getProductosAlmacen } = useInventario();
  const user = Cookies.get("identifier");

  const {
    control,
    formState: { errors },
    reset,
    setValue,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      tipoNota: "COMPRA",
      descuento: 0,
      totalCalculado: 0,
      observacion: "",
      usuarioId: 0,
      clienteId: 0,
      movimientos: [
        {
          cantidad: 0,
          precioUnitario: 0,
          observacion: "",
          tipoMovimiento: "",
          productoId: 0,
          almacenId: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "movimientos",
  });

  const watchMovimientos = watch("movimientos");
  const watchDescuento = watch("descuento");

  const initForm = async () => {
    const productosRetrieved = await getProductosAlmacen(1);
    setProductos(productosRetrieved);
    const clientesRetrieved = await [];
  };

  const searchProducto = (event: any) => {
    const query = event.query.toLowerCase();
    const filtered = productos?.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(query) ||
        producto.codigoBarra.toLowerCase().includes(query)
    );
    setFilteredProductos(filtered);
  };

  const onProductoSelect = () => {};

  const calculateTotal = () => {};

  const calculateTotalGlobal = () => {};

  const addMovimiento = () => {
    append({
      cantidad: 0,
      precioUnitario: 0,
      observacion: "",
      tipoMovimiento: "",
      productoId: 0,
      almacenId: 0,
    });
  };

  const removeMovimiento = (index: number) => {
    remove(index);
    calculateTotalGlobal();
  };

  const onSubmit = async () => {

    //generate PDF
  };

  useEffect(() => {
    initForm();
  }, []);

  useEffect(() => {
    calculateTotalGlobal();
  }, [watchMovimientos, watchDescuento]);

  return (
  <>
    <Toast ref={toast}/>
    <div>
        <div>
            <h1>Crear Nota</h1>
            <p>Creacion de Notas de compras ventas</p>
        </div>
        <form>
            <Card title="Informacion de la Nota">
                <div>
                    <Controller/>
                    <InputController/>
                </div>
            </Card>
        </form>
    </div>
  </>);
}
