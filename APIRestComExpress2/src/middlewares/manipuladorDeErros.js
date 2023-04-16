import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import ResquisicaoIncorreta from "../erros/ResquisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";

// eslint-disable-next-line no-unused-vars
export default function manipuladorDeErros(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    new ResquisicaoIncorreta().enviarResposta(res);
  } else if(erro instanceof mongoose.Error.ValidationError){
    new ErroValidacao(erro).enviarResposta(res);
  }
  else {
    new ErroBase().enviarResposta(res);
  }
}