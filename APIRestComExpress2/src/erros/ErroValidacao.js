import ResquisicaoIncorreta from "./ResquisicaoIncorreta.js";

class ErroValidacao extends ResquisicaoIncorreta{
  constructor(erro){
    const mensagemErro=Object.values(erro.errors)
      .map(erro=>erro.message)
      .join("; ");
    super(`Os seguintes erros foram encontrados: ${mensagemErro}`);

  }
}

export default ErroValidacao;