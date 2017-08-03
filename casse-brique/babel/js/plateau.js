let Base = require('./base.js')

class Plateau extends Base {
	constructor(x, y, w, h){
		super(x, y);
		this.w = w;
		this.h = h;
	}

	isPlateau(){
		return true;
	}
}

module.exports = Plateau;