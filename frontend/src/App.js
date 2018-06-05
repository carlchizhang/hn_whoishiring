import React, { Component } from 'react';
import './App.css';
import PostingCard from './components/PostingCard'


const API_URL = '';

class App extends Component {
  state = {
    postings: []
  };

  componentDidMount() {
    let postingPromises = [];
    postingPromises.push(fetch(API_URL + '/api/posting/17208785').then(res => res.json()));
    postingPromises.push(fetch(API_URL + '/api/posting/17228573').then(res => res.json()));
    postingPromises.push(fetch(API_URL + '/api/posting/17225827').then(res => res.json()));
    postingPromises.push(fetch(API_URL + '/api/posting/17225491').then(res => res.json()));
    postingPromises.push(fetch(API_URL + '/api/posting/17224491').then(res => res.json()));
    postingPromises.push(fetch(API_URL + '/api/posting/17225506').then(res => res.json()));
    postingPromises.push(fetch(API_URL + '/api/posting/17225132').then(res => res.json()));
    postingPromises.push(fetch(API_URL + '/api/posting/17227432').then(res => res.json()));
    postingPromises.push(fetch(API_URL + '/api/posting/17213237').then(res => res.json()));
    postingPromises.push(fetch(API_URL + '/api/posting/17206208').then(res => res.json()));
    postingPromises.push(fetch(API_URL + '/api/posting/17208092').then(res => res.json()));

    Promise.all(postingPromises)
    .then(res => {
      console.log(res);
      this.setState({ postings: res })
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
      {
        this.state.postings.map(posting => {
          return <PostingCard key={posting.postingId} posting={posting}/>
        })
      }
      </div>
    );
  }
}

export default App;
