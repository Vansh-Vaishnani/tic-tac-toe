/* ================= GAMEBOARD MODULE ================= */
const Gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const setMark = (index, mark) => {
    if (board[index] !== "") return false;
    board[index] = mark;
    return true;
  };

  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { getBoard, setMark, reset };
})(); /* ================= module=(function)() which called immediately, covered in (), return one object ================= */

/* ================= PLAYER FACTORY ================= */
function createPlayer(name, mark) {
  return { name, mark }; //Factory fuction means returning object
}

/* ================= GAME CONTROLLER MODULE ================= */
const GameController = (function () {
  let players = [];
  let currentPlayerIndex = 0;
  let gameOver = false;

  const startGame = (name1, name2) => {
    players = [
      createPlayer(name1 || "Player X", "X"),
      createPlayer(name2 || "Player O", "O"),
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.reset();
  };

  const getCurrentPlayer = () => players[currentPlayerIndex];

  const switchPlayer = () => {
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  const checkWinner = () => {
    const b = Gameboard.getBoard();
    const wins = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6],
    ];

    return wins.some(pattern =>
      pattern.every(index => b[index] === getCurrentPlayer().mark)
    );
  };

  const checkTie = () => {
    return Gameboard.getBoard().every(cell => cell !== "");
  };

  const playRound = (index) => {
    if (gameOver) return;

    if (!Gameboard.setMark(index, getCurrentPlayer().mark)) return;

    if (checkWinner()) {
      gameOver = true;
      return `${getCurrentPlayer().name} wins!`;
    }

    if (checkTie()) {
      gameOver = true;
      return "It's a tie!";
    }

    switchPlayer();
    return null;
  };

  return { startGame, playRound, getCurrentPlayer };
})();

/* ================= DISPLAY CONTROLLER MODULE ================= */
const DisplayController = (function () {
  const boardEl = document.getElementById("board");
  const statusEl = document.getElementById("status");

  const render = () => {
    boardEl.innerHTML = "";
    Gameboard.getBoard().forEach((mark, index) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = mark;
      cell.addEventListener("click", () => handleClick(index));
      boardEl.appendChild(cell);
    });
  };

  const handleClick = (index) => {
    const result = GameController.playRound(index);
    render();
    if (result) {
      statusEl.textContent = result;
    } else {
      statusEl.textContent =
        `${GameController.getCurrentPlayer().name}'s turn`;
    }
  };

  return { render };
})();

/* ================= EVENT LISTENERS ================= */
document.getElementById("start-btn").addEventListener("click", () => {
  const p1 = document.getElementById("player1").value;
  const p2 = document.getElementById("player2").value;
  GameController.startGame(p1, p2);
  DisplayController.render();
  document.getElementById("status").textContent =
    `${GameController.getCurrentPlayer().name}'s turn`;
});
