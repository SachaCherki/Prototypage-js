let Base = require('./base.js')

class Plateau extends Base {
	constructor(x, y, w, h, l){
		super(x, y);
		this.w = w;
		this.h = h;
		this.l = l;
	}

	isPlateau(){
		return true;
	}
}

module.exports = Plateau;