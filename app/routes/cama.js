module.exports = function(application){ 

	application.get('/', function(req, res){		
		application.app.controllers.cama.camasVagas(application, req, res);		
    });
    
    application.get('/lista_camas', function(req, res){
        application.app.controllers.cama.camas(application, req, res);
    });

    application.get('/form_editar_cama', function(req, res){
        application.app.controllers.cama.form_editar_cama(application, req, res);
    });

    application.post('/editar_cama', function(req, res){
        application.app.controllers.cama.editar_camas(application, req, res);
    });
};