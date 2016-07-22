$(document).ready(function() {

	var torta1;
	var type;
	var time;
	var types_torta;
	time_torta = 0;



	$(".form-group").bind('click', function(event) {

		$(".oven").css("visibility", "visible");
		$(".create-oven").css("visibility", "hidden");


	});

	$("#cooking").submit(function(event) {
		event.preventDefault();
		//obtenemos los valores de la forma cocking
		var type = $("#type").val();
		var time = parseInt($("#time").val());
		var torta1 = new Torta(type, time);
		torta1.calentar();
		//cuenta regresiva en el horno
		timmer_oven(time, function() {
			//Creamos el objeto torta
			$("#timer").removeClass("QUEMADO").addClass("clear");
		});


		//clean el form
		this.reset();
	});

});


//funcion de calentado

//Class Torta
var Torta = function(type, time) {
	//instanced created
	//atributtes
	this.type = type;
	this.time = time;
};

//Object of types torta
var types_torta = {
	"jamon": 3,
	"queso": 8,
	"milanesa": 10
};

//Metodo de calentado
Torta.prototype.calentar = function() {
	type_torta_current = this.type;
	time_torta = types_torta[type_torta_current];
	console.log("Torta de " + this.type + " Tiempo de calentado " + types_torta[type_torta_current]);
	$("#history").html("Torta de " + this.type + " Tiempo de calentado " + types_torta[type_torta_current]);
};


function timmer_oven(time, callback) {
	callback = callback || function() {};

	var int = setInterval(function() {
		$("#timer").html(time);

		if (time > (time_torta + 5)) {
			$("#status").html("crudo");
			$("#timer").addClass("crudo");
		} else if (time == (time_torta + 2)) {
			$("#status").html("casi listo");
			$("#timer").removeClass("crudo").addClass("casi-listo");
		} else if (time == time_torta) {
			$("#status").html("listo");
			$("#timer").removeClass("casi-listo").addClass("LISTO");
		} else if (time < time_torta) {
			$("#status").html("quemado");
			$("#timer").removeClass("LISTO").addClass("QUEMADO");
		}

		time-- || (clearInterval(int), callback());
	}, 1000);

}



// Class TortaBatch - horneada
var TortaBatch = function() {};



// Class Oven - horno
var Oven = function() {};