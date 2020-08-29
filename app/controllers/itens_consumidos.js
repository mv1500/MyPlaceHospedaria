var dateFormat  = require('dateformat');

//Funções de Itens
module.exports.itens = function(application, req, res) {
	var connection = application.config.dbConnection();

	var itensConsumoModel = new application.app.models.ItensConsumoDAO(connection);

	itensConsumoModel.ItensFindAll(function(error, result){		
		res.send(result);
	});
		
}

module.exports.salvarItens = function(application, req, res) {

	var item = req.body;

	console.log(item);

	var connection = application.config.dbConnection();

	var itensConsumoModel = new application.app.models.ItensConsumoDAO(connection);

	itensConsumoModel.salvarItem(item, function(error, result){
		console.log(error);
		if(result){
			res.send("O item " + item.nome_item+ "foi inserido!");				
		}else{
			res.send("Erro ao inserir o item!");
		}		
	});
		
}



// Funções de ItemConsumo
module.exports.ItensConsumidos = function(application, req, res) {
	
	var id_reserva = req.body.id_reserva;

	var connection = application.config.dbConnection();

	var itensConsumoModel = new application.app.models.ItensConsumoDAO(connection);

	itensConsumoModel.FindItensConsumidos(id_reserva, function(error, result){
		res.send(result);
	});		
}

module.exports.salvarItemConsumido = function(application, req, res) {

	var itemConsumido = req.body;

	var connection = application.config.dbConnection();

	var itensConsumoModel = new application.app.models.ItensConsumoDAO(connection);

	itensConsumoModel.salvarItemConsumido(itemConsumido, function(error, result){
		console.log(error);
		if(result){
			res.send("O item consumido foi cadastrado!");				
		}else{
			res.send("Erro ao inserir o item!");
		}		
	});
		
}


