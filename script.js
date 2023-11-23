let button = document.getElementById("button");
let cardPedidos = document.getElementById("card-pedidos");
let h2pedidos = document.getElementById("h2-pedidos");
let erro = document.getElementById("mensagemErro");
let timer = document.getElementById("tempo");

let objetos = [];
console.log(objetos);
// Recuperar objetos do localStorage, se existirem
const objetosSalvos = JSON.parse(localStorage.getItem("objetos")) || [];
console.log(objetosSalvos);

// Adicionar os objetos salvos à lista de objetos
objetos = objetosSalvos;

function salvarObjetosNoLocalStorage() {
    // Salvar objetos no localStorage
    localStorage.setItem("objetos", JSON.stringify(objetos));
}

class PedidoCliente {
    constructor(nomeCliente, endereco, select, checkbox,tempoEmMinutos) {
        this.Nome = nomeCliente;
        this.Endereco = endereco;
        this.Pizza = select;
        this.Refrigerante = checkbox;
        // this.tempoRestante = tempoEmMinutos * 60; // Converter minutos para segundos
        // this.intervalo = null;
        // this.iniciarContador();
    }

    criarDiv() {
        let div = document.createElement("div");
        div.classList.add("formularioPedido");

        for (let propriedade in this) {
            if (
                this.hasOwnProperty(propriedade) &&
                propriedade !== "criarDiv" && 
                propriedade !== "Tempo"
            ) {
                let novoParagrafo = document.createElement("p");
                let valor = this[propriedade];
                novoParagrafo.textContent =
                    propriedade +
                    ": " +
                    (typeof valor === "object" ? JSON.stringify(valor) : valor);
                div.appendChild(novoParagrafo);
            }
        }

        h2pedidos.style.display = "none";

        cardPedidos.appendChild(div);

        let button = document.createElement("button");
        button.classList.add("btn-pronto");
        button.textContent = "Está Pronto!";
        div.appendChild(button);

        button.addEventListener("click", () => {
            div.remove();
            h2pedidos.style.display = "block";
            // Atualizar objetos após a remoção
            objetos = objetos.filter((obj) => obj.Nome !== this.Nome);
            salvarObjetosNoLocalStorage();
        });
    }
}

function criarObjeto(e) {
    e.preventDefault();
    // Limpar mensagem de erro
    erro.textContent = "";

    let nomeCliente = document.getElementById("nomeCliente").value.trim();
    let endereco = document.getElementById("endereco").value.trim();
    let saboresPizza = document.getElementById("saboresPizza").value;
    let querRefrigerante = document.getElementById("querRefrigerante");
    

    if (!nomeCliente || !endereco ) {
        erro.textContent = "Por favor, preencha todos os campos.";
        erro.style.display = 'flex';
        return;
    }

    if(querRefrigerante.checked){
        querRefrigerante = 'Sim';
    }else{
        querRefrigerante = 'não';
    }

    let novoObj = new PedidoCliente(
        nomeCliente,
        endereco,
        saboresPizza,
        querRefrigerante,
    );

    objetos.push(novoObj);

    // Criar a div correspondente ao objeto e adicionar ao documento
    novoObj.criarDiv();

    // Salvar objetos no localStorage após cada criação
    salvarObjetosNoLocalStorage();

    // Limpar os campos de input
    document.getElementById("nomeCliente").value = "";
    document.getElementById("endereco").value = "";
    // Limpar a seleção do checkbox
    document.getElementById("querRefrigerante").checked = false;
    erro.style.display = 'none';
    
}

button.addEventListener("click", criarObjeto);

// Renderizar objetos salvos ao carregar a página
objetosSalvos.forEach((obj) => {
    let novoObj = new PedidoCliente(
        obj.Nome,
        obj.Endereco,
        obj.Pizza,
        obj.Refrigerante,
      
    );
    novoObj.criarDiv();
});