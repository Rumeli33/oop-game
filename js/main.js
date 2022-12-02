//console.log("js loaded"); for testing

class Game {
  constructor() {
    this.player = null;
    this.obstaclesArr = []; // will hold instances of the obstacles
  }
  start() {
    this.player = new Player(); // player created
    this.attachEventListeners();

    ////////////////////////// creating several obstacles ///////////////////////////////

    setInterval(() => {
      const newObstacle = new Obstacle();
      this.obstaclesArr.push(newObstacle);
    }, 3000);

    setInterval(() => {
      this.obstaclesArr.forEach((element) => {
        //move current obstacle
        element.moveDown();

        // detect if there is a collision btwn player and current obstacle
        if (
          this.player.positionX < element.positionX + element.width &&
          this.player.positionX + this.player.width > element.positionX &&
          this.player.positionY < element.positionY + element.height &&
          this.player.height + this.player.positionY > element.positionY
        ) {
          // Collision detected!
          console.log("collision detected");
          location.href = "gameover.html";
        }

        ///check if we need to remove current obstacle

        if (element.positionY <= 0 - element.height) {
          console.log("obstacle outside");

          element.domElement.remove();
          this.obstaclesArr.shift(); // remove the obstacle instance from the array as well.
        }
      });
    }, 50);
  }
  attachEventListeners() {
    document.addEventListener("keydown", (event) => {
      // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
      if (event.key === "ArrowLeft") {
        this.player.moveLeft();
      } else if (event.key === "ArrowRight") {
        this.player.moveRight();
      }
    });
  }
}

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

const game = new Game();
game.start();

///////////////////////////////////////////////////////////////////////////

/// Attach event listener
