//BOTS FORSEG

//Bot FORSEG VENTAS 1
const { createBot, createProvider, createFlow, addKeyword, addAnswer } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
const ExcelJS = require('exceljs');

//Variables para VENTAS 1
var get_nombreV1 = '';
var get_numbV1 = '';
var get_zonaV1 = '';
var get_opcionV1 = '';
var get_rucV1 = '';
var get_soliV1 = '';

//Variables para VENTAS 2
var get_nombreV2 = '';
var get_numbV2 = '';
var get_zonaV2 = '';
var get_opcionV2 = '';
var get_rucV2 = '';
var get_soliV2 = '';

//Variables para VENTAS 3
var get_nombreV3 = '';
var get_numbV3 = '';
var get_zonaV3 = '';
var get_opcionV3 = '';
var get_rucV3 = '';
var get_soliV3 = '';

//Variables para HORACIO
var get_nombreV4 = '';
var get_numbV4 = '';
var get_zonaV4 = '';
var get_opcionV4 = '';
var get_rucV4 = '';
var get_soliV4 = '';

//Variables para SINCHI
var get_nombreV5 = '';
var get_numbV5 = '';
var get_zonaV5 = '';
var get_opcionV5= '';
var get_rucV5 = '';
var get_soliV5 = '';

//Variables para MMP
var get_nombreV6 = '';
var get_numbV6 = '';
var get_zonaV6 = '';
var get_opcionV6= '';
var get_rucV6 = '';
var get_soliV6 = '';

//Variables para CSI
var get_nombreV7 = '';
var get_numbV7 = '';
var get_zonaV7 = '';
var get_opcionV7= '';
var get_rucV7 = '';
var get_soliV7 = '';

//INICIO VENTAS 1
// Función para guardar los datos en un archivo Excel específico para cada número de teléfono
async function VENTAS1(data) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`datosFORSEG1.xlsx`);

    // Define las columnas en el archivo Excel
    worksheet.columns = [
        { header: 'Número', key: 'numero' },
        { header: 'Nombre', key: 'nombre' },
        { header: 'Zona del Peru', key: 'zonaperu' },
        { header: 'Opción', key: 'opcion' },
        { header: 'RUC', key: 'ruc' },
        { header: 'Solicitud', key: 'solicitud' },
    ];

    // Agrega los datos al archivo Excel
    data.forEach((item) => {
        worksheet.addRow({
            nombre: item.nombre,
            numero: item.numero,
            zonaperu: item.zonaperu,
            opcion: item.opcion,
            ruc: item.ruc,
            solicitud: item.solicitud,
        });
    });

    // Guarda el archivo Excel en el sistema de archivos
    const fileName = `datosFORSEG1.xlsx`;
    await workbook.xlsx.writeFile(fileName);

    console.log(`Datos guardados en ${fileName}`);
}

// Array para almacenar los datos recopilados
const datosRecopiladosV1 = [];


//Despedida del bot e ingresar datos a un excel
const flowDespedidaV1 = addKeyword([get_soliV1])
    .addAnswer('Revisando *stock disponible y las mejores ofertas para usted*, en breve le confirmare!🤖')
    .addAction(() => {
        // Llama a la función para guardar los datos en Excel específico para el número de teléfono del usuario cuando termina el flujo de despedida
        VENTAS1(datosRecopiladosV1, get_numbV1);
    })
    .addAnswer(['Para poder darte un servicio cada vez mejor y atenderte de acuerdo a tus necesidades, por favor, cuéntanos tu experiencia', 'https://forms.gle/eeNZVRQGKVNEhgYr6'], {
        delay: 5000
    })

//Opciones del menu
const flowPedidosV1 = addKeyword(['2'])
    .addAnswer(['¿Qué productos de EPPs, señalización requiere?', 'Escriba el producto y la cantidad deseada en un solo mensaje (Si tiene una Marca | Talla | Modelo no dudes en enviarlo)','Si es muy amable de enviar una imagen'], { capture: true }, (solicitud) => {
        console.log("El cliente solicita:", solicitud.body)
        addAnswer('Anotado')
        get_soliV1 = solicitud.body

        //Guardar datos
        datosRecopiladosV1.push({
            nombre: get_nombreV1,
            numero: get_numbV1,
            zonaperu: get_zonaV1,
            opcion: get_opcionV1,
            ruc: get_rucV1,
            solicitud: get_soliV1,
        });
    }, flowDespedidaV1);

const flowCotizacionV1 = addKeyword(['1'])
    .addAnswer(['¿Qué productos desea que le cotize?', 'Escriba el producto, cantidad, tallas y si es muy amable una imagen de referencia'], { capture: true }, (solicitud) => {
        console.log('El cliente', get_nombreV1, 'solicita lo siguiente:', solicitud.body);
        addAnswer('Anotado');
        get_soliV1 = solicitud.body

        //Guardar datos
        datosRecopiladosV1.push({
            nombre: get_nombreV1,
            numero: get_numbV1,
            zonaperu: get_zonaV1,
            opcion: get_opcionV1,
            ruc: get_rucV1,
            solicitud: get_soliV1,
        });
    }, flowDespedidaV1);

const flowSolicitudV1 = addKeyword(['3'])
    .addAnswer(['¿En qué necesita asesoramiento?','En breve lo estaremos atendiendo','Si es muy amable de enviar una imagen'], { capture: true }, (solicitud) => {
        console.log('Consulta de', get_nombreV1, '|', solicitud.body)
        get_soliV1 = solicitud.body

        //Guardar datos
        datosRecopiladosV1.push({
            nombre: get_nombreV1,
            numero: get_numbV1,
            zonaperu: get_zonaV1,
            opcion: get_opcionV1,
            ruc: get_rucV1,
            solicitud: get_soliV1,
        });
    }, flowDespedidaV1);

const flowServicioV1 = addKeyword(['4'])
    .addAnswer(['¿En donde le mandamos nuestras muestras?', 'En breve lo estaremos atendiendo','Si es muy amable de enviar una imagen'], { capture: true }, (solicitud) => {
        console.log('Pedido de Servicio al cliente de', get_nombreV1, '|', solicitud.body);
        get_soliV1 = solicitud.body
        //Guardar datos
        datosRecopiladosV1.push({
            nombre: get_nombreV1,
            numero: get_numbV1,
            zonaperu: get_zonaV1,
            opcion: get_opcionV1,
            ruc: get_rucV1,
            solicitud: get_soliV1,
        });
    }, flowDespedidaV1);

const flowOtrosV1 = addKeyword(['5'])
    .addAnswer(['¿Qué necesita?', 'En breve lo estaremos atendiendo'], { capture: true }, (solicitud) => {
        console.log('Otros:', get_nombreV1, '|', solicitud.body)
        get_soliV1 = solicitud.body
        //Guardar datos
        datosRecopiladosV1.push({
            nombre: get_nombreV1,
            numero: get_numbV1,
            zonaperu: get_zonaV1,
            opcion: get_opcionV1,
            ruc: get_rucV1,
            solicitud: get_soliV1,
        });
    }, flowDespedidaV1);


