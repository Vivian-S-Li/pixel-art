myCanvas.addEventListener("click", getPosition, false);

var LENGTH_PX = 500;
var LENGTH_BOXES = 10;
var OFFSET_CENTER = 500;

function drawGrid(gridColor) {

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    if (gridColor) {
        ctx.strokeStyle = "black"; 
    } else {
        ctx.strokeStyle = "white"; 
    }

    var i;

    for (i = 0; i <= LENGTH_BOXES; i++) {
        ctx.moveTo(((i*(LENGTH_PX / LENGTH_BOXES))), 0);
        ctx.lineTo(((i*(LENGTH_PX / LENGTH_BOXES))),LENGTH_PX);
        ctx.strokeStyle = gridColor; 
        ctx.stroke();
    }
    for (i = 0; i <= LENGTH_BOXES; i++) {
        ctx.moveTo(0, ((i*(LENGTH_PX / LENGTH_BOXES))));
        ctx.lineTo(LENGTH_PX, (i*(LENGTH_PX / LENGTH_BOXES)));
        ctx.stroke();
    }

}

function colorPixel(cx,cy,hexRGB) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = hexRGB;
    ctx.fillRect((cx * (LENGTH_PX / LENGTH_BOXES)) + 1, (cy * (LENGTH_PX / LENGTH_BOXES)) + 1 , 48, 48);

    JSONboard.canvasRGB.board[cx][cy] = hexRGB;
}

function colorPixelFromArray() {
    var cArray = JSONboard.canvasRGB.board;

    for (let i = 0; i < cArray.length; i++) {
        for (let j = 0; j < cArray.length; j++) {
            colorPixel(i, j, cArray[i][j]);
        }
    }
}

function getPosition(event) {
  var x = event.x;
  var y = event.y;

  var canvas = document.getElementById("myCanvas");

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;
  cx = Math.floor(x / (LENGTH_PX / LENGTH_BOXES));
  cy = Math.floor(y / (LENGTH_PX / LENGTH_BOXES));

  var hexRGB = document.getElementById("penColor").value;

  notifyServerOfPixel(cx, cy, hexRGB);
}