const database = require('../models');

class Services{
    constructor(nomeDoModelo){
        this.nomeDoModelo=nomeDoModelo;
    }

    async pegaTodosOsRegsitros(){
        return database[this.nomeDoModelo].findAll();
    }
}

module.exports=Services;