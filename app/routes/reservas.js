module.exports = function(application){ 
  
    application.get('/reservas', function(req, res){		
      application.app.controllers.reserva.reservas(application, req, res);		
    });

    application.get('/historico_reserva', function(req, res){		
      application.app.controllers.reserva.historicoReserva(application, req, res);		
    });

    application.get('/reserva', function(req, res){		
		  application.app.controllers.reserva.reserva(application, req, res);		
    });

    application.get('/cad_reserva', function(req, res){		
		application.app.controllers.reserva.cad_reserva(application, req, res);		
    });
    
    application.post('/salvarReserva', function(req, res){
        application.app.controllers.reserva.salvarReserva(application, req, res);
    });

    application.post('/checkoutReserva', function(req, res){
      application.app.controllers.reserva.checkout(application, req, res);
    });

    application.get('/deleteReserva', function(req, res){
        application.app.controllers.reserva.deleteReserva(application, req, res);
    });

};