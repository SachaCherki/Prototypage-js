class Base{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	isPlateau(){
		return false;
	}

	isMonster(){
		return false;
	}

	isMissile(){
		return false;
	}
}

module.exports = Base;