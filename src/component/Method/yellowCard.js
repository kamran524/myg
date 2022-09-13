export function yellowCard(foulsData,squad){
    let homeYellowCard=parseInt(Math.random()*Math.round(foulsData?.home?.length/2)) ||0;
    let awayYellowCard=parseInt(Math.random()*Math.round(foulsData?.away?.length/2)) ||0;
    let homeMinuteRandom=[];
    let awayMinuteRandom=[];
    let data={};
    for(let i=0;i<homeYellowCard;i++){
        let playerRandom=squad.home[parseInt(Math.random()*10)];
        //     if(homeMinuteRandom.find((t,k)=>{if(t.player===playerRandom){
        //         homeMinuteRandom[k]={
        //             minute:random,
        //             player:playerRandom,
        //             status:"red"
        //         };
        //         return true;
        //     }
        //     else{
        //         return false;
        //     }
        // }))
            homeMinuteRandom.push({
                minute:foulsData.home[i],
                name:playerRandom,
                status:"yellow"
            });
      data.home=homeMinuteRandom
    }
    for(let i=0;i<awayYellowCard;i++){
        let playerRandom=squad.away[parseInt(Math.random()*10)];
    //     if(awayMinuteRandom.find((t,k)=>{if(t.player===playerRandom){
    //         awayMinuteRandom[k]={
    //             minute:random,
    //             player:playerRandom,
    //             status:"red"
    //         };
    //         return true;
    //     }
    //     else{
    //         return false;
    //     }
    // }))
        awayMinuteRandom.push({
            minute:foulsData.away[i],
            name:playerRandom,
            status:"yellow"
        });
      data.away=awayMinuteRandom
    }
//    console.log(data)
    return data;
}