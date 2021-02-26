import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContexts';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);
  
  const percentToNextLevel = Math.round((currentExperience * 100) / experienceToNextLevel);

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }}/>
        <span className={currentExperience === 0 ? styles.zeroExperience : styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
          {currentExperience === 0 ? 'Você não tem experiência!' : currentExperience + ' xp'}
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}