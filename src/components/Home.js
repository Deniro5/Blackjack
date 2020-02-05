import React, { Component, Fragment } from 'react';
import cards from './Cardarray'

class Home extends Component {
  state = {
    dealerHand: [],
    dealerStay: false,
    hand: [],
    stay: false,
    deck: [],   //make this a representation of the deck 
    status: ""
  }

  componentWillMount = () => {
      this.resetDeck();
  }

  resetDeck = () => {
    var count = 0;
    var deck = [];
    //deck is represented by indexes 0-51
    while (count < 52) {
      deck.push(count)
      count++;
    }
    //deal cards to players
    var newcardindex = (Math.floor((Math.random() * deck.length) + 1))-1;
    var newcard1 = cards[deck[40]]
  //  deck.splice(newcardindex,1);
    var newcardindex2 = (Math.floor((Math.random() * deck.length) + 1))-1;
    var newcard2 = cards[deck[41]]
  //  deck.splice(newcardindex2,1);
    var newcardindex3 = (Math.floor((Math.random() * deck.length) + 1))-1;
    var newcard3 = cards[deck[50]]
  //  deck.splice(newcardindex3,1);
    var newcardindex4 = (Math.floor((Math.random() * deck.length) + 1))-1;
    var newcard4 = cards[deck[5]]
  //  deck.splice(newcardindex4,1);
    this.setState({
      deck: deck,
      hand: [newcard1, newcard2],
      dealerHand: [newcard3, newcard4],
      status: "",
      stay:false,
    })
  }

  getValue = (hand) => {
    //go through deck adding value and counting aces at the same time. count aces as 11 originally. while we are over 21 and while
    //There are still aces
    var count = 0;
    var aces = 0;
    var value = 0;
    //Get the sum of the hand
    while (count < hand.length) {
      value += hand[count][1];
      if (hand[count][0].charAt(7) === 'A') {
        aces++;
      }
      count++;
    }
    //If we are over, see if we can get under by treating the aces as one until we are under 21
    while (value > 21 && aces > 0) {
      value-=10;
      aces--;
    } 
    return value;
  }



  hit = () => {
    var newcardindex = (Math.floor((Math.random() * (this.state.deck.length)) + 1))-1;
    var newcard = cards[this.state.deck[newcardindex]]
    var deck = this.state.deck
    var value = this.getValue(this.state.hand)
    var dealerValue = this.getValue(this.state.dealerHand)
    deck.splice(newcardindex,1);
    if (dealerValue <= 15 && (value + newcard[1]) <= 21) { //Dealer hits
      var newcardindex1 = (Math.floor((Math.random() * (deck.length)) + 1))-1;  //we use deck here coz its adjusted
      var newcard1 = cards[deck[newcardindex1]]
      this.setState({
        hand : [...this.state.hand, newcard],
        deck: deck,
        dealerHand: [...this.state.dealerHand, newcard1],
      } ,() => {this.checkStatus()})
    }
    else { 
    //Dealer stays and we check the status
    this.setState({
      hand : [...this.state.hand, newcard],
      deck: deck,
    }, () => {this.checkStatus()})
    }
  }

  stay = () => {
    //If we stay dealer hits until he has a good hand or busts
    this.setState({
      stay:true
    }, () => {this.dealerHit(true)})
  }

  dealerHit = (continuous) => {
    var newvalue = 0;
    var newcards = [];
    var deck = this.state.deck
    var value = this.getValue(this.state.hand)
    var dealerValue = this.getValue(this.state.dealerHand)
    if (dealerValue + newvalue <=15 && dealerValue + newvalue < value) {
      do {
        var newcardindex = (Math.floor((Math.random() * (deck.length)) + 1))-1;
        deck.splice(newcardindex,1);
        newcards.push(cards[this.state.deck[newcardindex]])
        newvalue += cards[this.state.deck[newcardindex]][1]
      }
      while (dealerValue + newvalue <=15 && dealerValue + newvalue < value && continuous)
    }
    this.setState({
      dealerHand : [...this.state.dealerHand, ...newcards],
      deck: deck,
    }, () => {this.checkStatus()})
  }

  checkStatus = () => {
    var status = "";
    var value = this.getValue(this.state.hand)
    var dealerValue = this.getValue(this.state.dealerHand)
    if (value > 21) {
      status = "L"
      alert("You lost. You busted")
    }
    else if (dealerValue > 21) {
      status  = "W"
      alert("You won. The dealer busted")
    }
    else if (dealerValue > value && this.state.stay) {
      alert("You lost. The dealer had a higher hand")
      status  = "L"
    }
    else if (dealerValue < value) {
      if (dealerValue <= 15) {
        this.dealerHit(false)
      }
      else if (this.state.stay) {  //if the dealer doesnt draw and we are staying and we reveal then we won
        alert("You won. You had a higher hand")
        status  = "W"
      }
    }
    else if (dealerValue === value) {
      if (this.state.stay) {
        alert("Tie")
        status  = "T"
      }
    }
    else {
    }

    this.setState ({
      status: status
    })

  }

  render() {
    var hand = [];
    var count = 0;
    while (count < this.state.hand.length) {
      hand.push(<img alt = "" className = "card" src = {this.state.hand[count][0]}/>)
      count ++;
    }
    count = 0
    var dealerHand = [];
    while (count < this.state.dealerHand.length) {
      if (count === 0 && this.state.status.length < 1) {
        dealerHand.push(<img alt = "" className = "card" src = "../img/red_back.png"/>)
      }
      else {
        dealerHand.push(<img alt = "" className = "card" src = {this.state.dealerHand[count][0]}/>)
      }
      count ++;
    }
    var controls = [];
    if (this.state.status.length < 1) {
      controls.push(
        <Fragment>
          <button disabled = {this.state.stay} style = {{background: (this.state.stay ?  'grey' : 'maroon')}}  onClick = {this.hit}> Hit </button>
          <button disabled = {this.state.stay} style = {{background: (this.state.stay ?  'grey' : 'maroon')}} onClick = {this.stay}> Stay </button>
        </Fragment>
      )
    }
    else {
      controls.push(
        <Fragment>
          <button style = {{background:'maroon'}}  onClick = {this.resetDeck}> Reset Game </button>
        </Fragment>
      )
    }

    var displayValue = this.getValue(this.state.hand)
    return (
        <div className = "homeContainer">
          <div className = "dealerContainer"> 
            {dealerHand}
          </div>
          <div className = "handContainer">
            {controls}
            <p className = "total"> {"Current: " + displayValue} </p>
            {hand}
          </div>
        </div>

    );
  }
}

export default Home;
