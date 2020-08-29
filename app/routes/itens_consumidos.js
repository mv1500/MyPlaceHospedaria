module.exports = function(application){ 

	application.post('/itens', function(req, res){		
		application.app.controllers.itens_consumidos.itens(application, req, res);		
    });
    
    application.post('/ItensConsumidos', function(req, res){
        application.app.controllers.itens_consumidos.ItensConsumidos(application, req, res);
    });

    application.post('/salvarItemConsumido', function(req, res){
        application.app.controllers.itens_consumidos.salvarItemConsumido(application, req, res);
    });
};