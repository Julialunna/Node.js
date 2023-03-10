
import livros from '../models/Livro.js';
class LivroController {

  static listarLivros = (req, res) => {
    livros.find((err, livros) => {
      res.status(200).json(livros);
    });
  }; 

  static cadastrarLivro = (req,res) => {
    let livro= new livros(req.body);
    livro.save((err)=>{
        if(err){
            res.status(500).send({message: `${err.message} - falha ao cadastrar livro`})
        }else{
            res.status(201).send(livro.toJSON());
        }
    })
  }

  static excluirLivro = (req, res) => {
    const id=req.params.id;

    livros.findByIdAndDelete(id), (err)=>{
        if(!err){
            res.status(200).send({message:'Livro excluído com sucesso'})
        }else{
            res.status(500).send({message:err.message});
        }
    };
  }
}
export default LivroController;
