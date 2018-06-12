import React, { Component } from 'react';
import '../App.css'
import '../stylesheets/searchBar.css';
import '../stylesheets/webfonts/fontawesome-all.css';

class TagsBar extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className='search-bar-wrapper'>
        <div className='label-wrapper'>
          <p className='search-label'>
            {this.props.label}
          </p>
          <i className="search-icon fas fa-search"></i>
        </div>
        <div className='tags-input'>
        </div>
      </div>
    )
  }
}

export default TagsBar