// Menu
const flowMenuV1 = addKeyword(get_zonaV1)
    .addAnswer(
        ['¿Cómo podemos ayudarte?', '👉 1️⃣ Deseo cotizar', '👉 2️⃣ Quiero productos de EPPs y señalización ', '👉 3️⃣ Necesito asesoria tecnica en caracteristicas, especificaciones y uso de EPPs', '👉 4️⃣ Requiero una presentación de muestras en mi centro comercial', '👉 5️⃣ Otros', 'Escribe la opción que deseas✍️'],
        { capture: true },
        (opciones, { fallBack }) => {
            if (!['1', '2', '3', '4', '5'].includes(opciones.body)) {
                return fallBack();
            }
            console.log('Opción del cliente:', opciones.body)
            get_opcionV1 = opciones.body
        },
        [flowCotizacionV1, flowPedidosV1, flowSolicitudV1, flowServicioV1, flowOtrosV1] // Agrega el flujo de volver a pedidos
    );

// Saludo, Captura de datos del cliente
const flowPrincipalV1 = addKeyword(['Hola quisiera mas información'])
    .addAnswer('Bienvenid@ a *FORSEG PEDIDO NORTE*!🧡🦺🛠 Soy 🤖 tu asesor virtual.')
    .addAnswer('¿Con quien tenemos el gusto?', { capture: true }, (datos, { fallBack }) => {
        if (datos.body.length <= 1) {
            return fallBack()
        } else {
            console.log("Datos del cliente:", datos.body, datos.from)
            get_nombreV1 = datos.body;
            get_numbV1 = datos.from;
        }
    })
    .addAnswer(['¿Con que RUC lo registramos / Cotizamos?','Si cuenta con RUC 10 ingrese su *Domicio Fiscal*'], { capture: true }, (ruc, { fallBack }) => {
        if (ruc.body.length < 8) {
            return fallBack()
        } else {
            console.log("RUC del cliente:", ruc.body);
            get_rucV1 = ruc.body;
        }
        // Agrega los datos al array cuando se recopila el RUC
    })
    .addAnswer(['¿En que zona de Lima le llevamos | provincia le enviamos el pedido?'], { capture: true }, (zona) => {
        if (zona.body.length < 1) {
            return fallBack()
        } else {
            console.log('ZONA DE LIMA | PROVINCIA:', zona.body);
            get_zonaV1 = zona.body;
        }
    }, flowMenuV1)

//FIN VENTAS 1
//.........//
//INICIO VENTAS 2
async function VENTAS2(data) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`datosFORSEG2.xlsx`);

    // Define las columnas en el archivo Excel
    worksheet.columns = [
        { header: 'Número', key: 'numero' },
        { header: 'Nombre', key: 'nombre' },
        { header: 'Zona del Peru', key: 'zonaperu' },
        { header: 'Opción', key: 'opcion' },
        { header: 'RUC', key: 'ruc' },
        { header: 'Solicitud', key: 'solicitud' },
    ];

    // Agrega los datos al archivo Excel
    data.forEach((item) => {
        worksheet.addRow({
            nombre: item.nombre,
            numero: item.numero,
            zonaperu: item.zonaperu,
            opcion: item.opcion,
            ruc: item.ruc,
            solicitud: item.solicitud,
        });
    });

    // Guarda el archivo Excel en el sistema de archivos
    const fileName = `datosFORSEG2.xlsx`;
    await workbook.xlsx.writeFile(fileName);

    console.log(`Datos guardados en ${fileName}`);
}

// Array para almacenar los datos recopilados
const datosRecopiladosV2 = [];


//Despedida del bot e ingresar datos a un excel
const flowDespedidaV2 = addKeyword([get_soliV2])
    .addAnswer('Revisando *stock disponible y las mejores ofertas para usted*, en breve le confirmare🤖')
    .addAction(() => {
        // Llama a la función para guardar los datos en Excel específico para el número de teléfono del usuario cuando termina el flujo de despedida
        VENTAS2(datosRecopiladosV2, get_numbV2);
    })
    .addAnswer(['Para poder darte un servicio cada vez mejor y atenderte de acuerdo a tus necesidades, por favor, cuéntanos tu experiencia', 'https://forms.gle/eeNZVRQGKVNEhgYr6'], {
        delay: 5000
    })

//Opciones del menu
const flowPedidosV2 = addKeyword(['2'])
    .addAnswer(['¿Qué productos de EPPs, señalización requiere?', 'Escriba el producto y la cantidad deseada en un solo mensaje (Si tiene una Marca | Talla | Modelo no dudes en enviarlo)','Si es muy amable de enviar una imagen'], { capture: true }, (solicitud) => {
        console.log("El cliente solicita:", solicitud.body)
        addAnswer('Anotado')
        get_soliV2 = solicitud.body

        //Guardar datos
        datosRecopiladosV2.push({
            nombre: get_nombreV2,
            numero: get_numbV2,
            zonaperu: get_zonaV2,
            opcion: get_opcionV2,
            ruc: get_rucV2,
            solicitud: get_soliV2,
        });
    }, flowDespedidaV2);

const flowCotizacionV2 = addKeyword(['1'])
    .addAnswer(['¿Qué productos desea que le cotize?', 'Escriba el producto, cantidad, tallas y si es muy amable una imagen de referencia'], { capture: true }, (solicitud) => {
        console.log('El cliente', get_nombreV2, 'solicita lo siguiente:', solicitud.body);
        addAnswer('Anotado');
        get_soliV2 = solicitud.body

        //Guardar datos
        datosRecopiladosV2.push({
            nombre: get_nombreV2,
            numero: get_numbV2,
            zonaperu: get_zonaV2,
            opcion: get_opcionV2,
            ruc: get_rucV2,
            solicitud: get_soliV2,
        });
    }, flowDespedidaV2);

const flowSolicitudV2 = addKeyword(['3'])
    .addAnswer(['¿En qué necesita asesoramiento?','En breve lo estaremos atendiendo','Si es muy amable de enviar una imagen'], { capture: true }, (solicitud) => {
        console.log('Consulta de', get_nombreV2, '|', solicitud.body)
        get_soliV2 = solicitud.body

        //Guardar datos
        datosRecopiladosV2.push({
            nombre: get_nombreV2,
            numero: get_numbV2,
            zonaperu: get_zonaV2,
            opcion: get_opcionV2,
            ruc: get_rucV2,
            solicitud: get_soliV2,
        });
    }, flowDespedidaV2);

const flowServicioV2 = addKeyword(['4'])
    .addAnswer(['¿En donde le mandamos nuestras muestras?', 'En breve lo estaremos atendiendo','Si es muy amable de enviar una imagen'], { capture: true }, (solicitud) => {
        console.log('Pedido de Servicio al cliente de', get_nombreV2, '|', solicitud.body);
        get_soliV2 = solicitud.body
        //Guardar datos
        datosRecopiladosV2.push({
            nombre: get_nombreV2,
            numero: get_numbV2,
            zonaperu: get_zonaV2,
            opcion: get_opcionV2,
            ruc: get_rucV2,
            solicitud: get_soliV2,
        });
    }, flowDespedidaV2);

