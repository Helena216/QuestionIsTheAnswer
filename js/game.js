'use strict'

// const MINE = '💣';
// const FLAG = '🚩'

const LAND = 'LAND';
// var MINE = 'https://emojipedia.org/emoji/%F0%9F%92%A3/';
// var FLAG = 'https://emojipedia.org/emoji/%F0%9F%9A%A9/';
var MINE = 'MINE'
var FLAG = 'FLAG'
var gBoard;

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
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var cell = { type: LAND, gameElement: null, isShown : true };
			board[i][j] = cell;
		}
    }
        // Place the Balls (currently randomly chosen positions)
        board[3][2].gameElement = MINE;
        board[0][1].gameElement = MINE;
    
    console.log(board);
    console.table(board);
	return board;
}

function renderBoard(board) {
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			if (currCell.type === LAND) cellClass += ' land';
//			else if (currCell.type === WALL) cellClass += ' wall';

			strHTML += '\t<td class="cell ' + cellClass +
				'"  onclick="moveTo(' + i + ',' + j + ')" >\n';

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

	console.log('strHTML is:');
	console.log(strHTML);
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}
