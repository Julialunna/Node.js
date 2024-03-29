//const database = require('../models')
const Services = require('../services/Services.js');
const niveisServices = new Services('Niveis');

class NivelController{
    static async pegaTodosOsNiveis(req, res){
        try{
            const todasAsPessoas = await niveisServices.pegaTodosOsRegsitros()
            return res.status(200).json(todasAsPessoas);
        } catch(erro){
            return res.status(500).json(erro.message);
        }
    }

    static async pegaUmNivel(req,res){
        const {id}=req.params;
        try {
           const umNivel = await niveisServices.pegaUmRegistro({
            id :Number(id)
            });
           /*database.Niveis.findOne({
                where:{
                id :Number(id)
                }
            })*/
            return res.status(200).json(umNivel);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaNivel(req,res){
        const novoNivel = req.body;
        try {
            const novoNivelCriado = await niveisServices.criaRegistro(novoNivel);
            /*database.Niveis.create(novoNivel);*/
            return res.status(200).json(novoNivelCriado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaNivel(req,res){
        const { id } = req.params
        const novasInfos = req.body
        try {
            await niveisServices.atualizaRegistro(novasInfos, id);
            /*database.Niveis.update(novasInfos,{where:{id:Number(id)}})*/
            const nivelAtualizado = await niveisServices.pegaUmRegistro({
                id :Number(id)
                });
            /*database.Niveis.findOne( { where: { id: Number(id) }})*/
            return res.status(200).json(nivelAtualizado);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async apagaNivel(req, res){
        const { id } = req.params;
        try {
            await niveisServices.apagaRegistro(id);
            /*database.Niveis.destroy({where:{id:Number(id)}});*/
            return res.status(200).json({mensagem: `id ${id} deletado`});
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}
module.exports = NivelController;