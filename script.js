let nomeCliente = document.getElementById('nomeCliente');
let endereco = document.getElementById('endereco');
let select = document.getElementById('saboresPizza');
let checkbox = document.getElementById('querRefrigerante');
let button = document.getElementById('button');
let cardPedidos = document.getElementById('card-pedidos');

let objetos = [];

// Recuperar objetos do localStorage, se existirem
const objetosSalvos = JSON.parse(localStorage.getItem('objetos')) || [];

// Adicionar os objetos salvos à lista de objetos
objetos = objetosSalvos;

function salvarObjetosNoLocalStorage() {
    // Salvar objetos no localStorage
    localStorage.setItem('objetos', JSON.stringify(objetos));
}

class PedidoCliente {
    constructor(nomeCliente, endereco, select, checkbox) {
        this.nome = nomeCliente;
        this.endereco = endereco;
        this.pizza = select;
        this.refrigerante = checkbox;
        this.div = null;
    }

    createDiv() {
        this.div = document.createElement('div');
        this.div.classList.add('formularioPedido');

        for (let propriedade in this) {
            if (this.hasOwnProperty(propriedade) && propriedade !== 'div' && propriedade !== 'createDiv') {
                let novoParagrafo = document.createElement('p');
                let valor = this[propriedade];
                novoParagrafo.textContent = propriedade + ': ' + (typeof valor === 'object' ? JSON.stringify(valor) : valor);
                this.div.appendChild(novoParagrafo);
            }
        }

        cardPedidos.appendChild(this.div);

        const button = document.createElement('button');
        button.classList.add('btn-pronto');
        button.textContent = "Está Pronto!";
        this.div.appendChild(button);

        button.addEventListener('click', () => {
            this.div.remove();
            // Atualizar objetos após a remoção
            objetos = objetos.filter(obj => obj.nome !== this.nome);
            salvarObjetosNoLocalStorage();
        });
    }
}

function criarDiv(objeto) {
    objeto.createDiv();
}

function criarObjeto(e) {
    e.preventDefault();

    // Limpar mensagem de erro
    document.getElementById('mensagemErro').textContent = '';

    let valorCliente = nomeCliente.value.trim();
    let valorEndereco = endereco.value.trim();
    let saborPizza = select.value;
    let querRefrigerante = checkbox.checked;

    if (valorCliente === '') {
        document.getElementById('mensagemErro').textContent = 'Por favor, preencha o campo Nome do Cliente.';
        return undefined;
    }

    if (valorEndereco === '') {
        document.getElementById('mensagemErro').textContent = 'Por favor, preencha o campo Com o Endereço.';
        return undefined;
    }

    if (querRefrigerante) {
        querRefrigerante = 'Quer Refrigerante';
    } else {
        querRefrigerante = 'Não Quer Refrigerante';
    }

    let novoObj = new PedidoCliente(valorCliente, valorEndereco, saborPizza, querRefrigerante);
    objetos.push({ nome: 'objeto' + objetos.length, objeto: novoObj });

    // Criar a div correspondente ao objeto e adicionar ao documento
    criarDiv(novoObj);

    // Salvar objetos no localStorage após cada criação
    salvarObjetosNoLocalStorage();

    // Limpar os campos de input
    nomeCliente.value = '';
    endereco.value = '';
    // Limpar a seleção do checkbox, se necessário
    checkbox.checked = false;
}

button.addEventListener('click', criarObjeto);
