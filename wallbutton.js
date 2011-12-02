var WallButton = function(ctx) {
    this.ctx = ctx;
    this.color = "rgb(0, 0, 0)";
    this.sideLength = 40;
    this.blockIdentifier = WALL;
};
WallButton.prototype = new Button();