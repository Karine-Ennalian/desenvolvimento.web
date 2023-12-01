// variaveis criadas para armazenar os valores obtidos do input e do button
var input = document.getElementById("nameAtv");
var enterButton = document.getElementById("sendAtv");
var ul = document.querySelector("ul");
var item = document.getElementsByTagName("li");

// função que retorna o tamanho do input
function inputLength(){
	return input.value.length;
} 

// função para criar uma atividade na lista
function addNewAtv() {
	// cria um li e coloca o valor da váriavel input no li.
	var li = document.createElement("li"); 
	li.appendChild(document.createTextNode(input.value)); 
	ul.appendChild(li); //adiciona o li ao ul
	input.value = ""; 


	// função responsável por marcar item da lista como concluído.
	function checked() {
		li.classList.toggle("done");
	}

	li.addEventListener("click",checked);


	// parte de deletar item da lista de atividades
	var deleteButton = document.createElement("button"); // cria botão de deletar
	deleteButton.appendChild(document.createTextNode("X"));
	li.appendChild(deleteButton); // adiciona o botão de deletar ao item da lista
	deleteButton.addEventListener("click", deleteItem); // se evento de click ocorrer chama deleteItem

	// função responsável por deletar item da lista
	function deleteItem(){
		li.classList.add("delete")
	}
}

// esta função não aceita espaços em branco como novas atividades na lista
function noEmptyAtv(){
	if (inputLength() > 0) { 
		addNewAtv();
	}
}

// função para adicionar atividade ao apertar 'enter'
function key(event) {
	if (inputLength() > 0 && event.which ===13) { 
		addNewAtv();
	} 
}

// eventos criados para ao teclar enter adicionar nova atividade ou não adicionar espaço em branco
input.addEventListener("keypress", key);
enterButton.addEventListener("click",noEmptyAtv);    
