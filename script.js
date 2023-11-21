let nomeCliente = document.getElementById('nomeCliente');
let endereco = document.getElementById('endereco');
let select = document.getElementById('saboresPizza');
let checkbox = document.getElementById('querRefrigerante');
let button = document.getElementById('button');

let objetos = [];
let contador = 1;

function criarObjeto(e){
    e.preventDefault();
    let ValorCliente = nomeCliente.value;
    let valorendereco = endereco.value;
    let saborPizza = select.value;
    let QuerRefrigerante = checkbox.checked;


    if(QuerRefrigerante){
        QuerRefrigerante = 'Quer Refigerante'
    }else{
        QuerRefrigerante = 'Não Quer Refrigerante'
    }
    let nomeObj = 'objeto' + contador;
    let novoObj = new PedidoCliente(ValorCliente,valorendereco,saborPizza,QuerRefrigerante);
    
 
    objetos.push({nome: nomeObj, objeto: novoObj});
    contador++;

    if(novoObj.nome.trim() === ''){
        document.getElementById('mensagemErro').textContent = 'Por favor, preencha o campo Nome do Cliente.';
        return undefined;
    }else if(novoObj.endereco.trim() === ''){
        document.getElementById('mensagemErro').textContent = 'Por favor, preencha o campo Com o Endereço.';
        return undefined;
    }else{
        let novaDiv = document.createElement('div');
        novaDiv.classList.add('formularioPedido');

        // Iterar sobre as propriedades do objeto e criar parágrafos
        for (let propriedade in novoObj) {
            if (novoObj.hasOwnProperty(propriedade)) {
            let novoParagrafo = document.createElement('p');
            novoParagrafo.textContent = propriedade + ': ' + novoObj[propriedade];
            novaDiv.appendChild(novoParagrafo);
            }
        }

            // Adicionar a div ao corpo do documento
            document.body.appendChild(novaDiv);
            nomeCliente.value='';
            endereco.value='';
            document.getElementById('mensagemErro').textContent='';
            console.log(novoObj);
    }
}
class PedidoCliente {
    constructor (nomeCliente, endereco,select,checkbox){
        this.nome = nomeCliente;
        this.endereco = endereco;
        this.pizza = select;
        this.refrigerante = checkbox;
    }

    set novovalor(novovalor){
        this.nome = novovalor;
    }
}

button.addEventListener('click', criarObjeto);





