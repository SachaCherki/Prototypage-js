// FICHIER GameManager.js
function GameManager(){
	this.$canvas 		= this.getOrCreateScene();
	this.$canvas.width  = window.innerWidth;
	this.$canvas.height = window.innerHeight;
	this.speed 			= 6;
	this.objects 		= [ 
							new Plateau(
									(this.$canvas.width / 2) - ((this.$canvas.width / 10) / 2),
									 this.$canvas.height - 20,
									 this.$canvas.width / 10,
									 20
									),
							new Ball(
									this.$canvas.width / 2,
									this.$canvas.height - (21 + 20 / 3),
									20 / 3,
									(this.speed / 3),
									-(this.speed / 3)
								)
						  ];
	this.briquesColors 	= ["black","red","green","orange"];
	this.isStart		= false;
	this.isRunning		= false;
	this.context 		= this.$canvas.getContext("2d");
	this.briquesDesign 	= [];

	document.body.addEventListener("keydown", function(e){
		if(e.keyCode === 39){ this.right = true; } 
		if(e.keyCode === 37){ this.left  = true; }
		if(e.keyCode === 32){ 
			this.isRunning = true;
			this.isStart   = true;
		}
	}.bind(this));

	document.body.addEventListener("keyup", function(e){
		if(e.keyCode === 39){ this.right = false; }
		if(e.keyCode === 37){ this.left  = false; }
	}.bind(this));

};

GameManager.prototype.getOrCreateScene = function getOrCreateScene(){
	let canvas = document.querySelector('canvas');
	if(!canvas){
		document.body.appendChild(document.createElement('canvas'));
		canvas = document.querySelector('canvas');
	}

	return canvas;
};

GameManager.prototype.animateContext = function(){
	this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
	for (var object of this.objects){
		if(object instanceof Plateau || object instanceof Brique){
			if(object.l >= 0 || object instanceof Plateau){
				this.context.fillStyle = this.briquesColors[object.l || 0];
				this.context.fillRect(object.x,object.y,object.w,object.h);
			}
		} else if(object instanceof Ball){
			this.context.beginPath();
			this.context.arc(object.x, object.y, object.r , 2 * Math.PI, false);
			this.context.fillStyle = this.briquesColors[0];
			this.context.fill();
		}
	}
}

GameManager.prototype.generateMap = function(array){
	
	if(!array){
		var colLength  = Math.floor(Math.random() * (50 - 10)) + 10
		var lineLength = Math.floor(Math.random() * (8 - 4)) + 4

		for (var line = 0; line < lineLength; line++){
			this.briquesDesign.push([]);
			for (var col = 0; col < colLength; col++){
				this.briquesDesign[line].push(Math.floor(Math.random() * (0 - 3)) + 3);
			}
		}
	}else{ this.briquesDesign = array; }

	var briqueMaxWidth =  (this.$canvas.width / this.briquesDesign[0].length) - 2;
	for(var briquesLineID in this.briquesDesign){
		var briquesLine = this.briquesDesign[briquesLineID];
		for (var briquesColID in briquesLine){
			this.objects.push(new Brique(
				(briquesColID  * briqueMaxWidth)  + (briquesColID * 2)  + 1,
				(briquesLineID * 20) + (briquesLineID * 2) + 1,
				briqueMaxWidth,
				20,
				briquesLine[briquesColID]
			));
		}
	}	

}

GameManager.prototype.run = function run(cycle){
	cycle.apply(this);
	this.animateContext();
	requestAnimationFrame(this.run.bind(this,cycle));
};

GameManager.getInstance = function(){
	return new GameManager;
};

