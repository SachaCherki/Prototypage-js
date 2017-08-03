let Missile = require('./missile.js');
let Plateau = require('./plateau.js');
let Monster = require('./monster.js');

class Game{
	constructor(){
		this.$canvas 		= this.getOrCreateScene();
		this.$canvas.width  = window.innerWidth;
		this.$canvas.height = window.innerHeight;
		this.speed 			= 6;
		this.left			= false;
		this.right			= false;
		this.isStart		= false;
		this.isRunning		= false;
		this.context 		= this.$canvas.getContext("2d");
		this.monsterDesign 	= [];
		this.objects 		= [ 
								new Plateau(
									(this.$canvas.width / 2) - ((this.$canvas.width / 10) / 2),
									 this.$canvas.height - 20,
									 this.$canvas.width / 10,
									 20,
									 0
									),
								new Missile(
									this.$canvas.width / 2,
									this.$canvas.height - (21 + 20 / 3),
									20 / 3,
									0,
									0
								)
							  ];

		this.animeLeft = false;
		this.animeRight = false;
		this.animeBot = false;

		document.body.addEventListener("keydown", (e) => {
			if(e.keyCode === 39){ this.right = true; } 
			if(e.keyCode === 37){ this.left  = true; }
			if(e.keyCode === 32){ 
				this.isRunning = true;
				this.isStart   = true;
			}
		});

		document.body.addEventListener("keyup", (e) => {
			if(e.keyCode === 39){ this.right = false; }
			if(e.keyCode === 37){ this.left  = false; }
		});
	}

	getOrCreateScene(){
		let canvas = document.querySelector('canvas');
		if(!canvas){
			document.body.appendChild(document.createElement('canvas'));
			canvas = document.querySelector('canvas');
		}
		return canvas;
	}

	generateMap(array){
		if(!array){
			var colLength  = Math.floor(Math.random() * (50 - 10)) + 10
			var lineLength = Math.floor(Math.random() * (8 - 4)) + 4

			for (var line = 0; line < lineLength; line++){
				this.monsterDesign.push([]);
				for (var col = 0; col < colLength; col++){
					this.monsterDesign[line].push(Math.floor(Math.random() * (0 - 3)) + 3);
				}
			}
		} else { this.monsterDesign = array; }

		var briqueMaxWidth =  (this.$canvas.width / this.monsterDesign[0].length) - 2;
		var i = 0;
		for(var monsterLineID in this.monsterDesign){
			if(i % 2 == 1){
				var monsterLine = this.monsterDesign[monsterLineID];
				var j = 0;
				for (var monsterColID in monsterLine){
					if(j != 0 && j != (monsterLine.length - 1)){
						if(j % 2 == 1){
							this.objects.push(new Monster(
								(monsterColID  * briqueMaxWidth)  + (monsterColID * 2)  + 1,
								(monsterLineID * 20) + (monsterLineID * 2) + 1,
								briqueMaxWidth,
								20,
								0,
								0,
								0
							));
						}
					}
					j++;
				}
			}
			i++;
		}	
	}

	animateContext(){
		this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
		var i = 0;
		while (i < this.objects.length){
			if( this.objects[i].isMonster() || this.objects[i].isPlateau()){
				if(this.objects[i].l >= 0 || this.objects[i].isPlateau()){
					this.context.fillStyle = "black";
					this.context.fillRect(this.objects[i].x,this.objects[i].y,this.objects[i].w,this.objects[i].h);

					if(this.objects[i].isPlateau()){
						var plateau = this.objects[i];
					}
				}
			} else if(this.objects[i].isMissile()){
				if(this.objects[i].l >= 0){
					this.context.beginPath();
					this.context.arc(this.objects[i].x, this.objects[i].y, this.objects[i].r , 2 * Math.PI, false);
					this.context.fillStyle = "black";
					this.context.fill();
				}else{
					this.objects[i] = new Missile(
								plateau.x + (plateau.w / 2),
								this.$canvas.height - (21 + 20 / 3),
								20 / 3,
								0,
								0
							);
					this.context.beginPath();
					this.context.arc(this.objects[i].x, this.objects[i].y, this.objects[i].r , 2 * Math.PI, false);
					this.context.fillStyle = "black";
					this.context.fill();
				}
			}

			i++;
		}
	}

