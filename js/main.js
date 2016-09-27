
$(document).ready(function() {
  var gameBoard = [
    ['','',''],
    ['','',''],
    ['','','']
  ];
  var x = "x";
  var o = "o";

  var player = o;
  var turns = 0;

  var win = false;

  // Horizontal and Vertical win conditions //////////////////////////////////
  var straightWin = function(player) {
    // Check if xPos match
    for (i = 0; i < 3; i++){
      if (gameBoard[i][0] === player && gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2]){
        $('#winbanner').fadeIn().text('Winner is ' + player);
        $('#playagain').css('display', 'inline');
        return win = true; // FIXME: Add proper win condition
      } else if (gameBoard[0][i] === player && gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i]){
        $('#winbanner').fadeIn().text('Winner is ' + player);
        $('#playagain').css('display', 'inline');
        return win = true; // FIXME: same as above
      }
    }
  };

  // Diagonal Win conditions //////////////////////////////////////////////
  var diagonalWin = function(player) {
    if (
      gameBoard[0][0] === player && gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] || gameBoard[0][2] === player && gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0]
      ) {
      $('#winbanner').fadeIn().text('Winner is ' + player);
      $('#playagain').css('display', 'inline');
      return win = true; // FIXME: same as above
      }
    };

  // Combined win function ////////////////////////////
  var isWinner = function(player) {
    straightWin(player);
    diagonalWin(player);
  };

  // Parse options for player move //////////////////////////////////
  var playMove = function (posX, posY) {
    isWinner(player);
    if ( win === false && turns === 8 ){
      $('#winbanner').fadeIn().text('Tie');
      $('#playagain').css('display', 'inline');
    };
    if (player === o) {
      player = x;
    } else {
      player = o;
    }
  }; // End of PlayMove //////////////////

  $('#board li').on('click', function(){
    if (win === true) {
      return; // don't do anything else in the click handler if the game has been won
    }
    var posX = $(this).data('xpos');
    var posY = $(this).data('ypos');
    if (gameBoard[posX][posY] !== '') {
      return;
    } else {
      $(this).text(player);
      gameBoard[posX][posY] = player;
      playMove(posX, posY);
      turns++;
    }
  }); // End of Click function  /////////////////////////////

  $('#playagain').on('click', function(){
    $('#board li').text('+');
    turns = 0;
    win = false;
    player = o;
    gameBoard = [
      ['','',''],
      ['','',''],
      ['','','']
    ];
    $('#winbanner').css('display', 'none')
    $('#playagain').css('display', 'none');
  });// End of Reset button
});// Closes document ready
