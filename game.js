
var buttonNum=["btn1","btn2","btn3","btn4","btn5","btn6","btn7","btn8","btn9","btn10"];

var gamePattern=[];
var userClickedPattern=[];


var started = false;

//2. Create a new variable called level and start at level 0.
var level = 0;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function(){
	var useChosenNum= $(this).attr("id");
	userClickedPattern.push(useChosenNum);

	// console.log(userClickedPattern);

	playSound(useChosenNum);
	animatePress(useChosenNum);
    checkAnswer(userClickedPattern.length-1);

});
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}





function nextSequence(){
	var userClickedPattern=[];
	
  level++;

  
  $("#level-title").text("Level " + level);

	var randomNumber=Math.floor(Math.random()*10);
		var randomChosenNum= buttonNum[randomNumber];
		gamePattern.push(randomChosenNum);
   
   $("#"+ randomChosenNum).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenNum);
    // console.log(randomChosenNum);

}

function playSound(num){
	 var audio=new Audio("sounds/" + num + ".mp3");
   audio.play();

}
function animatePress(currentNum){
$("#" + currentNum).addClass("pressed");
setTimeout(function(){
	$("#" + currentNum).removeClass("pressed");
},100);
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

