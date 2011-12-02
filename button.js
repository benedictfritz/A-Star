var Button =  function() {
    this.draw = function() {
	var oldStyle = this.ctx.fillStyle;
	this.ctx.fillStyle = this.color;
	this.ctx.fillRect(this.x, this.y, this.sideLength, this.sideLength);
	this.ctx.fillStyle = oldStyle;
    };

    this.update = function() {
	var mouse = g_eng.mouse;

	var clickInX = mouse.x - this.x;
	var clickInY = mouse.y - this.y;

	// if both the x and y are within the grid, proceed
	if (clickInX > 0 && clickInY > 0) {	
	    BLOCK_TYPE = this.blockIdentifier;
	}
    };
};
Button.prototype = new Entity;