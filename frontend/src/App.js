import React, { Component } from 'react';
import './App.css';
import PostingListFilter from './containers/PostingListFilter';
import {API_URL} from './actions/actions.js';
import { updateVisiblePostings } from './actions/actions';
import fetch from 'cross-fetch';

class App extends Component {
  componentDidMount() {
    let postingPromises = [];
    // postingPromises.push(fetch(API_URL + '/posting/17208785').then(res => res.json()));
    // postingPromises.push(fetch(API_URL + '/posting/17228573').then(res => res.json()));
    // postingPromises.push(fetch(API_URL + '/posting/17225827').then(res => res.json()));
    // postingPromises.push(fetch(API_URL + '/posting/17225491').then(res => res.json()));
    // postingPromises.push(fetch(API_URL + '/posting/17224491').then(res => res.json()));
    // postingPromises.push(fetch(API_URL + '/posting/17225506').then(res => res.json()));
    // postingPromises.push(fetch(API_URL + '/posting/17225132').then(res => res.json()));
    // postingPromises.push(fetch(API_URL + '/posting/17227432').then(res => res.json()));
    // postingPromises.push(fetch(API_URL + '/posting/17213237').then(res => res.json()));
    // postingPromises.push(fetch(API_URL + '/posting/17206208').then(res => res.json()));
    // postingPromises.push(fetch(API_URL + '/posting/17208092').then(res => res.json()));

    fetch(API_URL + '/postings')
    .then(res => res.json())
    .then(res => {
      console.log(res);
      let fetchRequests = [];
      res.forEach(element => {
        fetchRequests.push(fetch(API_URL + '/posting/' + element.postingId).then(res => res.json()));
      })
      return Promise.all(fetchRequests);
    })
    .then(res => {
      console.log(res);
      this.props.store.dispatch(updateVisiblePostings(res));
    })
  }

  render() {
    return (
      <div className='App'>
        <div className='App-header'>
        </div>
        <PostingListFilter/>
      </div>
    );
  }
}

export default App;
