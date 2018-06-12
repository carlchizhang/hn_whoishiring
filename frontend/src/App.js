import { connect } from 'react-redux';
import React, { Component } from 'react';
import './App.css';
import PostingListContainer from './containers/PostingListContainer';
import SearchBarContainer from './containers/SearchBarContainer';
import TagsBarContainer from './containers/TagsBarContainer';

function ExpandToggle(props) {
  let text, iconClass;
  if(props.labelType === 'more') {
    text = 'More Filters';
    iconClass = ' fas fa-angle-down';
  }
  else {
    text = 'Less Filters';
    iconClass = ' fas fa-angle-up';
  }

  return (
    <div className='expand-toggle' onClick={props.onClick}>
      <p className='expand-filters-label'>
        {text} 
        <i className={'expand-filters-icon' + iconClass}/>
      </p>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      hideLogo: false,
    };
    this.expandFilters = this.expandFilters.bind(this);
    this.trackScrolling = this.trackScrolling.bind(this);
    this.previousTop = 0;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
  }

  expandFilters() {
    this.setState({expanded: !this.state.expanded});
  }

  trackScrolling() {
    const top = document.getElementById('scrolling-app-body').getBoundingClientRect().top;
    if (top < -100) {
      this.setState({hideLogo: true});
    }
    else if(top >= -100 && this.previousTop > -250) {
      this.setState({hideLogo: false});
    }
    this.previousTop = top;
  }

  render() {
    return (
      <div className='App'>
        <div className={
            'App-header' 
            + (this.state.expanded ? ' expanded' : '')
            + (this.state.hideLogo ? ' hide-logo' : '')
        }>
          <p className='top-logo'>
            YCHiring
          </p>
          <SearchBarContainer label={'String'} searchType={'string'} placeholderText={'facebook, Seattle, startup'}/>
          <div className={'more-filters-wrapper' + (this.state.expanded ? '' : ' hide')}>
            <SearchBarContainer label={'RegEx'} searchType={'regex'} placeholderText={'design(er)?s?, senior.?developers?'}/>
            <TagsBarContainer label={'Tags'}/>
          </div>
          <ExpandToggle className='expand-toggle' labelType={this.state.expanded ? 'less' : 'more'} onClick={this.expandFilters}/>
        </div>
        <div className={'App-body' + (this.state.hideLogo ? ' hide-logo' : '')} id='scrolling-app-body'>
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
