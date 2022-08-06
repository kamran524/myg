export function totalShoot(homeResult,awayResult){
    let homeShoot=parseInt(Math.random()*10);
    let awayShoot=parseInt(Math.random()*10);
    let data={};
    let homeMinuteRandom=Object.values(homeResult);
    let awayMinuteRandom=Object.values(awayResult);
    for(let i=0;i<homeShoot;i++){
        let random = parseInt(Math.random() * 90);
      if (!homeMinuteRandom.includes(random)) {
        homeMinuteRandom.push(random);
      } else {
        i--;
      }
      data.home=homeMinuteRandom
    }
    for(let i=0;i<awayShoot;i++){
        let random = parseInt(Math.random() * 90);
      if (!awayMinuteRandom.includes(random) && !homeMinuteRandom.includes(random)) {
        awayMinuteRandom.push(random);
      } else {
        i--;
      }
      data.away=awayMinuteRandom
    }
    return data;
}