const flowOtrosV2 = addKeyword(['5'])
    .addAnswer(['¿Qué necesita?', 'En breve lo estaremos atendiendo'], { capture: true }, (solicitud) => {
        console.log('Otros:', get_nombreV2, '|', solicitud.body)
        get_soliV2 = solicitud.body
        //Guardar datos
        datosRecopiladosV2.push({
            nombre: get_nombreV2,
            numero: get_numbV2,
            zonaperu: get_zonaV2,
            opcion: get_opcionV2,
            ruc: get_rucV2,
            solicitud: get_soliV2,
        });
    }, flowDespedidaV2);


// Menu
const flowMenuV2 = addKeyword(get_zonaV2)
    .addAnswer(
        ['¿Cómo podemos ayudarte?', '👉 1️⃣ Deseo cotizar', '👉 2️⃣ Quiero productos de EPPs y señalización ', '👉 3️⃣ Necesito asesoria tecnica en caracteristicas, especificaciones y uso de EPPs', '👉 4️⃣ Requiero una presentación de muestras en mi centro comercial', '👉 5️⃣ Otros', 'Escribe la opción que deseas✍️'],
        { capture: true },
        (opciones, { fallBack }) => {
            if (!['1', '2', '3', '4', '5'].includes(opciones.body)) {
                return fallBack();
            }
            console.log('Opción del cliente:', opciones.body)
            get_opcionV2 = opciones.body
        },
        [flowCotizacionV2, flowPedidosV2, flowSolicitudV2, flowServicioV2, flowOtrosV2] // Agrega el flujo de volver a pedidos
    );

// Saludo, Captura de datos del cliente
const flowPrincipalV2 = addKeyword(['Hola quisiera mas información'])
    .addAnswer('Bienvenid@ a *FORSEG PEDIDO SUR*!🧡🦺🛠 Soy 🤖 tu asesor virtual.')
    .addAnswer('¿Con quien tenemos el gusto?', { capture: true }, (datos, { fallBack }) => {
        if (datos.body.length <= 1) {
            return fallBack()
        } else {
            console.log("Datos del cliente:", datos.body, datos.from)
            get_nombreV2 = datos.body;
            get_numbV2 = datos.from;
        }
    })
    .addAnswer(['¿Con que RUC lo registramos / Cotizamos?','Si cuenta con RUC 10 ingrese su *Domicio Fiscal*'], { capture: true }, (ruc, { fallBack }) => {
        if (ruc.body.length < 8) {
            return fallBack()
        } else {
            console.log("RUC del cliente:", ruc.body);
            get_rucV2 = ruc.body;
        }
        // Agrega los datos al array cuando se recopila el RUC
    })
    .addAnswer(['¿En que zona de Lima le llevamos| provincia le enviamos el pedido?'], { capture: true }, (zona) => {
        if (zona.body.length < 1) {
            return fallBack()
        } else {
            console.log('ZONA DE LIMA | PROVINCIA:', zona.body);
            get_zonaV2 = zona.body;
        }
    }, flowMenuV2)

//FIN VENTAS 2
//.........//
//INICIO VENTAS 3
async function VENTAS3(data) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`datosFORSEG3.xlsx`);

    // Define las columnas en el archivo Excel
    worksheet.columns = [
        { header: 'Número', key: 'numero' },
        { header: 'Nombre', key: 'nombre' },
        { header: 'Zona del Peru', key: 'zonaperu' },
        { header: 'Opción', key: 'opcion' },
        { header: 'RUC', key: 'ruc' },
        { header: 'Solicitud', key: 'solicitud' },
    ];

    // Agrega los datos al archivo Excel
    data.forEach((item) => {
        worksheet.addRow({
            nombre: item.nombre,
            numero: item.numero,
            zonaperu: item.zonaperu,
            opcion: item.opcion,
            ruc: item.ruc,
            solicitud: item.solicitud,
        });
    });

    // Guarda el archivo Excel en el sistema de archivos
    const fileName = `datosFORSEG3.xlsx`;
    await workbook.xlsx.writeFile(fileName);

    console.log(`Datos guardados en ${fileName}`);
}

// Array para almacenar los datos recopilados
const datosRecopiladosV3 = [];


//Despedida del bot e ingresar datos a un excel
const flowDespedidaV3 = addKeyword([get_soliV3])
    .addAnswer('Revisando *stock disponible y las mejores ofertas para usted*, en breve le confirmare🤖')
    .addAction(() => {
        // Llama a la función para guardar los datos en Excel específico para el número de teléfono del usuario cuando termina el flujo de despedida
        VENTAS3(datosRecopiladosV3, get_numbV3);
    })
    .addAnswer(['Para poder darte un servicio cada vez mejor y atenderte de acuerdo a tus necesidades, por favor, cuéntanos tu experiencia', 'https://forms.gle/eeNZVRQGKVNEhgYr6'], {
        delay: 5000
    })

//Opciones del menu
const flowPedidosV3 = addKeyword(['2'])
    .addAnswer(['¿Qué productos de EPPs, señalización requiere?', 'Escriba el producto y la cantidad deseada en un solo mensaje (Si tiene una Marca | Talla | Modelo no dudes en enviarlo)','Si es muy amable de enviar una imagen'], { capture: true }, (solicitud) => {
        console.log("El cliente solicita:", solicitud.body)
        addAnswer('Anotado')
        get_soliV3 = solicitud.body

        //Guardar datos
        datosRecopiladosV3.push({
            nombre: get_nombreV3,
            numero: get_numbV3,
            zonaperu: get_zonaV3,
            opcion: get_opcionV3,
            ruc: get_rucV3,
            solicitud: get_soliV3,
        });
    }, flowDespedidaV3);

const flowCotizacionV3 = addKeyword(['1'])
    .addAnswer(['¿Qué productos desea que le cotize?', 'Escriba el producto, cantidad, tallas y si es muy amable una imagen de referencia'], { capture: true }, (solicitud) => {
        console.log('El cliente', get_nombreV3, 'solicita lo siguiente:', solicitud.body);
        addAnswer('Anotado');
        get_soliV3 = solicitud.body

        //Guardar datos
        datosRecopiladosV3.push({
            nombre: get_nombreV3,
            numero: get_numbV3,
            zonaperu: get_zonaV3,
            opcion: get_opcionV3,
            ruc: get_rucV3,
            solicitud: get_soliV3,
        });
    }, flowDespedidaV3);

const flowSolicitudV3 = addKeyword(['3'])
    .addAnswer(['¿En qué necesita asesoramiento?','En breve lo estaremos atendiendo','Si es muy amable de enviar una imagen'], { capture: true }, (solicitud) => {
        console.log('Consulta de', get_nombreV3, '|', solicitud.body)
        get_soliV3 = solicitud.body

        //Guardar datos
        datosRecopiladosV3.push({
            nombre: get_nombreV3,
            numero: get_numbV3,
            zonaperu: get_zonaV3,
            opcion: get_opcionV3,
            ruc: get_rucV3,
            solicitud: get_soliV3,
        });
    }, flowDespedidaV3);

