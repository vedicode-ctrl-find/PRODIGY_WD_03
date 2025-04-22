const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');
const gifContainer = document.getElementById('gifContainer');

let currentPlayer = 'X';
let board = Array(9).fill('');
let gameActive = true;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleClick(index, cell) {
  if (!gameActive || board[index] !== '') return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  if (checkWin(currentPlayer)) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gifContainer.innerHTML = `<img src="winner.gif" alt="Winner GIF" />`; // Place your gif in same folder
    gifContainer.style.display = 'block';
    gameActive = false;
  } else if (board.every(cell => cell !== '')) {
    statusText.textContent = "🤝 It's a Draw!";
    gifContainer.innerHTML = `<img src="draw.gif" alt="Draw GIF" />`;
    gifContainer.style.display = 'block';
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWin(player) {
  return winningCombinations.some(combination =>
    combination.every(index => board[index] === player)
  );
}

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  gifContainer.style.display = 'none';
  gifContainer.innerHTML = '';

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
}

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleClick(index, cell));
});

resetButton.addEventListener('click', resetGame);
