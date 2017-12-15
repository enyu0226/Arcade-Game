"use strict";

const randomFunctionGenerator = function(maxRandom,startRandom){
    return Math.floor(Math.random() * maxRandom) + startRandom;
    };
var Enemy = function() {
    this.x = 0; 
    let SpawningRows = [130,210,290];
    this.y = SpawningRows[randomFunctionGenerator.call(Enemy,SpawningRows.length,0)];
    this.speed = 200 + randomFunctionGenerator.call(Enemy,200,0);
    this.width = 30;
    this.height = 30;
    let randomSelection = randomFunctionGenerator(3,1);
    switch(randomSelection){
        case 1:
            this.sprite = 'images/enemy-bug.png';   //the sprite is bug
            break;
        case 2:
            this.sprite = 'images/enemy-pig.png';   //the sprite is pig
            break;
        case 3:
            this.sprite = 'images/enemy-bowser.png'; //the sprite is browser
            break;
    };

};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += (this.speed * dt);
    if (this.x > 500) {
        this.x = 0;
        this.speed = 200 + randomFunctionGenerator.call(Enemy,200,0);

    };
    //multiply any movement by the dt parameter which will ensure the game runs at the same speed for
    // all computers.This is achieved by calculating the time since last update (in seconds) 
    //and expressing all movements in pixels/second units. 
   // Movement then becomes x += n * dt, or "n pixels per second".

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//determine player starting position
const startingPosition =[200,400];

var Player = function() {
    this.x = startingPosition[0]; 
    this.y = startingPosition[1];
    this.sprite = 'images/char-boy.png';
    this.xSpeed = 100;
    this.ySpeed = 80;
    this.width = 50;
    this.height = 100;
    };

Player.prototype.update = function() {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyInput) {
//prtotype mtethod
//check player boundary
let min_x = 0, max_x = 400, min_y=0, max_y=400;
switch(keyInput){
        case  'left':
            this.x -= this.xSpeed;
            if (this.x < min_x){
            this.x = min_x;
            }
            break;
        case    'up':
            this.y -= this.ySpeed;
            if (this.y < min_y){
            this.y = min_y;
            }
            break;
        case 'right':
            this.x += this.xSpeed;
            if (this.x > max_x){
            this.x = max_x;
            }
            break;
        case  'down':
            this.y += this.ySpeed;
            if (this.y > max_y){
            this.y = max_y;
            }
            break;
    };

};

   let allEnemies = [];
   for (let i = 0; i < 10; ++i){
     allEnemies[i] = new Enemy();
   };
   let player = new Player(); 

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    
    player.handleInput(allowedKeys[e.keyCode]);
});
