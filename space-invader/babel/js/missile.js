let Base = require('./base.js')

class Missile extends Base {
	constructor(x, y, r, dy, l){
		super(x, y);
		this.r = r;
		this.dy = dy;
		this.l = l;
	}

	isMissile(){
		return true;
	}
}

module.exports = Missile;