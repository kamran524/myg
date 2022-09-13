import React, { useEffect, useState } from "react";
import "./simulator.css";
import { goalPlayer } from "./Method/playerSelect";
import { totalShoot } from "./Method/totalShoot";
import { totalTargetShoot } from "./Method/totalTargetShoot";
import { fouls } from "./Method/fouls";
import { yellowCard } from "./Method/yellowCard";
import { redCard } from "./Method/redCard";

const Simulator = () => {
  const [minute, setMinute] = useState(+localStorage.getItem("minute") || 0);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState([0, 0]);
  const [scorePlayer,setScorePlayer]=useState({home:[],away:[]});
  const [shootMinute,setShootMinute]=useState(null);
  const [shootCount,setShootCount]=useState([0,0])
  const [shootTargetMinute,setShootTargetMinute]=useState(null);
  const [shootTargetCount,setShootTargetCount]=useState([0,0])
  const [possesion,setPossesion]=useState([50,50])
  const [foulsMinute,setFoulsMinute]=useState(null);
  const [foulsCount,setFoulsCount]=useState([0,0])
  const [yellowCardData,setYellowCardData]=useState([])
  const [redCardData,setRedCardData]=useState([])
  const clubs=JSON.parse(localStorage.getItem("clubs"));
  let squads = JSON.parse(localStorage.getItem("squad"));
  function generateScore(e) {
    e.target.remove();
    setMinute(0);
    localStorage.setItem("minute", 0);
    const randomScore = [
      0, 1, 2, 3, 2, 3, 1, 0, 2, 1, 2, 6, 0, 1, 1, 1, 1, 1, 3, 1, 2, 1, 3, 1, 2,
      3, 3, 1, 2, 2, 1, 0, 3, 2, 2, 1, 2, 2, 1, 0, 1, 3, 1, 0, 2, 2, 1, 0, 2, 1,
      0, 2, 2, 3, 1, 1, 1, 3, 1, 3, 3, 2, 1, 1, 3, 3, 3, 4, 2, 2, 4, 1, 2, 2, 1,
      3, 2, 1, 3, 2, 1, 1, 3, 2, 1, 5, 0, 1, 2, 2, 1, 2, 3, 1, 2, 3, 0, 1, 2, 3,
    ];
    let x=parseInt(Math.random() * 100);
    let homeRandom = randomScore[x];
    let awayRandom = randomScore[parseInt(Math.random() * 100)];
    let homeMinuteRandom = [];
    let awayMinuteRandom = [];
    let homeResult = {};
    let awayResult = {};
    for (let i = 0; i < homeRandom; i++) {
      let random = parseInt(Math.random() * 90);
      if (!homeMinuteRandom.includes(random)) {
        homeMinuteRandom.push(random);
      } else {
        i--;
      }
    }
    homeMinuteRandom.sort((a, b) => a - b);
    for (let i = 0; i < homeRandom; i++) {
      homeResult[i + 1] =homeMinuteRandom[i]
    }
    for (let i = 0; i < awayRandom; i++) {
      let random = parseInt(Math.random() * 90);
      if (!awayMinuteRandom.includes(random)) {
        awayMinuteRandom.push(random);
      } else {
        i--;
      }
    }
    awayMinuteRandom.sort((a, b) => a - b);
    for (let i = 0; i < awayRandom; i++) {
      awayResult[i + 1] = awayMinuteRandom[i]
    }
    setResult([homeResult, awayResult]);
    let shootMinuteData=totalShoot(homeResult,awayResult);
    let shootTargetMinuteData=totalTargetShoot(homeResult,awayResult,shootMinuteData);
    let foulsData=fouls();
    let yellowCardsData=yellowCard(foulsData,squads)
    let redCardsData=redCard(foulsData,squads)
    setShootMinute(shootMinuteData);
    setShootTargetMinute(shootTargetMinuteData);
    setFoulsMinute(foulsData)
    setYellowCardData(yellowCardsData);
    setRedCardData(redCardsData);
  }

  function start(e) {
    e.target.remove();
    setTimeout(() => {
      let interval = setInterval(() => {
        let localMiute = +localStorage.getItem("minute");
        let increaseMinute = +localMiute + 1;
        localStorage.setItem("minute", increaseMinute);
        setMinute(increaseMinute);
        if (localMiute === 92) {
          clearInterval(interval);
        }
      }, 100);
    }, 4000);
  }
  useEffect(() => {
    
    if (result) {
      if (Object.values(result[0]).includes(minute)) {
        let copyScore = [...score];
        copyScore[0] += 1;
        let copyScorePlayer={...scorePlayer};
        copyScorePlayer?.home.push({name:goalPlayer(squads.home)[parseInt(Math.random()*100)],minute});
        setScore(copyScore);
        setScorePlayer(copyScorePlayer)
      }
      if (Object.values(result[1]).includes(minute)) {
        let copyScore = [...score];
        copyScore[1] += 1;
        let copyScorePlayer={...scorePlayer};
        copyScorePlayer?.away.push({name:goalPlayer(squads.home)[parseInt(Math.random()*100)],minute});
        setScore(copyScore);
        setScorePlayer(copyScorePlayer)
      }
    }
    // ShootCount
    if(shootMinute?.home?.includes(minute)){
      let copyCount=[...shootCount];
      copyCount[0]++;
      let copyPossesion=[...possesion];
      copyPossesion[0]+=1;
      copyPossesion[1]-=1;
      setShootCount(copyCount);
      setPossesion(copyPossesion);
    }
    else if(shootMinute?.away?.includes(minute)){
      let copyCount=[...shootCount];
      copyCount[1]++;
      let copyPossesion=[...possesion];
      copyPossesion[1]+=1;
      copyPossesion[0]-=1;
      setPossesion(copyPossesion);
      setShootCount(copyCount)
    }

    // ShootTargetCount
    if(shootTargetMinute?.home.includes(minute)){
      let copyCount=[...shootTargetCount];
      copyCount[0]++;
      setShootTargetCount(copyCount)
    }
    else if(shootTargetMinute?.away.includes(minute)){
      let copyCount=[...shootTargetCount];
      copyCount[1]++;
      setShootTargetCount(copyCount)
    }

    // Fouls
    if(foulsMinute?.home?.includes(minute)){
      let copyCount=[...foulsCount];
      copyCount[0]++;
      setFoulsCount(copyCount)
    }
    else if(foulsMinute?.away?.includes(minute)){
      let copyCount=[...foulsCount];
      copyCount[1]++;
      setFoulsCount(copyCount)
    }

    // Yellow Card
    yellowCardData?.home?.forEach(item=>{
      if(item.minute===minute){
        let copyCount={...scorePlayer};
        scorePlayer.home.push(item)
        setScorePlayer(copyCount)
      }
    })
    yellowCardData?.away?.forEach(item=>{
      if(item.minute===minute){
        let copyCount={...scorePlayer};
        scorePlayer.away.push(item)
        setScorePlayer(copyCount)
      }
    })
     // Yellow Card
     redCardData?.home?.forEach(item=>{
       if(item.minute===minute){
         let copyCount={...scorePlayer};
         scorePlayer.home.push(item)
         setScorePlayer(copyCount)
       }
     })
     redCardData?.away?.forEach(item=>{
       if(item.minute===minute){
         let copyCount={...scorePlayer};
         scorePlayer.away.push(item)
         setScorePlayer(copyCount)
       }
     })
  }, [minute]);
  return (
    <div className="simulator">
      <div className="sim-inner">
        <h4 className="league-name">La liga</h4>
        <div className="clubs-block">
          <div className="club-home">
            <h3>{clubs[0]}</h3>
            {/* <div className="img-block">
                        <img src="http://scoresim.ilya.online/assets/img/fantasy_team.png" alt="" />
                    </div> */}
          </div>
          <div className="score">
            <span>{score[0]}</span>-<span>{score[1]}</span>
          </div>
          <div className="club-away">
            <h3>{clubs[1]}</h3>
            {/* <div className="img-block">
                        <img src="http://scoresim.ilya.online/assets/img/fantasy_team.png" alt="" />
                    </div> */}
          </div>
        </div>
        <div className="goals-block">
          <div className="home-goal">
            {scorePlayer?.home?.map((item,index)=>{
            return <span key={index} className="goal">{`${item.name} ${item.minute}`} {item?.status ? <span className={item.status}></span> : ""}</span>
            })}
          </div>
          <span className="full-minute">{minute}'</span>
          <div className="away-goal">
          {scorePlayer?.away?.map((item,index)=>{
             return <span key={index} className="goal">{`${item.name} ${item.minute}`} {item?.status ? <span className={item.status}></span> : ""}</span>
            })}
          </div>
        </div>
        <div className="statistic-block">
          <div className="stats">
            <span className="stats-home">{possesion?.[0]+"%"}</span>
            <span className="stats-name">Possesion</span>
            <span className="stats-away">{possesion?.[1]+"%"}</span>
          </div>
          <div className="stats">
            <span className="stats-home">{shootCount[0]}</span>
            <span className="stats-name">Total shots</span>
            <span className="stats-away">{shootCount[1]}</span>
          </div>
          <div className="stats">
            <span className="stats-home">{shootTargetCount[0]}</span>
            <span className="stats-name">Shots on target</span>
            <span className="stats-away">{shootTargetCount[0]}</span>
          </div>
          <div className="stats">
            <span className="stats-home">{foulsCount[0]}</span>
            <span className="stats-name">Fouls</span>
            <span className="stats-away">{foulsCount[1]}</span>
          </div>
          <div className="stats">
            <span className="stats-home">{yellowCardData?.home?.length ||0}</span>
            <span className="stats-name">Yellow Cards</span>
            <span className="stats-away">{yellowCardData?.away?.length ||0}</span>
          </div>
          <div className="stats">
            <span className="stats-home">{redCardData?.home?.length ||0}</span>
            <span className="stats-name">Red Cards</span>
            <span className="stats-away">{redCardData?.away?.length ||0}</span>
          </div>
        </div>
        <button onClick={start} className="start">
          Start
        </button>
        <button onClick={generateScore} className="generate">
          GenerateScore
        </button>
      </div>
    </div>
  );
};

export default Simulator;
