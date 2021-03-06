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
        
        if(reservaResult[0].status != 'Ativo'){
            reservaResult[0].data_checkout = dateFormat(reservaResult[0].data_checkout,"dd/mm/yyyy HH:MM");
        }

		res.render('reserva/reserva', {reserva : reservaResult});
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

module.exports.extrato_reserva = function(application, req, res) {
	var connection = application.config.dbConnection();

    var reservaModel = new application.app.models.ReservaDAO(connection);
    
    var itens_consumidos = new application.app.models.ItensConsumoDAO(connection);

    var id_reserva = req.query;
        
    var dadosExtrato = {reserva: {}, itensConsumidos: {}, totalConsumo: 0, totalDiarias: 0, valorTotal: 0}

	reservaModel.getReserva(id_reserva, function(error, result){

        var reservaResult = result;

        reservaResult[0].diaras = getDiarias(reservaResult[0].checkin, reservaResult[0].data_checkout);

        reservaResult[0].checkin = dateFormat(reservaResult[0].checkin,"dd/mm/yyyy HH:MM");
        
        if(reservaResult[0].status != 'Ativo'){
            reservaResult[0].data_checkout = dateFormat(reservaResult[0].data_checkout,"dd/mm/yyyy HH:MM");
        }	
        dadosExtrato.reserva = reservaResult;     

        dadosExtrato.totalDiarias = reservaResult[0].diaras * reservaResult[0].valor;
    });
    
    itens_consumidos.FindItensConsumidos(id_reserva.id_reserva, function(error, result){
        dadosExtrato.itensConsumidos = result;

        dadosExtrato.itensConsumidos.forEach(element => { 
			element.data_consumo = dateFormat(element.data_consumo,"dd/mm/yyyy HH:MM");   
			dadosExtrato.totalConsumo = dadosExtrato.totalConsumo + parseInt(element.valor_total);         
		});

        dadosExtrato.valorTotal = dadosExtrato.totalDiarias + dadosExtrato.totalConsumo;
        console.log(dadosExtrato);

        res.render('reserva/extrato_reserva', {dadosExtrato : dadosExtrato});
    });
}

function getDiarias(checkin, checkout){
    
    var segundosDia = 1000*24*60*60;

    checkin = dateFormat(checkin,"yyyy-mm-dd");

    checkout = dateFormat(checkout,"yyyy-mm-dd");

    var datasDiarias = {
        checkin : new Date(checkin),
        checkout : new Date(checkout)
    }
    
    var diferencaTime = datasDiarias.checkout.getTime() - datasDiarias.checkin.getTime();

    var diarias = diferencaTime / segundosDia;

    console.log(diarias);

    return diarias;
}

module.exports.cad_reserva = function(application, req, res){
    var reservaForm = {formDataQuarto : {}, formDataHospede : {}};
    
    var connection = application.config.dbConnection();

    var camaModel = new application.app.models.CamaDAO(connection);
    
    camaModel.getCamasVagas(function(error, result){
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
        
        res.redirect('/reservas');        
    });
}

module.exports.checkout = function(application, req, res){
    var connection = application.config.dbConnection();

    var reservaModel = new application.app.models.ReservaDAO(connection);

    var camaModel = new application.app.models.CamaDAO(connection);

    var checkout = req.body;

    checkout.status = "Finalizada";
   
    reservaModel.checkoutReserva(checkout,function(error, result){    
          res.redirect('/extrato_reserva?id_reserva='+checkout.id_reserva);        
    });	
}
 
module.exports.deleteReserva = function(application, req, res) {
    var connection = application.config.dbConnection();

    var reservaModel = new application.app.models.ReservaDAO(connection);

    var camaModel = new application.app.models.CamaDAO(connection);

    var id_reserva = req.query;

    reservaModel.deleteReserva(id_reserva, function(error, result){        
        res.redirect('/reservas');    
    });	
}


   

  