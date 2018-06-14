import React, { Component } from 'react';

const ON_CHANGE_SEARCH_DELAY = 500;

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.onInterval = this.onInterval.bind(this);
  }

  handleChange(event) {
    clearInterval(this.state.intervalId);
    let newInterval = setInterval(this.onInterval, ON_CHANGE_SEARCH_DELAY);
    this.setState({intervalId: newInterval});
    this.props.updateSearchString(event.target.value);
  }

  onInterval() {
    clearInterval(this.state.intervalId);
    let strArr = this.props.valueString.split(',').map(item => item.trim());
    console.log(strArr);
    this.props.search(strArr);
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
        <input 
          className='search-input' 
          type='search' 
          value={this.props.valueString}
          placeholder={this.props.placeholderText}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default SearchBar