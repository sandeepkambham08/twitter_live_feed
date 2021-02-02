import {React, useState, useEffect} from 'react';
import './App.css';
import Trump from './media/Trump.jpg';
import Clinton from './media/Clinton.jpg';

import {connect} from 'react-redux'; 

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

const App  = (props) => {
 
  const [currentUser , setCurrentUser]  = useState("Donald Trump");
  
  const changeToTrump =() =>{
    setCurrentUser('Donald Trump');
  }

  const changeToHillary =() =>{
    setCurrentUser('Hillary Clinton');
  }

  useEffect(()=>{
    socket.off('tweet');
    const tweetFlow = document.getElementById('TweetFlow');
    socket.on('tweet', tweet => {
      console.log(tweet.data);
      let text = tweet.data.text;
      if(text.includes(`${currentUser}`)){
        const single_tweet = document.createElement('div');
        single_tweet.innerHTML = `
        <div class="Tweet-card">
        <p>  Tweet : ${tweet.data.text}</p>
        <strong>  @${tweet.includes.users[0].username}</strong> <span>Retweets : ${tweet.data.public_metrics.retweet_count}</span>
        <br></br>
        <a href="https://twitter.com/${tweet.data.username}/status/${tweet.data.id}" target="_blank" class="Go-to-tweet">See on twitter</a>
        </div>
        `
        tweetFlow.appendChild(single_tweet);
      }
    })
  },[currentUser]);

  useEffect(()=>{
    document.getElementById('TweetFlow').innerHTML='';
    
  },[currentUser])

    return (
      <div className="App">
        <header className="App-header">
          <img src={Trump} className="User_icon"  onClick={()=>{changeToTrump()}} alt="Trump_icon"/>
          <p> Twitter challenge </p>
          {/* <button onClick={()=>{changeToTrump()}} >Donald Trump</button>
          <button onClick={()=>{changeToHillary()}}>Hillary Clinton</button> */}
          <img src={Clinton} className="User_icon" onClick={()=>{changeToHillary()}} alt="Clinton_icon"/>
        </header>
        <p className="User-title" >{`Showing tweets about ${currentUser}`}</p>
        <div id="TweetFlow"></div>
        <p>.. Loading tweets</p>
      </div>
    )
  
}

const mapStateToProps = state =>{
  return{
    currentUser : state.currentUser
  };
}

const mapDispatchToProps = dispatch =>{
  return{
    changeToTrump:() =>  dispatch({type:'Trump'}),
    changeToHillary:() =>  dispatch({type:'Hillary'})
  }
}

export default connect(mapStateToProps,  mapDispatchToProps)(App);
