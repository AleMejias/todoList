const { v4: uudiv4 } = require('uuid');

const Task = require('./task');

class Tasks {

    _list = {};

    get _ArrList() {


        const list = [];

        Object.keys( this._list ).forEach(( item ) => {

            const task = this._list[item];

            list.push( task );

        });

        return list;
    }

    printList( data ) {

        let salida = '\n';

        for (const [ index , item ] of Object.entries(data)) {
            
            const i = `${Number(index) + 1}. `.green;
            const separator = (item.completedAt != null) ? '::'.green : '::'.red;

            salida += `${i}${item.description} ${separator} ${ item.completedAt != null ? `Completada el ${item.completedAt}`.green : 'Pendiente'.red } \n`;

        }

        console.log(salida)

    }

    arrCompletedStatusList(  isCompleted = false ) {

        const data = this._ArrList;
        const status =  (isCompleted) ? data.filter(( item ) => item.completedAt) : data.filter(( item ) => !item.completedAt);

        this.printList( status );
    }

    constructor(){

        this._list = {};
    }


    createTasksFromArray( tasks = [] ) {
        tasks.forEach(( item ) => {
            this._list[item.id] = item;
        });

    }

    create( description = '' ){
        const newTask = new Task( description );

        this._list[ newTask.id ] = newTask;
    }
    delete( id ) {

        if( this._list[id] ) {

            delete this._list[id];

        }

    }

    update( ids = [] ) {

        // Marco como completadas
        ids.forEach(( id ) => {

            const task = this._list[id];

            if( !task.completedAt ) {

                task.completedAt = new Date().toISOString();

            }

        });
        // Marco como no completada si lo estaba antes

        this._ArrList.forEach(( item ) => {

            if( !ids.includes( item.id ) ) {
                this._list[item.id].completedAt = null;
            }

        });

    }

    allList() {

        const list =  this._ArrList;

        this.printList( list );
    }
}

module.exports = Tasks;