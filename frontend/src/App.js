import { connect } from 'react-redux';
import React, { Component } from 'react';
import './App.css';
import PostingListContainer from './containers/PostingListContainer';
import SearchBarContainer from './containers/SearchBarContainer';
import { UpdateTypes, fetchPostingList, updateVisiblePostings } from './actions/actions';

class App extends Component {
  componentDidMount() {
    this.props.loadAllPostings()
    .then(() => this.props.updateVisiblePostings(this.props.allPostings, UpdateTypes.REPLACE))
  }

  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <p className='top-logo'>
            YCHiring
          </p>
          <SearchBarContainer label={'String'} placeholderText={'facebook, Seattle, startup'}/>
          <div className='more-filters-wrapper hide'>
            <SearchBarContainer label={'RegEx'} placeholderText={'design(er)?s?, senior.?developers?'}/>
          </div>
        </div>
        <div className='App-body'>
          <PostingListContainer/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allPostings: state.allPostings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllPostings: () => {return dispatch(fetchPostingList())},
    updateVisiblePostings: (postings, subtype) => {return dispatch(updateVisiblePostings(postings, subtype))}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
