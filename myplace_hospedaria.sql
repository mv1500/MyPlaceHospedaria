CREATE database myplace_hospedaria;


CREATE TABLE `cama` (
  `id_cama` int(11) NOT NULL,
  `id_quarto` int(11) NOT NULL,
  `nome_cama` varchar(100) NOT NULL,
  `tipo_cama` varchar(100) NOT NULL,
  `valor` decimal(7,2) NOT NULL
);


INSERT INTO `cama` (`id_cama`, `id_quarto`, `nome_cama`, `tipo_cama`, `valor`) VALUES
(1, 1, 'Cama beliche feminina', 'Beliche(parte de cima)', '50.00'),
(2, 1, 'Cama beliche feminina', 'Beliche(parte de baixo)', '50.00'),
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

CREATE TABLE `quarto` (
  `id_quarto` int(11) NOT NULL,
  `nome_quarto` varchar(100) NOT NULL,
  `descricao` text NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `qnt_camas` int(11) NOT NULL
);

INSERT INTO `quarto` (`id_quarto`, `nome_quarto`, `descricao`, `categoria`, `qnt_camas`) VALUES
(1, 'Quarto coletivo feminino', 'Quarto coletivo feminino com 8 camas beliche.', 'coletivo feminino', 8),
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

CREATE TABLE `status_cama` (
  `id_statusCama` int(11) NOT NULL,
  `id_cama` int(11) NOT NULL,
  `status` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `status_cama` (`id_statusCama`, `id_cama`, `status`) VALUES
(1, 1, 'Vago'),
(2, 2, 'Vago'),
(3, 3, 'Vago'),
(4, 4, 'Vago'),
(5, 5, 'Vago'),
(6, 6, 'Vago'),
(7, 7, 'Vago'),
(8, 8, 'Vago'),
(9, 9, 'Vago'),
(10, 10, 'Vago'),
(11, 11, 'Vago'),
(12, 12, 'Vago'),
(13, 13, 'Vago'),
(14, 14, 'Vago'),
(15, 15, 'Vago'),
(16, 16, 'Vago'),
(17, 17, 'Vago'),
(18, 18, 'Vago'),
(19, 19, 'Vago'),
(20, 20, 'Vago'),
(21, 21, 'Vago'),
(22, 22, 'Vago'),
(23, 23, 'Vago'),
(24, 24, 'Vago'),
(25, 25, 'Vago'),
(26, 26, 'Vago'),
(27, 27, 'Vago'),
(28, 28, 'Vago');


ALTER TABLE `cama`
  ADD PRIMARY KEY (`id_cama`);


ALTER TABLE `endereco_hospede`
  ADD PRIMARY KEY (`id_endereco`);

ALTER TABLE `hospede`
  ADD PRIMARY KEY (`id_hospede`);

ALTER TABLE `quarto`
  ADD PRIMARY KEY (`id_quarto`);

ALTER TABLE `reserva`
  ADD PRIMARY KEY (`id_reserva`);

ALTER TABLE `status_cama`
  ADD PRIMARY KEY (`id_statusCama`);


ALTER TABLE `cama`
  MODIFY `id_cama` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de tabela `endereco_hospede`
--
ALTER TABLE `endereco_hospede`
  MODIFY `id_endereco` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de tabela `hospede`
--
ALTER TABLE `hospede`
  MODIFY `id_hospede` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de tabela `quarto`
--
ALTER TABLE `quarto`
  MODIFY `id_quarto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de tabela `status_cama`
--
ALTER TABLE `status_cama`
  MODIFY `id_statusCama` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
