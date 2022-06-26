import React, { Component } from "react";
import "./App.css";
import Card from "./components/Card/Card";
import Header from "./components/Header/Header";
import { FcPlus } from 'react-icons/fc';



class App extends Component {
  debugger
  state = {
    categories: {
      wentWell: [],
      toImprove: [],
      actionItems: []
    },
    userInput: "",
    id: JSON.parse(window.localStorage.getItem('id')) || 0,
    Cards: JSON.parse(window.localStorage.getItem('data')) || [],
    likes: 0,
    time: null
  };

  userInput = (e, idx) => {
    let newCards = [...this.state.Cards];
    newCards[idx].input = e.target.value;
    this.setState({
      Cards: newCards
    });
    window.localStorage.setItem('data', JSON.stringify(newCards));

  };

  // validateInput = e => {
  //   if (e.target.value === "") {
  //     window.alert("input required");
  //   }
  // };
  Delete = id => {
    let newCards = this.state.Cards.filter(card => card.id !== id);
    this.setState({
      Cards: newCards
    });
    window.localStorage.setItem('data', JSON.stringify(newCards));

  };

  CreateCard = (type, input) => {
    this.setState({
      Cards: [
        ...this.state.Cards,
        {
          id: this.state.id,
          type: type,
          input: input,
          likes: 0,
          time: new Date()
        }
      ],
      id: this.state.id + 1
    });
    window.localStorage.setItem('data', JSON.stringify([...this.state.Cards, {
        id: this.state.id,
        type: type,
        input: input,
        likes: 0,
        time: new Date()
      }
    ]));
    window.localStorage.setItem('id', JSON.stringify(this.state.id + 1));
  }

  MoveLeft = (id, idx) => {
    let newCards = [...this.state.Cards];
    for (let card of newCards) {
      if (card.id === id && card.type === "Went Well") {
        card.type = "Action Items";
      } else if (card.id === id && card.type === "To Improve") {
        card.type = "Went Well";
      } else if (card.id === id && card.type === "Action Items") {
        card.type = "To Improve";
      }
    }
    newCards.push(newCards[idx]);
    newCards.splice(idx, 1);
    this.setState({
      Cards: newCards
    });
    window.localStorage.setItem('data', JSON.stringify(newCards));
  };

  MoveRight = (id, idx) => {
    let newCards = [...this.state.Cards];
    for (let card of newCards) {
      if (card.id === id && card.type === "Went Well") {
        card.type = "To Improve";
      } else if (card.id === id && card.type === "To Improve") {
        card.type = "Action Items";
      } else if (card.id === id && card.type === "Action Items") {
        card.type = "Went Well";
      }
    }
    newCards.push(newCards[idx]);
    newCards.splice(idx, 1);
    this.setState({
      Cards: newCards
    });
    window.localStorage.setItem('data', JSON.stringify(newCards));
  };

  handleLikes = idx => {
    let newCards = [...this.state.Cards];
    newCards[idx].likes++;
    this.setState({
      Cards: newCards
    });
    window.localStorage.setItem('data', JSON.stringify(newCards));
  };

  dateComparisonASC = (a, b) => {
    const date1 = new Date(a.time)
    const date2 = new Date(b.time) 
    return date1 - date2;
}
dateComparisonDESC = (a, b) => {
  const date1 = new Date(a.time)
  const date2 = new Date(b.time) 
  return date2 - date1;
}
 upvoteComparisonASC = (a, b) => {
  const x = new Date(a.likes)
  const y = new Date(b.likes) 
  return x - y;
}
 upvoteComparisonDESC = (a, b) => {
  const x = new Date(a.likes)
  const y = new Date(b.likes) 
  return y - x;
}

  handleDateSorting = e => {
    debugger
    let newCards = [...this.state.Cards];
    if(!!e.target.value && e.target.value === 'dateAsc') newCards.sort(this.dateComparisonASC);
    else if(!!e.target.value && e.target.value === 'dateDesc') newCards.sort(this.dateComparisonDESC);
    else if(!!e.target.value && e.target.value === 'upvoteAsc') newCards.sort(this.upvoteComparisonASC);
    else if(!!e.target.value && e.target.value === 'upvoteDesc') newCards.sort(this.upvoteComparisonDESC);
    this.setState({
      Cards: newCards
    });
    window.localStorage.setItem('data', JSON.stringify(newCards));
  }




  render() {
    return (
      <div className="App">
              <Header />
              <br />

              <div>
              <select name="Sort" className="sortSelect" onChange={this.handleDateSorting}>
              <option value="" selected>Select Sorting Methods</option> 
              <option value="dateAsc" >Sort on Date (Ascending)</option> 
              <option value="dateDesc" >Sort on Date (Descending)</option> 
                <option value="upvoteAsc" >Sort on Upvotes (Ascending)</option>
                <option value="upvoteDesc" >Sort on Upvotes (Descending)</option>
              </select>
              </div>
  
        <br />
        <br /> <div className="text-center">
          <div className="row">
            <div className="col">
              <div>
                <h4><span>What Went Well </span><FcPlus className="cursor-pointer" onClick={() => this.CreateCard("Went Well", "")}/></h4>
              </div>
              {this.state.Cards.map((card, idx) => {
                if (card.type === "Went Well") {
                  return (
                    <Card
                      key={"Went Well" + idx}
                      idx={idx}
                      cardId={card.id}
                      value={card.input}
                      userInput={this.userInput}
                      // validateInput={this.validateInput}
                      MoveLeft={this.MoveLeft}
                      Delete={this.Delete}
                      MoveRight={this.MoveRight}
                      likesCount={card.likes}
                      handleLikes={this.handleLikes}
                      color={"wentWell"}
                      type={card.type}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div className="col">
              <div>
              <h4><span>What Didn't Go Well </span><FcPlus className="cursor-pointer" onClick={() => this.CreateCard("To Improve", "")}/></h4>
              </div>
              {this.state.Cards.map((card, idx) => {
                if (card.type === "To Improve") {
                  return (
                    <Card
                      key={"To Improve" + idx}
                      idx={idx}
                      cardId={card.id}
                      value={card.input}
                      userInput={this.userInput}
                      // validateInput={this.validateInput}
                      MoveLeft={this.MoveLeft}
                      Delete={this.Delete}
                      MoveRight={this.MoveRight}
                      likesCount={card.likes}
                      handleLikes={this.handleLikes}
                      color={"toImprove"}
                      type={card.type}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div className="col">
              <div>
                <h4><span>Action Items </span><FcPlus className="cursor-pointer" onClick={() => this.CreateCard("Action Items", "")}/></h4>
              </div>
              {this.state.Cards.map((card, idx) => {
                if (card.type === "Action Items") {
                  return (
                    <Card
                      key={"Action Items" + idx}
                      idx={idx}
                      cardId={card.id}
                      value={card.input}
                      userInput={this.userInput}
                      // validateInput={this.validateInput}
                      MoveLeft={this.MoveLeft}
                      Delete={this.Delete}
                      MoveRight={this.MoveRight}
                      likesCount={card.likes}
                      handleLikes={this.handleLikes}
                      color={"actionItems"}
                      type={card.type}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
