function ItensConsumoDAO(connection){
	this._connection = connection;
}

// Items
ItensConsumoDAO.prototype.ItensFindAll = function(callback){
		this._connection.query("select * from itens order by nome_item", callback);
}

ItensConsumoDAO.prototype.salvarItem = function(item, callback){
		this._connection.query("insert into Itens set ?", item, callback);
}

ItensConsumoDAO.prototype.editarItem = function(item, callback){
		this._connection.query("update itens SET nome_item = '" + item.nome_item+ "', valor = "+item.valor+" where id_item = "+item.id_item, callback);
}

ItensConsumoDAO.prototype.excluirItem = function(id_item, callback){
		this._connection.query("delete from itens where id_item = "+id_item, callback);
}


//Itens consumidos
ItensConsumoDAO.prototype.FindItensConsumidos = function(id_reserva, callback){
		this._connection.query("SELECT i.*, ic.* FROM item_consumo as ic inner join itens as i on (ic.id_item = i.id_item) where ic.id_reserva = " +id_reserva +" order by data_consumo desc", callback);
}

ItensConsumoDAO.prototype.salvarItemConsumido = function(itemConsumido, callback){
		this._connection.query("insert into item_consumo set ?", itemConsumido, callback);
}

ItensConsumoDAO.prototype.editarItemConsumido = function(item_consumo, callback){
		this._connection.query("update item SET id_item = '" +item_consumo.id_item+ "' id_reserva = '" +item_consumo.id_reserva+ "' quantidade = '" +item_consumo.quantidade+ "' desconto = '" +item_consumo.desconto+ "' valor_total = '" +item_consumo.valor_total+ "' where id_item_consumo = " +item_consumo.id_item_consumo, callback);
}

ItensConsumoDAO.prototype.excluirItemConsumido = function(id_item_consumo, callback){
		this._connection.query("delete from item_consumo where id_item_consumo = "+id_item_consumo, callback);
}

module.exports = function(){
	 return ItensConsumoDAO;
}