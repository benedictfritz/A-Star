var Grid = function(ctx, width, height) {    
    // round the shit out of everything. pixels don't have fractions.
    // of course, this means that our drawing isn't the exact size we told it to
    // be, but I don't think that matters at this stage.
    this.width = Math.floor(width);
    this.height = Math.floor(height);
    
    this.ctx = ctx;
    this.squareLength = 20;

    this.numColumns = Math.floor(this.width/this.squareLength);
    this.squares = new Array(this.numColumns);

    this.numRows = Math.floor(this.height/this.squareLength);
    for (var i=0; i < this.squares.length; i++) {
	this.squares[i] = new Array(this.numRows);

	// initialize all values in the grid to 0 representing that nothing
	// is drawn there right now
	for(var j=0; j < this.numRows; j++) {
	    this.squares[i][j] = 0;
	}
    }

    this.draw = function() {
	var maxHorizontal = this.numColumns * this.squareLength;
	var maxVertical = this.numRows * this.squareLength;

	// draw vertical lines
	for (i = this.x; i <= maxHorizontal; i += this.squareLength) {
	    this.ctx.beginPath();
	    this.ctx.moveTo(Math.floor(i), this.y);
	    this.ctx.lineTo(Math.floor(i), maxVertical);
	    this.ctx.stroke();
	}

	// draw horizontal lines
	this.ctx.moveTo(0, 0);
	for (i = 0; i <= maxVertical; i += this.squareLength) {
	    this.ctx.beginPath();
	    this.ctx.moveTo(this.x, Math.floor(i));
	    this.ctx.lineTo(maxHorizontal, Math.floor(i));
	    this.ctx.stroke();
	}

	for (var column = 0; column < this.numColumns; column++) {
	    for (var row = 0; row < this.numRows; row++) {
		if (this.squares[column][row] == 1) {
		    this.ctx.fillRect(this.x + column * this.squareLength, 
				      row * this.squareLength, 
				      this.squareLength, this.squareLength);
		}
	    }
	}
    };

    this.update = function() {
	var mouse = g_eng.mouse;

	var clickInGridX = mouse.x - this.x;
	var clickInGridY = mouse.y - this.y;

	// if both the x and y are within the grid, proceed
	if (clickInGridX > 0 && clickInGridY > 0) {
	    var column = Math.floor(clickInGridX / this.squareLength);
	    var row = Math.floor(mouse.y / this.squareLength);

	    if (mouse.leftPressed) {
		this.squares[column][row] = 1;
	    }
	    if (mouse.rightPressed) {
		this.squares[column][row] = 0;
	    }
	}
    };

    this.clear = function() {
	for (var column = 0; column < this.numColumns; column++) {
	    for (var row = 0; row < this.numRows; row++) {
		this.squares[column][row] = 0;
	    }
	}
    };
};
Grid.prototype = new Entity;