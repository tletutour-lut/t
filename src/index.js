import "./styles.css";

var arr = new Array(25);
var player = "X"; //X always starts, who cares

document.getElementById("player").innerHTML = `X starts`;
var table = document.getElementById("board");
for (var i = 0; i < 5; i++) {
  var row = table.insertRow(i);
  for (var j = 0; j < 5; j++) {
    var tile = row.insertCell(j);
    tile.id = 5 * i + j;
    tile.innerHTML = "_";
    //The idea to use the this keyword from one of the answers of this thread
    //https://stackoverflow.com/questions/21033368/javascript-onclick-event-html-table
    tile.addEventListener("click", function() {
      if (this.innerHTML === "_") {
        setTimeout(function(previous_player = player) {
          if (player === previous_player) {
            console.log("badabing");
            player = switchPlayer(player);
            document.getElementById("player").innerHTML =
              "time out ! " + player + "'s turn";
          } else {
            clearTimeout();
          }
        }, 10000);
        this.innerHTML = player;
        arr[this.id] = player;
        this.className = player;
        //logArr(arr);
        if (winner(arr, player)) {
          var playertag;
          if (player === "X") {
            playertag = 1;
          } else {
            playertag = 2;
          }
          alert("Player " + playertag + " won !");
          clear();
        }
        if (stalemate()) {
          alert("stalemate !");
          clear();
        }
        player = switchPlayer(player);
      }
    });
  }
}

function stalemate() {
  for (var i = 0; i < 25; i++) {
    if (arr[i] !== "X" && arr[i] !== "O") {
      return false;
    }
  }
  return true;
}
function clear() {
  for (var i = 0; i < 25; i++) {
    arr[i] = "_";
    document.getElementById(i).innerHTML = "_";
    document.getElementById(i).className = "";
  }
}
function switchPlayer(player) {
  if (player === "X") {
    document.getElementById("player").innerHTML = `O's turn`;
    return "O";
  } else {
    document.getElementById("player").innerHTML = `X's turn`;
    return "X";
  }
}

function winner(arr, player) {
  var diag1 = getFirstDiag(arr);
  var diag2 = getSecondDiag(arr);
  if (isFull(diag1, player) || isFull(diag2, player)) {
    return true;
  }
  for (var i = 0; i < 5; i++) {
    var line = getLine(arr, i);
    var column = getColumn(arr, i);
    if (isFull(line, player) || isFull(column, player)) {
      return true;
    }
  }
  return false;
}

function getLine(arr, no) {
  var res = new Array(5);
  for (var i = 0; i < 5; i++) {
    res[i] = arr[5 * no + i];
  }
  return res;
}
function getColumn(arr, no) {
  var res = new Array(5);
  for (var i = 0; i < 5; i++) {
    res[i] = arr[no + 5 * i];
  }
  return res;
}
function getFirstDiag(arr) {
  var res = new Array(5);
  for (var i = 0; i < 5; i++) {
    res[i] = arr[6 * i];
  }
  return res;
}
function getSecondDiag(arr) {
  var res = new Array(5);
  for (var i = 0; i < 5; i++) {
    res[i] = arr[4 * (i + 1)];
  }
  return res;
}
function timingOut() {
  console.log("badabing");
  player = switchPlayer(player);
  document.getElementById("player").innerHTML =
    "time out ! " + player + "'s turn";
}
function isFull(seq, char) {
  //Checks if one sequence only has one character only
  //ie if a line or column or diagonal is a winning one
  for (var i = 0; i < 5; i++) {
    if (seq[i] !== char) {
      return false;
    }
  }
  console.log("one sequence has been found full");
  return true;
}
