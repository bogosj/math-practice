var _FIVE_MINUTES = 1 * 60 * 1000;
var millisecondsRemaining = _FIVE_MINUTES;
var timerId;

var updateTimer = function() {
  if (millisecondsRemaining == 0) {
    window.clearInterval(timerId);
    completeQuiz();
  } else {
    millisecondsRemaining -= 100;
    var minutes = Math.floor(millisecondsRemaining / 1000 / 60);
    var seconds = (millisecondsRemaining - (minutes * 1000 * 60)) / 1000;
    $('#timer').text(minutes + ':' + seconds);
  }
};

var completeQuiz = function() {
  alert('Quiz over');
};

var onStartClick = function() {
  millisecondsRemaining = _FIVE_MINUTES;
  timerId = window.setInterval(updateTimer, 100);
};

var onLoad = function() {
  $('#start-button').click(onStartClick);
};

$(document).ready(onLoad);
