'use strict'

const LAND = 'LAND';
var MINE = 'MINE'
var FLAG = 'FLAG'
var gBoard;
var gLevel = {
	SIZE: 4,
	MINES: 2
}
var gGame = {
	isON: false,
	shownCount: 0,
	markedCount: 0,
	secsPassed: 0
}

var MINE_IMG = '<img src="img2/mine.png" />';
var FLAG_IMG = '<img src="img2/flag.png" />';

function initGame() {
	gBoard = buildBoard();
	renderBoard(gBoard);
}

function buildBoard() {
	// Create the Matrix
	var board = createMat(4, 4)
	// Put FLOOR everywhere and WALL at edges
	var gNextId = 101
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var cell = {
				id: (i + '-' + j),
				type: LAND,
				gameElement: null,
				minesAroundCount: 4,
				isShown: true,
				isMine: false,
				isMarked: true
			};
			board[i][j] = cell;
		}
	}
	board[3][2].gameElement = MINE;
	board[0][1].gameElement = MINE;

	console.log(board);
	console.table(board);
	return board;
}

function findMines(board, MINE) {
	var res = [];
	for (var i = 0; i < board.length; i++) {
		if (i < 0 || i > board.length - 1) continue;
		for (var j = 0; j < board[0].length; j++) {
			if (j < 0 || j > board[0].length - 1) continue;
			if (board[i][j] === MINE) {
				board[i][j] = []
				res.push(board[i][j])
			}
		}
	}
	return res;
}

function createMat(ROWS, COLS) {
	var mat = []
	for (var i = 0; i < ROWS; i++) {
		var row = []
		for (var j = 0; j < COLS; j++) {
			row.push('')
		}
		mat.push(row)
	}
	return mat
}

function renderBoard(board) {
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			if (currCell.type === LAND) cellClass += ' land';

			strHTML += '\t<td class="cell ' + cellClass +
				'"  onclick="cellClicked(' + i + ',' + j + ')" >\n';

			if (currCell.gameElement === MINE) {
				strHTML += MINE_IMG;
				//strHTML += '@'
			} else if (currCell.gameElement === FLAG) {
				//strHTML += '*'
				strHTML += FLAG_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}

	function cellClicked(elCell, i, j) {
		var cell = gBoard[i][j]
		console.log('Cell clicked: ', i, j, cell);
		if (cell = MINE) endsGame()
		if (cell = isMarked) unmarkCell()
		if (cell = !isShown) showCell();
	}
}

console.log('strHTML is:');
console.log(strHTML);
var elBoard = document.querySelector('.board');
elBoard.innerHTML = strHTML;




function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}



