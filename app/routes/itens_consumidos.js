module.exports = function(application){ 

    application.get('/itens', function(req, res){		
		application.app.controllers.itens_consumidos.viewItens(application, req, res);		
    });

	application.post('/itens', function(req, res){		
		application.app.controllers.itens_consumidos.itens(application, req, res);		
    });

    application.post('/salvarItens', function(req, res){		
		application.app.controllers.itens_consumidos.salvarItens(application, req, res);		
    });
    
    application.post('/editarItens', function(req, res){		
		application.app.controllers.itens_consumidos.editarItens(application, req, res);		
    });

    application.get('/excluirItens', function(req, res){		
		application.app.controllers.itens_consumidos.excluirItens(application, req, res);		
    });

    application.post('/ItensConsumidos', function(req, res){
        application.app.controllers.itens_consumidos.ItensConsumidos(application, req, res);
    });

    application.post('/salvarItemConsumido', function(req, res){
        application.app.controllers.itens_consumidos.salvarItemConsumido(application, req, res);
    });

    application.post('/excluirItemConsumido', function(req, res){
      application.app.controllers.itens_consumidos.excluirItemConsumido(application, req, res);
  });
};