const flowServicioV3 = addKeyword(['4'])
    .addAnswer(['¿En donde le mandamos nuestras muestras?', 'En breve lo estaremos atendiendo','Si es muy amable de enviar una imagen'], { capture: true }, (solicitud) => {
        console.log('Pedido de Servicio al cliente de', get_nombreV3, '|', solicitud.body);
        get_soliV3 = solicitud.body
        //Guardar datos
        datosRecopiladosV3.push({
            nombre: get_nombreV3,
            numero: get_numbV3,
            zonaperu: get_zonaV3,
            opcion: get_opcionV3,
            ruc: get_rucV3,
            solicitud: get_soliV3,
        });
    }, flowDespedidaV3);

const flowOtrosV3 = addKeyword(['5'])
    .addAnswer(['¿Qué necesita?', 'En breve lo estaremos atendiendo'], { capture: true }, (solicitud) => {
        console.log('Otros:', get_nombreV3, '|', solicitud.body)
        get_soliV3 = solicitud.body
        //Guardar datos
        datosRecopiladosV3.push({
            nombre: get_nombreV3,
            numero: get_numbV3,
            zonaperu: get_zonaV3,
            opcion: get_opcionV3,
            ruc: get_rucV3,
            solicitud: get_soliV3,
        });
    }, flowDespedidaV3);


// Menu
const flowMenuV3 = addKeyword(get_zonaV3)
    .addAnswer(
        ['¿Cómo podemos ayudarte?', '👉 1️⃣ Deseo cotizar', '👉 2️⃣ Quiero productos de EPPs y señalización ', '👉 3️⃣ Necesito asesoria tecnica en caracteristicas, especificaciones y uso de EPPs', '👉 4️⃣ Requiero una presentación de muestras en mi centro comercial', '👉 5️⃣ Otros', 'Escribe la opción que deseas✍️'],
        { capture: true },
        (opciones, { fallBack }) => {
            if (!['1', '2', '3', '4', '5'].includes(opciones.body)) {
                return fallBack();
            }
            console.log('Opción del cliente:', opciones.body)
            get_opcionV3 = opciones.body
        },
        [flowCotizacionV3, flowPedidosV3, flowSolicitudV3, flowServicioV3, flowOtrosV3] // Agrega el flujo de volver a pedidos
    );

// Saludo, Captura de datos del cliente
const flowPrincipalV3 = addKeyword(['Hola quisiera mas información'])
    .addAnswer('Bienvenid@ a *FORSEG PEDIDO LIMA / CENTRO ORIENTE*!🧡🦺🛠 Soy 🤖 tu asesor virtual.')
    .addAnswer('¿Con quien tenemos el gusto?', { capture: true }, (datos, { fallBack }) => {
        if (datos.body.length <= 1) {
            return fallBack()
        } else {
            console.log("Datos del cliente:", datos.body, datos.from)
            get_nombreV3 = datos.body;
            get_numbV3 = datos.from;
        }
    })
    .addAnswer(['¿Con que RUC lo registramos / Cotizamos?','Si cuenta con RUC 10 ingrese su *Domicio Fiscal*'], { capture: true }, (ruc, { fallBack }) => {
        if (ruc.body.length < 8) {
            return fallBack()
        } else {
            console.log("RUC del cliente:", ruc.body);
            get_rucV3 = ruc.body;
        }
        // Agrega los datos al array cuando se recopila el RUC
    })
    .addAnswer(['¿En que zona de Lima le llevamos | provincia le enviamos el pedido?'], { capture: true }, (zona) => {
        if (zona.body.length < 1) {
            return fallBack()
        } else {
            console.log('ZONA DE LIMA | PROVINCIA:', zona.body);
            get_zonaV3 = zona.body;
        }
    }, flowMenuV3)

//FIN VENTAS 3
//.........//
//INICIO HORACIO
// Función para guardar los datos en un archivo Excel específico para cada número de teléfono
async function HORACIO(data) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`datosHORACIO.xlsx`);

    // Define las columnas en el archivo Excel
    worksheet.columns = [
        { header: 'Número', key: 'numero' },
        { header: 'Nombre', key: 'nombre' },
        { header: 'Zona del Peru', key: 'zonaperu' },
        { header: 'Opción', key: 'opcion' },
        { header: 'RUC', key: 'ruc' },
        { header: 'Solicitud', key: 'solicitud' },
    ];

    // Agrega los datos al archivo Excel
    data.forEach((item) => {
        worksheet.addRow({
            nombre: item.nombre,
            numero: item.numero,
            zonaperu: item.zonaperu,
            opcion: item.opcion,
            ruc: item.ruc,
            solicitud: item.solicitud,
        });
    });

    // Guarda el archivo Excel en el sistema de archivos
    const fileName = `datosHORACIO.xlsx`;
    await workbook.xlsx.writeFile(fileName);

    console.log(`Datos guardados en ${fileName}`);
}

// Array para almacenar los datos recopilados
const datosRecopiladosV4 = [];


const flowDespedidaV4 = addKeyword([get_soliV4])
    .addAnswer('Revisando *stock disponible y las mejores ofertas para usted*, en breve le confirmare🤖')
    .addAction(() => {
        // Llama a la función para guardar los datos en Excel específico para el número de teléfono del usuario cuando termina el flujo de despedida
        HORACIO(datosRecopiladosV4, get_numbV4);
    })
    .addAnswer(['Para poder darte un servicio cada vez mejor y atenderte de acuerdo a tus necesidades, por favor, cuéntanos tu experiencia', 'https://forms.gle/eeNZVRQGKVNEhgYr6'], {
        delay: 5000
    })



//Opciones del menu
const flowPedidosV4 = addKeyword(['2'])
    .addAnswer(['¿Qué productos de EPPs, señalización requiere?', 'Escriba el producto y la cantidad deseada en un solo mensaje (Si tiene una Marca | Talla | Modelo no dudes en enviarlo)','Si es muy amable de enviar una imagen'], { capture: true }, (solicitud) => {
        console.log("El cliente solicita:", solicitud.body)
        addAnswer('Anotado')
        get_soliV4 = solicitud.body

        //Guardar datos
        datosRecopiladosV4.push({
            nombre: get_nombreV4,
            numero: get_numbV4,
            zonaperu: get_zonaV4,
            opcion: get_opcionV4,
            ruc: get_rucV4,
            solicitud: get_soliV4,
        });
    }, flowDespedidaV4);

const flowCotizacionV4 = addKeyword(['1'])
    .addAnswer(['¿Qué productos desea que le cotize?', 'Escriba el producto, cantidad, tallas y si es muy amable una imagen de referencia'], { capture: true }, (solicitud) => {
        console.log('El cliente', get_nombreV4, 'solicita lo siguiente:', solicitud.body);
        addAnswer('Anotado');
        get_soliV4 = solicitud.body

        //Guardar datos
        datosRecopiladosV4.push({
            nombre: get_nombreV4,
            numero: get_numbV4,
            zonaperu: get_zonaV4,
            opcion: get_opcionV4,
            ruc: get_rucV4,
            solicitud: get_soliV4,
        });
    }, flowDespedidaV4);

