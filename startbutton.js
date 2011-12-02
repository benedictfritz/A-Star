var StartButton = function(ctx) {
    this.ctx = ctx;
    this.color = "rgb(0, 255, 0)";
    this.sideLength = 40;
    this.blockIdentifier = START;
};
StartButton.prototype = new Button();