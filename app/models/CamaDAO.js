function CamaDAO(connection){
	this._connection = connection;
}

CamaDAO.prototype.FindAll = function(callback){
		this._connection.query('SELECT c.*, q.nome_quarto, sc.status FROM cama as c INNER JOIN quarto as q ON (c.id_quarto = q.id_quarto) INNER JOIN status_cama as sc ON (c.id_cama = sc.id_cama)', callback);
}

CamaDAO.prototype.InfoCama = function(id_cama, callback){
 	this._connection.query('SELECT c.*, q.nome_quarto, sc.status FROM cama as c INNER JOIN quarto as q ON (c.id_quarto = q.id_quarto) INNER JOIN status_cama as sc ON (c.id_cama = sc.id_cama) where c.id_cama = ' + id_cama.id_cama, callback);
}

CamaDAO.prototype.editarCama = function(cama, callback) {
	this._connection.query("update cama SET  nome_cama = '" +cama.nome_cama+ "', tipo_cama  = '" +cama.tipo_cama + "', valor  = '" +cama.valor +"' where id_cama = " +cama.id_cama, callback);
}

CamaDAO.prototype.getCamasVagas = function(callback){
    this._connection.query("SELECT c.*, q.nome_quarto, sc.status FROM cama as c INNER JOIN quarto as q ON (c.id_quarto = q.id_quarto) INNER JOIN status_cama as sc ON (c.id_cama = sc.id_cama) WHERE sc.status = 'Vago'", callback);
}

CamaDAO.prototype.getCamasOcupadas = function(callback){
    this._connection.query("SELECT c.*, q.nome_quarto, sc.status FROM cama as c INNER JOIN quarto as q ON (c.id_quarto = q.id_quarto) INNER JOIN status_cama as sc ON (c.id_cama = sc.id_cama) WHERE sc.status = 'Ocupado'", callback);
}

CamaDAO.prototype.reservarCama = function(id_cama, callback){
    this._connection.query("update status_cama SET status = 'Ocupado'  where id_cama = " +id_cama, callback);
}

CamaDAO.prototype.checkoutCama = function(id_cama, callback){
 this._connection.query("update status_cama SET status = 'Vago'  where id_cama = " +id_cama, callback);
}

module.exports = function(){
	 return CamaDAO;
}