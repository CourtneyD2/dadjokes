import React, { Component } from 'react'

class Joke extends Component {

  getColor(){
    if(this.props.votes >=8) {return "#4CAF50"}
    else if (this.props.votes >= 5) {return "#8BC34A"}
    else if (this.props.votes >=3) {return '#CDDC39'}
    else if (this.props.votes >=2) {return '#FFEB3B'}
    else if (this.props.votes >=1) {return '#FFC107'}
    else if (this.props.votes >=0) {return '#FF9800'}
    else {return "#F44336"}
  }

  getEmoji (){
    if(this.props.votes >=8) {return "em em-rolling_on_the_floor_laughing"}
    else if (this.props.votes >= 5) {return "em em-laughing"}
    else if (this.props.votes >=3) {return 'em em-smiley'}
    else if (this.props.votes >=2) {return 'em em-slightly_smiling_face'}
    else if (this.props.votes >=1) {return 'em em-neutral_face'}
    else if (this.props.votes >=0) {return 'em em-confused'}
    else {return "em em-angry"}
  

  }

  render(){
    return(
      <div className="joke">
        <div className="joke-btns">
          <i onClick={this.props.upvote} className="fas fa-arrow-up" />
          <span style ={{borderColor: this.getColor()}} className="joke-votes">{this.props.votes}</span>
          <i onClick={this.props.downvote} className="fas fa-arrow-down" />
        </div>
        <div className ="joke-text">
          {this.props.text}
        </div>
        <div className='joke-emoji'>
          <i className={this.getEmoji()}></i>
        </div>
      </div>
    );
  }
}

export default Joke;