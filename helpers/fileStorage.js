const fs = require('fs');
const fileUrl = './db/data.json';

const save = ( data ) => {

    fs.writeFileSync( fileUrl , JSON.stringify(data) );

}


const read = () => {

    if( !fs.existsSync( fileUrl ) ){ 

        return null;
    }

    const data = fs.readFileSync( fileUrl , { encoding: 'utf-8' });
    const dataToArray = JSON.parse( data );

    return dataToArray;
}

module.exports = {
    read,
    save
}