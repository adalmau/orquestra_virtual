class Sound
{
    constructor(context) {
        this.context = context;
    }

    setup() {
        this.oscillator = this.context.createOscillator();
        this.gainNode = this.context.createGain();

        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        this.oscillator.type = "sine";
    }

    play(value) {
        this.setup();

        this.oscillator.frequency.value = value;
        // Amb el següent codi el "gain" va del 0 a 1 en 0.5 segons, i crea un effecte de fade in
        /*this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
        this.gainNode.gain.linearRampToValueAtTime(
            1,
            this.context.currentTime + 0.5
        );*/
        // El "gain" va del comença directament a 1
        this.gainNode.gain.setValueAtTime(1, this.context.currentTime);

        this.oscillator.start(this.context.currentTime);
        this.stop(this.context.currentTime);
    }

    // Stop amb efecte de fade out
    stop() {
        this.gainNode.gain.exponentialRampToValueAtTime(
            0.001,
            this.context.currentTime + 1
        );
        this.oscillator.stop(this.context.currentTime + 1);
    }
}
