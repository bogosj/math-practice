var _FIVE_MINUTES = 1 * 60 * 1000;
var millisecondsRemaining = _FIVE_MINUTES;
var timerId;

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var updateTimer = function() {
  if (millisecondsRemaining == 0) {
    window.clearInterval(timerId);
    completeQuiz();
  } else {
    millisecondsRemaining -= 100;
    var minutes = Math.floor(millisecondsRemaining / 1000 / 60);
    var seconds = Math.floor((millisecondsRemaining - (minutes * 1000 * 60)) / 1000);
    var separator = ':';
    if (seconds < 10) {
      separator = ':0';
    }
    $('#timer').text(minutes + separator + seconds);
  }
};

var completeQuiz = function() {
  alert('Quiz over');
};

var generateProblemTable = function() {
  $('#problem-table').empty();
  for (var i=0; i<100; i++) {
    var problem = getRandomInt(0, 12) + '*' + getRandomInt(0, 12);
    var elt = $('<div/>').text(problem).append($('<hr>')).append($('<input type="number">'));
    $('#problem-table').append(elt);
  };
};

var onStartClick = function() {
  millisecondsRemaining = _FIVE_MINUTES;
  timerId = window.setInterval(updateTimer, 100);
  generateProblemTable();
};

var onLoad = function() {
  $('#start-button').click(onStartClick);
};

$(document).ready(onLoad);
