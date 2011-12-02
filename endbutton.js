var EndButton = function(ctx) {
    this.ctx = ctx;
    this.color = "rgb(255,0,0)";
    this.sideLength = 40;
    this.blockIdentifier = END;
};
EndButton.prototype = new Button();