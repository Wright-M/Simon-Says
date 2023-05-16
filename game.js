
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;
var touchTimes = 0;

var viewPortWidth = $(window).width();

if(viewPortWidth <= 768){
  $("h1").text("Touch here to start")
};

$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
})

$(document).keypress(function() {
  if (!gameStarted) {
    $("h1").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
})

$("h1").on({"touchstart" : function(){
  if(touchTimes === 0){
    nextSequence();
  }
  touchTimes++;
}});

function nextSequence() {

  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  showPattern();
}

function showPattern(){
  //Time in milliseconds between animations of buttons
  var interval = 800;

  gamePattern.forEach(function (element, index){
    setTimeout(function(){
      $("#" + element).fadeOut(200).fadeIn(200);
      playSound(element);
    }, index * interval);
  });
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => nextSequence(), 1000);
    }
  } else {
    gameOver();
    startOver();
  }
}

function gameOver() {
  if (viewPortWidth <= 768){
    $("h1").text("Game Over, Touch here to restart");
  } else {
    $("h1").text("Game Over, press any Key to restart");
  };

  playSound("wrong");
  $("body").toggleClass("game-over");
  setTimeout(() => {
    $("body").toggleClass("game-over");
  }, 200);
  
}

function startOver() {
  gamePattern = [];
  level = 0;
  gameStarted = false;
  touchTimes = 0;
  viewPortWidth = 0;
}

function playSound(name) {
  var audioSample = new Audio( name + ".mp3");
  audioSample.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).toggleClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).toggleClass("pressed");
  }, 100);
}
