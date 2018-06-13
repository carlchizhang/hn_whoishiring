import React, { Component } from 'react';

class TagsBar extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let searchTags = this.props.searchTags;
    return (
      <div className='search-bar-wrapper'>
        <div className='label-wrapper'>
          <p className='search-label'>
            {this.props.label}
          </p>
          <i className="search-icon fas fa-search"></i>
        </div>
        <div className='tags-input'>
        {
          this.props.roleTags.map((tag) => {
            let tagSelected = searchTags.includes(tag);
            return <p 
              key={tag} 
              className={'filter-tag-box' + (tagSelected ? ' tag-selected' : '')}
              onClick={() => this.props.tagClick(tag)}
              >{tag}</p>
          })
        }
        {
          this.props.remoteTags.map((tag) => {
            let tagSelected = searchTags.includes(tag);
            return <p 
              key={tag} 
              className={'filter-tag-box' + (tagSelected ? ' tag-selected' : '')}
              onClick={() => this.props.tagClick(tag)}
              >{tag}</p>
          })
        }
        </div>
      </div>
    )
  }
}

export default TagsBar