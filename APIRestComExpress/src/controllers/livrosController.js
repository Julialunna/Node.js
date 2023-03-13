
import livros from '../models/Livro.js';
class LivroController {
  static listarLivros = (req, res) => {
    livros.find((err, livros) => {
      res.status(200).json(livros);
    });
  }; 

  static cadastraLivro = (req,res) => {
    let livro= new livros(req.body);
  }
}
export default LivroController;
