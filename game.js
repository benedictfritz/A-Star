var g_eng, g_game;
var grid, palette;
var lastRender, loopStart, updateFinish, renderFinish;
var statsOn = false;
var targetFPS = 30;

function startGame() {
    g_eng = new Eng();
    g_eng.initialize();

    grid = new Grid(g_eng.ctx, 640, 480);
    g_eng.objectManager.objects.push(grid);
    
    palette = new Palette(g_eng.ctx);
    palette.y = 480;
    g_eng.objectManager.objects.push(palette);

    g_game = new Game;
    g_game.start();
}

function eraseGrid() {
    grid.clear();
}

function Game() {
    this.start = function() {
	loopStart = Date.now();
	
	// update each game object
	g_eng.objectManager.updateAll();
	updateFinish = Date.now();
	
	// clear screen and redraw objects
	g_eng.ctx.clearRect(0, 0, g_eng.width, g_eng.height);
	g_eng.objectManager.drawAll();
	renderFinish = Date.now();
	
	var sleep = updateStats();
	this.gloop = setTimeout(g_game.start, sleep);
    };
}

var updateStats = function() {
  if(statsOn){
    $("ut").innerHTML = (updateFinish - loopStart) + " ut";
    $("rt").innerHTML = (renderFinish - updateFinish) + " rt";
    $("fps").innerHTML = (Math.floor(1000 / (renderFinish - lastRender))) + " fps";
    $("num_objs").innerHTML = (g_eng.objectManager.objects.length) + " objs";
  }
  lastRender = renderFinish;
  return (1000/targetFPS) - (renderFinish - loopStart);
};
