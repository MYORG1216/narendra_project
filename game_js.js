var canvas = document.getElementById("myCanvas"),
    canvasCtx = canvas.getContext("2d"),
    bRadius = 10,
    xPos = canvas.width/2,
    yPos = canvas.height-30,
    dxPos = 1.5,
    dyPos = -2,
    pHeight = 10,
    pWidth = 75,
    pXpos = (canvas.width-pWidth)/2,
    rPress = false,
    lPress = false,
    bRowCount = 6,
    bColCount = 4,
    bWidth = 75,
    bHeight = 20,
    bPadding = 10,
    bOffsetTop = 30,
    bOffsetLeft = 30,
    score = 0,
    live_cnt = 3;

var bricks = [];
for(var col=0; col<bColCount; col++) {
  bricks[col] = [];
  for(var row=0; row<bRowCount; row++) {
    bricks[col][row] = { xPos: 0, yPos: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rPress = true;
  }
  else if(e.keyCode == 37) {
    lPress= true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rPress = false;
  }
  else if(e.keyCode == 37) {
    lPress = false;
  }
}

function collisionDetection() {
  for(var col=0; col<bColCount; col++) {
    for(var row=0; row<bRowCount; row++) {
      var b = bricks[col][row];
      if(b.status == 1) {
        if(xPos > b.xPos && xPos < b.xPos+bWidth && yPos > b.yPos && yPos < b.yPos+bHeight) {
          dyPos = -dyPos;
          b.status = 0;
          score++;
          if(score == bRowCount*bColCount) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBall() {
  canvasCtx.beginPath();
  canvasCtx.arc(xPos, yPos, bRadius, 0, Math.PI*2);
  canvasCtx.fillStyle = "red";
  canvasCtx.fill();
  canvasCtx.closePath();
}

function drawPaddle() {
  canvasCtx.beginPath();
  canvasCtx.rect(pXpos, canvas.height-pHeight, pWidth, pHeight);
  canvasCtx.fillStyle = "red";
  canvasCtx.fill();
  canvasCtx.closePath();
}

function drawBricks() {
  for(var col=0; col<bColCount; col++) {
    for(var row=0; row<bRowCount; row++) {
      if(bricks[col][row].status == 1) {
        var bXpos = (row*(bWidth+bPadding))+bOffsetLeft;
        var bYpos = (col*(bHeight+bPadding))+bOffsetTop;
        bricks[col][row].xPos = bXpos;
        bricks[col][row].yPos = bYpos;
        canvasCtx.beginPath();
        canvasCtx.rect(bXpos, bYpos, bWidth, bHeight);
        canvasCtx.fillStyle = "peru";
        canvasCtx.fill();
        canvasCtx.closePath();
      }
    }
  }
}

function drawScore() {
  canvasCtx.font = "16px Arial";
  canvasCtx.fillStyle = "red";
  canvasCtx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
  canvasCtx.font = "16px Arial";
  canvasCtx.fillStyle = "red";
  canvasCtx.fillText("Lives: "+live_cnt,520,20);
}

function draw() {
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if(xPos + dxPos > canvas.width-bRadius || xPos + dxPos < bRadius) {
    dxPos = -dxPos;
  }
  if(yPos + dyPos < bRadius) {
    dyPos = -dyPos;
  }
  else if(yPos + dyPos > canvas.height-pHeight) {
    if(xPos > pXpos && xPos < pXpos + pWidth) {
      if(lPress){
      	dyPos = -dyPos;
      	dxPos = -dxPos;
      }else if(rPress){
      	dxPos = -dxPos;
      	dyPos = -dyPos;
      }else{
      	dyPos = -dyPos
      }
    }
    else {
      dyPos = -dyPos;
      live_cnt--;
      if(live_cnt == 0){
      	alert("GAME OVER");
      document.location.reload();
       }else{
       	alert("lives remaining: "+live_cnt);
       	lPress = false;
       	rPress = false;
       }
    }
  }
  
	if(rPress && pXpos < canvas.width-pWidth) {
	pXpos += 7;
	}
	else if(lPress && pXpos > 0) {
	pXpos -= 7;
	}

  xPos += dxPos;
  yPos += dyPos;
}

setInterval(draw, 10);