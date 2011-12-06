function Node(x, y, parent) { 
    // use the 'super-class' constructor
    this.__proto__ = new Point(x, y);
    this.parent = parent;

    this.H = this.distance(endSquare);	

    this.G = 0;
    if (parent != null) {
	this.G = parent.G + this.distance(parent);;
    }

    this.getF = function() {
	return this.H + this.G;
    };

    this.equals = function(otherNode) {
	if (this.x == otherNode.x && this.y == otherNode.y) {
	    return true;
	}
	return false;
    };
}
