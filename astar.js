function findPath() {
    if (!startSquare) {
	alert("No start point set!");
	return;
    }
    if (!endSquare) {
	alert("No end point set!");
	return;
    }

    var startNode = new Node(startSquare.x, startSquare.y, null);
    console.log("start: " + startNode.x, startNode.y);

    var openList = [startNode];
    var closedList = new Array();
    addAdjacentNodesToList(openList[0], openList, closedList);

    while(openList.length) {
	// look for the lowest F cost square on the open list.
	var currBlockIndex = 0;
	for (var i = 1; i < openList.length; i++) {
	    if (openList[currBlockIndex].getF() > openList[i].getF()) {
		currBlockIndex = i;
	    }
	}

	var currBlock = openList[currBlockIndex];
	openList.splice(currBlockIndex, 1);
	closedList.push(currBlock);
	addAdjacentNodesToList(currBlock, openList, closedList);

	// we're done when the endblock gets added to the closed list (meaning we've
	// traversed there.
	if (currBlock.equals(endSquare)) {
	    while(currBlock.parent != null) {
		console.log("x: " + currBlock.x + " y: " + currBlock.y);
		g_grid.squares[currBlock.x][currBlock.y] = PATH;
		currBlock = currBlock.parent;
	    }
	    console.log("success!");
	    return;
	}
    }
    alert("No possible path found!");
}

function addAdjacentNodesToList(node, openList, closedList) {
    var x, y;
    
    // start at the block to the left and check clockwise
    // this is the area where you would check diagonals if you wanted
    x = node.x-1;
    y = node.y;
    pushIfTraversable(x, y, node, openList, closedList);
    
    x = node.x;
    y = node.y-1;
    pushIfTraversable(x, y, node, openList, closedList);

    x = node.x+1;
    y = node.y;
    pushIfTraversable(x, y, node, openList, closedList);

    x = node.x;
    y = node.y+1;
    pushIfTraversable(x, y, node, openList, closedList);
}

function pushIfTraversable(x, y, parentNode, openList, closedList) {
    var squareIsOnGrid = typeof g_grid.squares[x] != 'undefined' && 
	typeof g_grid.squares[x][y] != 'undefined';

    if (squareIsOnGrid && g_grid.squares[x][y] != WALL) {
	var newNode = new Node(x, y, parentNode);

	// -1 will be returned if the node is not in the list
	if (listContainsNode(closedList, newNode) == -1) {
	    // if an adjacent square is already in the open list, make sure the path
	    // we took to get there isn't faster than the path that got it in there
	    var indexInOpenList = listContainsNode(openList, newNode);
	    if (indexInOpenList != -1) {
		if (newNode.G < openList[indexInOpenList].G)
		    openList[indexInOpenList] = newNode;
	    }
	    else {
		openList.push(newNode);
	    }
	}
    }
}

// a node is in a list if the x and y position match
// returns the matching index
function listContainsNode(list, node) {
    for (var i=0; i < list.length; i++) {
	var currNode = list[i];
	if (currNode.x == node.x && currNode.y == node.y) {
	    return i;
	}
    }
    return -1;
}