// Initial Data
let screen = document.getElementById('screen');
let ctx = screen.getContext('2d');
let life = 3;
let points = 0;
let start = false;
let mouseX = 0;
let mouseY = 0;
let timer = 5000;
let enemyPositionX = 0;
let enemyPositionY = 0;

// Events
screen.addEventListener('mousedown', shoot);
screen.addEventListener('mousemove', aim);
document.querySelector('.reset').addEventListener('click', resetGame);
document.querySelector('.play').addEventListener('click', startGame);

// Functions
// ARRUMAR -----------------------------------------------------------------------------
function aim(e){
    x = e.pageX - screen.offsetLeft;
    y = e.pageY - (screen.offsetTop+5);

    echoColor(x,y);

    console.log(red,green,blue,alpha);
    return (x,y);
}
function echoColor(x,y){
    let debugX = (3);
    let debugY = (3.4);
    
	let imgData = ctx.getImageData((debugX*x), (debugY*y), 1, 1);
	red = imgData.data[0];
	green = imgData.data[1];
	blue = imgData.data[2];
	alpha = imgData.data[3];
    
    return (red, green, blue, alpha);
}
// ARRUMAR -----------------------------------------------------------------------------
function shoot(e){
    x = e.pageX - screen.offsetLeft;
    y = e.pageY - (screen.offsetTop+5);

    console.log(x,y);
    if(red !== 0 || green !== 0 || blue !== 0){
        points++;
        timer -= 50;
        despawn();
        //console.log("CERTO");
        //console.log(timer);
    }
}
function spawn(){
    minX = Math.ceil(0);
    maxX = Math.floor(screen.width - 15);
    minY = Math.ceil(0);
    maxY = Math.floor(screen.height - 15);

    enemyPositionX = Math.floor(Math.random() * (maxX - minX)) + minX;
    enemyPositionY = Math.floor(Math.random() * (maxY - minY)) + minY;

    enemyPositionX = 0;
    enemyPositionY = 0;

    console.log(enemyPositionX,enemyPositionY);

    enemy(enemyPositionX, enemyPositionY);
}
function enemy(enemyPositionX, enemyPositionY){
    ctx.fillStyle = 'red';
    ctx.fillRect(enemyPositionX, enemyPositionY, 15, 15);
}
function despawn(){
    clearScreen();
    spawn();
}
function startGame(){
    start = true;
    if( start === true){
        setInterval(function(){ 
            despawn();
         }, timer);
    }
}
function resetGame(){
    life = 3;
    timer = 5000;
    points = 0;
    clearScreen();
    spawn();
}
function clearScreen(){
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
}

