var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank tile

var turns = 0;

// Define the possible image names
var imgNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Shuffle function to randomize array elements
function shuffleArray(array) {
    for (i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle the image names array
shuffleArray(imgNames);

// Construct the imgOrder array using the shuffled image names
var imgOrder = imgNames.slice(); // Copy the shuffled image names

window.onload = function () {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            //<img id="0-0" src="1.jpg">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpg";

            // DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); // Click an image to drag
            tile.addEventListener("dragover", dragOver); // Moving image around while clicked
            tile.addEventListener("dragenter", dragEnter); // Dragging image onto another one
            tile.addEventListener("dragleave", dragLeave); // Dragged image leaving another image
            tile.addEventListener("drop", dragDrop); // Drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd); // After drag drop, swap the two tiles

            document.getElementById("board").append(tile);
        }
    }
}

function dragStart() {
    currTile = this; // this refers to the img tile being dragged
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() { }

function dragDrop() {
    otherTile = this; // this refers to the img tile being dropped on
}

function play() {
    location.reload();
}

function dragEnd() {
    if (!otherTile) {
        return;
    }

    // let currCoords = currTile.id.split("-");
    // let r = parseInt(currCoords[0]);
    // let c = parseInt(currCoords[1]);

    // let otherCoords = otherTile.id.split("-");
    // let r2 = parseInt(otherCoords[0]);
    // let c2 = parseInt(otherCoords[1]);

    // let moveLeft = r == r2 && c2 == c - 1;
    // let moveRight = r == r2 && c2 == c + 1;
    // let moveUp = c == c2 && r2 == r - 1;
    // let moveDown = c == c2 && r2 == r + 1;

    // let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    // if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;

        if (turns >= 10) {
            document.getElementById("message").innerHTML = "You lose! Too many turns.";
            setTimeout(play, 3000);

            var text = "play again";
            var vois = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(vois)
        }
        checkWin();
    }

    function checkWin() {
        let ordered = true;
        const tiles = document.querySelectorAll("#board img");
        for (let i = 0; i < tiles.length - 1; i++) {
            if (tiles[i].src > tiles[i + 1].src) {
                ordered = false;
                break;
            }
        }
        if (ordered) {
            document.getElementById("message").innerText = "Congratulations! You win!";
            setTimeout(play, 3000);
            
            var text = "Congratulations";
            var vois = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(vois)
        }
    }
    // function speak() {
    //     // var text = document.getElementById("message").value;

    // }

