const { v4: uudiv4 } = require('uuid');

class Task {
    id = '';
    description = '';
    completedAt = null;

    constructor( description ){
        this.id = uudiv4();
        this.description = description;
        this.completedAt = null;
    }
}

module.exports = Task;