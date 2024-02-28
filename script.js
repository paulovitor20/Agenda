function obterDataAtualFormatada() {
  var diasDaSemana = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
  var data = new Date();
  var diaSemana = diasDaSemana[data.getDay()];
  var dia = data.getDate();
  var mes = data.getMonth() + 1;
  var ano = data.getFullYear();
  var horas = data.getHours();
  var minutos = data.getMinutes();

  return `${diaSemana}, ${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${ano} ${horas < 10 ? '0' + horas : horas}:${minutos < 10 ? '0' + minutos : minutos}`;
}

function adicionarLinha() {
  var table = document.getElementById("studyTable");
  var newRow = table.insertRow(table.rows.length);

  // Adiciona células para a nova linha
  for (var i = 0; i < 2; i++) {
    var cell = newRow.insertCell(i);
    cell.contentEditable = true;
    cell.id = `cell-${table.rows.length - 1}-${i}`; // Adiciona um ID único

    if (i === 0) {
      // Preenche automaticamente a data e torna não editável
      cell.classList.add("date-col");
      cell.contentEditable = false;
      cell.innerHTML = obterDataAtualFormatada();
    } else {
      cell.innerHTML = ""; // Deixe o campo em branco para a nova tarefa
    }
  }

  // Adiciona uma nova célula para o checkbox
  var checkboxCell = newRow.insertCell(2);
  checkboxCell.innerHTML = '<input type="checkbox" onclick="selecionarLinha(this)">';

  // Bloqueia a edição da linha anterior
  bloquearEdicaoLinhaAnterior(table.rows.length - 2);
}

function bloquearEdicaoLinhaAnterior(rowIndex) {
  if (rowIndex >= 0) {
    var table = document.getElementById("studyTable");

    // Itera sobre as células da linha anterior e desabilita a edição
    for (var i = 0; i < table.rows[rowIndex].cells.length; i++) {
      var cell = table.rows[rowIndex].cells[i];
      cell.contentEditable = false;
    }
  }
}

function selecionarLinha(checkbox) {
  var row = checkbox.closest('tr');
  row.classList.toggle('selected', checkbox.checked);
}

function excluirLinhasSelecionadas() {
  var table = document.getElementById("studyTable");
  var rows = table.getElementsByClassName('selected');

  for (var i = rows.length - 1; i >= 0; i--) {
    rows[i].remove();
  }
}

function exportarPDF() {
  var element = document.getElementById("contentContainer");

  html2pdf(element, {
    margin: 10,
    filename: 'agenda_estudos.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: 'avoid-all' } // Evita quebras de página dentro das linhas
  });
}

