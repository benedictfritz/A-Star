function Node(x, y, parent, F, G) { 
    // use the 'super-class' constructor
    this.__proto__ = new Point(x, y);
    this.parent = parent;

}
Node.prototype = new Point();