	getPlateau(){
		for (let object of this.objects){
			if(object.isPlateau()){
				return object;
			}
		}
	}

	getMonster(){
		for (let object of this.objects){
			if(object.isMonster()){
				return object;
			}
		}
	}

	getMissile(){
		for (let object of this.objects){
			if(object.isMissile()){
				return object;
			}
		}
	}

	collision(circle,rect){
		var distX = Math.abs(circle.x - rect.x-rect.w/2);
		var distY = Math.abs(circle.y - rect.y-rect.h/2);

		if (distX > (rect.w/2 + circle.r)) { return false; }
		if (distY > (rect.h/2 + circle.r)) { return false; }

		if (distX <= (rect.w/2)) { circle.l--;rect.l--; return true; }
		if (distY <= (rect.h/2)) { circle.l--;rect.l--; return true; }

		var dx=distX-rect.w/2;
		var dy=distY-rect.h/2;


		if(dx*dx+dy*dy<=(circle.r*circle.r)){
			circle.l--;rect.l--; return true;
		}
		else{
			return false;
		}
	}

	animateSchema(){
		var tabObj = this.objects;
		var i = 0;

		if(this.animeLeft === false && this.animeRight === false && this.animeBot == false){
			this.animeRight = true;
		}

		while(i < tabObj.length){
			if(tabObj[i].isMonster()){
				if(this.animeRight){
					tabObj[i] = tabObj[i].x + ((this.$canvas.width / this.monsterDesign[0].length) - 2);
					this.animeLeft = false;
					this.animeRight = false;
					this.animeBot = true;
				}
				else if(this.animeLeft){
					tabObj[i] = tabObj[i].x - (2*((this.$canvas.width / this.monsterDesign[0].length) - 2));
					this.animeLeft = false;
					this.animeRight = false;
					this.animeBot = true;
				}
				else if(this.animeBot){
					tabObj[i] = tabObj[i].y + 20;
					this.animeLeft = false;
					this.animeRight = true;
					this.animeBot = false;
				}
				
			}
			i++;
		}

	}

	run(cycle){
		cycle.apply(this);
		this.animateContext();
		requestAnimationFrame(this.run.bind(this,cycle));
	}
}


window.game = new Game();
window.game.generateMap([
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

window.game.run(function(){
	var renewDY = false;
	var plateau = this.getPlateau();
	var missile = this.getMissile();

	// console.log('isRunning :'+this.isRunning);
	// console.log('isStart :'+this.isStart);

	// this.animateSchema();

	if(this.isRunning){
		missile.y = missile.y - 10;
		if((missile.y - missile.r) <= 0){
			missile.l--; 
			this.isRunning = false;
			this.isStart = false;
		}
	}

	if(!this.isStart){
		if(this.left  && !this.right && plateau.x >= 0) 							  { missile.x -= 1.5 * this.speed ;}
		if(this.right && !this.left  && plateau.x + plateau.w <= this.$canvas.width ) { missile.x += 1.5 * this.speed ;}
	}

	if(this.left  && !this.right && plateau.x >= 0) 							  { plateau.x -= 1.5 * this.speed ;}
	if(this.right && !this.left  && plateau.x + plateau.w <= this.$canvas.width ) { plateau.x += 1.5 * this.speed ;}
	
	for (let brique of this.objects){
		if (!brique.isMissile()){
			if ( (brique.isPlateau() && this.collision(missile,brique)) || (brique.l > -1 && this.collision(missile,brique)) ){
				brique.l--;
				renewDY = true;
				this.isRunning = false;
				this.isStart = false;
			}
			
		}
	}

	
});