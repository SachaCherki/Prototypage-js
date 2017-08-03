let Base = require('./base.js')


class Brique extends Base {
	constructor(x, y, w, h, l){
		super(x, y);
		this.w = w;
		this.h = h;
		this.l = l;
	}

	isBrique(){
		return true;
	}
}

module.exports = Brique;