
function answerQuestion() {
  var numWon = document.getElementById('input-num-won').value;
  var numLost = document.getElementById('input-num-lost').value;
  var numGames = Math.floor(numWon) + Math.floor(numLost);

  var stdGames = Math.sqrt(numGames) / 2;
  var expWon = numGames / 2;
  var dispWon = numWon - expWon;
  var stdWon = dispWon / stdGames;
  var invSqrt2 = 1 / Math.sqrt(2);
  var erfWon = erf(stdWon * invSqrt2);
  var outsideWon = 1 - erfWon;
  var upperWon = outsideWon / 2;
  if(dispWon < 0) {
    upperWon += erfWon;
  }
  var percentWon = Math.round(upperWon * 10000) / 100;

  document.getElementById('answer-total').innerText = numGames;
  document.getElementById('answer-expected').innerText = expWon;
  document.getElementById('answer-disp').innerText = dispWon;
  document.getElementById('answer-stdev').innerText = Math.round(100*stdGames)/100;
  document.getElementById('answer-stwon').innerText = Math.round(100*stdWon)/100;
  document.getElementById('answer-erfwon').innerText = Math.round(10000*erfWon)/10000;
  document.getElementById('answer-chance').innerText = percentWon + "%";
}

function erf(x) {
    // constants
    var a1 =  0.254829592;
    var a2 = -0.284496736;
    var a3 =  1.421413741;
    var a4 = -1.453152027;
    var a5 =  1.061405429;
    var p  =  0.3275911;

    // Save the sign of x
    var sign = 1;
    if (x < 0) {
        sign = -1;
    }
    x = Math.abs(x);

    // A&S formula 7.1.26
    var t = 1.0/(1.0 + p*x);
    var y = 1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*Math.exp(-x*x);

    return y;
}

