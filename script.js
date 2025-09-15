// Note class takes in a wavetype, a frequency, and an octave and uses 
// the OscillatorNode api to create a "beep" sound.
class Note {
    constructor(note, wavetype, octave){
        this.note = note;
        this.wavetype = wavetype;
        this.octave = octave;
        this.noteFrequencies = {
            "C" : 130.81,
            "D" : 146.83,
            "E" : 164.81,
            "F" : 174.61,
            "G" : 196,
            "A" : 220,
            "B" : 246.94
        }
        this.frequency = this.noteFrequencies[note]*octave;
        this.audioContext = new AudioContext();
        this.oscillator = this.audioContext.createOscillator();
        this.oscillator.type = this.wavetype;
    }

    async startNote(){
        await this.oscillator.frequency.setValueAtTime( this.frequency, this.audioContext.currentTime)
        await this.oscillator.connect(this.audioContext.destination);
        await this.oscillator.start(this.audioContext.currentTime);
    }

    async stopNote(){
        // this.oscillator.frequency.setValueAtTime( this.frequency, this.audioContext.currentTime);
        // this.oscillator.connect(this.audioContext.destination);
        await this.oscillator.stop(this.audioContext.currentTime);
    }

}

// takes a note and adds key board key press events to the website
function createKeyPressEvent(note){
    const musicalTypingMap = {
        "C" : "a",
        "D" : "s",
        "E" : "d",
        "F" : "f",
        "G" : "g",
        "A" : "h",
        "B" : "j"
    }

    window.addEventListener("keydown", async event=> {
        let selectedNote = await new Note(note, selectedWaveType, octave);
        if (event.key === musicalTypingMap[note]){
            document.getElementById(note).className += ' highlight-when-pressed'
            await selectedNote.startNote();

            window.addEventListener("keyup", async event=> {
                document.getElementById(note).className = document.getElementById(note).className.split(" ")[0]
                if (event.key === musicalTypingMap[note]){
                    await selectedNote.stopNote();
                    // selectedNote = null;
                }
            });

        }else{
            console.log(event.key)
        };
    });

}

// Loop to add listenders to website for all notes in notes array

const notes = ["C", "D", "E", "F", "G", "A", "B"];
const wavetypes = ["sine", "saw", "square", "sawtooth"];
const selectedWaveType = wavetypes[0];
const octave = 1;

notes.forEach(note => {
    createKeyPressEvent(note)
    document.getElementById(note).addEventListener("mousedown", async ()=> {
        let selectedNote = await new Note(note, selectedWaveType, octave);
        await selectedNote.startNote();
    
        document.getElementById(note).addEventListener("mouseup", async ()=>{
            
            await selectedNote.stopNote();
            // selectedNote = null;
        });
    });
});
