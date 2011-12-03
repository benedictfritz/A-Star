var EMPTY = 0;
var WALL = 1;
var START = 2;
var END = 3;
var BLOCK_TYPE = WALL;

var startSquare, endSquare;

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
	for(var j=0; j < this.numRows; j++) {
	    this.squares[i][j] = EMPTY;
	}
    }

    this.draw = function() {
	var oldFillStyle;
	oldFillStyle = this.ctx.fillStyle;
	this.ctx.fillStyle = "rgb(255, 0, 0)";
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
	this.ctx.fillStyle = oldFillStyle;

	for (var column = 0; column < this.numColumns; column++) {
	    for (var row = 0; row < this.numRows; row++) {
		if (this.squares[column][row] == EMPTY) {
		    oldFillStyle = this.ctx.fillStyle;
		    this.ctx.fillStyle = "rgb(255, 255, 255)";
		    this.ctx.fillRect(this.x + column * this.squareLength + 1, 
				      row * this.squareLength + 1, 
				      this.squareLength-2, this.squareLength-2);
		    this.ctx.fillStyle = oldFillStyle;
		}
		else if (this.squares[column][row] == WALL) {
		    oldFillStyle = this.ctx.fillStyle;
		    this.ctx.fillStyle = "rgb(0, 0, 0)";
		    this.ctx.fillRect(this.x + column * this.squareLength, 
				      row * this.squareLength, 
				      this.squareLength, this.squareLength);
		    this.ctx.fillStyle = oldFillStyle;
		}
		else if (this.squares[column][row] == END) {
		    oldFillStyle = this.ctx.fillStyle;
		    this.ctx.fillStyle = "rgb(255, 0, 0)";
		    this.ctx.fillRect(this.x + column * this.squareLength, 
				      row * this.squareLength, 
				      this.squareLength, this.squareLength);
		    this.ctx.fillStyle = oldFillStyle;
		}
	    }
	}

	// fill in start and end squares
	if (startSquare) {
	    oldFillStyle = this.ctx.fillStyle;
	    this.ctx.fillStyle = "rgb(0, 255, 0)";
	    this.ctx.fillRect(this.x + startSquare.x * this.squareLength, 
			      startSquare.y * this.squareLength, 
			      this.squareLength, this.squareLength);
	    this.ctx.fillStyle = oldFillStyle;
	}
	if (endSquare) {
	    oldFillStyle = this.ctx.fillStyle;
	    this.ctx.fillStyle = "rgb(255, 0, 0)";
	    this.ctx.fillRect(this.x + endSquare.x * this.squareLength, 
			      endSquare.y * this.squareLength, 
			      this.squareLength, this.squareLength);
	    this.ctx.fillStyle = oldFillStyle;
	}
    };

    this.update = function() {
	var mouse = g_eng.mouse;

	var clickInGridX = mouse.x - this.x;
	var clickInGridY = mouse.y - this.y;

	// if both the x and y are within the grid, proceed
	if (clickInGridX > 0 && clickInGridY > 0
	   && clickInGridX < this.width && clickInGridY < this.height) {
	    var column = Math.floor(clickInGridX / this.squareLength);
	    var row = Math.floor(mouse.y / this.squareLength);
	    
	    if (mouse.leftPressed) {
		if (BLOCK_TYPE == START) {
		    if (startSquare) {
			this.squares[startSquare.x][startSquare.y] = EMPTY;
		    }
		    startSquare = new Point(column, row);
		}
		if (BLOCK_TYPE == END) {
		    if (endSquare) {
			this.squares[endSquare.x][endSquare.y] = EMPTY;
		    }
		    endSquare = new Point(column, row);
		}
		this.squares[column][row] = BLOCK_TYPE;
	    }
	    if (mouse.rightPressed) {
		if (startSquare && startSquare.x == column 
		    && startSquare.y == row) {
		    startSquare = null;
		}
		if (endSquare && endSquare.x == column 
		    && endSquare.y == row) {
		    endSquare = null;
		}

		this.squares[column][row] = EMPTY;
	    }
	}
    };

    this.clear = function() {
	startSquare = null;
	endSquare = null;
	for (var column = 0; column < this.numColumns; column++) {
	    for (var row = 0; row < this.numRows; row++) {
		this.squares[column][row] = this.EMPTY;
	    }
	}
    };
};
Grid.prototype = new Entity;