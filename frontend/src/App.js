import { connect } from 'react-redux';
import React, { Component } from 'react';
import './App.css';
import './stylesheets/searchBar.css';
import './stylesheets/postingList.css';
import './stylesheets/card.css';
import './stylesheets/webfonts/fontawesome-all.css';
import PostingListContainer from './containers/PostingListContainer';
import SearchBarContainer from './containers/SearchBarContainer';
import TagsBarContainer from './containers/TagsBarContainer';
import {clearFilters, searchByTags, expandAll, collapseAll, toggleShowFavorites} from './actions/actions'

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
          <div className='header-tool-bar'>
            <div className='left-tool-bar'>
              <p className='expand-all-label' onClick={this.props.expandAll}>Expand All</p>
              <p className='tool-bar-spacer'> | </p>
              <p className='collapse-all-label' onClick={this.props.collapseAll}>Collapse All</p>
              <p className='tool-bar-spacer'> | </p>
              <p className='show-favorites-label' onClick={this.props.toggleShowFavorites}>{this.props.showFavorites ? 'Show All' : 'Show Favorites'}</p>
            </div>
            <div className='right-tool-bar'>
              <p className='clear-filters-label' onClick={this.props.clearFilters}>Clear Filters</p>
              <p className='tool-bar-spacer'> | </p>
              <ExpandToggle className='expand-toggle' labelType={this.state.expanded ? 'less' : 'more'} onClick={this.expandFilters}/>
            </div>
          </div>
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
    allPostings: state.allPostings,
    showFavorites: state.showFavorites
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearFilters: () => {
      dispatch(clearFilters());
      dispatch(searchByTags());
    },
    expandAll: () => {dispatch(expandAll())},
    collapseAll: () => {dispatch(collapseAll())},
    toggleShowFavorites: () => {dispatch(toggleShowFavorites())},
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
