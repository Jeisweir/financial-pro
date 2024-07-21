const inquirer = require('inquirer');

async function promptAccountName() {
    const response = await inquirer.prompt({
        type: 'input',
        name: 'accountName',
        message: 'Ingrese el nombre de la cuenta:',
        validate: input => input ? true : 'El nombre de la cuenta no puede estar vacío. (O escriba "cancelar" para salir)'
    });

    if (response.accountName.toLowerCase() === 'cancelar') {
        return null;  // Indicador de cancelación
    }
    return response.accountName;
}

async function main() {
    try {
        while (true) {
            const accountName = await promptAccountName();
            if (accountName === null) {
                console.log('Operación cancelada.');
                return;
            }

            // Aquí se puede añadir más lógica o pasar a la siguiente sección
            console.log(`Nombre de la cuenta ingresado: ${accountName}`);

            // Simulamos una condición para romper el bucle, puede ser reemplazada por una lógica real
            break;
        }
    } catch (error) {
        console.error('Ocurrió un error:', error);
    }
}

main();
