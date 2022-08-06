export function fouls(){
    let homeFouls=parseInt(Math.random()*10);
    let awayFouls=parseInt(Math.random()*10);
    let homeMinuteRandom=[];
    let awayMinuteRandom=[];
    let data={};
    for(let i=0;i<homeFouls;i++){
        let random = parseInt(Math.random() * 90);
      if (!homeMinuteRandom.includes(random)) {
        homeMinuteRandom.push(random);
      } else {
        i--;
      }
      data.home=homeMinuteRandom
    }
    for(let i=0;i<awayFouls;i++){
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