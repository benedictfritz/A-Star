var Palette = function(ctx) {
    this.ctx = ctx;

    this.sideLength = 40;

    this.draw = function() {
	ctx.fillStyle = "rgb(255,0,0)";
	this.ctx.fillRect(this.x, this.y, this.sideLength, this.sideLength);
    };

    this.update = function() {
	var mouse = g_eng.mouse;

	if (mouse.x > this.x && mouse.x < this.x + this.sideLength
	    && mouse.y > this.y && mouse.y < this.y + this.sideLength) {
	    if (mouse.leftPressed) {
		console.log("left in");
	    }
	    if (mouse.rightPressed) {
		console.log("right in");
	    }
	}
    };

}
Palette.prototype = new Entity;