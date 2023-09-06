require('colors');

const mostrarMenu = () => {

    return new Promise((resolve) => {
        console.clear();
        console.log('============================'.green);
        console.log('   Seleccione una opción   '.white);
        console.log('============================\n'.green);
    
    
        console.log(`${'1.'.green} Crear Tarea`);
        console.log(`${'2.'.green} Listar Tarea(s)`);
        console.log(`${'3.'.green} Listar Tarea(s) completadas`);
        console.log(`${'4.'.green} Listar Tarea(s) pendientes`);
        console.log(`${'5.'.green} Completar Tarea(s)`);
        console.log(`${'0.'.green} Salir \n`);
    
    
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question('Seleccione una opción: ', ( optionSelected ) => {
            readLine.close();
            resolve( optionSelected );
        });
        
    });

}

const pausa = () => {

    return new Promise((resolve) => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question(`\nPresione ${'ENTER'.green} para continuar :\n `, () => {
            readLine.close();
            resolve();
        });
        
    })
}

module.exports = {
    mostrarMenu,
    pausa
}