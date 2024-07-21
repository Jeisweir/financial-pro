const inquirer = require('inquirer');
const { choices } = require('yargs');

async function cancelProcess() {
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
        return;
    } else {
        accountName();
    }
}

let accountName1;

async function accountName() {
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
        await cancelProcess();
    } else {
        accountName1 = accountName;
        return;
        // Si inputText no está vacío, imprimir el texto ingresado
        //console.log('Texto ingresado:', inputText);
    }
    
}

async function main() {
    await accountName()
    console.log(accountName1)
}

main()

//accountName()