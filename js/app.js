"use strict";

const clearForm = (address) => {
  document.getElementById("address").value = " ";
  document.getElementById("district").value = " ";
  document.getElementById("city").value = " ";
  document.getElementById("uf").value = " ";
};

const fillForm = (address) => {
  document.getElementById("address").value = address.logradouro;
  document.getElementById("district").value = address.bairro;
  document.getElementById("city").value = address.localidade;
  document.getElementById("uf").value = address.uf;
};

const validZip = (zip) => zip.length == 8 && /^[0-9]+$/.test(zip);

const zipSearch = async () => {
  clearForm();
  const zip = document.getElementById("zip").value;
  const url = `http://viacep.com.br/ws/${zip}/json/`;
  if (validZip(zip)) {
    const dice = await fetch(url);
    const address = await dice.json();

    if (address.hasOwnProperty("erro")) {
      document.getElementById("address").value = "Cep não encontrado!";
    } else {
      fillForm(address);
    }
  } else {
    document.getElementById("address").value = "Cep Invalido!";
  }
};
document.getElementById("zip").addEventListener("focusout", zipSearch);

let cliente = {};

function cadastrar() {
  const nome = document.querySelector(".nome").value;
  const email = document.querySelector(".email").value;
  const cpf = document.querySelector(".cpf_cnpj").value;
  const telefone = document.querySelector(".telefone").value;
  const cep = document.querySelector(".cep").value;
  const lagradouro = document.querySelector(".rua").value;
  const numero = document.querySelector(".numero").value;
  const bairro = document.querySelector(".bairro").value;
  const cidade = document.querySelector(".cidade").value;
  const estado = document.querySelector(".estado").value;

  cliente = {
    nome,
    email,
    cpf,
    telefone,
    cep,
    lagradouro,
    numero,
    bairro,
    cidade,
    estado,
  };

  const formattedClient = `
  
  <h1>Dados Inseridos</h1>
  <p>Nome: ${nome}</p>
  <p>E-mail: ${email}</p>
  <p>CPF: ${cpf}</p>
  <p>Telefone: ${telefone}</p>
  <p>Cep: ${cep}</p>
  <p>Rua: ${lagradouro}</p>
  <p>Numero: ${numero}</p>
  <p>Bairro: ${bairro}</p>
  <p>Cidade: ${cidade}</p>
  <p>Estado: ${estado}</p>
  
  `;
  return formattedClient;
}

document.getElementById("btn_send").addEventListener("click", () => {
  cadastrar();
});

// Teste Modal

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("btn_send");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
  var dados = document.getElementById("dados");
  dados.innerHTML = cadastrar();
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
