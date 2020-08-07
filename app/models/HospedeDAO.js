function HospedeDAO(connection){
	this._connection = connection;
}

HospedeDAO.prototype.FindAll = function(callback){
		this._connection.query('select * from hospede order by nome', callback);
}

HospedeDAO.prototype.getHospedeForm = function(callback){
		this._connection.query('select id_hospede, nome from hospede order by nome', callback);
}

HospedeDAO.prototype.getHospede = function(id_hospede, callback){
	 	this._connection.query('select * from hospede INNER JOIN endereco_hospede ON hospede.id_hospede = endereco_hospede.id_hospede WHERE hospede.id_hospede = ' + id_hospede.id_hospede, callback);
}

HospedeDAO.prototype.salvarHospede = function(hospede, callback){
	 	this._connection.query('insert into hospede set ? ', hospede, callback);
}

HospedeDAO.prototype.salvarEndereco_hospede = function(endereco, callback){
	 	this._connection.query('insert into endereco_hospede set ? ', endereco, callback);
}

HospedeDAO.prototype.editarHospede = function(hospede, callback) {
		this._connection.query("update hospede SET nome = '" +hospede.nome+ "', telefone = '" +hospede.telefone+ "' where id_hospede = " +hospede.id_hospede, callback);
}

HospedeDAO.prototype.deleteHospede = function(id_hospede, callback) {
		this._connection.query('delete from hospede where id_hospede = ' + id_hospede.id_hospede, callback);
}

module.exports = function(){
	 return HospedeDAO;
}