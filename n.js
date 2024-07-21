const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const { error } = require('console');

function getFormattedDate() {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const currentDate = new Date();
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const suffix = getNumberSuffix(day); // Function to get the correct suffix for the day (e.g., "st", "nd", "rd", "th")
    const formattedDate = `${dayOfWeek}, ${month} ${day}${suffix} ${year}`;

    return formattedDate;
}
// Function to get the correct suffix for the day (e.g., "st", "nd", "rd", "th")
function getNumberSuffix(day) {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

const formattedDate = getFormattedDate();


const accountFilePath = path.join(__dirname, 'data.json')

let account = {
    id: 0,
    accountName: '',
    entityName: '',
    type: '',
    currency,
    balance: 0,
    creationDate: formattedDate
}


async function generateUniqueId(accounts) {
    const existingIds = new Set(accounts.map(acc => acc.id));
    let newId = '';
    const idLength = 6;

    do {
        newId = 'Ac0x-';
        for (let i = 0; i < idLength; i++) {
            newId += Math.floor(Math.random() * 10); // Genera dígitos numéricos aleatorios (0-9)
        }
    } while (existingIds.has(newId));

    return newId;
}


async function saveAccounts() {

    let allAccounts = { accounts: [] };

    try {
        
        if (fs.existsSync(accountFilePath)) {
            const accountData = fs.readFileSync(accountFilePath, 'utf-8').trim(); 
            if (accountData.length > 0) {
                allAccounts = JSON.parse(accountData);
            }
        }
    

    const id = await generateUniqueId(allAccounts.accounts);
    account.id = id;

    allAccounts.accounts.push(account)
    

    fs.writeFileSync(accountFilePath, JSON.stringify(allAccounts, null, 2), 'utf-8');
    console.log('Cuenta guardada')

} catch (error) {
    console.log(error);
}

}




async function start() {
    //console.log('Welcome again \n')
    const { welcome } = await inquirer.prompt([
        {
            type: 'list',
            name: 'welcome',
            message: 'Iniciar',
            choices: [

                { name: 'Administrar Cuentas', value: 'admin' },
                { name: 'Nueva cuenta', value: 'new' },
                new inquirer.Separator(''),

                { name: 'Salir', value: 'exit'},

                new inquirer.Separator('    ')

            ]
        }
    ])


    if (welcome === 'new') {
        await newAccount();
    } else if (welcome === 'admin') {
        console.log('\n\x1b[31m=\x1b[0m No hay cuentas para administrar \n')
        return start();
    } else if (welcome === 'exit') {
        console.log('Good bye');
        return;
    }

    
}





async function cancelProcess(callingFunction) {
    console.log('\x1b[31m>>\x1b[0m El texto no puede estar vacío.');
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Desea continuar?',
            choices: [
                { name: 'Continuar', value: 'continue' },
                { name: 'Cancelar', value: 'cancel' }
            ]
        }
    ]);

    if (action === 'cancel') {
        console.log('Operación cancelada.');
        return false;
    } else {
        if (typeof callingFunction === 'function') {
            return await callingFunction();
        } else {
            console.error('Error: callingFunction is not a function');
            return false;
        }
    }
}

async function accountNameF() {
    const { accountName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'accountName',
            message: 'Ingrese el nombre de la cuenta:',
            filter: input => input.trim() // Filtra el input para remover espacios en blanco al principio y al final
        }
    ]);

    // Mostrar el prompt de acción (list) solo si inputText está vacío
    if (accountName === '') {
        return await cancelProcess(accountNameF);
        
    } else {
        account.accountName = accountName;
        return true;
        // Si inputText no está vacío, imprimir el texto ingresado
        //console.log('Texto ingresado:', inputText);
    }
}

async function entityType() {
    const { entityType } = await inquirer.prompt([
        {
            type: 'list',
            name: 'entityType',
            message: 'Elija el tipo de entidad',
            choices: [
                { name: 'Bank', value: 'Bank' },
                { name: 'Wallet', value: 'Wallet' },
                { name: 'Wallet Crypto', value: 'Wallet Crypto' },

                new inquirer.Separator('    '),

                { name: 'Cancelar', value: 'cancel'}

            ]
        }
    ])


    if (entityType === 'cancel') {
        console.log('Operación cancelada');
        return false;
    } else {
        account.type = entityType;
        return true;
    }
    
}

async function entityNameF() {
    const { entityName } = await inquirer.prompt ([
        {
            type: 'input',
            name: 'entityName',
            message: 'Ingrese el nombre de la entidad financiera:',
            filter: input => input.trim()
        }
    ])
    if (entityName === '') {
        return await cancelProcess(entityNameF);
    } else {
        if (!(await entityType())) return;
       account.entityName = entityName;
       return true;
}

}

async function customCurrencyF() {
    const { customCurrency } = await inquirer.prompt ([
        {
            type: 'input',
            name: 'customCurrency',
            message: 'Ingrese la moneda:',
            filter: input => input.trim()
        }
    ])
    if (customCurrency === '') {
       return await cancelProcess(customCurrencyF);
    } else {
        account.currency = customCurrency;
        return true;
    }
}

async function currency() {
    const { currency } = await inquirer.prompt([
        {
            type: 'list',
            name: 'currency',
            message: 'Elija el tipo de entidad',
            choices: [
                { name: 'VES', value: 'VES' },
                { name: 'USD', value: 'USD' },
                { name: 'Otra', value: 'other' },

                new inquirer.Separator('    '),

                { name: 'Cancelar', value: 'cancel'}

            ]
        }
    ])

    if (currency === 'cancel') {
        console.log('Operación cancelada');
        return;
    }

    if (currency === 'other') {
        await customCurrencyF();
        return true;
    } else {
            account.currency = currency;
            return true;
        }


}




async function newAccount() {
    if (!(await accountNameF())) return;
    if (!(await entityNameF())) return;
    if (!(await currency())) return;
    await saveAccounts()
    console.log(account)

}


//currency()
//console.log('Welcome again \n') 
//start()

async function main(){
    await start();
}


main()