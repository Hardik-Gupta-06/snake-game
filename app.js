

let canvas=document.querySelector('canvas');
let ctx=canvas.getContext('2d');
let cellSize=50;
let boardHeight=canvas.height;
let boardWidth=canvas.width;
let direction='right';
let cells=[[0,0]];
let food=generateFood();
let score=0;
let over=false;
let id;

draw();
ctx.fillStyle='white';
ctx.font='50px monospace';
ctx.fillText("Press : 'ENTER'",300,300);

document.addEventListener('keydown',function(event) {
    if (event.key=='Enter') {
        direction='right';
        id=setInterval(function() {
            update();
            draw();
        },130);
    }
})


document.addEventListener('keydown',function(event) {
    if (event.key=='ArrowLeft') {
        direction='left';
    }
    else if (event.key=='ArrowRight') {
        direction='right';
    }
    else if (event.key=='ArrowUp') {
        direction='up';
    }
    else if (event.key=='ArrowDown') {
        direction='down';
    }
})

function draw() {
    if (over) {
        return;
    }
    ctx.clearRect(0,0,boardWidth,boardHeight);
    // draw snake 
    ctx.fillStyle='green';
    ctx.strokeStyle='gold';
    for (let cell of cells) {
        ctx.fillRect(cell[0],cell[1],cellSize,cellSize);
        ctx.strokeRect(cell[0],cell[1],cellSize,cellSize);
    }
    ctx.fillStyle='black';
    ctx.beginPath();
    ctx.arc(cells[cells.length-1][0]+(cellSize/2),cells[cells.length-1][1]+(cellSize/2),10,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();

    // draw food 
    ctx.fillStyle='blue';
    ctx.beginPath();
    ctx.arc(food[0]+(cellSize/2),food[1]+(cellSize/2),25,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    

    // draw score 
    ctx.fillStyle='white';
    ctx.font='24px monospace';
    ctx.fillText(`Score : ${score}`,20,25);

}

function update() {
    let newX;
    let newY;
    if (direction=='right') {
        if (cells[cells.length-1][0]+cellSize==boardWidth) {
            gameOver();
            return;
        }
        newX=cells[cells.length-1][0]+cellSize;
        newY=cells[cells.length-1][1];
    }
    else if (direction=='left') {
        if (cells[cells.length-1][0]-cellSize<0) {
            gameOver();
            return;
        }
        newX=cells[cells.length-1][0]-cellSize;
        newY=cells[cells.length-1][1];
    }
    else if (direction=='up') {
        if (cells[cells.length-1][1]-cellSize<0) {
            gameOver();
            return;
        }
        newX=cells[cells.length-1][0];
        newY=cells[cells.length-1][1]-cellSize;
    }
    else if (direction=='down') {
        if (cells[cells.length-1][1]+cellSize==boardHeight) {
            gameOver();
            return;
        }
        newX=cells[cells.length-1][0];
        newY=cells[cells.length-1][1]+cellSize;
    }
    khagyaKhudko(newX,newY);
    cells.push([newX,newY]);
    if (newX==food[0] && newY==food[1]) {
        food=generateFood();
        score++;
        return;
    }
    cells.shift();
}

function gameOver() {
    clearInterval(id);
    ctx.fillStyle='red';
    ctx.font='100px monospace';
    ctx.fillText('GAME OVER !!',200,300);
    over=true;
}

function generateFood() {
    // return [
    //     Math.round((Math.random()*(boardWidth - cellSize)) / cellSize) * cellSize,
    //     Math.round((Math.random()*(boardHeight - cellSize)) / cellSize) * cellSize
    // ];
    return [
        Math.floor((Math.random()*boardWidth)/cellSize)*cellSize,
        Math.floor((Math.random()*boardHeight)/cellSize)*cellSize
    ];
}

function khagyaKhudko(newX,newY) {
    for (let cell of cells) {
        if (cell[0]==newX && cell[1]==newY) {
            gameOver();
            return;
        }
    }
}