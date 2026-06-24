import { scales } from "../data/notes"
import { notes } from "../data/notes"
import { generatePattern } from "../data/gameLogic"
import { playPattern } from "../data/gameLogic"
import { useState, useEffect, useRef } from "react"

export const ToolBar = ({ selectScale, selectRoot, setSelectedNotes, scaleNotes, selectedNotes, setWon, sigilSize }) => {

    const [played, setPlayed] = useState([])
    const [pattern, setPattern] = useState([])
    const [isPlaying, setIsPlaying] = useState(false)
    const isPlayingRef = useRef(false)
    const SelectedClean = Array.from({ length: selectedNotes.length }, (_, i) =>
        selectedNotes[i][1] === '#' ? selectedNotes[i].slice(0, 3) : selectedNotes[i].slice(0, 2)
    )
    useEffect(() => {
        if (JSON.stringify(SelectedClean) === JSON.stringify(pattern) && pattern.length !== 0) {
            setWon(true)
        }
    }, [SelectedClean, pattern])

    var s = sigilSize

    return (
        <>
            <div className="w-full bg-slate-900 flex items-center"
                style={{ gap: s * 0.2, padding: `${s * 0.25}px ${s * 0.4}px` }}>
                <button disabled={isPlaying} className="bg-slate-800 text-emerald-100 disabled:opacity-50"
                    style={{ borderRadius: s * 0.1, padding: `${s * 0.1}px ${s * 0.2}px`, fontSize: s * 0.34, marginRight: s * 0.5 }}
                    onClick={() => generatePattern(scaleNotes, setPlayed, setPattern, setSelectedNotes, setWon, isPlayingRef, setIsPlaying)}>New pattern</button>
                <button disabled={isPlaying} className="bg-slate-800 text-emerald-100 disabled:opacity-50"
                    style={{ borderRadius: s * 0.1, padding: `${s * 0.1}px ${s * 0.2}px`, fontSize: s * 0.34, marginRight: s * 0.5 }}
                    onClick={() => playPattern(pattern, setPlayed, isPlayingRef, setIsPlaying)}>Listen again</button>
                <select className="bg-slate-800 text-emerald-100"
                    style={{ borderRadius: s * 0.1, padding: `${s * 0.1}px ${s * 0.2}px`, fontSize: s * 0.34 }}
                    onChange={(e) => { selectRoot(e.target.value); setPattern([]) }}>
                    {notes.map((note) => (
                        <option key={note} value={note}>{note}</option>
                    ))}
                </select>
                <select className="bg-slate-800 text-emerald-100"
                    style={{ borderRadius: s * 0.1, padding: `${s * 0.1}px ${s * 0.2}px`, fontSize: s * 0.34, marginRight: s * 0.5 }}
                    onChange={(e) => { selectScale(e.target.value); setPattern([]) }}>
                    {Object.keys(scales).map(scale => (
                        <option key={scale} value={scale}>{scales[scale].name}</option>
                    ))}
                </select>
                <button className="bg-slate-800 text-emerald-100"
                    style={{ borderRadius: s * 0.1, padding: `${s * 0.1}px ${s * 0.2}px`, fontSize: s * 0.34 }}
                    onClick={() => setSelectedNotes([])}>Reset</button>
            </div>

            <div className="w-full relative flex justify-center"
                style={{ gap: s * 0.25, padding: `${s * 0.3}px ${s * 0.3}px` }}>
                <div className="bg-slate-800 text-emerald-100 flex items-center"
                    style={{ borderRadius: s * 0.2, padding: `${s * 0.2}px ${s * 0.5}px`, gap: s * 0.2 }}>
                    {[0, 1, 2, 3].map(i => (
                        <span key={i} className="relative flex"
                            style={{ width: s * 0.3, height: s * 0.3 }}>
                            {played[i] && (
                                <span className={`absolute inline-flex h-full w-full ${SelectedClean[i] == pattern[i] && pattern.length != 0 ? 'animate-ping' : 'animate-ripple'} rounded-full ${SelectedClean[i] == pattern[i] ? 'bg-amber-500' : 'bg-sky-500'} opacity-75`}></span>
                            )}
                            <span className={`relative inline-flex h-full w-full rounded-full ${SelectedClean[i] == pattern[i] && pattern.length != 0 ? 'bg-amber-500' : 'bg-sky-700'}`}></span>
                        </span>
                    ))}
                </div>
            </div>

            <div className="w-full flex flex-col items-center"
                style={{ gap: s * 0.1, padding: `0 ${s * 0.4}px` }}>
                <div className={`bg-slate-800 text-amber-400 ${JSON.stringify(SelectedClean) === JSON.stringify(pattern) && pattern.length !== 0 ? 'visible' : 'invisible'}`}
                    style={{ borderRadius: s * 0.1, padding: `${s * 0.15}px ${s * 0.4}px`, fontSize: s * 0.28 }}>
                    Success!
                </div>
                <button disabled={isPlaying} className={`bg-slate-800 text-emerald-100 disabled:opacity-50 ${JSON.stringify(SelectedClean) === JSON.stringify(pattern) && pattern.length !== 0 ? 'visible' : 'invisible'}`}
                    style={{ borderRadius: s * 0.1, padding: `${s * 0.1}px ${s * 0.2}px`, fontSize: s * 0.22 }}
                    onClick={() => generatePattern(scaleNotes, setPlayed, setPattern, setSelectedNotes, setWon, isPlayingRef, setIsPlaying)}>
                    Click to play new pattern
                </button>
            </div>
        </>
    )
}