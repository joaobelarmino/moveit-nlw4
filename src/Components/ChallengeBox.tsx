import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContexts';
import { CountdownContext } from '../contexts/CountdownContexts';
import styles from '../styles/components/ChallengeBox.module.css';


export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
  const { stopCountdown } = useContext(CountdownContext);

  function handleChallengeSucceeded() {
    completeChallenge();
    stopCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    stopCountdown();
  }

  return(
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="Caminhada" />
            <strong>Novo desafio</strong>
            <p>
              {activeChallenge.description}
            </p>
          </main>
          <footer>
            <button
            type="button"
            className={styles.challengeFailedButton}
            onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
            type="button"
            className={styles.challengeSucceededButton}
            onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Inicie um ciclo para receber desafios a serem completados</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level up" />
            Complete-os, ganhe experiência e avance de leve!
          </p>
        </div>
      )}
    </div>
  )
}