const flowSolicitudV4 = addKeyword(['3'])
    .addAnswer(['¿En qué necesita asesoramiento?','En breve lo estaremos atendiendo','Si es muy amable de enviar una imagen'], { capture: true }, (solicitud) => {
        console.log('Consulta de', get_nombreV4, '|', solicitud.body)
        get_soliV4 = solicitud.body

        //Guardar datos
        datosRecopiladosV4.push({
            nombre: get_nombreV4,
            numero: get_numbV4,
            zonaperu: get_zonaV4,
            opcion: get_opcionV4,
            ruc: get_rucV4,
            solicitud: get_soliV4,
        });
    }, flowDespedidaV4);

const flowServicioV4 = addKeyword(['4'])
    .addAnswer(['¿En donde le mandamos nuestras muestras?', 'En breve lo estaremos atendiendo','Si es muy amable de enviar una imagen'], { capture: true }, (solicitud) => {
        console.log('Pedido de Servicio al cliente de', get_nombreV4, '|', solicitud.body);
        get_soliV4 = solicitud.body
        //Guardar datos
        datosRecopiladosV4.push({
            nombre: get_nombreV4,
            numero: get_numbV4,
            zonaperu: get_zonaV4,
            opcion: get_opcionV4,
            ruc: get_rucV4,
            solicitud: get_soliV4,
        });
    }, flowDespedidaV4);

const flowOtrosV4 = addKeyword(['5'])
    .addAnswer(['¿Qué necesita?', 'En breve lo estaremos atendiendo'], { capture: true }, (solicitud) => {
        console.log('Otros:', get_nombreV4, '|', solicitud.body)
        get_soliV4 = solicitud.body
        //Guardar datos
        datosRecopiladosV4.push({
            nombre: get_nombreV4,
            numero: get_numbV4,
            zonaperu: get_zonaV4,
            opcion: get_opcionV4,
            ruc: get_rucV4,
            solicitud: get_soliV4,
        });
    }, flowDespedidaV4);


// Menu
const flowMenuV4 = addKeyword(get_zonaV4)
    .addAnswer(
        ['¿Cómo podemos ayudarte?', '👉 1️⃣ Deseo cotizar', '👉 2️⃣ Quiero productos de EPPs y señalización ', '👉 3️⃣ Necesito asesoria tecnica en caracteristicas, especificaciones y uso de EPPs', '👉 4️⃣ Requiero una presentación de muestras en mi centro comercial', '👉 5️⃣ Otros', 'Escribe la opción que deseas✍️'],
        { capture: true },
        (opciones, { fallBack }) => {
            if (!['1', '2', '3', '4', '5'].includes(opciones.body)) {
                return fallBack();
            }
            console.log('Opción del cliente:', opciones.body)
            get_opcionV4 = opciones.body
        },
        [flowCotizacionV4, flowPedidosV4, flowSolicitudV4, flowServicioV4, flowOtrosV4] // Agrega el flujo de volver a pedidos
    );

// Saludo, Captura de datos del cliente
const flowPrincipalV4 = addKeyword(['Hola quisiera mas información'])
    .addAnswer('Bienvenid@ a *HORACIO EPP*!🧡🦺🛠 Soy 🤖 tu asesor virtual.')
    .addAnswer('¿Con quien tenemos el gusto?', { capture: true }, (datos, { fallBack }) => {
        if (datos.body.length <= 1) {
            return fallBack()
        } else {
            console.log("Datos del cliente:", datos.body, datos.from)
            get_nombreV4 = datos.body;
            get_numbV4 = datos.from;
        }
    })
    .addAnswer(['¿Con que RUC lo registramos / Cotizamos?','Si cuenta con RUC 10 ingrese su *Domicio Fiscal*'], { capture: true }, (ruc, { fallBack }) => {
        if (ruc.body.length < 8) {
            return fallBack()
        } else {
            console.log("RUC del cliente:", ruc.body);
            get_rucV4 = ruc.body;
        }
        // Agrega los datos al array cuando se recopila el RUC
    })
    .addAnswer(['¿En que zona de Lima le llevamos | provincia le enviamos el pedido?'], { capture: true }, (zona) => {
        if (zona.body.length < 1) {
            return fallBack()
        } else {
            console.log('ZONA DE LIMA | PROVINCIA:', zona.body);
            get_zonaV4 = zona.body;
        }
    }, flowMenuV4)

//Fin HORACIO
//...........//
//INICIO SINCHI
// Función para guardar los datos en un archivo Excel específico para cada número de teléfono
async function SINCHI(data) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`datosSIC.xlsx`);

    // Define las columnas en el archivo Excel
    worksheet.columns = [
        { header: 'Número', key: 'numero' },
        { header: 'Nombre', key: 'nombre' },
        { header: 'Zona del Peru', key: 'zonaperu' },
        { header: 'Opción', key: 'opcion' },
        { header: 'RUC', key: 'ruc' },
        { header: 'Solicitud', key: 'solicitud' },
    ];

    // Agrega los datos al archivo Excel
    data.forEach((item) => {
        worksheet.addRow({
            nombre: item.nombre,
            numero: item.numero,
            zonaperu: item.zonaperu,
            opcion: item.opcion,
            ruc: item.ruc,
            solicitud: item.solicitud,
        });
    });

    // Guarda el archivo Excel en el sistema de archivos
    const fileName = `datosSIC.xlsx`;
    await workbook.xlsx.writeFile(fileName);

    console.log(`Datos guardados en ${fileName}`);
}

// Array para almacenar los datos recopilados
const datosRecopiladosV5 = [];


//Despedida del bot e ingresar datos a un excel
const flowDespedidaV5 = addKeyword([get_soliV5])
    .addAnswer('Anotado!🤖')
    .addAction(() => {
        // Llama a la función para guardar los datos en Excel específico para el número de teléfono del usuario cuando termina el flujo de despedida
        SINCHI(datosRecopiladosV5, get_numbV5);
    })
    .addAnswer(['Para poder darte un servicio cada vez mejor y atenderte de acuerdo a tus necesidades, por favor, cuéntanos tu experiencia', 'https://forms.gle/eeNZVRQGKVNEhgYr6'], {
        delay: 5000
    })

//Opciones del menu
const flowPolvorinesV5 = addKeyword(['3'])
    .addAnswer(['Asesoria, Ejecución y construcción de polvorines','En breve lo atenderemos'], { capture: true }, (solicitud) => {
        console.log("El cliente solicita:", solicitud.body)
        addAnswer('Anotado')
        get_soliV5 = solicitud.body

        //Guardar datos
        datosRecopiladosV5.push({
            nombre: get_nombreV5,
            numero: get_numbV5,
            zonaperu: get_zonaV5,
            opcion: get_opcionV5,
            ruc: get_rucV5,
            solicitud: get_soliV5,
        });
    }, flowDespedidaV5);

const flowInmobiliariosV5 = addKeyword(['1'])
    .addAnswer(['Brindanos la Ubicación, Presupuesto, Especificaciones de hora y Fecha estimada', 'Ejemplo: Ubicación | Presupuesto | Especificaciones de hora | Fecha estimada'], { capture: true }, (solicitud) => {
        console.log('El cliente', get_nombreV5, 'solicita lo siguiente:', solicitud.body);
        addAnswer('Anotado');
        get_soliV5 = solicitud.body

        //Guardar datos
        datosRecopiladosV5.push({
            nombre: get_nombreV5,
            numero: get_numbV5,
            zonaperu: get_zonaV5,
            opcion: get_opcionV5,
            ruc: get_rucV5,
            solicitud: get_soliV5,
        });
    }, flowDespedidaV5);

