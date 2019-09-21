let context = new (window.AudioContext || window.webkitAudioContext)();
let notes = {
    n65: {name: "3do", key: 65, letter: "a", freq: 261.63, color: "#948762"},
    n87: {name: "3do#", key: 87, letter: "w", freq: 277.18, color: "#FAA341"},
    n83: {name: "3re", key: 83, letter: "s", freq: 293.66, color: "#80F7FB"},
    n69: {name: "3re#", key: 69, letter: "e", freq: 311.13, color: "#20C79D"},
    n68: {name: "3mi", key: 68, letter: "d", freq: 329.23, color: "#B720C7"},
    n70: {name: "3fa", key: 70, letter: "f", freq: 349.23, color: "#4162FA"},
    n84: {name: "3fa#", key: 84, letter: "t", freq: 369.99, color: "#948762"},
    n71: {name: "3sol", key: 71, letter: "g", freq: 392.00, color: "#FAA341"},
    n89: {name: "3sol#", key: 89, letter: "y", freq: 415.30, color: "#80F7FB"},
    n72: {name: "3la", key: 72, letter: "h", freq: 440.00, color: "#20C79D"},
    n85: {name: "3la#", key: 85, letter: "u", freq: 466.16, color: "#B720C7"},
    n74: {name: "3si", key: 74, letter: "j", freq: 493.88, color: "#FAA341"},
    n75: {name: "4do", key: 75, letter: "k", freq: 523.25, color: "#948762"},
};

document.addEventListener("keydown", function(event) {
    playSound(event.keyCode);
}, false);

function playSound(note) {
    if (!notes["n" + note]) {
        return;
    }

    let sound = new Sound(context);
    sound.play(notes["n" + note].freq);
    drawRipple(note);
    sound.stop();
}

// Animació de cercle amb efecte d'aigua junt amb el CSS corresponent
function drawRipple(note) {
    var x = window.innerWidth/2;
    var y = window.innerHeight/2;
    var node = document.querySelector(".ripple");
    var newNode = node.cloneNode(true);
    newNode.classList.add("animate");
    newNode.style.left = x + "px";
    newNode.style.top = y + "px";
    newNode.style.background = notes["n" + note].color;
    node.parentNode.replaceChild(newNode, node);
};

/**
* Quan algú toca el seu instrument envia un missatge amb la nota al WebSocket_Server i aquest reenvia
* la nota a tots els seus clients. Un d'aquests clients és web_player.html amb aquests mètodes, i agafarà
* la nota rebuda i la farà sonar.
*/
let websocket = new WebSocket("ws://localhost:8080");
websocket.onmessage = function(event) { playSound(event.data); drawRipple(event.data); };
