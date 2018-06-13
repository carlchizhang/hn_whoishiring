import React, { Component } from 'react';
import PostingCard from './PostingCard';
import { dateCompare } from '../utilities/utilities';

class PostingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleCount: 50,
      scrolledToBottom: false
    };

    this.trackScrolling = this.trackScrolling.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
  }

  isBottom(element) {
    //console.log(element.getBoundingClientRect().bottom, window.innerHeight);
    return element.getBoundingClientRect().bottom <= (window.innerHeight);
  }

  trackScrolling() {
    if(this.state.visibleCount >= this.props.postings.length) {
      return;
    }
    const wrappedElement = document.getElementById('scrolling-body');
    if (this.isBottom(wrappedElement)) {
      this.setState({scrolledToBottom: true})
      setTimeout(() => {this.setState({
        visibleCount: this.state.visibleCount+50, 
        scrolledToBottom: false
      })}, 300);
    }
  }

  render() {
    let isLoading = this.props.isLoading || this.state.scrolledToBottom;
    return (
      <div className='posting-list' id='scrolling-body'>
      {
        this.props.postings.sort(dateCompare).map((posting, i) => {
          if(i > this.state.visibleCount) {
            return null;
          }
          return <PostingCard 
            key={posting.postingId} 
            posting={posting}
            favPosting={() => this.props.favPosting(posting)}
            unfavPosting={() => this.props.unfavPosting(posting)}
          />
        })
      }
        <div className='bottom-box'>
          <i 
            className={'loading-icon fas fa-sync-alt fa-spin fa-2x fa-fw' + (isLoading ? '' : ' hide')}
            title={'Loading... I\'m just a lowly undergrad please don\'t kill me if this takes too long'}
          />
          <p className={'eol-label' + (isLoading ? ' hide' : '')}>- End of List -</p>
        </div>
      </div>
    );
  }
}

export default PostingList;