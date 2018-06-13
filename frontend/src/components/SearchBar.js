import React, { Component } from 'react';

const ON_CHANGE_SEARCH_DELAY = 500;

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      intervalId: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.onInterval = this.onInterval.bind(this);
  }

  handleChange(event) {
    clearInterval(this.state.intervalId);
    let newInterval = setInterval(this.onInterval, ON_CHANGE_SEARCH_DELAY);
    this.setState({value: event.target.value, intervalId: newInterval});
  }

  onInterval() {
    clearInterval(this.state.intervalId);
    let strArr = this.state.value.split(',').map(item => item.trim());
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
          value={this.state.value}
          placeholder={this.props.placeholderText}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default SearchBar