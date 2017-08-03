document.body.appendChild(document.createElement('canvas'));
(function($canvas){
	// Variable
	$canvas.isRunning 		= false;
	$canvas.isStart	  		= false;
	$canvas.context	  		= $canvas.getContext("2d");
	$canvas.width 	  		= window.innerWidth;
	$canvas.height 	  		= window.innerHeight;
	$canvas.left	  		= false;
	$canvas.right	  		= false;
	$canvas.speed	  		= 6;
	$canvas.objects   		= {
		rect   : [],
		circle : []
	};
	$canvas.briquesColors 	= ["black","red","green","orange"];
	$canvas.briquesDesign 	= [
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
						  ];

	var briqueMaxHeight = 20;
	var briqueMaxWidth  = ($canvas.width / $canvas.briquesDesign[0].length) - 2;
	for(var briquesLineID in $canvas.briquesDesign){
		var briquesLine = $canvas.briquesDesign[briquesLineID];
		for (var briquesColID in briquesLine){
			$canvas.objects.rect.push({
				x : (briquesColID  * briqueMaxWidth)  + (briquesColID * 2)  + 1,
				y : (briquesLineID * briqueMaxHeight) + (briquesLineID * 2) + 1,
				w : briqueMaxWidth,
				h : briqueMaxHeight,
				l : briquesLine[briquesColID]
			});
		}
	}

	$canvas.objects.rect.push({
		p : true,				// plateau
		x : ($canvas.width / 2) - (($canvas.width / 10) / 2),// horizontal
		y : $canvas.height - 20,// vertical
		w : $canvas.width / 10,	// width
		h : briqueMaxHeight		// height
	});

console.log({
		x  : $canvas.width / 2,
		y  : $canvas.height - (21 + briqueMaxHeight / 3),
		r  : briqueMaxHeight / 3,
		l  : 0,
		dx :  ($canvas.speed / 3),
		dy : -($canvas.speed / 3)
	});

	$canvas.objects.circle.push({
		x  : $canvas.width / 2,
		y  : $canvas.height - (21 + briqueMaxHeight / 3),
		r  : briqueMaxHeight / 3,
		l  : 0,
		dx :  ($canvas.speed / 3),
		dy : -($canvas.speed / 3)
	});
	


	$canvas.run 			= function(objects){
		var renewDY = false;
		var renewDX = false;
		var plateau = $canvas.objects.rect[$canvas.objects.rect.length - 1];
		var ball 	= $canvas.objects.circle[$canvas.objects.circle.length - 1];
		if($canvas.isRunning){
			ball.x = ball.x + (ball.dx * ($canvas.speed / 2));
			ball.y = ball.y + (ball.dy * ($canvas.speed / 2));

			if((ball.x + ball.r) >= $canvas.width)	{ ball.dx =- Math.abs(ball.dx);}
			if((ball.x - ball.r) <= 0)				{ ball.dx =  Math.abs(ball.dx);}
			if((ball.y + ball.r) >= $canvas.height)	{ ball.dy =- Math.abs(ball.dy); $canvas.isRunning = false; } // gameOver
			if((ball.y - ball.r) <= 0)				{ ball.dy =  Math.abs(ball.dy); }

		}

		if(!$canvas.isStart){
			if($canvas.left  && !$canvas.right && plateau.x >= 0) 							{ ball.x -= 1.5 * $canvas.speed ;}
			if($canvas.right && !$canvas.left  && plateau.x + plateau.w <= $canvas.width )  { ball.x += 1.5 * $canvas.speed ;}
		}

		if($canvas.left  && !$canvas.right && plateau.x >= 0) 							{ plateau.x -= 1.5 * $canvas.speed ;}
		if($canvas.right && !$canvas.left  && plateau.x + plateau.w <= $canvas.width )  { plateau.x += 1.5 * $canvas.speed ;}
		
		for (var brique of objects.rect){
			if ( (brique.p && $canvas.collision(ball,brique)) || (brique.l > -1 && $canvas.collision(ball,brique)) ){
				if(!brique.p){
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

		if(renewDY){ ball.dy = ball.dy > 0 ? - Math.abs(ball.dy) : Math.abs(ball.dy); }
		if(renewDX){ ball.dx = ball.dx > 0 ? - Math.abs(ball.dx) : Math.abs(ball.dx); }
	}

	$canvas.collision = function(circle,rect){
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

	$canvas.animateContext 	= function(){
		$canvas.context.clearRect(0, 0, $canvas.width, $canvas.height);
		$canvas.run($canvas.objects);


		for (var objectType in $canvas.objects){
			if( $canvas.objects[objectType] && objectType === "rect"){
				for (var object of $canvas.objects[objectType]){
					if(object.p || object.l >= 0){
						$canvas.context.fillStyle = $canvas.briquesColors[ object.p ? 0 : object.l ];
						$canvas.context.fillRect(object.x,object.y,object.w,object.h);
					}
				}
			}
			if( $canvas.objects[objectType] && objectType === "circle"){
				for (var object of $canvas.objects[objectType]){
					$canvas.context.beginPath();
					$canvas.context.arc(object.x, object.y, object.r , 2 * Math.PI, false);
					$canvas.context.fillStyle = $canvas.briquesColors[object.l];
					$canvas.context.fill();
				}
			}
		}		

		requestAnimationFrame($canvas.animateContext);
	};	requestAnimationFrame($canvas.animateContext);


	document.body.addEventListener("keydown", function(e){
		if(e.keyCode === 39){ $canvas.right = true; } 
		if(e.keyCode === 37){ $canvas.left  = true; }
		if(e.keyCode === 32){ 
			$canvas.isRunning = true;
			$canvas.isStart   = true;
		} 
	});

	document.body.addEventListener("keyup", function(e){
		if(e.keyCode === 39){ $canvas.right = false; }
		if(e.keyCode === 37){ $canvas.left  = false; }
		if(e.keyCode === 32){ 
			$canvas.isRunning = false;
		}
	});











})(document.querySelector('canvas'));
