import fs from 'fs';
import chalk from 'chalk';


function extraiLinks(texto){
    const regex=/\[([^\[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas=[...texto.matchAll(regex)];

    const resultados = capturas.map(captura=>({[captura[1]]:captura[2 
    ]}))
    return resultados;
    //console.log(resultados);
}



function trataErro(erro){
    console.log(erro);
    throw new Error(chalk.red(erro.code, 'Não há arquivo no diretório'));
}

//Promessa com then
/*function pegaArquivo(caminhoDoArquivo){
    const encoding='utf-8';
    fs.promises
    .readFile(caminhoDoArquivo, encoding)
    .then((texto)=>conaole.log(chalk.green(texto)))
    .catch(trataErro);
}*/

//\[([^\[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)

async function pegaArquivo(caminhoDoArquivo){
    try{
        const encoding='utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
        return extraiLinks(texto);
    }catch(erro){
        trataErro(erro);
    }
}

export default pegaArquivo;

