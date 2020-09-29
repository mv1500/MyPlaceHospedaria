CREATE database myplace_hospedaria;

CREATE TABLE `cama` (
  `id_cama` int(11) NOT NULL,
  `id_quarto` int(11) NOT NULL,
  `nome_cama` varchar(100) NOT NULL,
  `tipo_cama` varchar(100) NOT NULL,
  `valor` decimal(7,2) NOT NULL
);



INSERT INTO `cama` (`id_cama`, `id_quarto`, `nome_cama`, `tipo_cama`, `valor`) VALUES
(1, 1, 'Cama beliche feminina 01', 'Beliche(parte de cima)', '30.00'),
(2, 1, 'Cama beliche feminina 02', 'Beliche(parte de baixo)', '50.00'),
(3, 1, 'Cama beliche feminina', 'Beliche(parte de cima)', '50.00'),
(4, 1, 'Cama beliche feminina', 'Beliche(parte de baixo)', '50.00'),
(5, 1, 'Cama beliche feminina', 'Beliche(parte de cima)', '50.00'),
(6, 1, 'Cama beliche feminina', 'Beliche(parte de baixo)', '50.00'),
(7, 1, 'Cama beliche feminina', 'Beliche(parte de cima)', '50.00'),
(8, 1, 'Cama beliche feminina', 'Beliche(parte de baixo)', '50.00'),
(9, 2, 'Cama beliche masculina', 'Beliche(parte de cima)', '50.00'),
(10, 2, 'Cama beliche masculina', 'Beliche(parte de baixo)', '50.00'),
(11, 2, 'Cama beliche masculina', 'Beliche(parte de cima)', '50.00'),
(12, 2, 'Cama beliche masculina', 'Beliche(parte de baixo)', '50.00'),
(13, 2, 'Cama beliche masculina', 'Beliche(parte de cima)', '50.00'),
(14, 2, 'Cama beliche masculina', 'Beliche(parte de baixo)', '50.00'),
(15, 2, 'Cama beliche masculina', 'Beliche(parte de cima)', '50.00'),
(16, 2, 'Cama beliche masculina', 'Beliche(parte de baixo)', '50.00'),
(17, 3, 'Cama box solteiro', 'Box solteiro', '50.00'),
(18, 3, 'Cama box solteiro', 'Box solteiro', '50.00'),
(19, 3, 'Cama box solteiro', 'Box solteiro', '50.00'),
(20, 3, 'Cama box solteiro', 'Box solteiro', '50.00'),
(21, 4, 'Cama suite casal', 'casal', '50.00'),
(22, 5, 'Cama box solteiro', 'Box solteiro', '50.00'),
(23, 5, 'Cama box solteiro', 'Box solteiro', '50.00'),
(24, 5, 'Cama box solteiro', 'Box solteiro', '50.00'),
(25, 6, 'Cama box solteiro', 'Box solteiro', '50.00'),
(26, 6, 'Cama box solteiro', 'Box solteiro', '50.00'),
(27, 6, 'Cama box solteiro', 'Box solteiro', '50.00'),
(28, 6, 'Cama box solteiro', 'Box solteiro', '50.00');



CREATE TABLE `endereco_hospede` (
  `id_endereco` int(11) NOT NULL,
  `id_hospede` int(11) NOT NULL,
  `endereco` varchar(400) NOT NULL,
  `cep` varchar(30) NOT NULL,
  `cidade` varchar(30) NOT NULL,
  `estado` varchar(30) NOT NULL,
  `pais` varchar(30) NOT NULL
);



CREATE TABLE `hospede` (
  `id_hospede` int(11) NOT NULL,
  `nome` varchar(200) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `cpf` varchar(20) NOT NULL,
  `rg` varchar(20) NOT NULL,
  `nacionalidade` varchar(60) NOT NULL,
  `proficao` varchar(150) NOT NULL,
  `sexo` varchar(20) NOT NULL,
  `data_nascimento` date NOT NULL,
  `idade` int(11) NOT NULL,
  `motivo_viagem` varchar(100) NOT NULL,
  `meio_transporte` varchar(100) NOT NULL,
  `ultimo_destino` varchar(100) NOT NULL,
  `proximo_destino` varchar(100) NOT NULL,
  `data_cadastro` datetime NOT NULL DEFAULT current_timestamp()
);



