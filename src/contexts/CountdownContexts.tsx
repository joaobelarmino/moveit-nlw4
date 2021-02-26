import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContexts";

interface CountdownProviderProps {
  children: ReactNode;
}

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  active: boolean;
  startCountdown: () => void;
  stopCountdown: () => void
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);
  
  const [time, setTime] = useState(0.05 * 60);
  const [active, setActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  let countdownTimeout: NodeJS.Timeout;

  function stopCountdown() {
    clearTimeout(countdownTimeout);
    setActive(false);
    setTime(0.05 * 60);
    setHasFinished(false);
  }
  function startCountdown() {
    setActive(true);
  }

  useEffect(() => {
    if(active && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    } else if(active && time === 0) {
      setHasFinished(true);
      setActive(false);
      startNewChallenge();
    }
  }, [active, time])

  return(
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      active,
      startCountdown,
      stopCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}