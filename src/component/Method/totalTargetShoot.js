export function totalTargetShoot(homeResult,awayResult,shootData){
    let homeShoot=parseInt(Math.random()*(shootData?.home?.length-Object.values(homeResult).length));
    let awayShoot=parseInt(Math.random()*(shootData?.away?.length-Object.values(awayResult).length));
    let data={};
    let homeMinuteRandom=Object.values(homeResult);
    let awayMinuteRandom=Object.values(awayResult);
    data.home=homeMinuteRandom;
    data.away=awayMinuteRandom
    for(let i=Object.values(homeResult).length;i<homeShoot;i++){
      if (!homeMinuteRandom.includes(shootData?.home[i])) {
        homeMinuteRandom.push(shootData.home[i]);
      } else {
        i--;
      }
      data.home=homeMinuteRandom
    }
    for(let i=Object.values(awayResult).length;i<awayShoot;i++){
      if (!awayMinuteRandom.includes(shootData?.away[i])) {
        awayMinuteRandom.push(shootData.away[i]);
      } else {
        i--;
      }
      data.away=awayMinuteRandom
    }
    return data;
}