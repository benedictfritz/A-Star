var g_eng, g_game;
var g_grid, wallbutton, endbutton, startbutton;
var lastRender, loopStart, updateFinish, renderFinish;
var statsOn = false;
var targetFPS = 30;

function startGame() {
    g_eng = new Eng();
    g_eng.initialize();

    g_grid = new Grid(g_eng.ctx, 640, 480);
    g_eng.objectManager.objects.push(g_grid);

    wallbutton = new WallButton(g_eng.ctx);
    wallbutton.y = 480;
    g_eng.objectManager.objects.push(wallbutton);

    startbutton = new StartButton(g_eng.ctx);
    startbutton.x = wallbutton.sideLength;
    startbutton.y = 480;
    g_eng.objectManager.objects.push(startbutton);
    
    endbutton = new EndButton(g_eng.ctx);
    endbutton.x = wallbutton.sideLength + startbutton.sideLength;
    endbutton.y = 480;
    g_eng.objectManager.objects.push(endbutton);

    g_game = new Game;
    g_game.start();
}

function eraseGrid() {
    g_grid.clear();
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
