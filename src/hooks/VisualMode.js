import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  // to save a component to the history 
  const transition = (newMode, replace = false) => {
    replace || setHistory(prev => [...prev, newMode])
    setMode(newMode)
  }
// to go back a component in the history
  const back = () => {
    if (history.length > 1) {
      const prevHistory = [...history]

      prevHistory.pop()
      setHistory(prevHistory)
      setMode(prevHistory[prevHistory.length-1])
    }
  }

  return { mode, transition, back};

}
