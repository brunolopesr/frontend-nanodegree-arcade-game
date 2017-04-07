// Enemies our player must avoid
var Enemy = function(x, y, color) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    color = (color ? color : 'red');
    this.sprite = 'images/enemy-bug-'+ color +'.png';

    this.x = x;
    this.y = y;

    var speedOffset = 2 + (Math.random().toFixed(2) * 5);
    this.speed = 100 * (1 + speedOffset);
};

Enemy.prototype.reset = function() {
    // Essa função dá uma nova velocidade e cor para um Enemy ao mesmo tempo
    // que reinicia sua posição X.
    var speedOffset = 2 + (Math.random().toFixed(2) * 5);
    this.speed = 100 * (1 + speedOffset);

    var enemyColors = ['red', 'green', 'yellow', 'blue'],
        color = enemyColors[Math.floor(Math.random() * enemyColors.length)];

    this.sprite = 'images/enemy-bug-'+ color +'.png';

    this.x = -101;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var offset = (this.speed * dt);
    if(this.x > 606) {
        this.reset();
    } else {
        this.x += offset;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This is our player character
var Player = function(x, y) {
    // The sprite for our player
    this.sprite = 'images/char-boy.png';

    this.x = x;
    this.y = y;
};

// Update player status
Player.prototype.update = function() {
    if(this.y < 70) {
        console.log("WIN!");
    }
};

// Draw the player on the screen, based on x and y
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle player keyboard input
Player.prototype.handleInput = function(keyCode) {
    switch(keyCode) {
        case 'left':
            if(this.x > 0)
                this.x -= 101;
            break;
        case 'right':
            if(this.x < 404)
                this.x += 101;
            break;
        case 'up':
            if(this.y > 0)
                this.y -= 83;
            break;
        case 'down':
            if(this.y < 321)
                this.y += 83;
            break;
    }
    console.log(this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemyColors = ['red', 'green', 'yellow', 'blue'],
    color = enemyColors[0];
for(var i = 0; i < 4; i++) {
    color = enemyColors[Math.floor(Math.random() * enemyColors.length)]
    var enemy = new Enemy(-101, (50+(i*83)), color);
    allEnemies.push(enemy);
}

var player = new Player(202, 403);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
