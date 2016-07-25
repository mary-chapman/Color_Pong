
//canvas variables
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//variables for the ball/ball directions
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
//paddleboard variables
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2 //defines the starting point for the paddle
//paddleboard variables
var rigthPressed = false;
var leftPressed = false;
//hole variables
var holeX = canvas.width/2;
var holeY = canvas.height-200;
var holeR = 25;
//score
var score = 0;

ctx.fillStyle = "#ff0000";
//to CREATE the ball
function drawBall(w) {
	ctx.beginPath(); //begins the drawing
	ctx.arc(x, y, ballRadius, 0, Math.PI*2) //creates circle- x, y, arc radians, start and end angle
	ctx.fillStyle = w; //color
	ctx.fill(); //fills the circle
	ctx.closePath();//ends the drawing
}

var ball = {
	status:0,
}
var hole = {status:1};

//document.getElementById("ID").style.background = 'color';
//canvas.ctx..drawBall().fillStyle = "black";
//$("#score").html() = '<p></p>';

function drawHole(c) {
		ctx.beginPath(); //begins the drawing
		ctx.arc(holeX, holeY, holeR, 0, Math.PI*2) //creates circle- x, y, arc radians, start and end angle
		ctx.fillStyle = "black"; //color
		ctx.fill(); //fills the circle
		ctx.strokeStyle=c;
		ctx.stroke();
		ctx.closePath();//ends the drawing
	}



function drawPaddle(c) {

	//to pause for temporary work
	//clearInterval(refreshID);

	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = c;
	ctx.fill();
	ctx.closePath();
}
//to MOVE the ball
function draw() {
	$("#playAgain").hide();

	ctx.clearRect(0, 0, canvas.width, canvas.height); //rect is cleared every time it is drawn (0,0)=top right of rect/ (canvas.width/canvas.height) = bottom right of rect

	drawBall("#79ff4d");
		if (ball.status === 0) {
			drawBall("#79ff4d");
			drawPaddle("#79ff4d");
		}
		else if (ball.status === 1) {
			drawBall("#ff80ff");
			drawPaddle("#ff80ff");
		}
		else if (ball.status === 2) {
			drawBall("#ff8080");
			drawPaddle("#ff8080");
		}
		else if (ball.status === 3) {
			drawBall("#0099ff");
			drawPaddle("#0099ff");
		}

		if (hole.status === 0) {
			//drawBall("#79ff4d");
			drawHole("#79ff4d");
			
			
		}
		else if (hole.status === 1) {
			//drawBall("#ff80ff");
			drawHole("#ff80ff");
			
			
		}
		else if (hole.status === 2) {
			//drawBall("#ff8080");
			drawHole("#ff8080");
			
			

		}
		else if (hole.status === 3) {
			//drawBall("#0099ff");
			drawHole("#0099ff");
			
			
		}
	
		
	
	holeF();
	

	x += dx; //moves the ball horizantally each frame
	y += dy; //adds the ball vert each frame
	if (y + dy < ballRadius) { //if the ball height is greater than the bottom or is less than the top (cord 0) 
		dy = -dy;         //reverses the direction
	}
	else if (y + dy > canvas.height - ballRadius) {
		if (x>paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		}
		else {
			 endGame();
			 again();
		}
	}

	if (x + dx > canvas.width - ballRadius|| x + dx < ballRadius) { //if the ball horizantal distance is greater than the right or or less than the left sides
		dx = -dx; 		//reverse the direction
	}
	

	//paddle movement
	if (rigthPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += 7;
	}
	if (leftPressed && paddleX > 0) {
		paddleX -= 7;
	}
	
}

//for moving the paddle
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);// fires the KeyDownHandler() function when the keys are pressed

function endGame() {
	//$("#myCanvas").hide();
	$("#myCanvas, #sideBar").css("opacity", .35);
	clearInterval(refreshID); //to end animation
	$("#playAgain").show();
	var finalScore = $(".num").text();
	$(".endNum").text(finalScore);
}
function again() {
	$(".again").on("click", function(){
		$("#myCanvas").show();
		document.location.reload();
	});
}


function keyDownHandler(e) { //function when key is pressed down - 
	if(e.keyCode === 39) {  //the right key is activated 
		rigthPressed = true;
	}
	else if (e.keyCode === 37) { //the left key is activated 
		leftPressed = true;
	}
}

function keyUpHandler(e) { //function when key is released - 
	if(e.keyCode === 39) {  //the right key is de-activated 
		rigthPressed = false;
	}
	else if (e.keyCode === 37) { //the left key is de-activated 
		leftPressed = false;
	}
}
var randoX;
var randoY;
var randoC; 

//generate random number for coords
function randoNum() {
	randoX = 50 + Math.floor(Math.random() * 430);
	randoY = 1 + Math.floor(Math.random() * 300);
}

function circleSmall() {
	if ((holeX > 0) && (holeY > 0)) {
		holeX -= 10;
		holeY -= 10;
	}
}
function holeF() {
	if ((x < (holeX+holeR)) && (x > (holeX-holeR)) && (y < (holeY+holeR)) && (y > (holeY - holeR))) { //if the x/y pos of the ball is less than the x/y pos of the brick plus its width/height
		score += 1;
		$(".num").text(score);
		console.log(score);
		ball.status = hole.status;
		hole.status = 1 + Math.floor(Math.random() * 3);
		
		randoNum();
		x = canvas.width/2;
		y = canvas.height-300;
		//for circle
			holeX = randoX;
			holeY = randoY;
		}
	}





var refreshID = setInterval(draw, 10);