const flowObrasV5 = addKeyword(['2'])
    .addAnswer(['Brindenos el Tipo de obra, Ubicación, Presupuesto, Especificaciones de obra, Fecha estimada','Ejemplo: Tipo de obra | Ubicacion | Presupuesto | Especificaciones de obra | Fecha estimada'], { capture: true }, (solicitud) => {
        console.log('Consulta de', get_nombreV5, '|', solicitud.body)
        get_soliV5 = solicitud.body

        //Guardar datos
        datosRecopiladosV5.push({
            nombre: get_nombreV5,
            numero: get_numbV5,
            zonaperu: get_zonaV5,
            opcion: get_opcionV5,
            ruc: get_rucV5,
            solicitud: get_soliV5,
        });
    }, flowDespedidaV5);

const flowExpedienteV5 = addKeyword(['4'])
    .addAnswer(['Brindenos las Especificaciones de la obra, Ubicación','Ejemplo: Especificaciones de la obra | Ubicacion'], { capture: true }, (solicitud) => {
        console.log('Expediente:', get_nombreV5, '|', solicitud.body)
        get_soliV5 = solicitud.body
        //Guardar datos
        datosRecopiladosV5.push({
            nombre: get_nombreV5,
            numero: get_numbV5,
            zonaperu: get_zonaV5,
            opcion: get_opcionV5,
            ruc: get_rucV5,
            solicitud: get_soliV5,
        });
    }, flowDespedidaV5);

const flowOtrosV5 = addKeyword(['5'])
    .addAnswer(['¿En que necesita ayuda?', 'En breve lo estaremos atendiendo'], { capture: true }, (solicitud) => {
        console.log('Otros:', get_nombreV5, '|', solicitud.body)
        get_soliV5 = solicitud.body
        //Guardar datos
        datosRecopiladosV5.push({
            nombre: get_nombreV5,
            numero: get_numbV5,
            zonaperu: get_zonaV5,
            opcion: get_opcionV5,
            ruc: get_rucV5,
            solicitud: get_soliV5,
        });
    }, flowDespedidaV5);


// Menu
const flowMenuV5 = addKeyword(get_zonaV5)
    .addAnswer(
        ['¿Cómo podemos ayudarte?', '👉 1️⃣ Requiero consultoria o asesoramiento para proyectos inmobiliarios', '👉 2️⃣ Requiero consultoria o asesoramiento para proyectos de obras publicas', '👉 3️⃣ Requiero consultoria para la elaboracion de expediente de polvorines', '👉 4️⃣ Requiero la ejecucion de expedientes tecnicos', '👉 5️⃣ Otros', 'Escribe la opción que deseas✍️'],
        { capture: true },
        (opciones, { fallBack }) => {
            if (!['1', '2', '3', '4', '5'].includes(opciones.body)) {
                return fallBack();
            }
            console.log('Opción del cliente:', opciones.body)
            get_opcionV5 = opciones.body
        },
        [flowInmobiliariosV5, flowObrasV5, flowPolvorinesV5, flowExpedienteV5, flowOtrosV5] // Agrega el flujo de volver a pedidos
    );

// Saludo, Captura de datos del cliente
const flowPrincipalV5 = addKeyword(['Hola quisiera mas información'])
    .addAnswer('Bienvenid@ a *SIC. INGENIERIA Y CONSTRUCCION*!👷🏻‍♂️ Soy 🤖 tu asesor virtual.')
    .addAnswer('¿Con quien tenemos el gusto?', { capture: true }, (datos, { fallBack }) => {
        if (datos.body.length <= 1) {
            return fallBack()
        } else {
            console.log("Datos del cliente:", datos.body, datos.from)
            get_nombreV5 = datos.body;
            get_numbV5 = datos.from;
        }
    })
    .addAnswer(['¿Con que RUC lo registramos / Cotizamos?','Si cuenta con RUC 10 ingrese su *Domicio Fiscal*'], { capture: true }, (ruc, { fallBack }) => {
        if (ruc.body.length < 8) {
            return fallBack()
        } else {
            console.log("RUC del cliente:", ruc.body);
            get_rucV5 = ruc.body;
        }
        // Agrega los datos al array cuando se recopila el RUC
    })
    .addAnswer(['¿En que zona?'], { capture: true }, (zona) => {
        if (zona.body.length < 1) {
            return fallBack()
        } else {
            console.log('ZONA DE LIMA | PROVINCIA:', zona.body);
            get_zonaV5 = zona.body;
        }
    }, flowMenuV5)
//FIN SINCHI
//.........//
//INICIO MMP
// Función para guardar los datos en un archivo Excel específico para cada número de teléfono
async function MMP(data) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`datosMMP.xlsx`);

    // Define las columnas en el archivo Excel
    worksheet.columns = [
        { header: 'Número', key: 'numero' },
        { header: 'Nombre', key: 'nombre' },
        { header: 'Zona del Peru', key: 'zonaperu' },
        { header: 'Opción', key: 'opcion' },
        { header: 'RUC', key: 'ruc' },
        { header: 'Solicitud', key: 'solicitud' },
    ];

    // Agrega los datos al archivo Excel
    data.forEach((item) => {
        worksheet.addRow({
            nombre: item.nombre,
            numero: item.numero,
            zonaperu: item.zonaperu,
            opcion: item.opcion,
            ruc: item.ruc,
            solicitud: item.solicitud,
        });
    });

    // Guarda el archivo Excel en el sistema de archivos
    const fileName = `datosMMP.xlsx`;
    await workbook.xlsx.writeFile(fileName);

    console.log(`Datos guardados en ${fileName}`);
}

// Array para almacenar los datos recopilados
const datosRecopiladosV6 = [];


//Despedida del bot e ingresar datos a un excel
const flowDespedidaV6 = addKeyword([get_soliV6])
    .addAnswer('Anotado!🤖')
    .addAction(() => {
        // Llama a la función para guardar los datos en Excel específico para el número de teléfono del usuario cuando termina el flujo de despedida
        MMP(datosRecopiladosV6, get_numbV6);
    })
    .addAnswer(['Para poder darte un servicio cada vez mejor y atenderte de acuerdo a tus necesidades, por favor, cuéntanos tu experiencia', 'https://forms.gle/eeNZVRQGKVNEhgYr6'], {
        delay: 5000
    })

//Opciones del menu
const flowSUCAMECV6 = addKeyword(['2'])
    .addAnswer(['En breve lo estaremos atendiendo'], { capture: true }, (solicitud) => {
        console.log("El cliente solicita:", solicitud.body)
        addAnswer('Anotado')
        get_soliV6 = solicitud.body

        //Guardar datos
        datosRecopiladosV6.push({
            nombre: get_nombreV6,
            numero: get_numbV6,
            zonaperu: get_zonaV6,
            opcion: get_opcionV6,
            ruc: get_rucV6,
            solicitud: get_soliV6,
        });
    }, flowDespedidaV6);

