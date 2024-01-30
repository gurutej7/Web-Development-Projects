let score = 0;
let playing = true;

let crossedObstacle = true;

let man = document.querySelector(".man");
let gameOver = document.querySelector(".game-over");
let dragon = document.querySelector(".dragon");

let audioGameOver = new Audio("resources/gameover.mp3");
let music = new Audio("resources/music.mp3");

setTimeout(() => {
  music.play();
}, 1000);

// Js in built function to detect any key that is pressed
document.onkeydown = function (e) {
  // console.log("key" , e.key);
  // console.log("key code is ", e.code); // code for the pressed key using which we can catch that key`s action
  let mx = parseInt(
    window.getComputedStyle(man, null).getPropertyValue("left")
  );
  if (e.code === "ArrowUp") {
    // console.log("up arrow is pressed")
    // When the up arrow is pressed we will change the styles of the man
    man.classList.add("animate-man");
    // After some time we have to remove the styles again
    // So that we can set again
    // Function to set time out => after the given time do the task inside the function
    setTimeout(() => {
      man.classList.remove("animate-man");
    }, 700);
  }
  // right movement
  else if (e.code === "ArrowRight") {
    // Adding some px from left with including the current position
    man.style.left = mx + 112 + "px";
  }
  // Left movement
  else if (e.code === "ArrowLeft") {
    man.style.left = mx - 112 + "px";
  }
};

// for every 0.1 sec calculate position of man and the dragon and also check for game over
setInterval(() => {
  // co-ordinates of the man
  // the returned values are in px => parseInt
  let mx = parseInt(
    window.getComputedStyle(man, null).getPropertyValue("left")
  ); // method to get the current changed vaue of a property
  let my = parseInt(window.getComputedStyle(man, null).getPropertyValue("top"));

  // co-ordinates of the dragon
  let dx = parseInt(
    window.getComputedStyle(dragon, null).getPropertyValue("left")
  ); // method to get the current changed vaue of a property
  let dy = parseInt(
    window.getComputedStyle(dragon, null).getPropertyValue("top")
  );

  let xDiff = Math.abs(mx - dx);
  let yDiff = Math.abs(my - dy);

  // console.log(xDiff,yDiff);

  if (xDiff < 93 && yDiff < 53) {
    gameOver.innerHTML = "Game Over  - Reload to play";
    dragon.classList.remove("obstacle");
    playing = false;
    music.pause();
    audioGameOver.play();
    setTimeout(() => {
      audioGameOver.pause();
    }, 1000);
  }
  // if man is on ground and crossedObstacle is true
  else if (crossedObstacle && xDiff < 144 && playing) {
    score += 1;
    document.querySelector(".score").innerHTML = "Score: " + score;
    // for next one second the crossed will be false
    crossedObstacle = false;
    setTimeout(() => {
      crossedObstacle = true;
    }, 1000);
  }
}, 10);
