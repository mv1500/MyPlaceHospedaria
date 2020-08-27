var dateFormat  = require('dateformat');

module.exports.camas = function(application, req, res) {
	var connection = application.config.dbConnection();

	var camaModel = new application.app.models.CamaDAO(connection);

	camaModel.FindAll(function(error, result){        
	
		var quartos = ajusteQuartos(result);
	    
        res.render('cama/index', {quartos : quartos});
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

function ajusteQuartos (quartos){
	var quartosResult = quartos;

		var quartos = [];

		var ultQuarto = 0;
		
		quartosResult.forEach(element => { 
			
			var statusCama = '';

			if(element.status == 'Ativo'){
				statusCama = 'Ocupado';
			}else {
				statusCama = 'Vago';
			}

			if(ultQuarto != element.id_quarto){
				quartos.push( {nome : element.nome_quarto, camas: []});

				ultQuarto = element.id_quarto;
			}
			
			for(i = 0; i < quartos.length; i++){
				if(quartos[i].nome == element.nome_quarto){

					quartos[i].camas.push({
						id_cama: element.id_cama,
						id_quarto: element.id_quarto,
						nome_cama: element.nome_cama,
						tipo_cama: element.tipo_cama,
						valor: element.valor,
						nome_quarto: element.nome_quarto,
						status: statusCama
					});					
				}				
			}	
		});

		return quartos;
}