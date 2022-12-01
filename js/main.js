//console.log("js loaded"); for testing

//////////////////////////////////////////////// Creating the player

class Player {
  constructor() {
    this.width = 10;
    this.height = 10;
    this.positionX = 50 - this.width / 2;
    this.positionY = 0;
    this.domElement = null;

    this.createDomElement();
  }

  createDomElement() {
    // step1: create the element:
    this.domElement = document.createElement("div");

    // step2: add content or modify (ex. innerHTML...)
    this.domElement.id = "player";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.bottom = this.positionY + "vh";
    this.domElement.style.left = this.positionX + "vw";

    //step3: append to the dom: `parentElm.appendChild()`
    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.domElement);
  }
  moveRight() {
    // move to the player to right by 1 %

    this.positionX++;

    //update css for the player dom element
    this.domElement.style.left = this.positionX + "vw";

    console.log("new position..." + this.positionX);
  }
  moveLeft() {
    // move to the player to left by 1 %

    this.positionX--;
    //update css for the player dom element
    this.domElement.style.left = this.positionX + "vw";

    console.log("new position..." + this.positionX);
  }
}
////////////////////////////////////////////////////////////////////

class Obstacle {
  constructor() {
    this.width = 20;
    this.height = 10;
    this.positionX = 50 - this.width / 2;
    this.positionY = 80;
    this.domElement = null;

    this.createDomElement();
  }
  createDomElement() {
    // step1: create the element:
    this.domElement = document.createElement("div");

    // step2: add content or modify (ex. innerHTML...)
    this.domElement.className = "obstacle";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.bottom = this.positionY + "vh";
    this.domElement.style.left = this.positionX + "vw";

    //step3: append to the dom: `parentElm.appendChild()`
    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.domElement);
  }

  moveDown() {
    this.positionY--;
    this.domElement.style.bottom = this.positionY + "vh";
  }
}

///////////////////////////////////////////////////////////////////////////

const player = new Player(); // 1 player created.
const obstaclesArr = []; // create an array for many instances of the obstacle class

console.log("horizontal position :", player.positionX);

document.addEventListener("keydown", function (event) {
  const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
  if (event.key === "ArrowLeft") {
    player.moveLeft();
  } else if (event.key === "ArrowRight") {
    player.moveRight();
  }
});

////////////////////////// creating several obstacles ///////////////////////////////

const intervalId2 = setInterval(function () {
  const newObstacle = new Obstacle();
  obstaclesArr.push(newObstacle);
}, 3000);

const intervalId1 = setInterval(function () {
  obstaclesArr.forEach((element) => {
    //move current obstacle
    element.moveDown();
    // detect if there is a collision btwn player and current obstacle

    if (
      player.positionX < element.positionX + element.width &&
      player.positionX + player.width > element.positionX &&
      player.positionY < element.positionY + element.height &&
      player.height + player.positionY > element.positionY
    ) {
      // Collision detected!
      console.log("collision detected");
    } 

  });
}, 50);

///////////////// refactoring set interval to coordinate creating multiple instances and speed.
let time = 0;

/*setInterval(()=>{
    time++;

if( time % 30 === 0){
    const newObstacle =  new Obstacle();
  obstaclesArr.push(newObstacle);
}
else{
    obstaclesArr.forEach(element =>{
        element.moveDown();
    })
}

}
,50)
*/


