var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var size = 50;

var x = 0;
var y = 0;

var levels = [];

levels.push([
  [0,0,0,1,0],
  [0,1,0,1,0],
  [9,1,0,0,0],
  [0,1,1,1,0],
  [0,0,0,1,2],
]);

levels.push([
  [0,0,0,0,0],
  [0,1,1,1,0],
  [0,1,0,0,0],
  [0,1,0,1,1],
  [2,1,0,0,9],
]);

levels.push([
  [0,0,0,0,0],
  [0,1,1,1,0],
  [2,1,0,0,0],
  [1,1,0,1,0],
  [9,0,0,1,0],
]);


var world = 0;
placePlayer();

var rows = 5;
var cols = 5;

canvas.width = size * cols;
canvas.height = size * rows;

var KEYS = {
  LEFT: 37,
  UP: 38,
  DOWN: 40,
  RIGHT: 39
}

function loop() {

  ctx.fillStyle = '#000';

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillRect(x * size, y * size, size, size);

  drawWorld();

  window.requestAnimationFrame(loop);
}

function drawWorld() {
  inWorld(function(point, j, i){

    if (point === 1){
      ctx.fillStyle = '#555';
      ctx.fillRect(i * size, j * size, size, size);
    }

    if (point === 2){
      ctx.fillStyle = 'gold';
      ctx.fillRect(i * size, j * size, size, size);
    }

  })

  
}

function inWorld(cb) {
  for (var i = 0; i < levels[world].length; i++){
    for (var j = 0; j < levels[world][i].length; j++){
      cb(levels[world][j][i], j, i);
    }
  }
}

function placePlayer() {

  inWorld(function(point, j, i){
    if (point === 9){
      x = i;    
      y = j;
    }
  })

}

function checkExit(){
  if (levels[world][y][x] === 2){
    world = ++world % levels.length;
    placePlayer();
  }
}

document.addEventListener('keyup', function(e) {
  if (e.keyCode === KEYS.LEFT){
    if (x === 0) return;

    if (levels[world][y][x-1] === 1){
      return;
    }
    x -= 1;
  }
  if (e.keyCode === KEYS.UP){
    if (y === 0) return;

    if (levels[world][y-1][x] === 1){
      return;
    }
    y -= 1;
  }
  if (e.keyCode === KEYS.DOWN){
    if (y === rows - 1) return;

    if (levels[world][y+1][x] === 1){
      return;
    }
    y += 1;
  }
  if (e.keyCode === KEYS.RIGHT){

    if (x === cols - 1) return;

    if (levels[world][y][x+1] === 1){
      return;
    }
    x += 1;
  }

  checkExit();

})

loop();
