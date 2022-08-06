export function goalPlayer(pl){
let arr=[];
for(let i=0;i<100;i++){
    if(i<57){
        if(i<19){
            arr.push(pl[10])
        }
        else if(i<38){
            arr.push(pl[9])
        }
        else{
            arr.push(pl[8])
        }
    }
   else if(i<87){
        if(i<67){
            arr.push(pl[7])
        }
        else if(i<77){
            arr.push(pl[6])
        }
        else{
            arr.push(pl[5])
        }
    }
    else if(i<99){
        if(i<90){
            arr.push(pl[4])
        }
        else if(i<93){
            arr.push(pl[3])
        }
        else if(i<96){
            arr.push(pl[2])
        }
        else{
            arr.push(pl[1])
        }
    }
    else{
        arr.push(pl[0])
    }
}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
shuffleArray(arr);
return arr;
}