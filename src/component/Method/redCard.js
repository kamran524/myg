export function redCard(foulsData,squad){
    let homeredCard=parseInt(Math.random()*Math.round(foulsData?.home?.length/4)) ||0;
    let awayredCard=parseInt(Math.random()*Math.round(foulsData?.away?.length/4)) ||0;
    let homeMinuteRandom=[];
    let awayMinuteRandom=[];
    let data={};
    for(let i=0;i<homeredCard;i++){
        let playerRandom=squad.home[parseInt(Math.random()*10)];
            homeMinuteRandom.push({
                minute:foulsData.home[i],
                name:playerRandom,
                status:"red"
            });
      console.log(homeMinuteRandom)
      data.home=homeMinuteRandom
    }
    for(let i=0;i<awayredCard;i++){
        let playerRandom=squad.away[parseInt(Math.random()*10)];
        awayMinuteRandom.push({
            minute:foulsData.away[i],
            name:playerRandom,
            status:"red"
        });
      data.away=awayMinuteRandom
    }
    return data;
}