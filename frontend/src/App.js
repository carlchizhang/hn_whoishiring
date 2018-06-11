import { connect } from 'react-redux';
import React, { Component } from 'react';
import './App.css';
import PostingListContainer from './containers/PostingListContainer';
import SearchBarContainer from './containers/SearchBarContainer';

function ExpandToggle(props) {
  if(props.labelType === 'more') {
    return (
      <div className='expand-toggle' onClick={props.onClick}>
        <p className='expand-filters-label'>
          More Filters   
          <i className='expand-filters-icon fas fa-angle-down'/>
        </p>
      </div>
    );
  }
  else {
    return (
      <div className='expand-toggle' onClick={props.onClick}>
        <p className='expand-filters-label'>
          Less Filters   
          <i className='expand-filters-icon fas fa-angle-up'/>
        </p>
      </div>
    );    
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.expandFilters = this.expandFilters.bind(this);
  }

  expandFilters() {
    this.setState({expanded: !this.state.expanded});
    console.log(this.state.expanded);
  }

  render() {
    return (
      <div className='App'>
        <div className={'App-header' + (this.state.expanded ? ' expanded' : '')}>
          <p className='top-logo'>
            YCHiring
          </p>
          <SearchBarContainer label={'String'} searchType={'string'} placeholderText={'facebook, Seattle, startup'}/>
          <div className={'more-filters-wrapper' + (this.state.expanded ? '' : ' hide')}>
            <SearchBarContainer label={'RegEx'} searchType={'regex'} placeholderText={'design(er)?s?, senior.?developers?'}/>
          </div>
          <ExpandToggle className='expand-toggle' labelType={this.state.expanded ? 'less' : 'more'} onClick={this.expandFilters}/>
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
