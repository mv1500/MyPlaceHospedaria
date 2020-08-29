function ReservaDAO(connection){
	this._connection = connection;
}

ReservaDAO.prototype.FindAll = function(callback){
	this._connection.query("SELECT h.nome, q.nome_quarto, c.id_cama, c.nome_cama, r.* FROM reserva as r INNER JOIN hospede as h ON (r.id_hospede = h.id_hospede) INNER JOIN cama as c ON (r.id_cama = c.id_cama) INNER JOIN quarto as q ON (c.id_quarto = q.id_quarto) order by r.checkin desc", callback);
}

ReservaDAO.prototype.FindAtivas = function(callback){
	this._connection.query("SELECT h.nome, q.nome_quarto, c.id_cama, c.nome_cama, r.id_reserva, r.checkin, r.status FROM reserva as r INNER JOIN hospede as h ON (r.id_hospede = h.id_hospede) INNER JOIN cama as c ON (r.id_cama = c.id_cama) INNER JOIN quarto as q ON (c.id_quarto = q.id_quarto) WHERE r.status = 'Ativo' order by r.checkin desc", callback);
}

ReservaDAO.prototype.getReserva = function(id_reserva, callback){
 	this._connection.query('SELECT r*, h.id_hospede, h.nome, c.id_cama, c.nome_cama, q.nome_quarto FROM reserva as r INNER JOIN hospede as h ON (r.id_hospede = h.id_hospede) INNER JOIN cama as c ON (r.id_cama = c.id_cama) INNER JOIN quarto as q ON (c.id_quarto = c.id_quarto) WHERE r.id_reserva = ' + id_reserva.id_reserva, callback);
}

ReservaDAO.prototype.salvarReserva = function(reserva, callback){
 	this._connection.query('insert into reserva set ? ', reserva, callback);
}

ReservaDAO.prototype.editarReserva = function(reserva, callback) {
	this._connection.query("update reserva SET id_cama = '" +reserva.id_cama+ "', id_hospede = '" +reserva.id_hospede+ "', checkin  = '" +reserva.checkin + "', data_checkout = '" +reserva.data_checkout+"', id_hospede = '" +reserva.data_saida+"', hora_saida = '" +reserva.hora_saida+"', numero_acompanhantes = '" +reserva.numero_acompanhantes+"', status = '" +reserva.status+ "' where id_reserva = " +reserva.id_reserva, callback);
}

ReservaDAO.prototype.checkoutReserva = function(checkout, callback) {
	this._connection.query("update reserva SET data_checkout = '" +checkout.data_checkout+ "', status = '" +checkout.status+ "' where id_reserva = " +checkout.id_reserva, callback);
}

ReservaDAO.prototype.deleteReserva = function(id_reserva, callback) {
	this._connection.query('delete from reserva where id_reserva = ' + id_reserva.id_reserva, callback);
}

ReservaDAO.prototype.formQuarto = function(callback){
   this._connection.query("SELECT c.id_cama, c.nome_cama, q.id_quarto, q.nome_quarto, s.status FROM cama as c INNER JOIN quarto as q ON (c.id_quarto = q.id_quarto) INNER JOIN status_cama as s ON (c.id_cama = s.id_cama) where s.status ='vago'", callback);
}

module.exports = function(){
	 return ReservaDAO;
}