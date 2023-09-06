require('colors');

const inquirer = require('inquirer');

const menuOptions = [
    {
        type: 'list',
        name: 'option',
        message: 'Seleccione una opción',
        choices: [
            {   
                value: '1',
                name:'1.'.green+' Crear Tarea'
            },
            {
                value: '2',
                name:'2.'.green+' Listar Tarea(s)'
            },
            {
                value: '3',
                name:'3.'.green+' Listar Tarea(s) completadas'
            },
            {
                value: '4',
                name:'4.'.green+' Listar Tarea(s) pendientes'
            },
            {
                value: '5',
                name:'5.'.green+' Completar Tarea(s)'
            },
            {
                value: '6',
                name:'6.'.green+' Borrar Tarea'
            },
            {
                value: '7',
                name:'7.'.green+' Salir'
            }
        ]
    }
];


const menu = async () => {

    console.clear();
    console.log('============================'.green);
    console.log('   Seleccione una opción   '.white);
    console.log('============================\n'.green);

    const { option } = await inquirer.prompt( menuOptions );

    return option;
}

const pausa = async () => {

    const pausaOptions = [
        {    
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ];
    console.log('\n');
    const  { enter }  = await inquirer.prompt( pausaOptions );
    return enter;
}

const readInput = async ( message = '' ) => {

    const question = [
        {
            type: 'input',
            name: 'description',
            message: message,
            validate( value ) {
                if( value.length == 0 ) {
                    return 'Es obligatorio ingresar un valor';
                }
                return true;
            } 
        }
    ];

    const { description } = await inquirer.prompt(question);
    return description;
}


const menuDeleteList = async ( list = [] ) => {

    if( list.length == 0 ) { return null };

    const choices = list.map(( item , index ) => {

        const i = `${index + 1}.`.green;
        return {
            value: item.id,
            name: `${i} ${item.description}`
        }
    });

    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancelar`
    })
    const questions = [{
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }]
    const { id } = await inquirer.prompt( questions );

    return id;
}

const confirm = async ( message ) => {

    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];
    const { ok } = await inquirer.prompt( question );

    return ok;
}

const menuDeleteCheckList = async ( list = [] ) => {

    if( list.length == 0 ) { return null };

    const choices = list.map(( item , index ) => {

        const i = `${index + 1}.`.green;
        return {
            value: item.id,
            name: `${i} ${item.description}`,
            checked: ( item.completedAt ) ? true : false
        }
    });

    const questions = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione',
        choices
    }]
    const { ids } = await inquirer.prompt( questions );

    return ids;
}


module.exports = {
    confirm,
    menu,
    menuDeleteList,
    menuDeleteCheckList,
    pausa,
    readInput
}