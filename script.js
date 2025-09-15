function play(note, octave){
    const noteFrequencies = {
        "C" : 32,
        "D" : 36,
        "E" : 41,
        "F" : 43,
        "G" : 49,
        "A" : 55,
        "B" : 61
    }

    const audioContext = new AudioContext();
    const Oscillator = audioContext.createOscillator();

}