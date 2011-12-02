function Eng() {
    this.canvas = 0;
    this.ctx = null;
    this.targetFPS = 0;
    this.width = 0;
    this.height = 0;
    this.mouse = null;
    this.objectManager = null;

    this.initialize = function() {
	this.canvas = document.getElementById('canvas');
	this.ctx = canvas.getContext("2d");
	this.ctx.translate(0.5, 0.5);
	this.targetFPS = 30;
	this.width = canvas.getAttribute("width");
	this.height = canvas.getAttribute("height");    
	this.mouse = new Mouse(this.canvas);
	this.objectManager = new ObjectManager();
    };
}

/**
 * Ye Olde Manager of Objects
 */
function ObjectManager() {
    this.objects = new Array();

    this.updateAll = function() {
	for (idx in this.objects) {
	    this.objects[idx].update();
	}
    };

    this.drawAll = function() {
	for (idx in this.objects) {
	    this.objects[idx].draw();
	}
    };

    this.remove = function(obj) {
	this.objects.splice(this.objects.indexOf(obj), 1);
    };

    this.clear = function() {
	this.objects = new Array();
    };
};

/**
 * Mouse singleton
 */
function Mouse(canvas) {
    this.x = 0;
    this.y = 0;
    this.leftPressed = false;
    this.rightPressed = false;

    function press(e) {
	if(e.which == 1) {
	    this.leftPressed = true;
	} else if(e.which == 3) {
	    this.rightPressed = true;
	}
    };
    canvas.onmousedown = press.bind(this);
    
    function unpress(e) {
	if(e.which == 1) {
	    this.leftPressed = false;
	} else if(e.which == 3) {
	    this.rightPressed = false;
	}
    };
    canvas.onmouseup = unpress.bind(this);

    function move(e) {
	this.x = e.offsetX? e.offsetX: e.layerX;
	this.y = e.offsetY? e.offsetY: e.layerY;
    };
    canvas.onmousemove = move.bind(this);

    // disable context menu
    function disableContextMenu(e) {
	return false;
    };
    canvas.oncontextmenu = disableContextMenu.bind(this);

    // prevent double click from highlighting text 
    canvas.onselectstart = function () {
	return false;
    };
}

