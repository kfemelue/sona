function play(note, wavetype, octave){
    console.log("pressed")
    const noteFrequencies = {
        "C" : 130.81,
        "D" : 146.83,
        "E" : 164.81,
        "F" : 174.61,
        "G" : 196,
        "A" : 220,
        "B" : 246.94
    }
    //multiply frequency by x to increase or decrease octave i.e. c1 = 32, c2 = 64
    const frequency = noteFrequencies[note]*octave
    console.log(frequency)

    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    oscillator.type = wavetype;
    console.log(audioContext.currentTime)
    oscillator.frequency.setValueAtTime( frequency, audioContext.currentTime)
    oscillator.connect(audioContext.destination);
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.25)
}


document.getElementById("C").addEventListener("click", ()=> {
    play("C", "sine", 2)

})
