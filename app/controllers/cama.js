var dateFormat  = require('dateformat');
const cama = require('../routes/cama');

module.exports.camas = function(application, req, res) {
	var connection = application.config.dbConnection();

	var camaModel = new application.app.models.CamaDAO(connection);

	camaModel.FindAll(function(error, result){        
        var camasResult = result;
        
        res.render('cama/lista_camas', {camas : camasResult});
	});		
}

module.exports.camasVagas = function(application, req, res) {
	var connection = application.config.dbConnection();

	var camaModel = new application.app.models.CamaDAO(connection);

	camaModel.getCamasVagas(function(error, result){        
        var camasResult = result;
        
        res.render('cama/index', {camas : camasResult});
	});		
}

module.exports.getQuartos = function(application, req, res) {
	var connection = application.config.dbConnection();

	var camaModel = new application.app.models.CamaDAO(connection);

	camaModel.getCamasVagas(function(error, result){        
        var camasResult = result;
        
        res.render('cama/index', {camas : camasResult});
	});		
}

module.exports.form_editar_cama = function(application, req, res){
	var connection = application.config.dbConnection();

	var camaModel = new application.app.models.CamaDAO(connection);

	var id_cama = req.query;

	camaModel.InfoCama(id_cama, function(error, result){

		var camaResult = result;

		console.log(result);

		res.render("cama/form_editar_cama", {validacao : {}, cama: camaResult });
	});
}

module.exports.editar_camas = function(application, req, res){
	var cama = req.body;

	console.log(cama);

	//req.assert('nome_cliente','Nome do cliente é obrigatorio').notEmpty();
		
	//req.assert('data_ingresso','Data da primeira compra é obrigatorio').notEmpty().isDate({format: 'YYYY-MM-DD'});

	var erros = req.validationErrors();

	if(erros){
		res.render("cama/form_editar_cama", {validacao : erros, cama: cama });
		return;
	}

	var connection = application.config.dbConnection();

	var camaModel = new application.app.models.CamaDAO(connection);

	camaModel.editarCama(cama, function(error, result){

		console.log(error);
		res.redirect('/');
	});
}
