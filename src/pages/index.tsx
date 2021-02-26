import Head from 'next/head';
import { CompletedChallenges } from '../Components/CompletedChallenges';
import { Countdown } from '../Components/Countdown';
import { ExperienceBar } from '../Components/ExperienceBar';
import { Profile } from '../Components/Profile';
import { ChallengeBox } from '../Components/ChallengeBox';
import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContexts';
import { GetServerSideProps } from 'next';
import { ChallengesProvider } from '../contexts/ChallengesContexts';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  console.log(props);
  return (
    <ChallengesProvider
    level={props.level}
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}
    >
    <div className={styles.container}>
      <Head>
        <title>Home | Move it!</title>
      </Head>

      <ExperienceBar />
      <CountdownProvider>
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>
    </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = {
    level: 1,
    currentExperience: 50,
    challengesCompleted: 2
  }
  
  const { level, challengesCompleted, currentExperience } = context.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}
