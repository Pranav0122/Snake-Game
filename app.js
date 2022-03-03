const canvas=document.getElementById('canvas');
const pen=canvas.getContext('2d')

pen.fillStyle="yellow"
//height and width of cancvas element
const height=735;
const width=1200;
const cs=67;
let food=null;
let score=0;
let gameOver=false;
const snake={
    init_len:5,
    direction:'right',
    cells:[],
    createSnake:function () {
        for(let i=0;i<this.init_len;i++){
            this.cells.push({
                x:i,
                y:0
            })
        }
    },
    drawSnake: function () {
        for(let cell of this.cells){
            pen.fillRect(cell.x*cs,cell.y*cs,cs-1,cs-1)
        }
    },
    updateSnake:function () {
        const headX=this.cells[this.cells.length-1].x;
        const headY=this.cells[this.cells.length-1].y;
        if(food.x==headX && food.y==headY){
            food=getRandomFood();
            score++;
        }
        else{
            // remove the first cell
            this.cells.shift();
        }
        let nextX,nextY;
        if(this.direction=='left'){
            nextX=headX-1;
            nextY=headY;
            if(nextX*cs<0){
                gameOver=true;
            }
        }
        else if(this.direction=='up'){
            nextX=headX;
            nextY=headY-1;
            if(nextY*cs<0){
                gameOver=true;
            }
        }
        else if(this.direction=='down'){
            nextX=headX;
            nextY=headY+1;
            if(nextY*cs>=height){
                gameOver=true;
            }
        }
        else{
            nextX=headX+1;
            nextY=headY;
            if(nextX*cs>=width){
                gameOver=true;
            }
        }
        
        //add the cell at the end i.e. after the head of the snake

        this.cells.push({
            x:nextX,
            y:nextY
        })

    }
}

//init
function init() {
    snake.createSnake();
    snake.drawSnake();
    food=getRandomFood();
    function keyPressed(e) {
        if(e.key=="ArrowLeft"){
            snake.direction='left';
        }
        else if(e.key=="ArrowDown"){
            snake.direction='down';
        }
        else if(e.key=="ArrowRight"){
            snake.direction='right';
        }
        else{
            snake.direction='up';
        }
        console.log(snake.direction)
    }
    document.addEventListener('keydown', keyPressed);
}


//draw
function draw() {
    if(gameOver==true){
        pen.fillStyle='red';
        pen.fillText('Game Over',50,100)
        clearInterval(id);
        return;
    }
    pen.clearRect(0,0,width,height)
    pen.font='40px sans-serif';
    pen.fillStyle='lightgreen'
    pen.fillText(`Score: ${score}`,50,50)
    pen.fillStyle='blue'
    pen.fillRect(food.x*cs,food.y*cs,cs,cs)
    pen.fillStyle='yellow'
    snake.drawSnake();
}

//update
function update() {
    snake.updateSnake();
}

//game
function gameLoop() {
    update();
    draw();
}

function getRandomFood() {
    const foodX=Math.floor(Math.random()*(width-cs)/cs)
    const foodY=Math.floor(Math.random()*(height-cs)/cs)
    food={
        x:foodX,
        y:foodY
    }
    return food;
}

init();

const id=setInterval(gameLoop,100)