CREATE TABLE `item_consumo` (
  `id_item_consumo` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_reserva` int(11) NOT NULL,
  `data_consumo` datetime NOT NULL DEFAULT current_timestamp(),
  `quantidade` int(11) NOT NULL,
  `desconto` int(11) NOT NULL,
  `valor_total` decimal(7,2) NOT NULL
);



CREATE TABLE `itens` (
  `id_item` int(11) NOT NULL,
  `nome_item` varchar(200) NOT NULL,
  `valor` float(7,2) NOT NULL
);



CREATE TABLE `quarto` (
  `id_quarto` int(11) NOT NULL,
  `nome_quarto` varchar(100) NOT NULL,
  `descricao` text NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `qnt_camas` int(11) NOT NULL
);



INSERT INTO `quarto` (`id_quarto`, `nome_quarto`, `descricao`, `categoria`, `qnt_camas`) VALUES
(1, 'Quarto coletivo feminino', 'Quarto coletivo feminino com 8 camas beliche.', 'Coletivo feminino', 8),
(2, 'Quarto coletivo masculino', 'Quarto coletivo masculino com 8 camas beliche.', 'Coletivo masculino', 8),
(3, 'Quarto quadruplo misto', 'Quarto quadruplo misto com 4 camas box solteiro.', 'Coletivo misto', 4),
(4, 'Suíte casal', 'Suíte casal.', 'Suíte casal', 1),
(5, 'Quarto triplo misto', 'Quarto triplo misto com 3 camas solteiro.', 'Coletivo misto', 3),
(6, 'Quarto corredor', 'Quarto corredor com 4 camas solteiro.', 'Quarto corredor', 4);


CREATE TABLE `reserva` (
  `id_reserva` int(11) NOT NULL,
  `id_cama` int(11) NOT NULL,
  `id_hospede` int(11) NOT NULL,
  `checkin` datetime NOT NULL,
  `data_checkout` datetime NOT NULL,
  `status` varchar(30) NOT NULL,
  `data_cadastro` datetime NOT NULL DEFAULT current_timestamp()
);



INSERT INTO `reserva` (`id_reserva`, `id_cama`, `id_hospede`, `checkin`, `data_checkout`, `status`, `data_cadastro`) VALUES
(9, 17, 7, '2020-07-24 00:59:00', '2020-07-27 01:49:00', 'Finalizada', '2020-07-24 01:00:01'),
(10, 10, 8, '2020-07-27 02:01:00', '2020-09-27 00:00:00', 'Ativo', '2020-07-27 02:01:16'),
(11, 1, 6, '2020-07-27 02:02:00', '2020-07-27 00:00:00', 'Ativo', '2020-07-27 02:03:01'),
(13, 1, 6, '2020-07-31 15:21:00', '2020-07-31 15:26:00', 'Finalizada', '2020-07-31 15:22:13'),
(14, 3, 10, '2020-09-28 13:40:00', '2020-09-29 13:00:00', 'Finalizada', '2020-08-27 13:40:24'),
(15, 11, 7, '2020-08-29 00:00:00', '2000-09-28 00:00:00', 'Ativo', '2020-08-27 14:23:02');


ALTER TABLE `cama`
  ADD PRIMARY KEY (`id_cama`);


ALTER TABLE `endereco_hospede`
  ADD PRIMARY KEY (`id_endereco`);


ALTER TABLE `hospede`
  ADD PRIMARY KEY (`id_hospede`);


ALTER TABLE `item_consumo`
  ADD PRIMARY KEY (`id_item_consumo`);

ALTER TABLE `itens`
  ADD PRIMARY KEY (`id_item`);


ALTER TABLE `quarto`
  ADD PRIMARY KEY (`id_quarto`);


ALTER TABLE `reserva`
  ADD PRIMARY KEY (`id_reserva`);


ALTER TABLE `cama`
  MODIFY `id_cama` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

ALTER TABLE `quarto`
  MODIFY `id_quarto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;


