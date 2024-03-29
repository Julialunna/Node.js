//const database = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {TurmasServices} = require('../services');
const turmasServices = new TurmasServices();

class TurmaController{
    static async pegaTodasAsTurmas(req,res){
       const {data_inicial, data_final} = req.query;
       const where = {}
       data_inicial || data_final ? where.data_inicio={} : null
       data_inicial ? where.data_inicio[Op.gte]=data_inicial : null
       data_final ? where.data_inicio[Op.lte]=data_final : null
        try {
            const todasAsTurmas = await turmasServices.pegaTodosOsRegsitros()
            /*database.Turmas.findAll({where});*/
            return res.status(200).json(todasAsTurmas)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    

    static async pegaUmaTurma(req,res){
        const {id}=req.params;
        try {
           const umaTurma = await turmasServices.pegaUmRegistro({id :Number(id)});
           /*database.Turmas.findOne({
                where:{
                id :Number(id)
                }
            })*/
            return res.status(200).json(umaTurma);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaTurma(req,res){
        const novaPessoa = req.body;
        try {
            const novaPessoaCriada = await turmasServices.criaRegistro(novaPessoa);
            /*database.Turmas.create(novaPessoa);*/
            return res.status(200).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaTurma(req,res){
        const { id } = req.params
        const novasInfos = req.body
        try {
            await turmasServices.atualizaRegistro(novasInfos,id)
            /*database.Turmas.update(novasInfos,{where:{id:Number(id)}})*/
            const turmaAtualizada = await turmasServices.pegaUmRegistro({id :Number(id)});
            /*database.Turmas.findOne( { where: { id: Number(id) }})*/
            return res.status(200).json(turmaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async apagaTurma(req, res){
        const { id } = req.params;
        try {
            await turmasServices.apagaRegistro(id);
            /*database.Turmas.destroy({where:{id:Number(id)}});*/
            return res.status(200).json({mensagem: `id ${id} deletado`});
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}
module.exports = TurmaController;