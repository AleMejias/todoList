require('colors');

const { read , save } = require('./helpers/fileStorage');

const { 
    confirm,
    menu,
    menuDeleteList,
    menuDeleteCheckList,
    pausa,
    readInput 
} = require('./helpers/inquirer');
const Tasks = require('./models/tasks');


console.clear();
const main = async (  ) => {

    let optionSelected = '';
    const tasks = new Tasks();

    const storage = read();

    if( storage ) {
        tasks.createTasksFromArray( storage );

    }
    do {
        optionSelected = await menu();

        switch (optionSelected) {
            case '1':
                const description = await readInput( 'Descripcion: ' );
                tasks.create( description );

                break;
            case '2':
                tasks.allList();

                break;
            case '3':
                tasks.arrCompletedStatusList( true );

                break;
            case '4':
                tasks.arrCompletedStatusList();

                break;
            case '5':
                const ids = await menuDeleteCheckList( tasks._ArrList );

                tasks.update( ids );
                break;
            case '6':

                const id = await menuDeleteList( tasks._ArrList );

                if( id != null && id != '0' ) {
                    const ok = await confirm( '¿Estas seguro de que deseas eliminar esta tarea?' );

                    if( ok ) {

                        tasks.delete( id );
                        console.log('\nTarea eliminada'.green)

                    }

                }
                break;
        
            default:
                break;
        }
        save( tasks._ArrList );
        await pausa();
        
    } while ( optionSelected !== '0' );

}



main();