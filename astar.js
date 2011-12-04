function findPath() {
    if (!startSquare) {
	alert("No start point set!");
	return;
    }

    var startNode = new Node(startSquare.x, startSquare.y, null);
    console.log("start: " + startNode.x, startNode.y);

    var openList = [startNode];
    addAdjacentNodesToList(openList, openList[0]);

//    var solved = false;
//    while(!solved) {
	// look for the lowest F cost square on the open list.
//	var currBlock = openList[0];
	// for (var i = 1; i < openList.length; i++) {
	//     if (openList[i].)
	// }
//    }
}

// the next current square is the square with the lowest F cost
function getNextCurrentSquare(list) {
    
}

function addAdjacentNodesToList(list, node) {
    var x, y;

    // start at the block to the left and check clockwise
    x = node.x-1;
    y = node.y;
    pushIfTraversable(x, y, list, node);
    
    x = node.x-1;
    y = node.y-1;
    pushIfTraversable(x, y, list, node);

    x = node.x;
    y = node.y-1;
    pushIfTraversable(x, y, list, node);

    x = node.x+1;
    y = node.y-1;
    pushIfTraversable(x, y, list, node);

    x = node.x+1;
    y = node.y;
    pushIfTraversable(x, y, list, node);

    x = node.x+1;
    y = node.y+1;
    pushIfTraversable(x, y, list, node);

    x = node.x;
    y = node.y+1;
    pushIfTraversable(x, y, list, node);

    x = node.x-1;
    y = node.y+1;
    pushIfTraversable(x, y, list, node);
}

function pushIfTraversable(x, y, list, parentNode) {
    // check if coordinates are off the grid
    if (typeof g_grid.squares[x] != 'undefined' && 
	g_grid.squares[x][y] != 'undefined') {
	if (g_grid.squares[x][y] != WALL) {
	    var newNode = new Node(x, y, parentNode);
	    list.push(newNode);
	}
    }
}

// a node is in a list if the x and y position match
function listContainsNode(list, node) {
    for (var i=0; i < list.length; i++) {
	var currNode = list[i];
	if (currNode.x == node.x && currNode.y == node.y) {
	    return i;
	}
    }
    return -1;
}