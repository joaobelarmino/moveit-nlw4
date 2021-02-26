import { useContext, useEffect, useState } from 'react';
import { CountdownContext } from '../contexts/CountdownContexts';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const {
    minutes,
    seconds,
    hasFinished,
    active,
    stopCountdown,
    startCountdown
  } = useContext(CountdownContext)
  
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
  
  return(
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button 
        disabled
        className={styles.countdownButton} 
      >
        Ciclo encerrado
      </button>
      ) : (
        <>
          { active ? (
          <button 
            type="button" 
            className={`${styles.countdownButton} ${styles.countdownStopButton}`}
            onClick={stopCountdown}  
          >
            Abandonar ciclo
          </button>
          ) : (
          <button 
            type="button" 
            className={styles.countdownButton}
            onClick={startCountdown}
          >
            Iniciar um ciclo
          </button>
        )}
        </>
      )}

      
    </div>
  );
}