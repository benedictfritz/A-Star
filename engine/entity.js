/**
 * Base game entity class
 */
function Entity() {
  this.x = 0;
  this.y = 0;

  this.init = function() {
    objectManager.objects.push(this);
  };

  this.update = function() {
    return;
  };

  this.draw = function() {
    return;
  };

  this.shutdown = function() {
    objectManager.remove(this);
  };
}
