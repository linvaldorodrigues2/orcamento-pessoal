class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
  }

  validarDados() {
    for (let i in this) {
      /*recupera o valor do atributo utilizando uma notação array,
      é de forma anologa à utilizar o operador .( ponto ) -> this.ano */
      if (this[i] == undefined || this[i] == "" || this[i] == null) {
        return false;
      }
      //pode ser usado para todas as notações de construção de um objeto.
    }
    return true;
  }
}

class BancoDeDados {
  constructor() {
    //recupera o id existente caso tenha
    let id = localStorage.getItem("id");

    if (id === null) {
      localStorage.setItem("id", 0);
    }
  }

  getProximoId() {
    //recupera o ultimo id em localStorade e soma +1
    let proximoId = localStorage.getItem("id");
    return parseInt(proximoId) + 1;
  }

  gravar(despesa) {
    let id = this.getProximoId();
    //adiciona o valor id e o obj. em localStorage
    localStorage.setItem(id, JSON.stringify(despesa));
    /*
      1° param -> id.. do objeto que sera armazenado
      2° param -> O dados do objeto que sera armazenado
      em localStorage precisam ser encaminhados atraves
      de notação JSON -> JSON.stringyfy -> faz essa conversão
    */

      //atualiza o valor 'id' em localStorage
    localStorage.setItem("id", id); 
  }

  recuperarRegistros() {
    let despesas = Array();

    //recupera todos as despesas -> localStorage
    let id = localStorage.getItem("id");

    for (let i = 1; i <= id; i++) {
      let despesa = JSON.parse(localStorage.getItem(i));
      //se houver indice mudados / removidos
      if (despesa === null) {
        continue;
      }
      despesa.id = i
      despesas.push(despesa);
    }

    console.log(despesas)
    return despesas;
  }

  pesquisar(despesa) {
    let despesasFiltradas = Array();
    despesasFiltradas = this.recuperarRegistros();

    console.log(despesa);
    

    /*
    O .filter() não atua sobre o array original, para atulizar o valor
    do array original, é preciso atribuir o resultado do filtro ao array
    original
    */

    //ano
    if (despesa.ano != "") {
      despesasFiltradas = despesasFiltradas.filter((d) => d.ano == despesa.ano);
    }
    /*
    despesasFiltradas = despesasFiltradas.filter(
      function(d){
        return d.ano == despesa.ano
      }
    )
    */

    //mes
    if (despesa.mes != "") {
      despesasFiltradas = despesasFiltradas.filter((d) => d.mes == despesa.mes);
    }
    //dia
    if (despesa.dia != "") {
      despesasFiltradas = despesasFiltradas.filter((d) => d.dia == despesa.dia);
    }
    //tipo
    if(despesa.ano != ""){
      despesasFiltradas = despesasFiltradas.filter(
        (d)=> d.ano == despesa.ano)
    }
    if (despesa.mes != "") {
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.mes == despesa.mes);
    }
    if (despesa.dia != "") {
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.dia == despesa.dia);
    }
    if (despesa.tipo != "") {
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.tipo == despesa.tipo
      );
    }
    //descricao
    if (despesa.descricao != "") {
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.descricao == despesa.descricao
      );
    }
    //valor
    if (despesa.valor != "") {
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.valor == despesa.valor
      );
    }
    
    console.log(despesasFiltradas);
    return despesasFiltradas;
    
  }

  remover(id){
    localStorage.removeItem(id)
  }
}

let Bd = new BancoDeDados();

function cadastrarDespesa() {
  let ano = document.getElementById("ano");
  let mes = document.getElementById("mes");
  let dia = document.getElementById("dia");
  let tipo = document.getElementById("tipo");
  let descricao = document.getElementById("descricao");
  let valor = document.getElementById("valor");

  let despesa = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
  );

  if (despesa.validarDados()) {
    Bd.gravar(despesa);

    //alert -> sucesso
    document.getElementById("modal_titulo").innerHTML =
      "Cadastro inserido com sucesso";
    document.getElementById("modal_titulo_div").className =
      "modal-header text-seccess";
    document.getElementById("modal_descricao").innerHTML =
      "Despesa cadastrada com sucesso!";
    document.getElementById("modal_button").innerHTML = "Voltar";
    document.getElementById("modal_button").className = "btn btn-success";

    $("#modalRegistroDespesa").modal("show");
    /*recurso Jquery -> exibi a caixa modal dentro da aplicação*/

    //limpa os campos após o cadastro
    ano.value = "";
    mes.value = "";
    dia.value = "";
    tipo.value = "";
    descricao.value = "";
    valor.value = "";
  } else {
    //alert -> erro
    document.getElementById("modal_titulo").innerHTML = "Erro!";
    document.getElementById("modal_titulo_div").className =
      "modal-header text-danger";
    document.getElementById("modal_descricao").innerHTML =
      "Erro na gravação, verifique se todos os campos foram preenchidos corretamente.";
    document.getElementById("modal_button").innerHTML = "Voltar e corrigir";
    document.getElementById("modal_button").className = "btn btn-danger";

    $("#modalRegistroDespesa").modal("show");
    //recurso Jquery
  }
}

function carregaListaDespesas(despesas = Array(), filtro = false) {

  if(despesas.length == 0 && filtro == false){
    despesas = Bd.recuperarRegistros();
  }

  let listaDespesas = document.getElementById("listaDespesas");
  listaDespesas.innerHTML = "";
  
  //percorre o array e lista cada despesa
  despesas.forEach(function (d) {
    //cria as linha
    let linha = listaDespesas.insertRow();

    //cria a coluna
    linha.insertCell(0).innerHTML = `${d.dia} / ${d.mes} / ${d.ano}`;

    //ajuste do tipo de despesa
    switch (d.tipo) {
      case "1":
        d.tipo = "Alimentação";
        break;
      case "2":
        d.tipo = "Educação";
        break;
      case "3":
        d.tipo = "Lazer";
        break;
      case "4":
        d.tipo = "Saúde";
        break;
      case "5":
        d.tipo = "Transporte";
        break;
    }

    linha.insertCell(1).innerHTML = d.tipo;
    linha.insertCell(2).innerHTML = d.descricao;
    linha.insertCell(3).innerHTML = d.valor;

    //botão de exclusão
    let btn = document.createElement('button')
    btn.className = 'btn btn-danger'
    btn.innerHTML = '<i class = "fas fa-times"></i>'
    btn.id = `id_despesa_${d.id}`

    btn.onclick = function(){
      let id = this.id.replace('id_despesa_', '')
      //alert(id)
      Bd.remover(id)
      window.location.reload()
    }

    linha.insertCell(4).append(btn)
    console.log(d)
  });
}

function pesquisaDespesa() {
  let ano = document.getElementById("ano").value;
  let mes = document.getElementById("mes").value;
  let dia = document.getElementById("dia").value;
  let tipo = document.getElementById("tipo").value;
  let descricao = document.getElementById("descricao").value;
  let valor = document.getElementById("valor").value;

  let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);

  let despesas = Bd.pesquisar(despesa);

  this.carregaListaDespesas(despesas, true);
}