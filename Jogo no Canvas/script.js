// Initial Data
let pointView = document.getElementById('points');
let screen = document.getElementById('screen');
let ctx = screen.getContext('2d');
let life = 3;
let points = 0;
let start = false;
let time = 5000;
let timerReset;

// Events
screen.addEventListener('mousedown', shoot);
document.querySelector('.reset').addEventListener('click', resetGame);
document.querySelector('.play').addEventListener('click', startGame);

// Functions
function echoColor(x,y){
    let debugX = (6);
    let debugY = (6);
    
	let imgData = ctx.getImageData((x-debugX), (y-debugY), 1, 1);
	red = imgData.data[0];
	green = imgData.data[1];
	blue = imgData.data[2];
	alpha = imgData.data[3];
    
    return (red, green, blue, alpha);
}
function shoot(e){
    x = e.pageX - screen.offsetLeft;
    y = e.pageY - screen.offsetTop;

    echoColor(x,y);

    if(red !== 0 || green !== 0 || blue !== 0){
        points++;
        pointView.innerText = points;
        clearInterval(timerReset)
        time -= 50;
        setInterval(despawn(), 2000);
        console.log(time);
    }
}
function spawn(){
    let enemyPositionX;
    let enemyPositionY;

    minX = Math.ceil(0);
    maxX = Math.floor(screen.width - 50);
    minY = Math.ceil(0);
    maxY = Math.floor(screen.height - 50);

    enemyPositionX = Math.floor(Math.random() * (maxX - minX)) + minX;
    enemyPositionY = Math.floor(Math.random() * (maxY - minY)) + minY;

    enemy(enemyPositionX, enemyPositionY);
}
function enemy(enemyPositionX, enemyPositionY){
    ctx.fillStyle = 'red';
    ctx.fillRect(enemyPositionX, enemyPositionY, 50, 50);
}
function despawn(){
    clearScreen();
    spawn();
}
function startGame(){
    if( start === false){
        timerReset = setInterval(despawn(), time);
    }else if(start === true){
        console.log("ERRO");
        return false;
    }
    start = true;
}
function resetGame(){
    life = 3;
    time = 5000;
    points = 0;
    clearScreen();
    spawn();
}
function clearScreen(){
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
}