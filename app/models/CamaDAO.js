function CamaDAO(connection){
	this._connection = connection;
}

CamaDAO.prototype.FindAll = function(callback){
		this._connection.query("SELECT c.*, (SELECT reserva.status from cama INNER JOIN reserva on (cama.id_cama = reserva.id_cama) WHERE reserva.id_cama = c.id_cama and reserva.status = 'Ativo' ORDER by reserva.id_cama LIMIT 1) as status, q.nome_quarto FROM cama as c INNER JOIN quarto as q ON (c.id_quarto = q.id_quarto)", callback);
}

CamaDAO.prototype.FindGetDay = function(callback){
		this._connection.query("SELECT c.*, (SELECT reserva.status from cama INNER JOIN reserva on (cama.id_cama = reserva.id_cama) WHERE reserva.id_cama = c.id_cama and reserva.status = 'Ativo' ORDER by reserva.id_cama LIMIT 1) as status, q.nome_quarto FROM cama as c INNER JOIN quarto as q ON (c.id_quarto = q.id_quarto)", callback);
}

CamaDAO.prototype.InfoCama = function(id_cama, callback){
 	this._connection.query('SELECT c.*, q.nome_quarto FROM cama as c INNER JOIN quarto as q ON (c.id_quarto = q.id_quarto) where c.id_cama = ' + id_cama.id_cama, callback);
}

CamaDAO.prototype.editarCama = function(cama, callback) {
	this._connection.query("update cama SET  nome_cama = '" +cama.nome_cama+ "', tipo_cama  = '" +cama.tipo_cama + "', valor  = '" +cama.valor +"' where id_cama = " +cama.id_cama, callback);
}

CamaDAO.prototype.getCamasVagas = function(callback){
    this._connection.query("SELECT c.*, q.nome_quarto FROM cama as c INNER JOIN quarto as q ON (c.id_quarto = q.id_quarto) WHERE NOT EXISTS (SELECT reserva.status from cama INNER JOIN reserva on (cama.id_cama = reserva.id_cama) WHERE reserva.id_cama = c.id_cama and reserva.status = 'Ativo' ORDER by reserva.checkin LIMIT 1)", callback);
}

CamaDAO.prototype.getCamasOcupadas = function(callback){
    this._connection.query("SELECT c.*, q.nome_quarto FROM cama as c INNER JOIN quarto as q ON (c.id_quarto = q.id_quarto) WHERE EXISTS (SELECT reserva.status from cama INNER JOIN reserva on (cama.id_cama = reserva.id_cama) WHERE reserva.id_cama = c.id_cama and reserva.status = 'Ativo' ORDER by reserva.checkin LIMIT 1)", callback);
}

module.exports = function(){
	 return CamaDAO;
}