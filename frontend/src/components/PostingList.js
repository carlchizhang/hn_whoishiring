import React, { Component } from 'react';
import '../App.css'
import '../stylesheets/postingList.css';
import '../stylesheets/webfonts/fontawesome-all.css';
import PostingCard from './PostingCard';
import { dateCompare } from '../utilities/utilities';

class PostingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleCount: 50,
    };

    this.trackScrolling = this.trackScrolling.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
  }

  isBottom(element) {
    return element.getBoundingClientRect().bottom <= window.innerHeight;
  }

  trackScrolling() {
    const wrappedElement = document.getElementById('scrolling-body');
    if (this.isBottom(wrappedElement)) {
      setTimeout(() => {this.setState({visibleCount: this.state.visibleCount+50})}, 300);
    }
  }

  render() {
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
            pinCard={() => this.props.pinCard(posting.postingId)}
          />
        })
      }
        <div className='bottom-box'>
          <i 
            className={'loading-icon fas fa-sync-alt fa-spin fa-2x fa-fw' 
                        + (this.props.isLoading ? '' : ' hide')}
            title={'Loading... I\'m just a lowly undergrad please don\'t kill me if this takes too long'}
          />
        </div>
      </div>
    );
  }
}

export default PostingList;