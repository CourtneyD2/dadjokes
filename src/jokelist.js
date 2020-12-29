import React, { Component } from 'react'
import Joke from './joke'
import axios from "axios"
import uuid from 'uuid/v4'


class JokeList extends Component {
  static defaultProps ={numJokesToGet: 10};

  constructor(props){
    super(props);
    this.state = {jokes: JSON.parse(window.localStorage.getItem("jokes")||"[]"), loading: false};

    this.seenJokes = new Set(this.state.jokes.map(j => j.text));
    this.handleClick =this.handleClick.bind(this);
  }

  componentDidMount(){
    if(this.state.jokes.length === 0) {this.getJoke()}
  }

  async getJoke(){
    try{
    let jokes = [];
    while (jokes.length< this.props.numJokesToGet){
      let jokeRes = await axios.get("https://icanhazdadjoke.com/", {headers: {Accept: "application/json"}});

      if (!this.seenJokes.has(jokeRes.data.joke)){
        jokes.push ({id: uuid(),text: jokeRes.data.joke, votes: 0});
      }
    }
    this.setState(function (st) {
      let j = [...st.jokes, ...jokes];
      j = j.sort((a,b) => b.votes - a.votes);
      return { loading:false,
        jokes: j
      }
      }, 
      () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );  
    }catch(e){alert(e); this.setState({loading:false})}
  }

  changeVote (id, delta){
    this.setState(
      st=> ({
        jokes: st.jokes.map(j=> j.id === id ?{...j, votes:j.votes+delta}:j ) 
      }), () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }
  
handleClick(){
  this.setState({loading: true}, this.getJoke);
}

  render(){
    if (this.state.loading){
      return (
        <div className='loading'><i className="far fa-8x fa-laugh fa-spin" /><h1 className="jokelist-title">Fecthing new Laughs</h1></div>
      );
    }
    let jokes = this.state.jokes;
    return(
      <div className="jokelist">
        <div className="jokelist-sidebar">
          <h1 className="jokelist-title"><span>Dad</span> Jokes </h1>
          <img src ="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="Laughing Emoji" />
          <button className="jokelist-getmore" onClick={this.handleClick}>More Jokes</button>
        </div>
      
        <div className="jokelist-jokes">
          {jokes.map(j => (
            <Joke key={j.id} id={j.id} text={j.text} votes={j.votes} upvote={()=> this.changeVote(j.id,1)} downvote={()=> this.changeVote(j.id,-1)} />
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;