const flowAsesoriaV6 = addKeyword(['1'])
    .addAnswer(['¿En qué necesita asesoria?','En breve lo atendemos'], { capture: true }, (solicitud) => {
        console.log('El cliente', get_nombreV6, 'solicita lo siguiente:', solicitud.body);
        addAnswer('Anotado');
        get_soliV6 = solicitud.body

        //Guardar datos
        datosRecopiladosV6.push({
            nombre: get_nombreV6,
            numero: get_numbV6,
            zonaperu: get_zonaV6,
            opcion: get_opcionV6,
            ruc: get_rucV6,
            solicitud: get_soliV6,
        });
    }, flowDespedidaV6);

const flowVentaV6 = addKeyword(['3'])
    .addAnswer(['¿Qué desea vender?','En breve lo atendemos'], { capture: true }, (solicitud) => {
        console.log('Consulta de', get_nombreV6, '|', solicitud.body)
        get_soliV6 = solicitud.body

        //Guardar datos
        datosRecopiladosV6.push({
            nombre: get_nombreV6,
            numero: get_numbV6,
            zonaperu: get_zonaV6,
            opcion: get_opcionV6,
            ruc: get_rucV6,
            solicitud: get_soliV6,
        });
    }, flowDespedidaV6);

const flowEvaluacionV6 = addKeyword(['4'])
    .addAnswer(['Especifique el lugar', 'En breve lo estaremos atendiendo'], { capture: true }, (solicitud) => {
        console.log('Pedido de Servicio al cliente de', get_nombreV6, '|', solicitud.body);
        get_soliV6 = solicitud.body
        //Guardar datos
        datosRecopiladosV6.push({
            nombre: get_nombreV6,
            numero: get_numbV6,
            zonaperu: get_zonaV6,
            opcion: get_opcionV6,
            ruc: get_rucV6,
            solicitud: get_soliV6,
        });
    }, flowDespedidaV6);

const flowOtrosV6 = addKeyword(['5'])
    .addAnswer(['¿En que necesita ayuda?', 'En breve lo estaremos atendiendo'], { capture: true }, (solicitud) => {
        console.log('Otros:', get_nombreV6, '|', solicitud.body)
        get_soliV6 = solicitud.body
        //Guardar datos
        datosRecopiladosV6.push({
            nombre: get_nombreV6,
            numero: get_numbV6,
            zonaperu: get_zonaV6,
            opcion: get_opcionV6,
            ruc: get_rucV6,
            solicitud: get_soliV6,
        });
    }, flowDespedidaV6);


// Menu
const flowMenuV6 = addKeyword(get_zonaV6)
    .addAnswer(
        ['¿Cómo podemos ayudarte?', '👉 1️⃣ ¿Necesitas asesoria en elaboración de REINFO?', '👉 2️⃣ ¿Requieres tramitar permisos ante SUCAMEC?', '👉 3️⃣ ¿Quiere vender concentrados de mineral?', '👉 4️⃣ ¿Requieres una evaluacion de potencial minero de un lugar en especifico?', '👉 5️⃣ Otros', 'Escribe la opción que deseas✍️'],
        { capture: true },
        (opciones, { fallBack }) => {
            if (!['1', '2', '3', '4', '5'].includes(opciones.body)) {
                return fallBack();
            }
            console.log('Opción del cliente:', opciones.body)
            get_opcionV6 = opciones.body
        },
        [flowAsesoriaV6, flowSUCAMECV6, flowVentaV6, flowEvaluacionV6, flowOtrosV6] // Agrega el flujo de volver a pedidos
    );

// Saludo, Captura de datos del cliente
const flowPrincipalV6 = addKeyword(['Hola quisiera mas información'])
    .addAnswer('Bienvenid@ a *MINERALS & MINING PERÚ*!👷🏻‍♂️⛏ Soy 🤖 tu asesor virtual.')
    .addAnswer('¿Con quien tenemos el gusto?', { capture: true }, (datos, { fallBack }) => {
        if (datos.body.length <= 1) {
            return fallBack()
        } else {
            console.log("Datos del cliente:", datos.body, datos.from)
            get_nombreV6 = datos.body;
            get_numbV6 = datos.from;
        }
    })
    .addAnswer(['¿Con que RUC lo registramos / Cotizamos?','Si cuenta con RUC 10 ingrese su *Domicio Fiscal*'], { capture: true }, (ruc, { fallBack }) => {
        if (ruc.body.length < 8) {
            return fallBack()
        } else {
            console.log("RUC del cliente:", ruc.body);
            get_rucV6 = ruc.body;
        }
        // Agrega los datos al array cuando se recopila el RUC
    })
    .addAnswer(['¿En que zona de Lima le llevamos| provincia le enviamos el pedido?'], { capture: true }, (zona) => {
        if (zona.body.length < 1) {
            return fallBack()
        } else {
            console.log('ZONA DE LIMA | PROVINCIA:', zona.body);
            get_zonaV6 = zona.body;
        }
    }, flowMenuV6)
//FIN MMP
//........//
//INICIO CSI AMBIENTAL
// Función para guardar los datos en un archivo Excel específico para cada número de teléfono
async function CSI(data) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`datosCSI.xlsx`);

    // Define las columnas en el archivo Excel
    worksheet.columns = [
        { header: 'Número', key: 'numero' },
        { header: 'Nombre', key: 'nombre' },
        { header: 'Zona del Peru', key: 'zonaperu' },
        { header: 'Opción', key: 'opcion' },
        { header: 'RUC', key: 'ruc' },
        { header: 'Solicitud', key: 'solicitud' },
    ];

    // Agrega los datos al archivo Excel
    data.forEach((item) => {
        worksheet.addRow({
            nombre: item.nombre,
            numero: item.numero,
            zonaperu: item.zonaperu,
            opcion: item.opcion,
            ruc: item.ruc,
            solicitud: item.solicitud,
        });
    });

    // Guarda el archivo Excel en el sistema de archivos
    const fileName = `datosCSI.xlsx`;
    await workbook.xlsx.writeFile(fileName);

    console.log(`Datos guardados en ${fileName}`);
}

// Array para almacenar los datos recopilados
const datosRecopilados = [];


//Despedida del bot e ingresar datos a un excel
const flowDespedidaV7 = addKeyword([get_soliV7])
    .addAnswer('Anotado!🤖')
    .addAction(() => {
        // Llama a la función para guardar los datos en Excel específico para el número de teléfono del usuario cuando termina el flujo de despedida
        CSI(datosRecopilados, get_numbV7);
    })
    .addAnswer(['Para poder darte un servicio cada vez mejor y atenderte de acuerdo a tus necesidades, por favor, cuéntanos tu experiencia', 'https://forms.gle/eeNZVRQGKVNEhgYr6'], {
        delay: 5000
    })

