
var buttonColours = ["red", "blue", "green", "yellow"]
var listColors = [];
var userChosenColour = [];
var level = 0;



function nextSequence() {
 //Increas the level
 level++;
 $("h1").text("Level "+ level);

 //pick a random number
 var nextNumber = Math.floor(Math.random() *4);
 listColors.push(buttonColours[nextNumber]);

 setTimeout(function(){flashBut(buttonColours[nextNumber], 600);}, 1000);

 console.log(listColors);
}

function flashBut(color, speed) {
  $("."+color).addClass("pressed");

  var flashSound = new Audio("sounds/" + color +".mp3");
  flashSound.play();
  console.log("Play flashSound");

  setTimeout(function(){$("."+color).removeClass("pressed");}, speed);
}


$(".btn").click(function(){
  if ( level > 0){
      //Gets id of the button clicked
      var selColor = $(this).attr("id");

      //Flash button selected
      flashBut(selColor, 200);

      //add selected button in array
      userChosenColour.push(selColor);

      //After clicking the color it checks if it is correct
      checkAnswer(selColor);

      //Check if we are at the end of the array
      if (listColors.length === userChosenColour.length && level > 0) {
        //End of the level - reset and add a new sequence
        userChosenColour = [];
        nextSequence();
      }
  }
})

//Event listener for keyboard
$(document).keypress(function(event){
  if (event.key === "a" && listColors.length === 0) {
    nextSequence();
  }
});

//Function to check if the button selected is the correct one
function checkAnswer(selColor) {
  if (listColors[userChosenColour.length-1] != selColor){
    reset()
  }
}

//Reset game if selected wrong color
function reset() {
  $("body").addClass("game-over")
  setTimeout(function(){$("body").removeClass("game-over");}, 600);
  level = 0;
  listColors = [];
  userChosenColour = [];
  $("h1").text("Press A Key to Start");
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
}
