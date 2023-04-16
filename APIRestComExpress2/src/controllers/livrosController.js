import livros from "../models/Livro.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();
      res.status(200).json(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroResultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      res.status(200).send(livroResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {

    try {
      let livroNovo = new livros(req.body);
      livroNovo=await livroNovo.save();
      
      res.status(201).send(livroNovo.toJSON());
    } catch (erro) {
      
      next(erro);
    }

  };

  static atualizarLivro = async (req, res, next) => {

    try {
      const id = req.params.id;
  
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Livro atualizado com sucesso" });
      
    } catch (erro) {
      next(erro); 
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
  
      await livros.findByIdAndDelete(id);
      
      res.status(200).send({ message: "Livro removido com sucesso" });
    } catch (erro) {
      
      next(erro);
    }
  };

  static listarLivroPorEditora = async (req, res, next) => {
    try {
      const editora = req.query.editora;
      const resultado=await livros.find({ "editora": editora });
      res.status(200).send(resultado);
    } catch (erro) {
      next(erro);
    }
  };
}

export default LivroController;