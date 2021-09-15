const createPlayers = (name, points, mark, isTurn, Winner) => {
  return { name, points, mark, isTurn, Winner };
};
let player1 = createPlayers(`"x"`, 0, "X", true, false);
let player2 = createPlayers(`"o"`, 0, "O", false, false);

const submit = document.querySelector("#submit");
const inpt1 = document.querySelector("#one");
const inpt2 = document.querySelector("#two");
submit.addEventListener("click", (e) => {
  const one = inpt1.value;
  const two = inpt1.value;

  player1.name = `"${one}"`;
  player2.name = `"${two}"`;
});

const Gameboard = (() => {
  let gameboard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  let boxlist = [];

  const renderMoves = () => {
    for (let i = 0; i < gameboard.length; i++) {
      let idx = i;
      const targetBox = document.querySelector(`div[data-index="${idx}"]`);

      boxlist.push(targetBox);
      targetBox.innerHTML = gameboard[i];
    }
  };
  renderMoves();
  const ResetGameboard = () => {
    for (let i = 0; i < gameboard.length; i++) {
      let idx = i;
      const targetBox = document.querySelector(`div[data-index="${idx}"]`);
      console.log(targetBox);
      targetBox.innerHTML = " ";
    }
  };
  const resetBtn = document.querySelector("#reset");
  resetBtn.addEventListener("click", ResetGameboard);

  return { gameboard, renderMoves };
})();
const gameController = (() => {
  const SwitchTurn = () => {
    let current = WhoseTurn();
    if (current == player1) {
      player1.isTurn = false;
      player2.isTurn = true;
    }
    if (current == player2) {
      player2.isTurn = false;
      player1.isTurn = true;
    }
  };
  const board = Gameboard.gameboard;
  const Markspot = (ev) => {
    let player = WhoseTurn();
    let index = ev.target.getAttribute("data-index");
    let mark = player.mark;

    Gameboard.gameboard.splice(index, 1, mark);

    Gameboard.renderMoves();
    isWinning();
    SwitchTurn();
    UpdateTurnBox();

    //&& Gameboard.gameboard[i] == " "
  };
  let boxes = document.querySelectorAll(".grid-item");
  const AddCilck = () => {
    boxes.forEach((box) => box.addEventListener("click", Markspot));
  };
  AddCilck();
  const RemoveClick = () => {
    boxes.forEach((box) => box.removeEventListener("click", Markspot));
  };

  const WhoseTurn = () => {
    if (player1.isTurn == true) {
      return player1;
    }
    if (player2.isTurn == true) {
      return player2;
    } else {
      return 1;
    }
  };
  const UpdateTurnBox = () => {
    const turnBox = document.querySelector(".turn-box");
    turnBox.innerHTML = " ";
    const current = WhoseTurn();

    turnBox.innerHTML = "it's " + current.name + " turn";
  };

  const isWinning = () => {
    let curr = WhoseTurn();
    let gamewon = false;
    if (board[0] == board[1] && board[0] == board[2] && board[0] != " ") {
      RemoveClick();
      let winning1 = WhoseMark(board[0]);
      winning1.Winner = true;
      gamewon = true;
      winning1.winnerPopUp(winning1, 1);
    }
    if (board[3] == board[4] && board[3] == board[5] && board[3] != " ") {
      RemoveClick();
      let winning2 = WhoseMark(board[3]);
      winning2.Winner = true;
      gamewon = true;
      winnerPopUp(winning2, 1);
    }
    if (board[0] == board[3] && board[0] == board[6] && board[0] != " ") {
      RemoveClick();
      let winning3 = WhoseMark(board[0]);
      winning3.Winner = true;
      gamewon = true;
      winnerPopUp(winning3, 1);
    }
    if (board[6] == board[7] && board[6] == board[8] && board[6] != " ") {
      RemoveClick();
      let winning4 = WhoseMark(board[6]);
      winning4.Winner = true;
      gamewon = true;
      winnerPopUp(winning4, 1);
    }
    if (board[1] == board[4] && board[1] == board[7] && board[1] != " ") {
      RemoveClick();
      let winning5 = WhoseMark(board[1]);
      winning5.Winner = true;
      gamewon = true;
      winnerPopUp(winning5, 1);
    }
    if (board[2] == board[5] && board[2] == board[8] && board[2] != " ") {
      RemoveClick();
      let winning6 = WhoseMark(board[2]);
      winning6.Winner = true;
      gamewon = true;
      winnerPopUp(winning6, 1);
    }
    if (board[0] == board[4] && board[0] == board[8] && board[0] != " ") {
      RemoveClick();
      let winning7 = WhoseMark(board[0]);
      winning7.Winner = true;
      gamewon = true;
      winnerPopUp(winning7, 1);
    }
    if (board[2] == board[4] && board[2] == board[6] && board[2] != " ") {
      RemoveClick();
      let winning8 = WhoseMark(board[2]);
      winning8.Winner = true;
      gamewon = true;
      winnerPopUp(winning8, 1);
    }
    if (
      board[0] != " " &&
      board[1] != " " &&
      board[2] != " " &&
      board[3] != " " &&
      board[4] != " " &&
      board[5] != " " &&
      board[6] != " " &&
      board[7] != " " &&
      board[8] != " "
    ) {
      if (gamewon == false) {
        RemoveClick();
        let winning9 = WhoseMark(board[0]);
        winnerPopUp(winning9, 2);
      }
    }
  };
  const WhoseMark = (mark) => {
    if (mark == player1.mark) {
      return player1;
    }
    if (mark == player2.mark) {
      return player2;
    }
  };
  const winnerPopUp = (player, method) => {
    if (method == 1) {
      const container = document.querySelector(".container");
      const winnerbox = document.createElement("div");
      winnerbox.classList.add("winnerbox");
      winnerbox.innerHTML = `"${player.name}"` + "WINS!";
      container.appendChild(winnerbox);
    }
    if (method == 2) {
      const container = document.querySelector(".container");
      const flexbox = document.querySelector(".flexbox");
      const winnerbox = document.createElement("div");
      winnerbox.classList.add("winnerbox");
      winnerbox.innerHTML = "IT'S A TIE!";
      flexbox.appendChild(winnerbox);
    }
  };
  const isGameWon = () => {
    if (player1.Winner == true || player2.Winner == true) {
      return true;
    }
    if (player1.Winner == false && player2.Winner == false) {
      return false;
    }
  };

  return { Markspot, WhoseTurn };
})();
