var dateFormat  = require('dateformat');

module.exports.reservas = function(application, req, res) {
	var connection = application.config.dbConnection();

	var reservaModel = new application.app.models.ReservaDAO(connection);

	reservaModel.FindAtivas(function(error, result){        
        var reservasResult = result;
        
        reservasResult.forEach(element => { 
            element.checkin = dateFormat(element.checkin,"dd/mm/yyyy HH:MM");
          }); 

        res.render('reserva/reservas', {reservas : reservasResult});
	});		
}

module.exports.historicoReserva = function(application, req, res) {
	var connection = application.config.dbConnection();

	var reservaModel = new application.app.models.ReservaDAO(connection);

	reservaModel.FindAll(function(error, result){        
        var reservasResult = result;
        
        reservasResult.forEach(element => { 
            element.checkin = dateFormat(element.checkin,"dd/mm/yyyy HH:MM");

            if(element.status == 'Finalizada'){
                element.data_checkout = dateFormat(element.data_checkout,"dd/mm/yyyy HH:MM");
            }
          }); 

        res.render('reserva/historico_reserva', {reservas : reservasResult});
	});
}

module.exports.reserva = function(application, req, res) {
	var connection = application.config.dbConnection();

	var reservaModel = new application.app.models.ReservaDAO(connection);

	var id_reserva = req.query;

	reservaModel.getReserva(id_reserva, function(error, result){
		
		var reservaResult = result;

        reservaResult[0].checkin = dateFormat(reservaResult[0].checkin,"dd/mm/yyyy HH:MM");
        
        reservaResult[0].data_checkout = dateFormat(reservaResult[0].data_checkout,"dd/mm/yyyy HH:MM");

		res.render('reserva/reserva', {reserva : reservaResult});
	});
}

module.exports.cad_reserva = function(application, req, res){
    var reservaForm = {formDataQuarto : {}, formDataHospede : {}};

    var connection = application.config.dbConnection();

    var reservaModel = new application.app.models.ReservaDAO(connection);
    
    reservaModel.formQuarto(function(error, result){
        reservaForm.formDataQuarto = result;

    });	
    
    var hospedeModel = new application.app.models.HospedeDAO(connection);

    hospedeModel.getHospedeForm(function(error, result){
        reservaForm.formDataHospede = result;

        res.render("reserva/cad_reserva", {validacao :{}, reserva : {}, formDataQuarto : reservaForm.formDataQuarto, formDataHospede : reservaForm.formDataHospede});

    });
}

module.exports.salvarReserva = function(application, req, res) {
	
	var reserva = req.body;

    //req.assert('nome','Nome do hospede é obrigatorio').notEmpty();
    
    //req.assert('data_nascimento','Data de nascimento compra é obrigatorio').notEmpty().isDate({format: 'YYYY-MM-DD'});		

    var erros = req.validationErrors();

    if(erros){
        res.render("reserva/cad_reserva", {validacao : erros, reserva : reserva});
        return;
    }

    var connection = application.config.dbConnection();

    var reservaModel = new application.app.models.ReservaDAO(connection);

    var camaModel = new application.app.models.CamaDAO(connection);

    reservaModel.salvarReserva(reserva, function(error, result){       
        
        if(result){
            console.log(result);
            camaModel.reservarCama(reserva.id_cama, function(error, result){
                res.redirect('/reservas');        
            });
        } else{
            res.render("reserva/cad_reserva", {validacao : error, reserva : reserva});  
            return;         
        }
    });
}

module.exports.checkout = function(application, req, res){
    var connection = application.config.dbConnection();

    var reservaModel = new application.app.models.ReservaDAO(connection);

    var camaModel = new application.app.models.CamaDAO(connection);

    var checkout = req.body;

    checkout.status = "Finalizada";

    console.log(checkout);
    
    reservaModel.checkoutReserva(checkout,function(error, result){
    
        camaModel.checkoutCama(checkout.id_cama, function(error, result){
            res.redirect('/reservas');    
        });        
    
    });	
}
 
module.exports.deleteReserva = function(application, req, res) {
    var connection = application.config.dbConnection();

    var reservaModel = new application.app.models.ReservaDAO(connection);

    var camaModel = new application.app.models.CamaDAO(connection);

    var id_reserva = req.query;

    console.log(id_reserva);

    reservaModel.deleteReserva(id_reserva, function(error, result){
        
        camaModel.checkoutQuarto(id_reserva.id_cama, function(error, result){
            res.redirect('/reservas');    
        });        
    });	
}

