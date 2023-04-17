import NaoEncontrado from "../erros/NaoEncontrado.js";

function manipulador404(req, res, next){

  const ero404=new NaoEncontrado();
  next(ero404);
} export default manipulador404;