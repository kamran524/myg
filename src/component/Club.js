import React from 'react'
import "./clubs.css"
import axios from "axios";
import { useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Club = () => {
  const inputHome=useRef();
  const inputAway=useRef();
  const [players,setPlayers]=useState({});
  const navigate=useNavigate();
  async function getPlayers(){
    let clubs=[inputHome.current.value,inputAway.current.value]
    let copyPlayers={};
    let localClubs=JSON.parse(localStorage.getItem("clubs")) || [];
    for(let i=0;i<2;i++){
      let response=await axios.get(`https://apiv3.apifootball.com/?action=get_teams&team_id=${clubs[i]}&APIkey=c8854c0e5c40ced086f44ebc14ff969caf06ee6a7944725ddc48094693435837`)
      try{
        if(i===0){
          copyPlayers.home=response?.data[0];
        }
        else{
          copyPlayers.away=response?.data[0];
        }
        localClubs.push(response?.data[0].team_name)
      }
      catch(err){
        console.log(err)
      }
    }
    localStorage.setItem("clubs",JSON.stringify(localClubs))
    setPlayers(copyPlayers)
    }
    function selectHomePlayer(e,player){
      let squad=JSON.parse(localStorage.getItem("squad")) || {home:[],away:[]};
      squad.home.push(player);
      localStorage.setItem("squad",JSON.stringify(squad));
      e.target.remove();
    }
    function selectAwayPlayer(e,player){
      let squad=JSON.parse(localStorage.getItem("squad")) || {home:[],away:[]};
      squad.away.push(player);
      localStorage.setItem("squad",JSON.stringify(squad));
      e.target.remove();
    }
    function getGame(){
      // localStorage.removeItem("squad");
      navigate("/");
    }
  return (
    <div className='clubs'>
      <div className="inputs">
        <input ref={inputHome} type="number" min={1} max={10000} />
        <input ref={inputAway} type="number" min={1} max={10000}/>
        <button onClick={getPlayers} className='save'>Save</button>
      </div>
     <div className="players-block">
     <div className="players-list">
        <h3>{players?.home?.team_name}</h3>
        <div className="players">
          {players?.home?.players?.map((item,index)=>{
            return <span onClick={(e)=>selectHomePlayer(e,item.player_name)} key={index}>{`${index+1}.${item.player_name}`}</span>;
          })}
        </div>
      </div>
      <div className="players-list">
      <h3>{players?.away?.team_name}</h3>
        <div className="players">
        {players?.away?.players?.map((item,index)=>{
            return <span onClick={(e)=>selectAwayPlayer(e,item.player_name)} key={index}>{`${index+1}.${item.player_name}`}</span>;
          })}
        </div>
      </div>
     </div>
     <button onClick={getGame} className='getGame'>Start Game</button>
    </div>
  )
}

export default Club