GameManager.prototype.collision = function(circle,rect){
	var distX = Math.abs(circle.x - rect.x-rect.w/2);
	var distY = Math.abs(circle.y - rect.y-rect.h/2);

	if (distX > (rect.w/2 + circle.r)) { return false; }
	if (distY > (rect.h/2 + circle.r)) { return false; }

	if (distX <= (rect.w/2)) { return true; }
	if (distY <= (rect.h/2)) { return true; }

	var dx=distX-rect.w/2;
	var dy=distY-rect.h/2;

	return (dx*dx+dy*dy<=(circle.r*circle.r));
}

GameManager.prototype.getPlateau = function(){
	for (object of this.objects){
		if(object instanceof Plateau){
			return object;
		}
	}
}

GameManager.prototype.getBall = function(){
	for (object of this.objects){
		if(object instanceof Ball){
			return object;
		}
	}
}

// FICHIER Plateau.js
function Plateau(x,y,w,h){
	this.x = x
	this.y = y;
	this.w = w;
	this.h = h;
}

// FICHIER Brique.js
function Brique(x,y,w,h,l){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.l = l;
}

// FICHIER Ball.js
function Ball(x,y,r,dx,dy){
	this.x  = x;
	this.y  = y;
	this.r  = r;
	this.dx = dx;
	this.dy = dy;
	console.log(this);
}


(function(Game){

	Game.generateMap([
						[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
						[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
						[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
						[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
						[ 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 0 , 1 , 1 , 1 , 0 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 0],
						[ 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 0],
						[ 0 , 0 , 0 , 0 , 0 , 1 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 1 , 0 , 0 , 0 , 0 , 0],
						[ 0 , 0 , 0 , 0 , 0 , 1 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 1 , 0 , 0 , 0 , 0 , 0],
						[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 0 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
						[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0]
					]);
	Game.run(function(){
		var renewDY = false;
		var plateau = this.getPlateau();
		var ball 	= this.getBall();

		if(this.isRunning){
			ball.x = ball.x + (ball.dx * (this.speed / 2));
			ball.y = ball.y + (ball.dy * (this.speed / 2));

			if((ball.x + ball.r) >= this.$canvas.width)		{ ball.dx =- Math.abs(ball.dx);}
			if((ball.x - ball.r) <= 0)						{ ball.dx =  Math.abs(ball.dx);}
			if((ball.y + ball.r) >= this.$canvas.height)	{ ball.dy =- Math.abs(ball.dy); this.isRunning = false; } // gameOver
			if((ball.y - ball.r) <= 0)						{ ball.dy =  Math.abs(ball.dy); }
		}

		if(!this.isStart){
			if(this.left  && !this.right && plateau.x >= 0) 							  { ball.x -= 1.5 * this.speed ;}
			if(this.right && !this.left  && plateau.x + plateau.w <= this.$canvas.width ) { ball.x += 1.5 * this.speed ;}
		}

		if(this.left  && !this.right && plateau.x >= 0) 							  { plateau.x -= 1.5 * this.speed ;}
		if(this.right && !this.left  && plateau.x + plateau.w <= this.$canvas.width ) { plateau.x += 1.5 * this.speed ;}
		
		for (var brique of this.objects){
			if ( brique instanceof Ball === false ){
				if ( (brique instanceof Plateau && this.collision(ball,brique)) || (brique.l > -1 && this.collision(ball,brique)) ){
					if(brique instanceof Brique){
						brique.l--;
					}else{
						var zone = brique.w / 6;
						var balance = ball.x - brique.x;
							 if(balance >= zone * 5) { ball.dx =  3; }
						else if(balance >= zone * 4) { ball.dx =  2; }
						else if(balance >= zone * 3) { ball.dx =  1; }
						else if(balance >= zone * 2) { ball.dx = -1; }
						else if(balance >= zone * 1) { ball.dx = -2; }
						else if(balance >= zone * 0) { ball.dx = -3; }
					}
					renewDY = true;
				}
			}
		}

		if(renewDY){ ball.dy = ball.dy > 0 ? - Math.abs(ball.dy) : Math.abs(ball.dy); }
	});

})(GameManager.getInstance());





















