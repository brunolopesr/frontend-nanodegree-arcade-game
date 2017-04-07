// Enemies our player must avoid
var Enemy = function(x, y, color) {
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
    // que reinicia sua posição X e Y.
    var speedOffset = 2 + (Math.random().toFixed(2) * 5);
    this.speed = 100 * (1 + speedOffset);

    var enemyColors = ['red', 'green', 'yellow', 'blue'],
        color = enemyColors[Math.floor(Math.random() * enemyColors.length)];

    this.sprite = 'images/enemy-bug-'+ color +'.png';

    this.x = -101;
    //this.y = 60 + Math.floor(Math.random() * 4) * 83;
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

    // Número de vidas do jogador
    this.lives = 3;

    // Pontuação do jogador
    this.score = 0;

    this.x = x;
    this.y = y;
};

// Checa colisão do jogador com objeto especificado
Player.prototype.checkCollision = function(obj) {
    if(obj.constructor == Enemy) {
        // Colisão de jogador e inimigos
        if((this.y < obj.y + 80) && (this.y + 64 > obj.y) &&
        (this.x < obj.x + 90) && (this.x + 90 > obj.x)) {
            console.log("Colisão");
            this.lives--;
            this.reset();
        }
    }
};

// Update player status
Player.prototype.update = function() {
    /* Verifica o número de vidas */
    this.checkLives();

    if(this.y < 70) {
        //Game Win
        gameWin = true;

        ctx.clearRect(0, 0, 505, 606);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 505, 606);

        ctx.fillStyle = 'white';
        ctx.font = '60px Arial';
        ctx.textAlign = 'center';
        ctx.fillText("You win!", 252.5, 300);

        ctx.font = '24px Arial';
        ctx.fillText("Play again by pressing enter", 252.5, 345);
    }
};

// Reset player position
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 403;
};

// Refatorei um trecho de update aqui para o código ficar mais organizado
// Essa função checa o número de vidas e então a atualiza ou chama o Game Over
Player.prototype.checkLives = function() {
    if(this.lives === 0) {
        //Game Over
        gameOver = true;

        ctx.clearRect(0, 0, 505, 606);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 505, 606);

        ctx.fillStyle = 'white';
        ctx.font = '60px Arial';
        ctx.textAlign = 'center';
        ctx.fillText("Game Over", 252.5, 300);

        ctx.font = '24px Arial';
        ctx.fillText("Try again by pressing enter", 252.5, 345);
    } else {
        // Atualiza o contador de vidas
        ctx.clearRect(0, 0, 200, 51);
        for(var i = 0; i < this.lives; i++) {
            ctx.drawImage(Resources.get('images/Heart.png'), (i * 30), 5, 30, 51);
        }
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
        case 'enter':
            if(gameOver || gameWin) {
                ctx.clearRect(0, 0, 505, 606);
                this.lives = 5;
                this.reset();
                gameOver = false;
                gameWin = false;
            }
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemyColors = ['red', 'green', 'yellow', 'blue'],
    color = enemyColors[0];
for(var i = 0; i < 4; i++) {
    color = enemyColors[Math.floor(Math.random() * enemyColors.length)];
    var enemy = new Enemy(-101, (60+(i*83)), color);
    allEnemies.push(enemy);
}

var player = new Player(202, 403);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
