import { Document, Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer"

interface PermisosFormProps {
  dataVenta: any
  datosCliente: any;
}
    // Font.register({
    //     family: 'Roboto',
    //     src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf'
    // })
export default function NotaVentaPDF({dataVenta, datosCliente}: PermisosFormProps) {

    const styles = StyleSheet.create({
        page: { padding: 40},
        header: {marginBottom: 20, textAlign: 'center'},
        table: { marginTop: 20, marginBottom: 20},
        tableHeader: { flexDirection: 'row' , backgroundColor: '#f0f0f0f', padding: 8, fontWeight: 'bold'},
        tableRow: {flexDirection: 'row', padding: 8, borderBottom: '1px solid'}
    })
    const date = new Date().toISOString();
    return (
    <>
    <Document>
        <Page size={"LETTER"} style={styles.page}>
            <View>
                <Text>NOTA DE {dataVenta.tipoNota}</Text>
                <Text>Fecha: {date}</Text>
                <Text>CLIENTE: {datosCliente.razonSocial}</Text>
            </View>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text>Cantidad</Text>
                    <Text>Descripcion</Text>
                    <Text>Precio Unitario</Text>
                    <Text>Total</Text>
                </View>
                {dataVenta.movimientos.map((item: any, index: number)=> (
                    <View style={styles.tableRow} key={index}>
                        <Text>{item.cantidad}</Text>
                        <Text>{item.descripcion}</Text>
                        <Text>Bs. {item.precioUnitario}</Text>
                        <Text>Bs. {item.total}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
    </>
    )
}