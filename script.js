let board;
let currentPlayer;
let gameActive;

function initializeGame() {
    board = Array.from({ length: 6 }, () => Array(7).fill(''));
    currentPlayer = 'Red';
    gameActive = true;
    document.getElementById('message').textContent = `Player ${currentPlayer}'s turn`;
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for (let row = 0; row < 6; ++row) {
        for (let col = 0; col < 7; ++col) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `cell-${row}-${col}`;
            cell.addEventListener('click', () => handleCellClick(col));
            boardElement.appendChild(cell);
        }
    }
}
initializeGame();

function handleCellClick(columnIndex) {
    if (!gameActive) {
        return;
    }
    for (let row = 5; row >= 0; --row) {
        if (board[row][columnIndex] === '') {
            board[row][columnIndex] = currentPlayer;
            const cell = document.getElementById(`cell-${row}-${columnIndex}`);
            cell.style.backgroundColor = currentPlayer;
            cell.classList.add('occupied');
            if (checkWin()) {
                document.getElementById('message').textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
                return;
            }
            if (checkDraw()) {
                document.getElementById('message').textContent = "It's a draw!";
                gameActive = false;
                return;
            }
            currentPlayer = (currentPlayer === 'Red') ? 'Yellow' : 'Red';
            document.getElementById('message').textContent = `Player ${currentPlayer}'s turn`;
            break;
        }
    }       
}

function checkWin() {
    for (let row = 0; row < 6; ++row) {
        for (let col = 0; col < 4; ++col) {
            if (board[row][col] && board[row][col] === board[row][col + 1] && 
                board[row][col] === board[row][col + 2] && board[row][col] === board[row][col + 3]) {
                return true;
            }
        }
    }
    for (let col = 0; col < 7; ++col) {
        for (let row = 0; row < 3; ++row) {
            if (board[row][col] && board[row][col] === board[row + 1][col] && 
                board[row][col] === board[row + 2][col] && board[row][col] === board[row + 3][col]) {
                return true;
            }
        }
    }
    for (let row = 3; row < 6; ++row) {
        for (let col = 0; col < 4; ++col) {
            if (board[row][col] && board[row][col] === board[row - 1][col + 1] &&
                board[row][col] === board[row - 2][col + 2] && board[row][col] === board[row - 3][col + 3]) {
                return true;
            }
        }
    }
    for (let row = 0; row < 3; ++row) {
        for (let col = 0; col < 4; ++col) {
            if (board[row][col] && board[row][col] === board[row + 1][col + 1] && 
                board[row][col] === board[row + 2][col + 2] && board[row][col] === board[row + 3][col + 3]) {
                return true;
            }
        }
    }
    return false;
}     

function checkDraw() {
    return board.every(row => row.every(cell => cell !== ''));
}

function restartGame() {
    initializeGame();
}