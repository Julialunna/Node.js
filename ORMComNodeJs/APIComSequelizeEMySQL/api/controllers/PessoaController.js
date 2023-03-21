const database = require('../models');
const Sequelize = require('sequelize');
const {PessoasServices} = require('../services');
const pessoasServices = new PessoasServices();
const {MatriculasServices} = require('../services');
const matriculasServices = new MatriculasServices();

class PessoaController{
    static async pegaPessoasAtivas(req, res){
        try{
            const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos();
            return res.status(200).json(pessoasAtivas);
        } catch(erro){
            return res.status(500).json(erro.message);
        }
    }

    static async pegaTodasAsPessoas(req, res){
        try{
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros()
            return res.status(200).json(todasAsPessoas);
        } catch(erro){
            return res.status(500).json(erro.message);
        }
    }

    static async pegaUmaPessoa (req, res){
        const {id} = req.params;
        try {
            const umaPessoa = await pessoasServices.pegaUmRegistro({id: Number(id)});
            
            /*database.Pessoas.findOne({
                where:
                {id: Number(id)}
            });*/

            return res.status(200).json(umaPessoa);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaPessoa (req, res){
        const novaPessoa = req.body;
        try {
            const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa);
            /*database.Pessoas.create(novaPessoa);*/
            res.status(200).json(novaPessoaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaPessoa (req, res){
        const novasInfo = req.body;
        const {id} = req.params;

        try {
            await pessoasServices.atualizaRegistro(novasInfo, id)
            /*database.Pessoas.update(novasInfo, {where: {id:Number(id)}})*/
            const pessoaAtualizada = await pessoasServices.pegaUmRegistro(id)
            /*database.Pessoas.findOne({
                where:
                {id: Number(id)}
            });*/
            return res.status(200).json(pessoaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }

    }

    static async apagaPessoa(req,res){
        try {
            const {id} = req.params;
            await pessoasServices.apagaRegistro(id);
            /*database.Pessoas.destroy({
                where:
                {id: Number(id)}
            })*/
            return res.status(200).json({mensagem: `ìd ${id} deletado`});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restauraPessoa(req, res){
        const {id} = req.params;
        try {
            await pessoasServices.restauraRegistro(id);
            /*database.Pessoas.restore({where:{id:Number(id)}});*/
            return res.status(200).json({mensagem: `id: ${id} restaurado`});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmaMatricula (req, res){
        const {estudanteId, matriculaId} = req.params;
        try {
            const umaMatricula = await matriculasServices.pegaUmRegistro({id: Number(matriculaId), 
                estudante_id:Number(estudanteId)});
            /* database.Matriculas.findOne({
                where:
                {id: Number(matriculaId), 
                estudante_id:Number(estudanteId)}
            });*/
            /*pessoasServices.pegaMatriculaPorEstudante({id: Number(matriculaId), 
                estudante_id:Number(estudanteId)}) */

            return res.status(200).json(umaMatricula);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaMatricula (req, res){
        const {estudanteId} = req.params;
        const novaMatricula= {...req.body, estudante_id: Number(estudanteId)};
        try {
            const novaMatriculaCriada = await matriculasServices.criaRegistro(novaMatricula)
            /*database.Matriculas.create(novaMatricula);*/

            return res.status(200).json(novaMatriculaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaMatricula (req, res){
        const novasInfo = req.body;
        const {estudanteId, matriculaId} = req.params;

        try {
            await matriculasServices.atualizaRegistros(novasInfo, {
                id:Number(matriculaId),                 
                estudante_id: Number(estudanteId)});
            /*database.Matriculas.update(novasInfo, {where: {
                id:Number(matriculaId),                 
                estudante_id: Number(estudanteId)}})*/
            const matriculaAtualizada = await matriculasServices.pegaUmRegistro({id: Number(matriculaId)})
            /*database.Matriculas.findOne({
                where:
                {id: Number(matriculaId)}
            });*/
            return res.status(200).json(matriculaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }

    }

    static async apagaMatricula(req,res){
        const {estudanteId, matriculaId} = req.params;
        try {
            await database.Matriculas.destroy({
                where:
                {id: Number(matriculaId)}
            })
            return res.status(200).json({mensagem: `ìd ${matriculaId} deletado`});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaMatriculas(req,res){
        const {estudanteId} = req.params;
        try {
            const pessoa = await pessoasServices.pegaUmRegistro({id: Number(estudanteId)});
            console.log(pessoa);
            /* database.Pessoas.findOne({where:{id: Number(estudanteId)}});*/
            const matriculas = await pessoa.getAulasMatriculadas();
            return res.status(200).json(matriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaMatriculasPorTurma(req,res){
        const {turmaId} = req.params;
        try {
            const todasAsMatriculas = await  matriculasServices.encontraEContaRegistros({
                turma_id:Number(turmaId),
                status:'confirmado'
            },{limit:20, 
                order:[['estudante_id','DESC']] })
            /*database.Matriculas
            .findAndCountAll({
                where:{
                    turma_id:Number(turmaId),
                    status:'confirmado'
                }, 
                limit:20, 
                order:[['estudante_id','DESC']] 
            })*/
            return res.status(200).json(todasAsMatriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaTurmasLotadas(req,res){
        const lotacaoTurma = 2;
        try {
            const turmasLotadas = await matriculasServices.encontraEContaRegistros({status:'confirmado'}, {
                attributes:['turma_id'], 
                group:['turma_id'], 
                having: Sequelize.literal(`count(turma_id)>=${lotacaoTurma}`)
            });/*database.Matriculas.
            findAndCountAll({
                where:{
                    status:'confirmado'
                }, 
                attributes:['turma_id'], 
                group:['turma_id'], 
                having: Sequelize.literal(`count(turma_id)>=${lotacaoTurma}`)
            })*/
            return res.status(200).json(turmasLotadas.count);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async cancelaPessoa(req,res){
        const {estudanteId}= req.params;
        try {
            await pessoasServices.cancelaPessoaEMatricula(Number(estudanteId));
            return res.status(200).json({message:`Matrículas referente ao estudante ${estudanteId} canceladas`});

            
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController;