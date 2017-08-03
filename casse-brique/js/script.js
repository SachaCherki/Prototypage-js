document.body.appendChild(document.createElement('canvas'));

(function($canvas){
	// VARIABLES 

	$canvas.isRunning = false;
	$canvas.isStart = false;
	$canvas.context = $canvas.getContext("2d");
	$canvas.width = window.innerWidth;
	$canvas.height = window.innerHeight;
	$canvas.left = false;
	$canvas.right = false;
	$canvas.speed = 6;
	$canvas.objects = {
		rect : [],
		circle : []
	}

	$canvas.briquesColors = ["black", "red", "green", "orange"];
	$canvas.briquesDesign = [
					[0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
					[0, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 0],
					[0, 1, 1, 2, 2, 3, 3, 2, 2, 1, 1, 0],
					[0, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 0],
					[0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0]
	]

	var briquesMaxHeight = 20;
	var briquesMaxWidth = ($canvas.width / $canvas.briquesDesign[0].length) - 2;
	for (var briquesLineID in $canvas.briquesDesign){
		var briquesLine = $canvas.briquesDesign[briquesLineID];
		for (var briquesColID in briquesLine){
			if(briquesLine[briquesColID] != -1){
				$canvas.objects.rect.push({
					x : (briquesColID * briquesMaxWidth) + (briquesColID * 2) + 1,
					y : (briquesLineID * briquesMaxHeight) + (briquesLineID * 2) + 1,
					w : briquesMaxWidth,
					h : briquesMaxHeight, 
					l : briquesLine[briquesColID]
				})
			}
		}
	}

	$canvas.objects.rect.push({ 
		p : true, 		//plateau
		x : ($canvas.width / 2) - (($canvas.width / 10) / 2), 			//horizontal
		y : $canvas.height - 20,		//vertical
		w : $canvas.width / 10, //width
		h : 20,					//height
		l : 0

	});

	$canvas.objects.circle.push({ 
		x : $canvas.width / 2,
		y : $canvas.height - (20 + briquesMaxHeight / 3),
		r : briquesMaxHeight / 3,
		l : 0,
		dx : $canvas.speed / 3,
		dy : -($canvas.speed / 3),
		compteur : 3

	});

	$canvas.run = function(objects){
		// Collision
		// Déplacement
		// Changement de couleur
		renewDY = false;

		var plateau = $canvas.objects.rect[$canvas.objects.rect.length - 1];
		var balle = $canvas.objects.circle[$canvas.objects.circle.length - 1];

		if($canvas.isRunning){
			balle.x = balle.x + (balle.dx * ($canvas.speed) / 2.5);
			balle.y = balle.y + (balle.dy * ($canvas.speed) / 2.5);

			if((balle.x + balle.r) >= $canvas.width) { balle.dx = - Math.abs(balle.dx) ; }
			if((balle.x - balle.r) <= 0) { balle.dx = Math.abs(balle.dx) ; }
			if((balle.y + balle.r) >= $canvas.height) { balle.dy = - Math.abs(balle.dy); $canvas.isRunning = false;}
			if((balle.y - balle.r) <= 0) { balle.dy = Math.abs(balle.dy) ; }

		}

		if(!$canvas.isStart){
			if($canvas.left && !$canvas.right && plateau.x >= 0){ 
				balle.x -= 1 * $canvas.speed; 
			}
			if($canvas.right && !$canvas.left && plateau.x <= $canvas.width - plateau.w){ 
				balle.x += 1 * $canvas.speed; 
			}
		}

		if($canvas.left && !$canvas.right && plateau.x >= 0){ 
			plateau.x -= 1 * $canvas.speed; 
		}
		if($canvas.right && !$canvas.left && plateau.x <= $canvas.width - plateau.w){ 
			plateau.x += 1 * $canvas.speed; 
		}

		for (var brique of objects.rect){
			if(brique.l > -1 && $canvas.collision(balle, brique)){
				if(!brique.p){
					brique.l--;
					// console.log(brique.l);
				}

				renewDY = true;
			}
		}

		if(renewDY){ // balle.dy > 0 ? - Math.abs(balle.dy) : Math.abs(balle.dy); }
			if(balle.dy > 0){
				balle.dy = - Math.abs(balle.dy);
			}else{
				balle.dy =  Math.abs(balle.dy);
			}
		}

	}

	$canvas.collision = function(circle, rect){
		var distX = Math.abs(circle.x - rect.x-rect.w/2);
		var distY = Math.abs(circle.y - rect.y-rect.h/2);

		if (distX > (rect.w/2 + circle.r)){return false;}
		if (distY > (rect.h/2 + circle.r)){return false;}

		if (distX <= (rect.w/2)){return true;}
		if (distY <= (rect.h/2)){return true;}

		var dx=distX-rect.w/2;
		var dy=distY-rect.h/2;


		return (((dx * dx) + (dy * dy)) <= (circle.r*circle.r));
	}

	$canvas.animateContext = function(){
		$canvas.context.clearRect(0,0, $canvas.width, $canvas.height);
		$canvas.run($canvas.objects);

		for (var objectType in $canvas.objects){
			if($canvas.objects[objectType] && objectType === "rect"){
				for(var object of $canvas.objects[objectType]){
					if(object.l != -1){
						$canvas.context.fillStyle = $canvas.briquesColors[ object.p ? 0 : object.l ];
						$canvas.context.fillRect(object.x, object.y, object.w, object.h);
					}
				}
			}

			if($canvas.objects[objectType] && objectType === "circle"){
				for(var object of $canvas.objects[objectType]){
					$canvas.context.beginPath();
					$canvas.context.arc(object.x, object.y, object.r, 2 * Math.PI, false);
					$canvas.context.fillStyle = $canvas.briquesColors[ object.l];
					$canvas.context.fill();
				}
			}
		}

		requestAnimationFrame($canvas.animateContext);
	}; requestAnimationFrame($canvas.animateContext);

	document.body.addEventListener("keydown", function (e){
		if(e.keyCode === 39){ $canvas.right = true; } // right

		if(e.keyCode === 37){ $canvas.left = true; } // left

		if(e.keyCode === 32){ $canvas.isStart = true; $canvas.isRunning = true; } // left
	})

	document.body.addEventListener("keyup", function (e){

		if(e.keyCode === 39){ $canvas.right = false; } // right

		if(e.keyCode === 37){ $canvas.left = false;	} // left
	})


})(document.querySelector('canvas'));