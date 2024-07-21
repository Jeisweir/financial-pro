//Primera prueba 

const readlineSync = require("readline-sync")

const currencyOptions = ["USD", "VES"];
//let currencyIndex = -1;

function createAccounts() {
    const name = readlineSync.question("Ingrese el nombre de la cuenta: ");
    const entity = readlineSync.question("Ingrese la entidad de la cuenta: ");

    console.log('Opciones de moneda disponibles:');
  currencyOptions.forEach((option, index) => {
    console.log(`${index + 1}. ${option}`);
  });
    const currencyIndex = readlineSync.keyInSelect(currencyOptions.forEach((option, index) => {
        console.log(`${index + 1}. ${option}`);
      }), "Seleccione la moneda de la cuenta: ");

    
    if (currencyIndex === -1) {
        console.log('Operación cancelada')
        return;
    }


    const currency = currencyOptions[currencyIndex];


    
    const accounts = {
        id: '0',
        name: name,
        entity: entity, 
        currency: currency, 
        balance: 0
    };

    return console.log(accounts);
}



const cuentas = {
    cuenta1: {
        nombre: '',
        entidad: '',
        moneda: '',
        saldo: 0
    },
    cuenta2: {
        nombre: '',
        entidad: '',
        moneda: '',
        saldo: 0
    },
}

const fx = {
    nombre: '',
    tipo: '',
    moneda: '',
    compra: 0,
    venta: 0
}

const transaccion = {
    cuenta: '',
    moneda: '',
    monto: 0,
    fecha: '',
    concepto: '',
    tsc: ''
}


//let input1 = '0'


//console.log("El numero ingresado es: " + input1);


//input1 = readlineSync.question("Ingrese un numero: ");
//console.log("El numero ingresado es: " + input1);

createAccounts();