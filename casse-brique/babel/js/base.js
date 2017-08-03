class Base{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	isBrique(){
		return false;
	}

	isBall(){
		return false;
	}

	isPlateau(){
		return false;
	}
}

module.exports = Base;