//Opciones del menu
const flowComprarV7 = addKeyword(['3'])
    .addAnswer(['¿Qué desea comprar / De que tipo?','En breve lo atenderemos'], { capture: true }, (solicitud) => {
        console.log("El cliente solicita:", solicitud.body)
        addAnswer('Anotado')
        get_soliV7 = solicitud.body

        //Guardar datos
        datosRecopilados.push({
            nombre: get_nombreV7,
            numero: get_numbV7,
            zonaperu: get_zonaV7,
            opcion: get_opcionV7,
            ruc: get_rucV7,
            solicitud: get_soliV7,
        });
    }, flowDespedidaV7);

const flowAsesoriaV7 = addKeyword(['1'])
    .addAnswer(['¿En qué necesita asesoramiento?','En breve atenderemos'], { capture: true }, (solicitud) => {
        console.log('El cliente', get_nombreV7, 'solicita lo siguiente:', solicitud.body);
        addAnswer('Anotado');
        get_soliV7 = solicitud.body

        //Guardar datos
        datosRecopilados.push({
            nombre: get_nombreV7,
            numero: get_numbV7,
            zonaperu: get_zonaV7,
            opcion: get_opcionV7,
            ruc: get_rucV7,
            solicitud: get_soliV7,
        });
    }, flowDespedidaV7);

const flowVenderV7 = addKeyword(['2'])
    .addAnswer(['¿Qué desea vender?','En breve lo atenderemos'], { capture: true }, (solicitud) => {
        console.log('Consulta de', get_nombreV7, '|', solicitud.body)
        get_soliV7 = solicitud.body

        //Guardar datos
        datosRecopilados.push({
            nombre: get_nombreV7,
            numero: get_numbV7,
            zonaperu: get_zonaV7,
            opcion: get_opcionV7,
            ruc: get_rucV7,
            solicitud: get_soliV7,
        });
    }, flowDespedidaV7);

const flowPaginaV7 = addKeyword(['4'])
    .addAnswer(['Entre al siguiente enlace para acceder a nuestra pagina','https://sites.google.com/view/csi-ambiental/page_2'])
    .addAnswer(['Para poder darte un servicio cada vez mejor y atenderte de acuerdo a tus necesidades, por favor, cuéntanos tu experiencia', 'https://forms.gle/eeNZVRQGKVNEhgYr6'], {
        delay: 5000
    })

const flowOtrosV7 = addKeyword(['5'])
    .addAnswer(['¿En que necesita ayuda?', 'En breve lo estaremos atendiendo'], { capture: true }, (solicitud) => {
        console.log('Otros:', get_nombreV7, '|', solicitud.body)
        get_soliV7 = solicitud.body
        //Guardar datos
        datosRecopilados.push({
            nombre: get_nombreV7,
            numero: get_numbV7,
            zonaperu: get_zonaV7,
            opcion: get_opcionV7,
            ruc: get_rucV7,
            solicitud: get_soliV7,
        });
    }, flowDespedidaV7);


// Menu
const flowMenuV7 = addKeyword(get_zonaV7)
    .addAnswer(
        ['¿Cómo podemos ayudarte?', '👉 1️⃣ ¿Necesitas asesoria o consultoria en la Gestion de Residuos solidos?', '👉 2️⃣ ¿Estas interesado en vender residuos solidos?', '👉 3️⃣ ¿Requieres comprar residuos solidos / De que tipo?', '👉 4️⃣ ¿Tienes alguna duda? Visita nuestra pagina web', '👉 5️⃣ Otros', 'Escribe la opción que deseas✍️'],
        { capture: true },
        (opciones, { fallBack }) => {
            if (!['1', '2', '3', '4', '5'].includes(opciones.body)) {
                return fallBack();
            }
            console.log('Opción del cliente:', opciones.body)
            get_opcionV7 = opciones.body
        },
        [flowAsesoriaV7, flowVenderV7, flowComprarV7, flowPaginaV7, flowOtrosV7] // Agrega el flujo de volver a pedidos
    );

// Saludo, Captura de datos del cliente
const flowPrincipalV7 = addKeyword(['Hola quisiera mas información'])
    .addAnswer('Bienvenid@ a *CSI AMBIENTAL*!🌎 Soy 🤖 tu asesor virtual.')
    .addAnswer('¿Con quien tenemos el gusto?', { capture: true }, (datos, { fallBack }) => {
        if (datos.body.length <= 1) {
            return fallBack()
        } else {
            console.log("Datos del cliente:", datos.body, datos.from)
            get_nombreV7 = datos.body;
            get_numbV7 = datos.from;
        }
    })
    .addAnswer(['¿Con que RUC lo registramos / Cotizamos?','Si cuenta con RUC 10 ingrese su *Domicio Fiscal*'], { capture: true }, (ruc, { fallBack }) => {
        if (ruc.body.length < 8) {
            return fallBack()
        } else {
            console.log("RUC del cliente:", ruc.body);
            get_rucV7 = ruc.body;
        }
        // Agrega los datos al array cuando se recopila el RUC
    })
    .addAnswer(['¿En que zona de Lima le llevamos | provincia le enviamos el pedido?'], { capture: true }, (zona) => {
        if (zona.body.length < 1) {
            return fallBack()
        } else {
            console.log('ZONA DE LIMA | PROVINCIA:', zona.body);
            get_zonaV7 = zona.body;
        }
    }, flowMenuV7)
//FIN CSI AMBIENTAL

// Iniciar bots, opciones y puerto *NO TOCAR*
const mainVENTAS1 = async () => {
    const BOTNAME='VENTAS1'
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipalV1])
    const adapterProvider = createProvider(BaileysProvider,{
        name: BOTNAME
    })

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb({ port: 70 })
}

const mainVENTAS2 = async () => {
    const BOTNAME='VENTAS2'
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipalV2])
    const adapterProvider = createProvider(BaileysProvider,{
        name: BOTNAME
    })

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb({ name: BOTNAME,port: 71 })
}

const mainVENTAS3 = async () => {
    const BOTNAME='VENTAS3'
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipalV3])
    const adapterProvider = createProvider(BaileysProvider,{
        name: BOTNAME
    })

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb({ name: BOTNAME,port: 72 })
}

const mainHORACIO = async () => {
    const BOTNAME='HORACIO'
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipalV4])
    const adapterProvider = createProvider(BaileysProvider,{
        name: BOTNAME
    })

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb({ name: BOTNAME,port: 73 })
}

const mainSINCHI = async () => {
    const BOTNAME='SINCHI'
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipalV5])
    const adapterProvider = createProvider(BaileysProvider,{
        name: BOTNAME
    })

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb({ name: BOTNAME,port: 74 })
}

const mainMMP = async () => {
    const BOTNAME='MMP'
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipalV6])
    const adapterProvider = createProvider(BaileysProvider,{
        name: BOTNAME
    })

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb({ name: BOTNAME,port: 75 })
}

const mainCSI = async () => {
    const BOTNAME='CSI'
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipalV7])
    const adapterProvider = createProvider(BaileysProvider,{
        name: BOTNAME
    })

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb({ name: BOTNAME,port: 76 })
}

//Inicio de los Bots
mainVENTAS1()
mainVENTAS2()
mainVENTAS3()
mainHORACIO()
mainSINCHI()
mainMMP()
mainCSI()
