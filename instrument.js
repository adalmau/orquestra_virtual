// Si el websocket es construeix al mateix servidor web es pot fer servir
// "location.hostname", sinó caldrà estabir la ip del servidor de websockets manualment
var websocket = new WebSocket("ws://" + location.hostname + ":8080");
var notes;

window.addEventListener("load", function() {
    notes = document.getElementsByClassName("key");

    for (nota of notes) {
        nota.addEventListener("click", function() {
            websocket.send(this.dataset.freq);
        }, false);
        /*nota.addEventListener("mouseenter" , function() {
            websocket.send(this.dataset.freq);
        }, false);*/
    }
} , false);

websocket.onmessage = function(evt) {console.log(evt.data);};
