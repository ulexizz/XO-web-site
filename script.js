let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;
let mode = "player"; // 'player' ou 'ai'

// Démarrer le jeu depuis le lobby
function startGame(selectedMode) {
  mode = selectedMode;
  document.getElementById("lobby").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  resetGame();
}

// Jouer un coup
function play(index) {
  if (board[index] === "" && !gameOver) {
    board[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].textContent = currentPlayer;

    if (checkWinner()) {
      document.getElementById("status").textContent = `🎉 Joueur ${currentPlayer} a gagné !`;
      gameOver = true;
      return;
    } else if (board.every(cell => cell !== "")) {
      document.getElementById("status").textContent = "Match nul 😐";
      gameOver = true;
      return;
    }

    // Changer de joueur
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("status").textContent = `C'est au tour du joueur ${currentPlayer}`;

    // Si on joue contre l'IA et que c’est son tour
    if (mode === "ai" && currentPlayer === "O" && !gameOver) {
      setTimeout(aiPlay, 500);
    }
  }
}

// IA (joue aléatoirement)
function aiPlay() {
  let emptyCells = board
    .map((val, idx) => (val === "" ? idx : null))
    .filter(val => val !== null);

  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  play(randomIndex);
}

// Vérifier si quelqu’un a gagné
function checkWinner() {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return wins.some(combination => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

// Réinitialiser le jeu
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
  document.getElementById("status").textContent = "C'est au tour du joueur X";
}

// Retour au menu
function goBack() {
  document.getElementById("game").classList.add("hidden");
  document.getElementById("lobby").classList.remove("hidden");
}
