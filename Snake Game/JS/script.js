//Welcome Messages
console.log("Welcome to The Snake Game");
console.log("Snake Game Started");

//variables of game
let inputDir = {x: 0, y: 0}; 
let direction = { x: 0, y: 0 };
let foodsound = new Audio("../music/food.mp3");
let gameoversound = new Audio("../music/gameover.mp3");
let movesound = new Audio("../music/move.mp3");
let musicsound = new Audio("../music/music.mp3");
let speed = prompt("Enter the Speed of Snake you Wish to have") ;
let score = 0;
let lastpainttime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let f = { x: 5, y: 12 };


//Game Logic

function main(ctime) {

  requestAnimationFrame(main);

  //console.log(ctime);
  if ((ctime - lastpainttime) / 1000 < 1 / speed) return;
  lastpainttime = ctime;

  gameEngine();

}
function isCollide(snake) {
  // If you bump into yourself 
  for (let i = 1; i < snakeArr.length; i++) {
      if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
          return true;
      }
  }
  // If you bump into the wall
  if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
      return true;
  }
      
  return false;
}
function gameEngine() {
  
  //update the food and snake
  if(isCollide(snakeArr)){
    gameoversound.play();
    musicsound.pause();
    inputDir =  {x: 0, y: 0}; 
    alert("Game Over. Press any key to play again!");
    snakeArr = [{x: 13, y: 15}];
    musicsound.play();
    score = 0; 
    scoreBox.innerHTML = "Score: " + score;

}

// If you have eaten the food, increment the score and regenerate the food
if(snakeArr[0].y === f.y && snakeArr[0].x ===f.x){
  foodsound.play();
  score += 1;
  scoreBox.innerHTML = "Score: " + score;
  if(score>hiscoreval){
    hiscoreval = score;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
    hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
}
  
  snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
  let a = 2;
  let b = 18;
  f = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
}

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
      snakeArr[i+1] = {...snakeArr[i]};
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
  //displaying the updated food and snake
  //Display the Snake

  container.innerText = "";

  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index == 0) snakeElement.classList.add("snakehead");
    else snakeElement.classList.add("snakebody");

    container.appendChild(snakeElement);
  });

  //Display the Food

  foodElement = document.createElement("div");

  foodElement.style.gridRowStart = f.y;
  foodElement.style.gridColumnStart = f.x;

  foodElement.classList.add("food");
  container.appendChild(foodElement);
}
musicsound.play();

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
requestAnimationFrame(main);

document.addEventListener("keyup",e=>{
    inputDir={x:0,y:1};
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;  
    }
})
