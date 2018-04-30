$(document).ready(function () {
	var Tictacteo = function () {
		// Simbolos utilizados
		this.PlayerOne = 'X';
		this.PlayerTwo = 'O';

		// Mapeamento das maneiras de como vencer
		this.WinPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];
		this.CurrentPlayer = 'X';
		/**
		* Essa função poderia setar o modo de jogo caso fosse necessario implementar multi player
		*/
		this.setGameMode = function (mode) {
			this.GameMode = mode;
		}

		/**
		* Essa função realiza o Jogo. Seleciona a celula que recebe o parametro x ou o
		*/
		this.Game = function (cell) {
			$(cell).addClass("selectedBy" + this.CurrentPlayer);
			$(cell).html(this.CurrentPlayer);
			if (!game.checkWinner()) {
				this.swapCurrentPlayer();
			}
		}

		/**
		* Função de verificação de celula, esta função verifica se a celula está vazia ou não.
		* 
		*/
		this.selectCell = function (cell) {
			if ($(cell).hasClass("selectedBy" + this.PlayerOne) || $(cell).hasClass("selectedBy" + this.PlayerTwo)) {
				console.log("Esta celula ja foi selecionada");
				$("#message").text("Esta celula ja foi selecionada. Selecione Outra!");
				return false;
			}

			this.Game(cell);
		}
		/**
		* Essa função alterna a jogabilidade entre os jogadores.
		*/
		this.swapCurrentPlayer = function () {
			if (this.CurrentPlayer == this.PlayerOne) {
				this.CurrentPlayer = this.PlayerTwo;
			} else {
				this.CurrentPlayer = this.PlayerOne;
			}
			$("#message").text("Hora do " + this.CurrentPlayer + " jogar");
		}

		/**
		* Esta função verifica se temos algum vencedor. a função que verifica se existe ou não
		*  um vencedor é a checkResult.
		*/
		this.checkWinner = function () {
			var selectedGrids = '';
			var selectedByX = $("#tictactoe-board td.selectedByX");
			var selectedByO = $("#tictactoe-board td.selectedByO");
			if (this.CurrentPlayer == this.PlayerOne) {
				if (selectedByX.length >= 3) {
					selectedGrids = $('#tictactoe-board td.selectedByX').map(function () {
						return $(this).attr("id").substring(5);
					}).get();
					if (this.checkResult(selectedGrids)) {
						return true;
					}
				}
			} else {
				if (selectedByO.length >= 3) {
					selectedGrids = $('#tictactoe-board td.selectedByO').map(function () {
						return $(this).attr("id").substring(5);
					}).get();
					if (this.checkResult(selectedGrids)) {
						return true;
					}
				}
			} if ((selectedByO.length + selectedByX.length) === 9) {
				$("#result").text("Empate");
				$('#myModal').modal('show')
				this.resetGame();
			}
		}
		/**
		* Esta função compara as celulas preenchidas com o mapemanto de jogadas vitoriosas
		* caso exista alguma combinação vitoriosa resultado mostrado pro usuario
		* checkResult = função que checa os resultados
		* gridCount = Conta as grids que foram selecionadas pelos usuarios 
		*/
		this.checkResult = function (selectedGrids) {
			gridCount = 0;
			var temp = this;
			$.each(this.WinPatterns, function (index, value) {
				$.each(value, function (index, pattern) {
					if ($.inArray(pattern.toString(), selectedGrids) > -1) {
						gridCount++;
					}
				});
					if (gridCount === 3) {//if que mostra caso tenha algum vencedor
						$("#result").text("Jogador " + temp.CurrentPlayer + " venceu o jogo");
						$('#myModal').modal('toggle')
						temp.resetGame();
						gridCount = 0;
						return true;
					}
					gridCount = 0;
				});	
		}

		/**
		* Essa função reseta o jogo limpando todas as grids.
		*/
		this.resetGame = function () {
			this.CurrentPlayer = 'X';
			this.cleanUpGrid();
		}
		/**
		* Essa função limpa todas as grids e todas as classes.
		*/
		this.cleanUpGrid = function () {
			$("#tictactoe-board td").html('');
			$("#tictactoe-board td").attr('class', '');
		}
	}
	// Instancia do jogo para iniciação
	var game = new Tictacteo();

	// Click que realiza o reset no jogo
	$("#resetGame").click(function (e) {
		game.resetGame();
	});
	// Evento que realiza o ato de seleção da celula.
	$("#tictactoe-board td").click(function (e) {
		game.selectCell($(this));
	});
});
