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
import {clearFilters, searchByTags, expandAll, collapseAll, toggleShowFavorites, toggleLights} from './actions/actions'

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

class BottomToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }

    this.toggleExpanded = this.toggleExpanded.bind(this);
  }

  toggleExpanded() {
    this.setState({expanded: !this.state.expanded});
  }

  render() {
    if (this.state.expanded) {
      return (
        <div className='bottom-tool-bar expanded'>
          <i className='close-about-icon fas fa-times-circle' onClick={this.toggleExpanded}></i>
          <div className='about-links-box'>
            <a href='https://github.com/carlchizhang/hn_whoishiring' target={'_blank'}>Source Code</a>
            <br/><br/>
            <p>I built YCHiring to provide an easier way to browse HackerNews Who is hiring posts.</p>
            <br/>
            <p>You can send any inquiries/suggestions to <br/>contact@ychiring.me</p>
            <br/>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className='bottom-tool-bar'>
          <p className='bottom-about-label' onClick={this.toggleExpanded}>About</p>
          <p className='tool-bar-spacer'> | </p>
          <i className={'bottom-lightbulb-icon' + (this.props.lights ? ' fas fa-lightbulb' : ' far fa-lightbulb')} onClick={this.props.toggleLights}></i>
        </div>
      );
    }
  }
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
              <p className={'show-favorites-label' + (this.props.showFavorites ? ' selected' : '')} onClick={this.props.toggleShowFavorites}>Show Favorites</p>
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
        <BottomToolBar lights={this.props.lights} toggleLights={this.props.toggleLights}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allPostings: state.allPostings,
    showFavorites: state.showFavorites,
    lights: state.lights,
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
    toggleLights: () => {dispatch(toggleLights())},
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
