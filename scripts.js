// Função para atualizar a quantidade do pedido
function quantidadePedido(valor, idParagrafo, nome) {
  let valorBotao = valor.value;
  let valorParagrafo = parseInt(document.getElementById(idParagrafo).textContent, 10);

  // Incrementa ou decrementa o valor
  if (valorBotao === "+" && valorParagrafo >= 0) {
    valorParagrafo++;
  } else if (valorBotao === "-" && valorParagrafo > 0) {
    valorParagrafo--;
  }

  // Atualiza o número no parágrafo
  document.getElementById(idParagrafo).textContent = valorParagrafo;

  // Atualiza a tabela
  const tabela = document.getElementById("tabela-pedidos").getElementsByTagName('tbody')[0];
  let linhaExistente = false;

  // Verifica se o item já está na tabela
  for (let i = 0; i < tabela.rows.length; i++) {
    const row = tabela.rows[i];
    const nomeLanche = row.cells[0].textContent;
    if (nomeLanche === nome) {
      if (valorParagrafo > 0) {
        row.cells[1].textContent = valorParagrafo; // Atualiza a quantidade
      } else {
        tabela.deleteRow(i); // Remove a linha se a quantidade for 0
      }
      linhaExistente = true;
      break;
    }
  }

  // Se o item não foi encontrado, adiciona uma nova linha
  if (!linhaExistente && valorParagrafo > 0) {
    const novaLinha = tabela.insertRow();
    const celulaNome = novaLinha.insertCell(0);
    const celulaQuantidade = novaLinha.insertCell(1);
    celulaNome.textContent = nome;
    celulaQuantidade.textContent = valorParagrafo;
  }
}

// Função para enviar o pedido via WhatsApp
function enviarWhatsApp() {
  const mesa = document.getElementById("mesa").value; 
  let mensagem = `${mesa}: \nPedido: \n`; 

  const tabela = document.getElementById("tabela-pedidos").getElementsByTagName('tbody')[0];

  // Percorre todas as linhas da tabela e coleta os dados
  for (let i = 0; i < tabela.rows.length; i++) {
    const row = tabela.rows[i];
    const nomeLanche = row.cells[0].textContent;
    const quantidade = row.cells[1].textContent;
    mensagem += `${nomeLanche} - Quantidade: ${quantidade}\n`; // Adiciona cada item do pedido
  }

  // Codifica a mensagem para envio via URL
  const mensagemCodificada = encodeURIComponent(mensagem);
  const numeroWhatsApp = "5575991110069"; 
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

  // Abre o WhatsApp com a mensagem pré-preenchida
  window.open(url, "_blank");
}