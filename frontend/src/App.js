import React, { Component } from 'react';
import './App.css';
import PostingCard from './components/PostingCard'


const API_URL = '';

class App extends Component {
  state = {
  };

  componentDidMount() {
    fetch(API_URL + '/api/posting/17208785')
      .then(res => res.json())
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <PostingCard posting={this.state.response}/>
      </div>
    );
  }
}

export default App;
