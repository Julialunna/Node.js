const database = require('../models');

class Services{
    constructor(nomeDoModelo){
        this.nomeDoModelo=nomeDoModelo;
    }

    async pegaTodosOsRegsitros(){
        return database[this.nomeDoModelo].findAll();
    }

    async pegaUmRegistro(where={}){
        return  database[this.nomeDoModelo].findOne({ where: {...where } });
    }

    async criaRegistro(dados){
        return  database[this.nomeDoModelo].create(dados);
    }

    async atualizaRegistro(dadosAtualizados, id, transacao={}){
        return database[this.nomeDoModelo]
        .update(dadosAtualizados, {where:{id:id}}, transacao);
    }
    async atualizaRegistros(dadosAtualizados, where, transacao={}){
        return database[this.nomeDoModelo]
        .update(dadosAtualizados, {where:{...where}}, transacao);
    }

    async apagaRegistro(id){
        return database[this.nomeDoModelo].destroy({ where: { id: id } })
    }
    
    async restauraRegistro(id){
        return database[this.nomeDoModelo].restore({where:{id:Number(id)}});
    }

    async encontraEContaRegistros(where={}, agregadores={}){
        console.log("etste"+{...agregadores});
        return database[this.nomeDoModelo].findAndCountAll({ where: {...where } }, {...agregadores});
    }
}

module.exports=Services;