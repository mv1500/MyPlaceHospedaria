var dateFormat  = require('dateformat');

module.exports.hospedes = function(application, req, res) {
	var connection = application.config.dbConnection();

	var hospedeModel = new application.app.models.HospedeDAO(connection);

	hospedeModel.FindAll(function(error, result){
		res.render('hospede/hospedes', {hospedes : result});
	});
		
}

module.exports.hospede = function(application, req, res) {
	var connection = application.config.dbConnection();

	var hospedeModel = new application.app.models.HospedeDAO(connection);

	var id_hospede = req.query;

	hospedeModel.getHospede(id_hospede, function(error, result){
		
		var hospedeResult = result;

		hospedeResult[0].data_nascimento = dateFormat(hospedeResult[0].data_nascimento,"dd/mm/yyyy");

		res.render('hospede/hospede', {hospede : hospedeResult});
	});
}

module.exports.cad_hospede = function(application, req, res){
	res.render("hospede/cad_hospede", {validacao :{}, hospede : {}});
}

module.exports.salvarHospede = function(application, req, res) {
	
	var form = req.body;

	var hospede = {
		nome : form.nome,
		cpf : form.cpf,
		rg : form.rg,
		idade : form.idade,
		sexo : form.sexo,
		data_nascimento : form.data_nascimento,
		nacionalidade : form.nacionalidade,
		proficao : form.proficao,
		telefone : form.telefone,
		email : form.email,
		motivo_viagem : form.motivo_viagem,
		meio_transporte : form.meio_transporte,
		ultimo_destino : form.ultimo_destino,
		proximo_destino : form.proximo_destino
	};

	var endereco = {
		id_hospede : 0,
		endereco : form.endereco,
		cep : form.cep,
		cidade : form.cidade,
		estado : form.estado,
		pais : form.pais
	}; 

		//req.assert('nome','Nome do hospede é obrigatorio').notEmpty();
		
		//req.assert('data_nascimento','Data de nascimento compra é obrigatorio').notEmpty().isDate({format: 'YYYY-MM-DD'});		

		var erros = req.validationErrors();

		if(erros){
			res.render("hospede/cad_hospede", {validacao : erros, hospede : hospede});
			return;
		}

		var connection = application.config.dbConnection();

		var hospedeModel = new application.app.models.HospedeDAO(connection);
		
		hospedeModel.salvarHospede(hospede, function(error, result){

			endereco.id_hospede = result.insertId;

			hospedeModel.salvarEndereco_hospede(endereco, function(error, result){
				
				console.log(result);
				res.redirect('/hospedes');
					
			});
		});
}

module.exports.form_editar_hospede = function(application, req, res){
	res.send('Em implementação!');
}

module.exports.deleteHospede = function(application, req, res) {
	var connection = application.config.dbConnection();

	var hospedeModel = new application.app.models.HospedeDAO(connection);

	var id_hospede = req.query;

	console.log(id_hospede);

	hospedeModel.deleteHospede(id_hospede, function(error, result){
		res.redirect('/hospedes');
	});	
}
