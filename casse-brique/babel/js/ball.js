let Base = require('./base.js')

class Ball extends Base {
	constructor(x, y, r, dx, dy){
		super(x, y);
		this.r = r;
		this.dx = dx;
		this.dy = dy;


		console.log(this);
	}

	isBall(){
		return true;
	}
}

module.exports = Ball;