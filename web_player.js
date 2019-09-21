let context = new (window.AudioContext || window.webkitAudioContext)();
let notes = {
    "do": {key: 65, letter: "a", freq: 32.7032, color: "#948762"},
    "do#": {key: 87, letter: "w", freq: 34.6479, color: "#FAA341"},
    "re": {key: 83, letter: "s", freq: 36.7081, color: "#80F7FB"},
    "re#": {key: 69, letter: "e", freq: 38.8909, color: "#20C79D"},
    "mi": {key: 68, letter: "d", freq: 41.2035, color: "#B720C7"},
    "fa": {key: 70, letter: "f", freq: 43.6536, color: "#4162FA"},
    "fa#": {key: 84, letter: "t", freq: 46.2493, color: "#948762"},
    "sol": {key: 71, letter: "g", freq: 48.9995, color: "#FAA341"},
    "sol#": {key: 89, letter: "y", freq: 51.9130, color: "#80F7FB"},
    "la": {key: 72, letter: "h", freq: 55.0000, color: "#20C79D"},
    "la#": {key: 85, letter: "u", freq: 58.2705, color: "#B720C7"},
    "si": {key: 74, letter: "j", freq: 61.7354, color: "#FAA341"},
};

window.addEventListener("keydown", function(event) {
    // quan es prem una tecla es captura el "keyCode", per tant cal buscar
    // dins l'objecte "notes" quina nota té el mateix "key" que el "keyCode"
	for (nota in notes) {
		if (notes[nota].key == event.keyCode) {
			playSound(nota);
		}
	}
		
    //playSound(event.keyCode);
}, false);

function playSound(note, octave = 4) {
    if (!notes[note]) {
        return;
    }

    let sound = new Sound(context);
    sound.play(notes[note].freq * (2 * octave));
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
    newNode.style.background = notes[note].color;
    node.parentNode.replaceChild(newNode, node);
};

/**
* Quan algú toca el seu instrument envia un missatge amb la nota al WebSocket_Server i aquest reenvia
* la nota a tots els seus clients. Un d'aquests clients és web_player.html amb aquests mètodes, i agafarà
* la nota rebuda i la farà sonar.
*/
let websocket = new WebSocket("ws://localhost:8080");
websocket.onmessage = function(event) {
    playSound(event.data);
    drawRipple(event.data);
};
