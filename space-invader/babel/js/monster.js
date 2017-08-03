let Base = require('./base.js')


class Monster extends Base {
	constructor(x, y, w, h, dx, dy, l){
		super(x, y);
		this.w = w;
		this.h = h;
		this.dx = dx;
		this.dy = dy;
		this.l = l;
	}

	isMonster(){
		return true;
	}
}

module.exports = Monster;