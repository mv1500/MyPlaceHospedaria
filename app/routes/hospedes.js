module.exports = function(application){ 

	application.get('/hospedes', function(req, res){		
		application.app.controllers.hospede.hospedes(application, req, res);		
	});

	application.get('/hospede', function(req, res){		
		application.app.controllers.hospede.hospede(application, req, res);
	});

	application.get('/cad_hospede', function(req, res){
		application.app.controllers.hospede.cad_hospede(application, req, res);
	});

	application.post('/hospede/salvarHospede', function(req, res){
		application.app.controllers.hospede.salvarHospede(application, req, res);
	});

	application.get('/form_editar_hospede', function(req, res){
		application.app.controllers.hospede.form_editar_hospede(application, req, res);
	});

	application.post('/hospedes/editarHospede', function(req, res){
		application.app.controllers.hospede.editarHospede(application, req, res);
	});

	application.get('/deleteHospede', function(req, res){
		application.app.controllers.hospede.deleteHospede(application, req, res);
	});
};