import { scales, notes, guitarRange } from "./notes"
import { playNote } from "./audio"

export const generateScaleNotes = (scale, root) => {
    var generatedScaleNotes = []

    for (var i = 0; i < notes.length; i++) {
        if (notes[i] == root) {
            for (let j = 0; j < 12; j++) {
                if (scales[scale.toLowerCase()].interval.includes(j)) {
                    generatedScaleNotes.push(notes[(i + j) % notes.length])
                }
            }
        }
    }
    return generatedScaleNotes
}


const pickOctave = () => {
    const array = [2, 3, 4, 5]
    const weight = [2, 3, 4, 1];

    let randomArray = [];
    array.forEach((item, index) => {
        var clone = Array(weight[index]).fill(item);
        randomArray.push(...clone);
    });
    return randomArray[~~(Math.random() * randomArray.length)]
}

const pickStep = () => {
    const array = [8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8]
    const weight = [1, 2, 1, 1, 2, 3, 4, 4, 3, 2, 1, 1, 2, 1, 1, 1]

    let randomArray = [];
    array.forEach((item, index) => {
        var clone = Array(weight[index]).fill(item);
        randomArray.push(...clone);
    });
    return parseInt(randomArray[~~(Math.random() * randomArray.length)])
}

export const generatePattern = (notes, setPlayed, setPattern, setSelectedNotes, setWon, isPlayingRef, setIsPlaying) => {
    if (isPlayingRef.current) return
    setWon(false)
    setSelectedNotes([])
    const played = new Array(4).fill(false)
    setPlayed([...played])
    let pattern = []

    let randomNote
    do {
        randomNote = notes[Math.floor(Math.random() * notes.length)] + pickOctave()
    } while (!guitarRange.includes(randomNote))

    pattern.push(randomNote)

    for (let i = 0; i < 3; i++) {
        let attempts = 0
        let nextNote
        do {
            const currentIndex = guitarRange.indexOf(randomNote)
            if (currentIndex === -1) break
            const newIndex = Math.min(Math.max(currentIndex + pickStep(), 0), guitarRange.length - 1)
            nextNote = guitarRange[newIndex]
            attempts++
            if (attempts > 100) break
            var noteName = nextNote.replace(/[0-9]/g, '')
        } while (pattern.includes(nextNote) || !notes.includes(noteName))

        if (nextNote) {
            pattern.push(nextNote)
            randomNote = nextNote
        }
    }
    playPattern(pattern, setPlayed, isPlayingRef, setIsPlaying)
    setPattern(pattern)
}


export const playPattern = async (pattern, setPlayed, isPlayingRef, setIsPlaying) => {
    if (isPlayingRef.current) return
    isPlayingRef.current = true
    setIsPlaying(true)
    setPlayed(new Array(pattern.length).fill(false))
    await new Promise(resolve => setTimeout(resolve, 50)) // let react render the reset
    const played = new Array(pattern.length).fill(false)
    for (let i = 0; i < pattern.length; i++) {
        playNote(pattern[i])
        played[i] = true
        setPlayed([...played])
        await new Promise(resolve => setTimeout(resolve, 550))
    }
    isPlayingRef.current = false
    setIsPlaying(false)
}


