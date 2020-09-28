var dateFormat  = require('dateformat');

//Funções de Itens
module.exports.itens = function(application, req, res) {
	var connection = application.config.dbConnection();

	var itensConsumoModel = new application.app.models.ItensConsumoDAO(connection);

	itensConsumoModel.ItensFindAll(function(error, result){		
		res.send(result);
	});
		
}

module.exports.viewItens = function(application, req, res){
	
	var connection = application.config.dbConnection();

	var itensConsumoModel = new application.app.models.ItensConsumoDAO(connection);

	itensConsumoModel.ItensFindAll(function(error, result){

		var itensResult = result;

		res.render('itens_consumo/itens', {itens : itensResult});
	});
}

module.exports.salvarItens = function(application, req, res) {

	var item = req.body;

	console.log(item);

	var connection = application.config.dbConnection();

	var itensConsumoModel = new application.app.models.ItensConsumoDAO(connection);

	itensConsumoModel.salvarItem(item, function(error, result){
		if(result){
			res.send("O item " + item.nome_item+ " foi inserido!");				
		}else{
			res.send("Erro ao inserir o item!");
		}		
	});
		
}

module.exports.editarItens = function(application, req, res) {

	var item = req.body;

	console.log(item);

	var connection = application.config.dbConnection();

	var itensConsumoModel = new application.app.models.ItensConsumoDAO(connection);

	itensConsumoModel.editarItem(item, function(error, result){
		if(result){
			res.send("O item " + item.nome_item+ " foi editado!");				
		}else{
			res.send("Erro ao inserir o item!");
		}		
	});
		
}

module.exports.excluirItens = function(application, req, res) {

	var item = req.query;

	console.log(item);

	var connection = application.config.dbConnection();

	var itensConsumoModel = new application.app.models.ItensConsumoDAO(connection);

	itensConsumoModel.excluirItem(item.id_item, function(error, result){
		if(result){
			res.redirect("/itens");				
		}	
	});
		
}

// Funções de ItemConsumo
module.exports.ItensConsumidos = function(application, req, res) {
	
	var id_reserva = req.body.id_reserva;
	console.log(id_reserva);

	var connection = application.config.dbConnection();

	var itensConsumoModel = new application.app.models.ItensConsumoDAO(connection);

	itensConsumoModel.FindItensConsumidos(id_reserva, function(error, result){
		
		var itens = result;
		var totalConsumo = 0;
		
		itens.forEach(element => { 
			element.totalConsumo = 0;
			element.data_consumo = dateFormat(element.data_consumo,"dd/mm/yyyy HH:MM");   
			totalConsumo = totalConsumo + parseInt(element.valor_total);         
		  });
		
		res.send({itens :  itens, totalConsumo : totalConsumo});
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

module.exports.excluirItemConsumido = function(application, req, res) {

	var id_item_consumo = req.body.id_item_consumo;

	var connection = application.config.dbConnection();

	var itensConsumoModel = new application.app.models.ItensConsumoDAO(connection);

	itensConsumoModel.excluirItemConsumido(id_item_consumo, function(error, result){
		console.log(error);
		if(result){
			res.send("O item consumido foi deletado!");				
		}else{
			res.send("Erro ao inserir o item!");
		}		
	});
		
}
